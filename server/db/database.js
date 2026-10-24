import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database file path
export const DB_PATH = path.join(__dirname, "agripulse.db");
export const SCHEMA_PATH = path.join(__dirname, "schema.sql");
export const SEEDS_SQL_PATH = path.join(__dirname, "seeds.sql");

let dbInstance = null;

/**
 * Categorizes and enriches a raw soil type name with agronomic properties
 */
export function enrichSoilType(soilName) {
  const lower = soilName.toLowerCase();
  
  if (lower.includes("alluvial") || lower.includes("silt") || lower.includes("delta")) {
    return {
      category: "Alluvial Soil (Entisols/Inceptisols)",
      description: "Fertile riverine and deltaic deposits composed of silt and clay. Highly responsive to systematic irrigation.",
      typical_ph_min: 6.5,
      typical_ph_max: 7.8,
      drainage_class: "Moderate",
      water_holding_capacity: "High",
      organic_matter: "Medium",
      primary_nutrients: "Rich in Potash and Lime; moderate Nitrogen and Phosphorus"
    };
  }
  if (lower.includes("black") || lower.includes("vertisol") || lower.includes("cotton")) {
    return {
      category: "Black Cotton Soil (Vertisols)",
      description: "Deep clayey soil characterized by swelling and shrinking cracking behavior. Excellent moisture conservation under semi-arid conditions.",
      typical_ph_min: 7.5,
      typical_ph_max: 8.5,
      drainage_class: "Slow",
      water_holding_capacity: "Very High",
      organic_matter: "Low to Medium",
      primary_nutrients: "Rich in Calcium, Magnesium carbonate and Potash; low Nitrogen"
    };
  }
  if (lower.includes("laterit") || lower.includes("acidic") || lower.includes("peat") || lower.includes("forest") || lower.includes("humus")) {
    return {
      category: "Laterite & Hill Soil (Oxisols/Mollisols)",
      description: "Iron and aluminum-rich porous soil developed through heavy leaching, typically found in ghats and undulating terrains.",
      typical_ph_min: 4.8,
      typical_ph_max: 6.2,
      drainage_class: "Rapid to Well Drained",
      water_holding_capacity: "Moderate",
      organic_matter: lower.includes("peat") || lower.includes("humus") ? "High" : "Low",
      primary_nutrients: "High in Iron oxides and Humus; low in Lime and Available Phosphate"
    };
  }
  if (lower.includes("coast") || lower.includes("marine") || lower.includes("sand")) {
    return {
      category: "Coastal Sandy Soil (Arenosols)",
      description: "Coarse textured marine sand dunes with high porosity and salinity exposure along Tamil Nadu's 1,076 km coastline.",
      typical_ph_min: 7.0,
      typical_ph_max: 8.3,
      drainage_class: "Very Rapid",
      water_holding_capacity: "Low",
      organic_matter: "Low",
      primary_nutrients: "High in Sodium and Silicates; severely deficient in Organic Nitrogen"
    };
  }
  
  // Red Loam / Alfisols default
  return {
    category: "Red Soil (Alfisols)",
    description: "Formed from crystalline granite rocks. Porous, friable structure with non-expansive clay minerals suitable for diverse field crops.",
    typical_ph_min: 6.2,
    typical_ph_max: 7.4,
    drainage_class: "Well Drained",
    water_holding_capacity: "Moderate",
    organic_matter: "Low to Medium",
    primary_nutrients: "Rich in Potash and Iron; responsive to Nitrogenous and Phosphatic fertilizers"
  };
}

/**
 * Returns an active SQLite DatabaseSync instance, initializing schema if needed
 */
export function getDatabase(dbFile = DB_PATH) {
  if (dbInstance) return dbInstance;

  dbInstance = new DatabaseSync(dbFile);
  dbInstance.exec("PRAGMA foreign_keys = ON;");
  dbInstance.exec("PRAGMA journal_mode = WAL;");

  // Initialize schema
  const schemaSql = fs.readFileSync(SCHEMA_PATH, "utf-8");
  dbInstance.exec(schemaSql);

  return dbInstance;
}

/**
 * Pre-populates the database with all 38 Tamil Nadu districts and mapped soil types
 */
