import { getDatabase } from "../db/database.js";

/**
 * AgriPulse™ District & Soil Backend Service (Developer Data Access Layer)
 */
export class DistrictService {
  constructor(db = getDatabase()) {
    this.db = db;
  }

  /**
   * Retrieves all districts with optional filtering and nested mapped soil types
   * @param {Object} options
   * @param {string} [options.zone] - Filter by agro-climatic zone (e.g. 'Cauvery Delta')
   * @param {string} [options.soilType] - Filter by soil type name or category
   * @param {string} [options.search] - Search text by district name or Tamil name
   * @param {number} [options.limit=100]
   * @param {number} [options.offset=0]
   */
  getAllDistricts({ zone, soilType, search, limit = 100, offset = 0 } = {}) {
    let sql = `
      SELECT 
        d.id,
        d.name,
        d.name_ta,
        d.zone,
        d.zone_ta,
        d.soil_ph,
        d.drainage,
        d.water_retention,
        d.annual_rainfall_mm,
        d.major_canals,
        d.sand_composition,
        d.upcoming_season_summary,
        d.created_at,
        d.updated_at
      FROM districts d
      WHERE 1=1
    `;
    const params = [];

    if (zone) {
      sql += " AND d.zone LIKE ?";
      params.push(`%${zone}%`);
    }

    if (search) {
      sql += " AND (d.name LIKE ? OR d.name_ta LIKE ? OR d.id LIKE ?)";
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    if (soilType) {
      sql += `
        AND d.id IN (
          SELECT ds.district_id 
          FROM district_soils ds
          JOIN soil_types st ON st.id = ds.soil_type_id
          WHERE st.name LIKE ? OR st.category LIKE ?
        )
      `;
      params.push(`%${soilType}%`, `%${soilType}%`);
    }

    sql += " ORDER BY d.name ASC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const districts = this.db.prepare(sql).all(...params);

    // Attach mapped soil types for each district
    const soilsStmt = this.db.prepare(`
      SELECT 
        st.id,
        st.name,
        st.category,
        st.description,
        st.typical_ph_min,
        st.typical_ph_max,
        st.drainage_class,
        st.water_holding_capacity,
        st.primary_nutrients,
        ds.is_dominant,
        ds.priority_order,
        ds.coverage_estimate_pct
      FROM district_soils ds
      JOIN soil_types st ON st.id = ds.soil_type_id
      WHERE ds.district_id = ?
      ORDER BY ds.priority_order ASC
    `);

    return districts.map((district) => ({
      ...district,
      soils: soilsStmt.all(district.id)
    }));
  }

  /**
   * Retrieves single district by slug/id with its mapped soil types
   * @param {string} id - District slug (e.g. 'thanjavur')
   */
  getDistrictById(id) {
    const district = this.db.prepare("SELECT * FROM districts WHERE id = ?").get(id);
    if (!district) return null;

    const soils = this.db.prepare(`
      SELECT 
        st.id,
        st.name,
        st.category,
        st.description,
        st.typical_ph_min,
        st.typical_ph_max,
        st.drainage_class,
        st.water_holding_capacity,
        st.organic_matter,
        st.primary_nutrients,
        ds.is_dominant,
        ds.priority_order,
        ds.coverage_estimate_pct
      FROM district_soils ds
      JOIN soil_types st ON st.id = ds.soil_type_id
      WHERE ds.district_id = ?
      ORDER BY ds.priority_order ASC
    `).all(id);

    return {
      ...district,
      soils
    };
  }

  /**
   * Retrieves all districts that have a given soil type mapped
   * @param {string|number} soilIdOrName - Soil type ID or Name
   */
  getDistrictsBySoilType(soilIdOrName) {
    let sql;
    let params;

    if (typeof soilIdOrName === "number" || !isNaN(Number(soilIdOrName))) {
      sql = `
        SELECT 
          d.*,
          ds.is_dominant,
          ds.priority_order,
          ds.coverage_estimate_pct,
          st.name AS soil_name,
          st.category AS soil_category
        FROM districts d
        JOIN district_soils ds ON ds.district_id = d.id
        JOIN soil_types st ON st.id = ds.soil_type_id
        WHERE st.id = ?
        ORDER BY ds.priority_order ASC, d.name ASC
      `;
      params = [Number(soilIdOrName)];
    } else {
      sql = `
        SELECT 
          d.*,
          ds.is_dominant,
          ds.priority_order,
          ds.coverage_estimate_pct,
          st.name AS soil_name,
          st.category AS soil_category
        FROM districts d
        JOIN district_soils ds ON ds.district_id = d.id
        JOIN soil_types st ON st.id = ds.soil_type_id
        WHERE st.name LIKE ? OR st.category LIKE ?
        ORDER BY ds.priority_order ASC, d.name ASC
      `;
      params = [`%${soilIdOrName}%`, `%${soilIdOrName}%`];
    }

    return this.db.prepare(sql).all(...params);
  }

  /**
   * Retrieves all unique agro-climatic zones with district counts
   */
  getZones() {
    return this.db.prepare(`
      SELECT 
        zone, 
        zone_ta,
        COUNT(*) AS district_count,
        ROUND(AVG(annual_rainfall_mm), 1) AS avg_rainfall_mm
      FROM districts
      GROUP BY zone
      ORDER BY district_count DESC
    `).all();
  }

  /**
   * Retrieves all registered soil types master records
   * @param {Object} [filter]
   * @param {string} [filter.category]
   */
  getAllSoilTypes({ category } = {}) {
    let sql = `
      SELECT 
        st.*,
        COUNT(ds.district_id) AS mapped_districts_count
      FROM soil_types st
      LEFT JOIN district_soils ds ON ds.soil_type_id = st.id
    `;
    const params = [];

    if (category) {
      sql += " WHERE st.category LIKE ?";
      params.push(`%${category}%`);
    }

    sql += " GROUP BY st.id ORDER BY mapped_districts_count DESC, st.name ASC";
    return this.db.prepare(sql).all(...params);
  }

  /**
   * Retrieves a single soil type by ID with all mapped districts
   */
  getSoilTypeById(id) {
    const soil = this.db.prepare("SELECT * FROM soil_types WHERE id = ?").get(id);
    if (!soil) return null;

    const mappedDistricts = this.db.prepare(`
      SELECT 
        d.id,
        d.name,
        d.name_ta,
        d.zone,
        ds.is_dominant,
        ds.priority_order,
        ds.coverage_estimate_pct
      FROM district_soils ds
      JOIN districts d ON d.id = ds.district_id
      WHERE ds.soil_type_id = ?
      ORDER BY d.name ASC
    `).all(id);

    return {
      ...soil,
      mappedDistricts
    };
  }

  /**
   * Creates a new district and maps its soil types
   * @param {Object} data
   */
  createDistrict(data) {
    const {
      id,
      name,
      name_ta,
      zone,
      zone_ta = "",
      soil_ph = "6.5 - 7.5",
      drainage = "Moderate",
      water_retention = "Moderate",
      annual_rainfall_mm = 900,
      major_canals = "",
      sand_composition = "",
      upcoming_season_summary = "",
      soilTypeIds = []
    } = data;

    if (!id || !name || !name_ta || !zone) {
      throw new Error("Missing required fields: id, name, name_ta, zone");
    }

    this.db.exec("BEGIN TRANSACTION;");
    try {
      this.db.prepare(`
        INSERT INTO districts (
          id, name, name_ta, zone, zone_ta, soil_ph, drainage,
          water_retention, annual_rainfall_mm, major_canals,
          sand_composition, upcoming_season_summary
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        id.toLowerCase().trim(),
        name.trim(),
        name_ta.trim(),
        zone.trim(),
        zone_ta.trim(),
        soil_ph,
        drainage,
        water_retention,
        Number(annual_rainfall_mm),
        major_canals,
        sand_composition,
        upcoming_season_summary
      );

      // Map soils
      const insertMapping = this.db.prepare(`
        INSERT INTO district_soils (district_id, soil_type_id, is_dominant, priority_order)
        VALUES (?, ?, ?, ?)
      `);

      soilTypeIds.forEach((soilId, idx) => {
        insertMapping.run(id, soilId, idx === 0 ? 1 : 0, idx + 1);
      });

      this.db.exec("COMMIT;");
      return this.getDistrictById(id);
    } catch (err) {
      this.db.exec("ROLLBACK;");
      throw err;
    }
  }

  /**
   * Updates an existing district
   */
  updateDistrict(id, updates) {
    const existing = this.getDistrictById(id);
    if (!existing) return null;

    const fields = [];
    const values = [];

    const allowed = [
      "name", "name_ta", "zone", "zone_ta", "soil_ph",
      "drainage", "water_retention", "annual_rainfall_mm",
      "major_canals", "sand_composition", "upcoming_season_summary"
    ];

    for (const key of allowed) {
      if (updates[key] !== undefined) {
        fields.push(`${key} = ?`);
        values.push(updates[key]);
      }
    }

    if (fields.length > 0) {
      fields.push("updated_at = CURRENT_TIMESTAMP");
      values.push(id);
      this.db.prepare(`UPDATE districts SET ${fields.join(", ")} WHERE id = ?`).run(...values);
    }

    return this.getDistrictById(id);
  }

  /**
   * Deletes a district by ID
   */
  deleteDistrict(id) {
    const result = this.db.prepare("DELETE FROM districts WHERE id = ?").run(id);
    return result.changes > 0;
  }

  /**
   * System health and analytics stats for developers
   */
  getStatistics() {
    const totalDistricts = this.db.prepare("SELECT COUNT(*) AS total FROM districts").get().total;
    const totalSoilTypes = this.db.prepare("SELECT COUNT(*) AS total FROM soil_types").get().total;
    const totalMappings = this.db.prepare("SELECT COUNT(*) AS total FROM district_soils").get().total;
    const rainfallStats = this.db.prepare(`
      SELECT 
        MIN(annual_rainfall_mm) AS min_rainfall,
        MAX(annual_rainfall_mm) AS max_rainfall,
        ROUND(AVG(annual_rainfall_mm), 1) AS avg_rainfall
      FROM districts
    `).get();

    return {
      status: "OPERATIONAL",
      engine: "SQLite Native (node:sqlite)",
      totalDistricts,
      totalSoilTypes,
      totalMappings,
      rainfallStats
    };
  }
}
