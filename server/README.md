# AgriPulse™ Tamil Nadu District & Soil Backend Database

> **Developer & Backend Engineering Guide**  
> Pre-populated relational database containing all 38 districts of Tamil Nadu, normalized master soil types, and relational mapping tables calibrated with Tamil Nadu Agricultural University (TNAU) agronomy benchmarks.

---

## 🏗️ Architecture Overview

```
server/
├── db/
│   ├── schema.sql           # DDL schema (districts, soil_types, district_soils)
│   ├── seeds.sql            # Standard SQL seed script (62KB) for PostgreSQL/MySQL/SQLite
│   ├── database.js          # Native SQLite engine connection & migration runner
│   └── agripulse.db         # Pre-populated SQLite binary database file
├── services/
│   └── districtService.js   # Type-safe developer Data Access Layer (DAO)
├── api/
│   └── server.js            # Standalone zero-dependency REST API server
└── scripts/
    ├── initDb.js            # CLI database populator & builder
    └── testBackend.js       # End-to-end developer test suite
```

---

## 📊 Relational Database Schema

### 1. `districts` Table
Stores geographical, administrative, hydrological, and climatic data for all 38 districts.

| Column | Type | Description |
|---|---|---|
| `id` | `TEXT PRIMARY KEY` | Slug identifier (e.g. `thanjavur`, `coimbatore`) |
| `name` | `TEXT NOT NULL` | English official name |
| `name_ta` | `TEXT NOT NULL` | Tamil script localized name (e.g. `தஞ்சாவூர்`) |
| `zone` | `TEXT NOT NULL` | Agro-climatic zone (e.g. `Cauvery Delta Zone`) |
| `zone_ta` | `TEXT` | Tamil agro-climatic zone |
| `soil_ph` | `TEXT` | Typical pH range |
| `drainage` | `TEXT` | Drainage speed (Rapid, Moderate, Slow) |
| `water_retention` | `TEXT` | Moisture retention capacity |
| `annual_rainfall_mm` | `INTEGER` | Annual precipitation in millimeters |
| `major_canals` | `TEXT` | River basins & irrigation networks |
| `sand_composition` | `TEXT` | Detailed mineral & sand particle breakdown |
| `upcoming_season_summary`| `TEXT` | Regional monsoon outlook |

### 2. `soil_types` Table
Normalized agronomic catalog of all 58 distinct soil varieties found across Tamil Nadu.

| Column | Type | Description |
|---|---|---|
| `id` | `INTEGER PRIMARY KEY` | Auto-incrementing soil type ID |
| `name` | `TEXT UNIQUE NOT NULL`| Soil variety (e.g. `Delta Alluvial`, `Red Loam`) |
| `category` | `TEXT NOT NULL` | Broad taxonomy (Alluvial, Vertisol, Alfisol, Laterite, Arenosol) |
| `description` | `TEXT` | Agronomic & geological properties |
| `typical_ph_min` | `REAL` | Minimum typical pH boundary |
| `typical_ph_max` | `REAL` | Maximum typical pH boundary |
| `drainage_class` | `TEXT` | Permeability class |
| `water_holding_capacity` | `TEXT` | Water retention profile |
| `organic_matter` | `TEXT` | Natural organic content index |
| `primary_nutrients` | `TEXT` | Nutrient profile (N, P, K, Lime, Iron) |

### 3. `district_soils` Junction Table (Many-to-Many Mapping)
Maps which soil varieties occur in each district with dominance weighting.

| Column | Type | Description |
|---|---|---|
| `id` | `INTEGER PRIMARY KEY` | Primary key |
| `district_id` | `TEXT FOREIGN KEY` | References `districts(id)` |
| `soil_type_id` | `INTEGER FOREIGN KEY`| References `soil_types(id)` |
| `is_dominant` | `BOOLEAN` | `1` if primary dominant soil |
| `priority_order` | `INTEGER` | Dominance rank (1 = Primary, 2 = Secondary) |
| `coverage_estimate_pct`| `INTEGER` | Estimated geographical coverage % |

---

## 🚀 Quick Start for Developers

### 1. Initialize & Seed Database
```bash
npm run db:init
# Or directly: node server/scripts/initDb.js
```
*Pre-populates all 38 districts, 58 soil types, and 83 relational mappings into `server/db/agripulse.db` and generates `server/db/seeds.sql`.*