export async function seedDatabase(db = getDatabase()) {
  const { TAMIL_NADU_DISTRICTS } = await import("../../src/data/tamilNaduData.js");
  const { DISTRICT_NAMES_TA, DISTRICT_ZONES_TA } = await import("../../src/data/translations.js");

  // Check if already populated
  const countRow = db.prepare("SELECT COUNT(*) AS total FROM districts").get();
  if (countRow && countRow.total >= 38) {
    return {
      success: true,
      message: "Database already pre-populated",
      districtsCount: countRow.total,
      soilsCount: db.prepare("SELECT COUNT(*) AS total FROM soil_types").get().total,
      mappingsCount: db.prepare("SELECT COUNT(*) AS total FROM district_soils").get().total
    };
  }

  // Transaction for batch insert
  db.exec("BEGIN TRANSACTION;");

  try {
    // 1. Prepare statements
    const insertDistrictStmt = db.prepare(`
      INSERT OR REPLACE INTO districts (
        id, name, name_ta, zone, zone_ta, soil_ph, drainage,
        water_retention, annual_rainfall_mm, major_canals,
        sand_composition, upcoming_season_summary
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertSoilStmt = db.prepare(`
      INSERT OR IGNORE INTO soil_types (
        name, category, description, typical_ph_min, typical_ph_max,
        drainage_class, water_holding_capacity, organic_matter, primary_nutrients
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const getSoilIdStmt = db.prepare("SELECT id FROM soil_types WHERE name = ?");

    const insertDistrictSoilStmt = db.prepare(`
      INSERT OR REPLACE INTO district_soils (
        district_id, soil_type_id, is_dominant, priority_order, coverage_estimate_pct
      ) VALUES (?, ?, ?, ?, ?)
    `);

    // 2. Pre-populate all unique soil types
    const uniqueSoils = new Set();
    TAMIL_NADU_DISTRICTS.forEach((d) => {
      d.dominantSoils.forEach((s) => uniqueSoils.add(s.trim()));
    });

    for (const soilName of uniqueSoils) {
      const enriched = enrichSoilType(soilName);
      insertSoilStmt.run(
        soilName,
        enriched.category,
        enriched.description,
        enriched.typical_ph_min,
        enriched.typical_ph_max,
        enriched.drainage_class,
        enriched.water_holding_capacity,
        enriched.organic_matter,
        enriched.primary_nutrients
      );
    }

    // 3. Pre-populate districts & mapping
    for (const d of TAMIL_NADU_DISTRICTS) {
      const nameTa = DISTRICT_NAMES_TA[d.id] || d.name;
      const zoneTa = DISTRICT_ZONES_TA[d.id] || d.zone;

      insertDistrictStmt.run(
        d.id,
        d.name,
        nameTa,
        d.zone,
        zoneTa,
        d.soilPH,
        d.drainage,
        d.waterRetention,
        d.annualRainfallMm,
        d.majorCanals,
        d.sandComposition,
        d.upcomingSeasonSummary
      );

      // Insert mappings
      d.dominantSoils.forEach((soilName, index) => {
        const soilRow = getSoilIdStmt.get(soilName.trim());
        if (soilRow) {
          const isDominant = index === 0 ? 1 : 1;
          const priorityOrder = index + 1;
          const coveragePct = index === 0 ? 60 : Math.floor(40 / (d.dominantSoils.length - 1 || 1));
          
          insertDistrictSoilStmt.run(
            d.id,
            soilRow.id,
            isDominant,
            priorityOrder,
            coveragePct
          );
        }
      });
    }

    db.exec("COMMIT;");

    // Also export a clean standalone seeds.sql file for developers using PostgreSQL/MySQL
    generateSqlSeedFile(db);

    const districtsTotal = db.prepare("SELECT COUNT(*) AS total FROM districts").get().total;
    const soilsTotal = db.prepare("SELECT COUNT(*) AS total FROM soil_types").get().total;
    const mappingsTotal = db.prepare("SELECT COUNT(*) AS total FROM district_soils").get().total;

    return {
      success: true,
      message: "Database successfully pre-populated with Tamil Nadu districts and mapped soil types",
      districtsCount: districtsTotal,
      soilsCount: soilsTotal,
      mappingsCount: mappingsTotal
    };
  } catch (err) {
    db.exec("ROLLBACK;");
    throw err;
  }
}

/**
 * Exports SQLite records to a standard SQL file (seeds.sql) for developer distribution
 */
function generateSqlSeedFile(db) {
  let sql = `-- ==============================================================================
-- AgriPulse™ Tamil Nadu Districts & Mapped Soils Pre-Populated Seed Data
-- 38 Official Districts of Tamil Nadu & Normalized Soil Master Records
-- ==============================================================================

BEGIN TRANSACTION;

`;

  // Soil Types Inserts
  const soils = db.prepare("SELECT * FROM soil_types ORDER BY id ASC").all();
  for (const s of soils) {
    sql += `INSERT INTO soil_types (id, name, category, description, typical_ph_min, typical_ph_max, drainage_class, water_holding_capacity, organic_matter, primary_nutrients) VALUES (${s.id}, ${escapeSql(s.name)}, ${escapeSql(s.category)}, ${escapeSql(s.description)}, ${s.typical_ph_min}, ${s.typical_ph_max}, ${escapeSql(s.drainage_class)}, ${escapeSql(s.water_holding_capacity)}, ${escapeSql(s.organic_matter)}, ${escapeSql(s.primary_nutrients)});\n`;
  }

  sql += "\n";

  // Districts Inserts
  const districts = db.prepare("SELECT * FROM districts ORDER BY name ASC").all();
  for (const d of districts) {
    sql += `INSERT INTO districts (id, name, name_ta, zone, zone_ta, soil_ph, drainage, water_retention, annual_rainfall_mm, major_canals, sand_composition, upcoming_season_summary) VALUES (${escapeSql(d.id)}, ${escapeSql(d.name)}, ${escapeSql(d.name_ta)}, ${escapeSql(d.zone)}, ${escapeSql(d.zone_ta)}, ${escapeSql(d.soil_ph)}, ${escapeSql(d.drainage)}, ${escapeSql(d.water_retention)}, ${d.annual_rainfall_mm}, ${escapeSql(d.major_canals)}, ${escapeSql(d.sand_composition)}, ${escapeSql(d.upcoming_season_summary)});\n`;
  }

  sql += "\n";

  // District Soils Mapping Inserts
  const mappings = db.prepare("SELECT * FROM district_soils ORDER BY id ASC").all();
  for (const m of mappings) {
    sql += `INSERT INTO district_soils (id, district_id, soil_type_id, is_dominant, priority_order, coverage_estimate_pct) VALUES (${m.id}, ${escapeSql(m.district_id)}, ${m.soil_type_id}, ${m.is_dominant}, ${m.priority_order}, ${m.coverage_estimate_pct});\n`;
  }

  sql += "\nCOMMIT;\n";

  fs.writeFileSync(SEEDS_SQL_PATH, sql, "utf-8");
}

function escapeSql(str) {
  if (str === null || str === undefined) return "NULL";
  return `'${String(str).replace(/'/g, "''")}'`;
}
