#!/usr/bin/env node
import assert from "node:assert/strict";
import http from "node:http";
import { getDatabase, seedDatabase } from "../db/database.js";
import { DistrictService } from "../services/districtService.js";
import { startServer } from "../api/server.js";

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          reject(e);
        }
      });
    }).on("error", reject);
  });
}

async function runTests() {
  console.log("==========================================================");
  console.log(" 🧪 AgriPulse Backend Developer Verification Test Suite");
  console.log("==========================================================");

  // 1. Initialize & Seed DB
  console.log("\n[TEST 1] Testing Database Schema & Pre-population...");
  const db = getDatabase();
  const seedResult = await seedDatabase(db);
  assert.equal(seedResult.districtsCount, 38, "Must have exactly 38 Tamil Nadu districts");
  assert.ok(seedResult.soilsCount >= 50, "Must have 50+ normalized soil types");
  assert.ok(seedResult.mappingsCount >= 70, "Must have 70+ district-soil mappings");
  console.log(`  ✓ Passed: 38 districts, ${seedResult.soilsCount} soils, ${seedResult.mappingsCount} mappings verified.`);

  // 2. Service Layer Tests
  const service = new DistrictService(db);

  console.log("\n[TEST 2] Testing District Retrieval by ID (Thanjavur)...");
  const thanjavur = service.getDistrictById("thanjavur");
  assert.ok(thanjavur, "Thanjavur must exist");
  assert.equal(thanjavur.name, "Thanjavur");
  assert.equal(thanjavur.name_ta, "தஞ்சாவூர்");
  assert.ok(thanjavur.soils.length >= 1, "Thanjavur must have mapped soils");
  console.log(`  ✓ Passed: Retrieved ${thanjavur.name} with ${thanjavur.soils.length} mapped soils: ${thanjavur.soils.map(s => s.name).join(", ")}`);

  console.log("\n[TEST 3] Testing Agro-Climatic Zone Filtering...");
  const cauveryDistricts = service.getAllDistricts({ zone: "Cauvery Delta" });
  assert.ok(cauveryDistricts.length >= 3, "Cauvery Delta should contain multiple districts");
  console.log(`  ✓ Passed: Found ${cauveryDistricts.length} districts in Cauvery Delta zone (${cauveryDistricts.map(d => d.name).join(", ")})`);

  console.log("\n[TEST 4] Testing Soil Type Reverse Lookup (Vertisols / Black Soil)...");
  const blackSoilDistricts = service.getDistrictsBySoilType("Black");
  assert.ok(blackSoilDistricts.length >= 3, "Multiple districts must have Black Soil mapped");
  console.log(`  ✓ Passed: Found ${blackSoilDistricts.length} districts mapped to Black Soil types`);

  console.log("\n[TEST 5] Testing Search by Tamil Script (மதுரை / Madurai)...");
  const maduraiSearch = service.getAllDistricts({ search: "மதுரை" });
  assert.equal(maduraiSearch.length, 1, "Should find Madurai by Tamil name");
  assert.equal(maduraiSearch[0].id, "madurai");
  console.log(`  ✓ Passed: Found '${maduraiSearch[0].name}' (${maduraiSearch[0].name_ta}) via Tamil query.`);

  // 3. REST API Endpoint Tests
  console.log("\n[TEST 6] Testing Standalone REST API Server...");
  const TEST_PORT = 5055;
  const server = await startServer(TEST_PORT);

  try {
    // Health endpoint
    const health = await fetchJson(`http://127.0.0.1:${TEST_PORT}/api/health`);
    assert.equal(health.status, 200);
    assert.equal(health.body.stats.totalDistricts, 38);
    console.log("  ✓ Passed: GET /api/health returned 200 OK with operational status");

    // Districts endpoint
    const districtsRes = await fetchJson(`http://127.0.0.1:${TEST_PORT}/api/districts?limit=5`);
    assert.equal(districtsRes.status, 200);
    assert.equal(districtsRes.body.total, 5);
    console.log("  ✓ Passed: GET /api/districts with pagination returned 5 districts");

    // Specific district soils endpoint
    const soilsRes = await fetchJson(`http://127.0.0.1:${TEST_PORT}/api/districts/coimbatore/soils`);
    assert.equal(soilsRes.status, 200);
    assert.equal(soilsRes.body.districtId, "coimbatore");
    assert.ok(soilsRes.body.soils.length > 0);
    console.log(`  ✓ Passed: GET /api/districts/coimbatore/soils returned ${soilsRes.body.soils.length} soils`);

    // Zones endpoint
    const zonesRes = await fetchJson(`http://127.0.0.1:${TEST_PORT}/api/zones`);
    assert.equal(zonesRes.status, 200);
    assert.ok(zonesRes.body.total >= 5);
    console.log(`  ✓ Passed: GET /api/zones returned ${zonesRes.body.total} distinct agro-climatic zones`);

  } finally {
    server.close();
  }

  console.log("\n==========================================================");
  console.log(" 🎉 ALL 6 BACKEND TESTS PASSED SUCCESSFULLY! (100%)");
  console.log("==========================================================");
}

runTests().catch((err) => {
  console.error("❌ Test failed:", err);
  process.exit(1);
});
