import http from "node:http";
import url from "node:url";
import { DistrictService } from "../services/districtService.js";
import { getDatabase } from "../db/database.js";

const PORT = process.env.PORT || 5050;
const service = new DistrictService(getDatabase());

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  });
  res.end(JSON.stringify(data, null, 2));
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(new Error("Invalid JSON body"));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;
  const query = Object.fromEntries(parsedUrl.searchParams.entries());

  // Handle CORS Preflight
  if (method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization"
    });
    return res.end();
  }

  try {
    // 1. Health & Statistics
    if (pathname === "/api/health" && method === "GET") {
      const stats = service.getStatistics();
      return sendJson(res, 200, {
        status: "UP",
        message: "AgriPulse Tamil Nadu District Database Backend is running",
        timestamp: new Date().toISOString(),
        stats
      });
    }

    // 2. Agro-Climatic Zones
    if (pathname === "/api/zones" && method === "GET") {
      const zones = service.getZones();
      return sendJson(res, 200, {
        total: zones.length,
        zones
      });
    }

    // 3. Soil Types Master
    // GET /api/soils
    if (pathname === "/api/soils" && method === "GET") {
      const soils = service.getAllSoilTypes({ category: query.category });
      return sendJson(res, 200, {
        total: soils.length,
        soils
      });
    }

    // GET /api/soils/:id
    const soilMatch = pathname.match(/^\/api\/soils\/(\d+)$/);
    if (soilMatch && method === "GET") {
      const soil = service.getSoilTypeById(Number(soilMatch[1]));
      if (!soil) return sendJson(res, 404, { error: "Soil type not found" });
      return sendJson(res, 200, soil);
    }

    // 4. Districts
    // GET /api/districts
    if (pathname === "/api/districts" && method === "GET") {
      const districts = service.getAllDistricts({
        zone: query.zone,
        soilType: query.soilType,
        search: query.search,
        limit: query.limit ? Number(query.limit) : 100,
        offset: query.offset ? Number(query.offset) : 0
      });
      return sendJson(res, 200, {
        total: districts.length,
        districts
      });
    }

    // POST /api/districts
    if (pathname === "/api/districts" && method === "POST") {
      const body = await parseBody(req);
      const created = service.createDistrict(body);
      return sendJson(res, 201, created);
    }

    // GET /api/districts/:id/soils
    const districtSoilsMatch = pathname.match(/^\/api\/districts\/([a-zA-Z0-9_-]+)\/soils$/);
    if (districtSoilsMatch && method === "GET") {
      const districtId = districtSoilsMatch[1].toLowerCase();
      const district = service.getDistrictById(districtId);
      if (!district) return sendJson(res, 404, { error: "District not found" });
      return sendJson(res, 200, {
        districtId: district.id,
        districtName: district.name,
        districtNameTa: district.name_ta,
        soils: district.soils
      });
    }

    // GET /api/districts/:id
    const districtMatch = pathname.match(/^\/api\/districts\/([a-zA-Z0-9_-]+)$/);
    if (districtMatch && method === "GET") {
      const districtId = districtMatch[1].toLowerCase();
      const district = service.getDistrictById(districtId);
      if (!district) return sendJson(res, 404, { error: `District '${districtId}' not found` });
      return sendJson(res, 200, district);
    }

    // PUT /api/districts/:id
    if (districtMatch && method === "PUT") {
      const districtId = districtMatch[1].toLowerCase();
      const body = await parseBody(req);
      const updated = service.updateDistrict(districtId, body);
      if (!updated) return sendJson(res, 404, { error: `District '${districtId}' not found` });
      return sendJson(res, 200, updated);
    }

    // DELETE /api/districts/:id
    if (districtMatch && method === "DELETE") {
      const districtId = districtMatch[1].toLowerCase();
      const success = service.deleteDistrict(districtId);
      if (!success) return sendJson(res, 404, { error: `District '${districtId}' not found` });
      return sendJson(res, 200, { success: true, message: `District '${districtId}' deleted` });
    }

    // Default 404
    return sendJson(res, 404, {
      error: "Endpoint not found",
      availableEndpoints: [
        "GET /api/health",
        "GET /api/districts",
        "GET /api/districts/:id",
        "GET /api/districts/:id/soils",
        "GET /api/soils",
        "GET /api/soils/:id",
        "GET /api/zones",
        "POST /api/districts",
        "PUT /api/districts/:id",
        "DELETE /api/districts/:id"
      ]
    });
  } catch (err) {
    console.error("API Server Error:", err);
    return sendJson(res, 500, { error: err.message || "Internal Server Error" });
  }
});

export function startServer(port = PORT) {
  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`[AgriPulse API] Backend server listening at http://127.0.0.1:${port}`);
      resolve(server);
    });
  });
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].endsWith("server.js")) {
  startServer(PORT);
}

export { server };