### 2. Run Verification Test Suite
```bash
npm run backend:test
# Or directly: node server/scripts/testBackend.js
```
*Executes all 6 integration tests covering schema validation, service queries, zone filters, and REST endpoints.*

### 3. Start REST API Server
```bash
npm run backend
# Or directly: node server/api/server.js
```
*Listens on `http://127.0.0.1:5050` with full CORS enabled.*

---

## 💻 Developer Programmatic Usage (`DistrictService`)

```javascript
import { DistrictService } from "./server/services/districtService.js";
import { getDatabase } from "./server/db/database.js";

const service = new DistrictService(getDatabase());

// 1. Get district with all its mapped soils
const thanjavur = service.getDistrictById("thanjavur");
console.log(thanjavur.name_ta); // தஞ்சாவூர்
console.log(thanjavur.soils);   // Array of mapped soil types with priority & category

// 2. Filter districts by Agro-Climatic Zone
const deltaDistricts = service.getAllDistricts({ zone: "Cauvery Delta" });

// 3. Search districts by Tamil or English name
const searchResults = service.getAllDistricts({ search: "மதுரை" });

// 4. Reverse lookup: Find all districts with Black Cotton soil
const blackSoilDistricts = service.getDistrictsBySoilType("Black");

// 5. Get aggregate statistics
const stats = service.getStatistics();
```

---

## 🌐 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Backend status, engine, and database metrics |
| `GET` | `/api/districts` | List all districts (`?zone=`, `?soilType=`, `?search=`, `?limit=`) |
| `GET` | `/api/districts/:id` | Get specific district by ID with mapped soils |
| `GET` | `/api/districts/:id/soils` | Get mapped soils for a district |
| `GET` | `/api/soils` | List all 58 master soil types (`?category=`) |
| `GET` | `/api/soils/:id` | Get soil type details & all districts having it |
| `GET` | `/api/zones` | List all agro-climatic zones and average rainfall |
| `POST` | `/api/districts` | Create a new district record |
| `PUT` | `/api/districts/:id` | Update district properties |
| `DELETE` | `/api/districts/:id` | Delete district record |

### Example Request & Response

#### Request
```bash
curl http://127.0.0.1:5050/api/districts/thanjavur
```

#### Response
```json
{
  "id": "thanjavur",
  "name": "Thanjavur",
  "name_ta": "தஞ்சாவூர்",
  "zone": "Cauvery Delta ('Rice Bowl of Tamil Nadu')",
  "zone_ta": "காவிரி டெல்டா (தமிழகத்தின் நெற்களஞ்சியம்)",
  "soil_ph": "6.5 - 7.5 (Optimal Neutral)",
  "drainage": "Moderate to Slow",
  "water_retention": "Very High",
  "annual_rainfall_mm": 1120,
  "major_canals": "Grand Anicut canal system, Vennar, Cauvery & Vadavar canals",
  "sand_composition": "15% Fine Sand, 35% Silt, 50% Heavy Clay with high organic humus",
  "upcoming_season_summary": "Active Samba paddy cultivation season; peak Cauvery canal discharge and upcoming Northeast monsoon rains.",
  "soils": [
    {
      "id": 26,
      "name": "Deep Alluvial Silt Clay",
      "category": "Alluvial Soil (Entisols/Inceptisols)",
      "typical_ph_min": 6.5,
      "typical_ph_max": 7.8,
      "drainage_class": "Moderate",
      "water_holding_capacity": "High",
      "primary_nutrients": "Rich in Potash and Lime; moderate Nitrogen and Phosphorus",
      "is_dominant": 1,
      "priority_order": 1,
      "coverage_estimate_pct": 60
    },
    {
      "id": 12,
      "name": "Cauvery Heavy Riverine Loam",
      "category": "Red Soil (Alfisols)",
      "typical_ph_min": 6.2,
      "typical_ph_max": 7.4,
      "drainage_class": "Well Drained",
      "water_holding_capacity": "Moderate",
      "primary_nutrients": "Rich in Potash and Iron; responsive to Nitrogenous and Phosphatic fertilizers",
      "is_dominant": 1,
      "priority_order": 2,
      "coverage_estimate_pct": 40
    }
  ]
}
```
