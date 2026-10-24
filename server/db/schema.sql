-- ==============================================================================
-- AgriPulse™ Tamil Nadu District & Soil Agronomic Relational Database
-- Production DDL Schema (SQLite3 / PostgreSQL compatible)
-- ==============================================================================

PRAGMA foreign_keys = ON;

-- 1. Districts Master Table (All 38 Districts of Tamil Nadu)
CREATE TABLE IF NOT EXISTS districts (
    id TEXT PRIMARY KEY,                       -- Standard alphanumeric slug (e.g. 'thanjavur')
    name TEXT NOT NULL,                        -- English Name (e.g. 'Thanjavur')
    name_ta TEXT NOT NULL,                     -- Tamil Localized Name (e.g. 'தஞ்சாவூர்')
    zone TEXT NOT NULL,                        -- Agro-climatic Zone (e.g. 'Cauvery Delta Zone')
    zone_ta TEXT,                              -- Tamil Agro-climatic Zone
    soil_ph TEXT,                              -- pH Range (e.g. '6.8 - 7.5 (Neutral to Mildly Alkaline)')
    drainage TEXT,                             -- Drainage property (e.g. 'Moderate to Slow')
    water_retention TEXT,                      -- Moisture retention property (e.g. 'Very High')
    annual_rainfall_mm INTEGER NOT NULL,       -- Annual Rainfall in mm
    major_canals TEXT,                         -- Key river basins & irrigation canals
    sand_composition TEXT,                     -- Geological soil particle profile (% sand, silt, clay)
    upcoming_season_summary TEXT,              -- Agro-meteorological & monsoon summary
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. Soil Types Master Table (Normalized Soil Profiles)
CREATE TABLE IF NOT EXISTS soil_types (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,                 -- e.g. 'Delta Alluvial', 'Red Sandy Loam'
    category TEXT NOT NULL,                    -- Category: 'Alluvial', 'Black Soil (Vertisol)', 'Red Soil (Alfisol)', 'Laterite', 'Coastal Sand'
    description TEXT,                          -- Agronomic & structural description
    typical_ph_min REAL,                       -- Minimum typical pH value
    typical_ph_max REAL,                       -- Maximum typical pH value
    drainage_class TEXT,                       -- 'Rapid', 'Well Drained', 'Moderate', 'Slow'
    water_holding_capacity TEXT,               -- 'Low', 'Medium', 'High', 'Very High'
    organic_matter TEXT,                       -- 'Low', 'Medium', 'High'
    primary_nutrients TEXT,                    -- Key mineral abundance (e.g. 'High Potash, Medium Nitrogen')
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 3. District to Soil Types Mapping (Normalized Relational Association)
CREATE TABLE IF NOT EXISTS district_soils (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    district_id TEXT NOT NULL,
    soil_type_id INTEGER NOT NULL,
    is_dominant BOOLEAN DEFAULT 1,             -- 1 = Dominant Soil, 0 = Secondary Soil
    priority_order INTEGER DEFAULT 1,          -- 1 = Primary, 2 = Secondary, 3 = Tertiary
    coverage_estimate_pct INTEGER,             -- Approximate geographical coverage percentage
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (district_id) REFERENCES districts(id) ON DELETE CASCADE,
    FOREIGN KEY (soil_type_id) REFERENCES soil_types(id) ON DELETE RESTRICT,
    UNIQUE(district_id, soil_type_id)
);

-- Performance & Developer Query Indexes
CREATE INDEX IF NOT EXISTS idx_districts_zone ON districts(zone);
CREATE INDEX IF NOT EXISTS idx_districts_rainfall ON districts(annual_rainfall_mm);
CREATE INDEX IF NOT EXISTS idx_soil_types_category ON soil_types(category);
CREATE INDEX IF NOT EXISTS idx_district_soils_district ON district_soils(district_id);
CREATE INDEX IF NOT EXISTS idx_district_soils_soil ON district_soils(soil_type_id);
CREATE INDEX IF NOT EXISTS idx_district_soils_composite ON district_soils(district_id, is_dominant);
