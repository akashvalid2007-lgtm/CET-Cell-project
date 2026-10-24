#!/usr/bin/env node
import { getDatabase, seedDatabase, DB_PATH } from "../db/database.js";
import { DistrictService } from "../services/districtService.js";

async function main() {
  console.log("==========================================================");
  console.log(" 🌱 AgriPulse™ Tamil Nadu District & Soil Database Builder");
  console.log("==========================================================");
  console.log(`[DB] Target SQLite File: ${DB_PATH}`);

  const startTime = Date.now();
  const db = getDatabase();
  console.log("[DB] Schema initialized successfully.");

  console.log("[DB] Pre-populating Tamil Nadu districts and mapped soils...");
  const seedResult = await seedDatabase(db);

  const duration = Date.now() - startTime;
  console.log(`[DB] Status: ${seedResult.message}`);
  console.log(`[DB] 📍 Total Districts Pre-Populated: ${seedResult.districtsCount}`);
  console.log(`[DB] 🌾 Unique Soil Types Registered:  ${seedResult.soilsCount}`);
  console.log(`[DB] 🔗 District-Soil Mappings Built:  ${seedResult.mappingsCount}`);
  console.log(`[DB] ⏱️ Execution Time: ${duration}ms\n`);

  // Run a quick verification query using the service layer
  const service = new DistrictService(db);
  const thanjavur = service.getDistrictById("thanjavur");

  if (thanjavur) {
    console.log("------------------ Verification Check ------------------");
    console.log(`District: ${thanjavur.name} (${thanjavur.name_ta})`);
    console.log(`Zone:     ${thanjavur.zone} (${thanjavur.zone_ta})`);
    console.log(`Rainfall: ${thanjavur.annual_rainfall_mm} mm/year`);
    console.log(`Mapped Soils (${thanjavur.soils.length}):`);
    thanjavur.soils.forEach((s) => {
      console.log(`  • [${s.category}] ${s.name} (Priority ${s.priority_order}, ~${s.coverage_estimate_pct}%)`);
    });
    console.log("--------------------------------------------------------\n");
  }

  console.log("✅ Database backend pre-population complete and ready for production use!");
}

main().catch((err) => {
  console.error("❌ Fatal Error during database initialization:", err);
  process.exit(1);
});
