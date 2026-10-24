// Comprehensive Tamil Nadu Geo-Agronomic & Crop Dataset
// Calibrated with Tamil Nadu Agricultural University (TNAU) Agronomy Data
// 100% Offline Embedded Dataset

export const TAMIL_NADU_DISTRICTS = [
  {
    id: "ariyalur",
    name: "Ariyalur",
    zone: "Cauvery Delta & North Eastern",
    dominantSoils: ["Red Loam", "Black Clay Loam"],
    sandComposition: "35% Coarse Sand, 25% Silt, 40% Heavy Clay with high calcium/limestone substrata",
    soilPH: "7.2 - 8.1 (Slightly Alkaline)",
    drainage: "Moderate to Poor",
    waterRetention: "High",
    annualRainfallMm: 954,
    majorCanals: "Marudaiyaru & Kollidam distributaries",
    upcomingSeasonSummary: "Northeast monsoon transition; moderate showers expected with cooler nights."
  },
  {
    id: "chengalpattu",
    name: "Chengalpattu",
    zone: "North Eastern Coastal",
    dominantSoils: ["Coastal Alluvial", "Sandy Clay Loam", "Red Sandy Soil"],
    sandComposition: "50% Marine Silica Sand, 25% Clay, 25% Loam with high coastal moisture",
    soilPH: "6.8 - 7.5 (Neutral to Mildly Saline)",
    drainage: "Rapid on coastal fringe, Moderate inland",
    waterRetention: "Moderate",
    annualRainfallMm: 1200,
    majorCanals: "Palar river basin & coastal tank systems",
    upcomingSeasonSummary: "Active coastal cyclonic depressions; high humidity and intermittent heavy rains."
  },
  {
    id: "chennai",
    name: "Chennai",
    zone: "North Eastern Coastal",
    dominantSoils: ["Coastal Sand", "Alluvial Clay Loam"],
    sandComposition: "65% Fine Marine Sand, 20% Alluvium, 15% Silt",
    soilPH: "7.0 - 7.8 (Neutral)",
    drainage: "Very Rapid",
    waterRetention: "Low to Moderate",
    annualRainfallMm: 1300,
    majorCanals: "Cooum, Adyar & Buckingham canal basin",
    upcomingSeasonSummary: "Northeast monsoon peak; high humidity and storm wind vulnerability."
  },
  {
    id: "coimbatore",
    name: "Coimbatore",
    zone: "Western Zone",
    dominantSoils: ["Deep Black Cotton (Vertisols)", "Red Gravelly Loam"],
    sandComposition: "20% Sand, 25% Silt, 55% Montmorillonite Clay; deep cracking characteristics",
    soilPH: "7.5 - 8.5 (Calcareous Alkaline)",
    drainage: "Slow in Black soil, Moderate in Red gravel",
    waterRetention: "Very High in Vertisols",
    annualRainfallMm: 680,
    majorCanals: "Parambikulam Aliyar Project (PAP) & Noyyal basin",
    upcomingSeasonSummary: "Rain shadow belt; dry western winds with occasional post-monsoon showers."
  },
  {
    id: "cuddalore",
    name: "Cuddalore",
    zone: "North Eastern Cauvery Delta",
    dominantSoils: ["Riverine Alluvial", "Coastal Sand", "Red Lateritic"],
    sandComposition: "40% Deltaic River Silt, 35% Clay, 25% Fine Sand",
    soilPH: "6.5 - 7.4 (Neutral)",
    drainage: "Well Drained in Red soil, Poor in coastal flats",
    waterRetention: "High",
    annualRainfallMm: 1250,
    majorCanals: "Pennaiyar & Vellar river systems",
    upcomingSeasonSummary: "High rainfall vulnerability during Northeast monsoon; river swell risk."
  },
  {
    id: "dharmapuri",
    name: "Dharmapuri",
    zone: "North Western Zone",
    dominantSoils: ["Red Sandy Loam", "Shallow Gravelly Red Soil"],
    sandComposition: "55% Quartz Sand, 30% Loam, 15% Clay; highly porous with low organic carbon",
    soilPH: "6.5 - 7.2 (Ideal Neutral)",
    drainage: "Very Rapid",
    waterRetention: "Low to Moderate",
    annualRainfallMm: 850,
    majorCanals: "Ponnaiyar & Chinnar tributary check dams",
    upcomingSeasonSummary: "Moderate dry conditions; cooler dawn temperatures and mild winds."
  },
  {
    id: "dindigul",
    name: "Dindigul",
    zone: "Southern Zone",
    dominantSoils: ["Red Sandy Clay Loam", "Black Vertisols (Palani tract)"],
    sandComposition: "45% Weathered Feldspar Sand, 35% Red Clay, 20% Silt",
    soilPH: "6.8 - 7.6 (Neutral)",
    drainage: "Moderate to Good",
    waterRetention: "Moderate",
    annualRainfallMm: 830,
    majorCanals: "Kudaganar & Shanmuganathi irrigation",
    upcomingSeasonSummary: "Pleasant semi-arid weather; foothill mist and steady daylight."
  },
  {
    id: "erode",
    name: "Erode",
    zone: "Western Zone",
    dominantSoils: ["Red Sandy Loam", "Deep Black Cotton Soil"],
    sandComposition: "35% Coarse Sand, 30% Silt, 35% Clay; rich in potash minerals",
    soilPH: "7.0 - 8.2 (Neutral to Mild Alkaline)",
    drainage: "Moderate",
    waterRetention: "High along Bhavani river belt",
    annualRainfallMm: 710,
    majorCanals: "Bhavanisagar Dam & Lower Bhavani Project (LBP)",
    upcomingSeasonSummary: "Dry warm days with steady canal flow; low natural precipitation."
  },
  {
    id: "kallakurichi",
    name: "Kallakurichi",
    zone: "North Eastern Zone",
    dominantSoils: ["Red Loam", "Alluvial Clay Loam"],
    sandComposition: "40% Sand, 35% Loam, 25% Clay; friable topsoil ideal for tubers",
    soilPH: "6.6 - 7.4 (Optimal Neutral)",
    drainage: "Well Drained",
    waterRetention: "Moderate to High",
    annualRainfallMm: 980,
    majorCanals: "Manimuktha & Gomukhi dam channels",
    upcomingSeasonSummary: "Moderate seasonal rain; steady humidity and favorable sowing atmosphere."
  },
  {
    id: "kanchipuram",
    name: "Kanchipuram",
    zone: "North Eastern Zone",
    dominantSoils: ["Clay Loam", "Sandy Coastal Alluvial"],
    sandComposition: "30% Fine Silica Sand, 40% Sticky Clay, 30% Silt",
    soilPH: "6.7 - 7.5 (Neutral)",
    drainage: "Moderate to Slow (Susceptible to surface ponding)",
    waterRetention: "High",
    annualRainfallMm: 1180,
    majorCanals: "Vegavathi & Palar anicut channels",
    upcomingSeasonSummary: "Frequent coastal overcast; steady Northeast showers."
  },
  {
    id: "kanyakumari",
    name: "Kanyakumari",
    zone: "High Rainfall & Southern Ghats",
    dominantSoils: ["Deep Red Laterite", "Coastal Sandy Alluvial"],
    sandComposition: "30% Weathered Laterite Sand, 40% Heavy Red Iron Clay, 30% Humus Loam",
    soilPH: "5.2 - 6.2 (Acidic)",
    drainage: "Good to Rapid on slopes",
    waterRetention: "High due to intense organic humus",
    annualRainfallMm: 1450,
    majorCanals: "Pechiparai, Perunchani & Kodayar canal networks",
    upcomingSeasonSummary: "Bimodal monsoon tail-end; high moisture, humid breezes, overcast skies."
  },
  {
    id: "karur",
    name: "Karur",
    zone: "Cauvery Delta Fringe / Western",
    dominantSoils: ["Calcareous Black Cotton", "Red Sandy Soil"],
    sandComposition: "45% Coarse Sand, 20% Silt, 35% Sticky Vertisol Clay",
    soilPH: "7.6 - 8.6 (Alkaline)",
    drainage: "Rapid in red drylands, very slow in black flats",
    waterRetention: "Moderate",
    annualRainfallMm: 650,
    majorCanals: "Cauvery and Amaravathi river basins",
    upcomingSeasonSummary: "High daytime temperatures, semi-arid conditions; reliance on river releases."
  },
  {
    id: "krishnagiri",
    name: "Krishnagiri",
    zone: "North Western Zone",
    dominantSoils: ["Red Gravelly Loam", "Coarse Sandy Loam"],
    sandComposition: "60% Decomposed Granite Sand, 25% Loam, 15% Clay",
    soilPH: "6.4 - 7.2 (Neutral)",
    drainage: "Extremely Rapid; zero water stagnation risk",
    waterRetention: "Low",
    annualRainfallMm: 840,
    majorCanals: "Krishnagiri Reservoir Project (KRP)",
    upcomingSeasonSummary: "Pleasant temperate plateau weather; cool mornings and minimal rain risk."
  },
  {
    id: "madurai",
    name: "Madurai",
    zone: "Southern Zone",
    dominantSoils: ["Deep Black Clay Loam", "Vaigai Alluvial Silt", "Red Sandy Soil"],
    sandComposition: "30% Sand, 35% Silt, 35% Clay; highly nutrient-dense in Vaigai belt",
    soilPH: "7.1 - 8.0 (Neutral to Mild Alkaline)",
    drainage: "Moderate",
    waterRetention: "High",
    annualRainfallMm: 850,
    majorCanals: "Periyar-Vaigai canal command system",
    upcomingSeasonSummary: "Warm tropical days; localized convective evening thundershowers."
  },
  {
    id: "mayiladuthurai",
    name: "Mayiladuthurai",
    zone: "Cauvery Delta",
    dominantSoils: ["Deep Deltaic Alluvial Clay", "Marine Silt Loam"],
    sandComposition: "15% Fine Sand, 45% Cauvery Silt, 40% Montmorillonite Clay",
    soilPH: "6.9 - 7.8 (Neutral)",
    drainage: "Poor / Very Slow (Optimal for standing water crops)",
    waterRetention: "Exceptional / Highest in State",
    annualRainfallMm: 1280,
    majorCanals: "Cauvery, Kollidam & Vennar distributaries",
    upcomingSeasonSummary: "Peak delta rainfall window; waterlogged fields and fertile silt deposits."
  },
  {
    id: "nagapattinam",
    name: "Nagapattinam",
    zone: "Cauvery Delta Coastal",
    dominantSoils: ["Deltaic Heavy Clay", "Coastal Marine Sand"],
    sandComposition: "35% Marine Beach Sand, 35% Alluvial Clay, 30% Silt with salinity pockets",
    soilPH: "7.2 - 8.3 (Slightly Saline Coastal)",
    drainage: "Poor in delta, Rapid on beach ridges",
    waterRetention: "High inland",
    annualRainfallMm: 1350,
    majorCanals: "Tail-end Cauvery irrigation channels",
    upcomingSeasonSummary: "Intense cyclonic activity during late monsoon; high coastal spray."
  },
  {
    id: "namakkal",
    name: "Namakkal",
    zone: "North Western Zone",
    dominantSoils: ["Red Sandy Loam", "Shallow Black Vertisols"],
    sandComposition: "50% Quartz Sand, 30% Ferruginous Loam, 20% Clay",
    soilPH: "6.7 - 7.4 (Neutral)",
    drainage: "Good to Rapid",
    waterRetention: "Moderate",
    annualRainfallMm: 780,
    majorCanals: "Raja Canal & Mohanur Cauvery lift irrigation",
    upcomingSeasonSummary: "Dry sunny climate; low relative humidity and steady wind speed."
  },
  {
    id: "nilgiris",
    name: "Nilgiris",
    zone: "High Altitude Hill Zone",
    dominantSoils: ["Acidic Peaty Forest Laterite", "Humus Rich Loam"],
    sandComposition: "20% Weathered Rock Sand, 30% Silt, 50% Organic Humus & Clay",
    soilPH: "4.5 - 5.5 (Strongly Acidic)",
    drainage: "Rapid down slope; high erosion risk if un-terraced",
    waterRetention: "High in undisturbed forest soils",
    annualRainfallMm: 1920,
    majorCanals: "Hill springs, Moyar & Pykara mountain streams",
    upcomingSeasonSummary: "Chilly mist, dense fog, temperatures between 10°C - 20°C."
  },
  {
    id: "perambalur",
    name: "Perambalur",
    zone: "Cauvery Delta Fringe",
    dominantSoils: ["Deep Black Cotton Soil", "Red Sandy Loam"],
    sandComposition: "25% Coarse Sand, 25% Silt, 50% Heavy Montmorillonite Clay",
    soilPH: "7.8 - 8.4 (Alkaline Vertisols)",
    drainage: "Slow; cracks severely in summer dry spells",
    waterRetention: "Very High",
    annualRainfallMm: 860,
    majorCanals: "Chinnar reservoir channels",
    upcomingSeasonSummary: "Moderate dry season; high solar irradiance and clear days."
  },
  {
    id: "pudukkottai",
    name: "Pudukkottai",
    zone: "Southern Zone",
    dominantSoils: ["Red Lateritic Gravel", "Sandy Clay Loam"],
    sandComposition: "55% Ferruginous Sand & Iron Gravel, 25% Clay, 20% Silt",
    soilPH: "6.2 - 7.0 (Slightly Acidic to Neutral)",
    drainage: "Rapid; hard pan formed at 40cm depth",
    waterRetention: "Low to Moderate",
    annualRainfallMm: 890,
    majorCanals: "Agniyar river & historic tank cascade systems",
    upcomingSeasonSummary: "Mild winter transition; gentle breeze and moderate night chill."
  },
  {
    id: "ramanathapuram",
    name: "Ramanathapuram",
    zone: "Southern Coastal Dry Zone",
    dominantSoils: ["Coastal Marine Sand", "Saline Alluvial Black Clay"],
    sandComposition: "60% Marine Sand, 25% Saline Clay, 15% Silt; high Electrical Conductivity (EC)",
    soilPH: "7.8 - 8.8 (Saline Alkaline)",
    drainage: "Rapid in sand, Impeded in saline pans",
    waterRetention: "Low in sand",
    annualRainfallMm: 820,
    majorCanals: "Gundar river basin & tail-end Vaigai",
    upcomingSeasonSummary: "Strong coastal sea breeze; low rainfall outside short cyclonic bursts."
  },
  {
    id: "ranipet",
    name: "Ranipet",
    zone: "North Eastern Zone",
    dominantSoils: ["Sandy Loam", "Hard Clay Loam"],
    sandComposition: "45% Palar River Sand, 35% Loam, 20% Hard Clay",
    soilPH: "6.8 - 7.6 (Neutral)",
    drainage: "Well Drained",
    waterRetention: "Moderate",
    annualRainfallMm: 1040,
    majorCanals: "Palar river basin anicuts",
    upcomingSeasonSummary: "Cloudy mornings, comfortable days with scattered precipitation."
  },
  {
    id: "salem",
    name: "Salem",
    zone: "North Western Zone",
    dominantSoils: ["Red Sandy Loam", "Calcareous Black Soil"],
    sandComposition: "45% Magnesite-rich Sand, 30% Silt, 25% Clay; high mineral content",
    soilPH: "7.0 - 7.9 (Neutral to Mild Alkaline)",
    drainage: "Good",
    waterRetention: "Moderate to High",
    annualRainfallMm: 920,
    majorCanals: "Mettur Dam canal system & Sarabanga basin",
    upcomingSeasonSummary: "Pleasant inland climate; mild sunshine with low humidity."
  },
  {
    id: "sivaganga",
    name: "Sivaganga",
    zone: "Southern Zone",
    dominantSoils: ["Lateritic Red Gravelly Soil", "Sandy Clay Loam"],
    sandComposition: "50% Quartz & Laterite Sand, 30% Red Clay, 20% Silt",
    soilPH: "6.4 - 7.2 (Neutral)",
    drainage: "Moderate to Rapid",
    waterRetention: "Low to Moderate",
    annualRainfallMm: 900,
    majorCanals: "Manimuthar & Vaigai sub-basins",
    upcomingSeasonSummary: "Semi-arid mild weather; clear visibility and steady dry air."
  },
  {
    id: "tenkasi",
    name: "Tenkasi",
    zone: "Southern Western Ghats Foothills",
    dominantSoils: ["Red Loam", "Black Vertisols", "Alluvial Foothill Loam"],
    sandComposition: "35% Mountain Gravel Sand, 35% Organic Loam, 30% Clay",
    soilPH: "6.5 - 7.3 (Ideal Neutral)",
    drainage: "Excellent",
    waterRetention: "High",
    annualRainfallMm: 1100,
    majorCanals: "Chittar, Gundar & Karuppanathi dams",
    upcomingSeasonSummary: "Cool mountain breezes ('Saaral' weather), lush air humidity."
  },
  {
    id: "thanjavur",
    name: "Thanjavur",
    zone: "Cauvery Delta ('Rice Bowl of Tamil Nadu')",
    dominantSoils: ["Deep Alluvial Silt Clay", "Cauvery Heavy Riverine Loam"],
    sandComposition: "15% Fine Sand, 45% River Silt, 40% Heavy Clay; impermeable subsoil",
    soilPH: "6.8 - 7.6 (Neutral)",
    drainage: "Slow (Engineered for puddle cultivation)",
    waterRetention: "Highest / Exceptional",
    annualRainfallMm: 1120,
    majorCanals: "Grand Anicut (Kallanai), Cauvery & Vennar networks",
    upcomingSeasonSummary: "Prime Samba/Thaladi season; high ambient humidity, optimal water availability."
  },
  {
    id: "theni",
    name: "Theni",
    zone: "Southern Western Ghats Valley",
    dominantSoils: ["Rich Alluvial Valley Loam", "Porous Red Soil"],
    sandComposition: "30% Sand, 40% Nutrient Loam, 30% Clay; highly fertile volcanic origin",
    soilPH: "6.6 - 7.4 (Prime Neutral)",
    drainage: "Well Drained",
    waterRetention: "High",
    annualRainfallMm: 840,
    majorCanals: "Vaigai Dam, Manjalar & Shanmuganathi rivers",
    upcomingSeasonSummary: "Mild microclimate; sheltered by Western Ghats with balanced warmth."
  },
  {
    id: "thoothukudi",
    name: "Thoothukudi",
    zone: "Southern Coastal Zone",
    dominantSoils: ["Calcareous Black Cotton", "Coastal Sandy Loam", "Red Teri Sand"],
    sandComposition: "40% Coastal Sand, 35% Vertisol Clay, 25% Saline Silt",
    soilPH: "7.7 - 8.6 (Alkaline)",
    drainage: "Rapid in coastal dunes, very slow in inland black flats",
    waterRetention: "High in black soil",
    annualRainfallMm: 660,
    majorCanals: "Tamirabarani river basin anicuts",
    upcomingSeasonSummary: "Warm coastal climate; high evaporation rate and strong sea breezes."
  },
  {
    id: "tiruchirappalli",
    name: "Tiruchirappalli",
    zone: "Cauvery Delta Upper Basin",
    dominantSoils: ["Cauvery Alluvial Loam", "Red Gravelly Sandy Soil"],
    sandComposition: "35% River Sand, 35% Silt, 30% Clay along river; sandy drylands elsewhere",
    soilPH: "7.0 - 7.9 (Neutral)",
    drainage: "Moderate to Good",
    waterRetention: "High in delta belt",
    annualRainfallMm: 820,
    majorCanals: "Cauvery, Kollidam & Uyyakondan canal channels",
    upcomingSeasonSummary: "Warm sunny days; steady canal flow from Mettur releases."
  },
  {
    id: "tirunelveli",
    name: "Tirunelveli",
    zone: "Southern Tamirabarani Basin",
    dominantSoils: ["Deep Black Cotton Soil", "Tamirabarani Alluvial Loam", "Red Sandy Soil"],
    sandComposition: "30% Sand, 35% Silt, 35% Clay; perennial river alluvial deposits",
    soilPH: "7.2 - 8.0 (Neutral)",
    drainage: "Good along river, Slow in black soil tracts",
    waterRetention: "High",
    annualRainfallMm: 880,
    majorCanals: "Tamirabarani perennial canal network",
    upcomingSeasonSummary: "Perennial river flow; pleasant breeze and steady cultivation conditions."
  },
  {
    id: "tirupathur",
    name: "Tirupathur",
    zone: "North Western Zone",
    dominantSoils: ["Red Sandy Loam", "Weathered Granite Soil"],
    sandComposition: "55% Quartz Sand, 30% Loam, 15% Clay",
    soilPH: "6.5 - 7.3 (Neutral)",
    drainage: "Very Rapid",
    waterRetention: "Low to Moderate",
    annualRainfallMm: 940,
    majorCanals: "Palar sub-basin channels",
    upcomingSeasonSummary: "Pleasant semi-dry climate; cool nights and dry soil surface."
  },
  {
    id: "tiruppur",
    name: "Tiruppur",
    zone: "Western Zone",
    dominantSoils: ["Red Gravelly Loam", "Shallow Black Vertisols with Calcareous Nodules"],
    sandComposition: "40% Coarse Sand, 20% Silt, 40% Heavy Clay with lime (Kankar) nodules",
    soilPH: "7.8 - 8.5 (Alkaline)",
    drainage: "Moderate",
    waterRetention: "Moderate",
    annualRainfallMm: 600,
    majorCanals: "Amaravathi & PAP canal distributaries",
    upcomingSeasonSummary: "Semi-arid rain-shadow belt; dry winds and high solar intensity."
  },
  {
    id: "tiruvallur",
    name: "Tiruvallur",
    zone: "North Eastern Coastal",
    dominantSoils: ["Coastal Sandy Alluvium", "Heavy Clay Loam"],
    sandComposition: "45% Coarse River/Coastal Sand, 30% Clay, 25% Silt",
    soilPH: "6.8 - 7.7 (Neutral)",
    drainage: "Moderate",
    waterRetention: "Moderate to High",
    annualRainfallMm: 1100,
    majorCanals: "Kosasthalaiyar, Araniyar & Poondi reservoir channels",
    upcomingSeasonSummary: "Humid coastal weather; seasonal showers and mild morning mist."
  },
  {
    id: "tiruvannamalai",
    name: "Tiruvannamalai",
    zone: "North Eastern Zone",
    dominantSoils: ["Red Sandy Loam", "Clayey Subsoil Red Loam"],
    sandComposition: "50% Weathered Granite Sand, 30% Porous Loam, 20% Clay",
    soilPH: "6.5 - 7.4 (Neutral)",
    drainage: "Rapid; ideal for taproot crops like groundnut",
    waterRetention: "Moderate",
    annualRainfallMm: 1050,
    majorCanals: "Sathanur Dam canal command",
    upcomingSeasonSummary: "Clear sunny days, moderate relative humidity, pleasant night drop."
  },
  {
    id: "tiruvarur",
    name: "Tiruvarur",
    zone: "Cauvery Delta Heart",
    dominantSoils: ["Heavy Riverine Alluvial Clay", "Deltaic Silt"],
    sandComposition: "10% Fine Sand, 45% River Silt, 45% Dense Montmorillonite Clay",
    soilPH: "7.0 - 7.7 (Neutral)",
    drainage: "Extremely Slow / Impermeable",
    waterRetention: "Highest in Tamil Nadu",
    annualRainfallMm: 1260,
    majorCanals: "Vennar, Vettar & Kudamurutti networks",
    upcomingSeasonSummary: "Peak delta water availability; high cloud cover and lush conditions."
  },
  {
    id: "vellore",
    name: "Vellore",
    zone: "North Eastern Zone",
    dominantSoils: ["Red Sandy Loam", "Clay Loam"],
    sandComposition: "45% Palar Coarse Sand, 35% Red Loam, 20% Clay",
    soilPH: "6.8 - 7.6 (Neutral)",
    drainage: "Good to Rapid",
    waterRetention: "Moderate",
    annualRainfallMm: 980,
    majorCanals: "Palar river basin anicuts",
    upcomingSeasonSummary: "Dry warm days with clear skies; low disease sporulation pressure."
  },
  {
    id: "viluppuram",
    name: "Viluppuram",
    zone: "North Eastern Zone",
    dominantSoils: ["Deep Red Loam", "Black Clay", "Alluvial Sandy Loam"],
    sandComposition: "35% Sand, 35% Loam, 30% Clay; highly balanced agricultural soil",
    soilPH: "6.7 - 7.5 (Optimal Neutral)",
    drainage: "Well Drained",
    waterRetention: "High",
    annualRainfallMm: 1060,
    majorCanals: "Gingee & Sankaraparani river basins",
    upcomingSeasonSummary: "Steady post-monsoon climate; favorable soil moisture retention."
  },
  {
    id: "virudhunagar",
    name: "Virudhunagar",
    zone: "Southern Dry Zone",
    dominantSoils: ["Deep Black Cotton Soil", "Red Sandy Loam"],
    sandComposition: "25% Coarse Sand, 20% Silt, 55% Cracking Vertisol Clay",
    soilPH: "7.8 - 8.5 (Alkaline Vertisols)",
    drainage: "Slow; excellent deep moisture preservation during dry weather",
    waterRetention: "Very High in black soils",
    annualRainfallMm: 740,
    majorCanals: "Kullursandai & Vembakottai reservoirs",
    upcomingSeasonSummary: "Warm semi-arid climate; low precipitation, high solar hours."
  }
];

export const TAMIL_NADU_CROPS = [
  {
    id: "paddy",
    name: "Paddy (Rice)",
    tamilName: "நெல்",
    emoji: "🌾",
    popularVarieties: "Ponni, ADT 43, CR 1009, CO 51, ASD 16",
    durationDays: "115 – 135 Days",
    durationDaysNum: 125,
    idealSoils: ["Deep Deltaic Alluvial Clay", "Heavy Clay Loam", "River Silt Loam"],
    unfavorableSoils: ["Coastal Marine Sand", "Shallow Gravelly Red Soil", "Acidic Peaty Forest Laterite"],
    waterRequiredLitersPerAcre: 4200000,
    waterRequiredMm: 1200,
    irrigationRounds: "Continuous shallow ponding (2.5 - 5.0 cm) with periodic aeration",
    optimalTempC: "22°C – 34°C",
    optimalMoisturePct: "65% – 85%",
    soilSuitabilityNotes: "Requires high clay content (>35%) to form a puddled hardpan that prevents vertical percolation of standing water. Coarse sandy soils cause severe nutrient leaching and 3x water loss.",
    diseases: [
      {
        name: "Blast (Magnaporthe oryzae)",
        tamilName: "குலை நோய்",
        symptoms: "Spindle-shaped diamond lesions on leaf blades with ashy centers and dark reddish-brown margins. Neck rot causes panicles to break and turn white/empty.",
        chemicalTreatment: "Spray Tricyclazole 75% WP @ 120 g/acre OR Isoprothiolane 40% EC @ 300 ml/acre in 200 L water at first sight of leaf lesions.",
        organicTreatment: "Foliar spray of Pseudomonas fluorescens @ 1 kg/acre (or 2.5 g/L) + Neem oil 3% (30 ml/L) mixed with soap nut solution.",
        prevention: "Avoid excessive Nitrogen fertilizer; maintain balanced Potash (K) application to strengthen silica cell walls."
      },
      {
        name: "Bacterial Leaf Blight (BLB)",
        tamilName: "பாக்டீரியா இலைக்கருகல்",
        symptoms: "Water-soaked lesions beginning from leaf margins and tips, turning wavy, dull yellowish-white stripes down the blade with bacterial bacterial ooze beads at dawn.",
        chemicalTreatment: "Spray Plantomycin (Streptomycin sulphate 90% + Tetracycline 10%) @ 120 g + Copper Oxychloride 50% WP @ 500 g/acre in 200 L water.",
        organicTreatment: "Foliar spray with fresh Cow Dung supernatant (20 kg fresh dung stirred in 100 L water, filtered through muslin cloth).",
        prevention: "Drain field immediately when symptoms appear; withhold top dressing of synthetic Urea."
      },
      {
        name: "Brown Planthopper (BPH) & Stem Borer",
        tamilName: "புகையான் & தண்டு துளைப்பான்",
        symptoms: "Circular drying patches of yellowing crop termed 'hopperburn' at the base. Stem borer causes 'dead hearts' in vegetative stage and 'white ears' at heading.",
        chemicalTreatment: "Apply Pymetrozine 50% WDG @ 120 g/acre OR Chlorantraniliprole 18.5% SC @ 60 ml/acre directed towards the crop base.",
        organicTreatment: "Maintain 30 cm alleyways ('Paarusal') every 2.5 meters for light penetration; install 5 Pheromone traps per acre.",
        prevention: "Avoid indiscriminate synthetic pyrethroid sprays which kill natural predator spiders (Lycosa pseudoannulata)."
      }
    ]
  },
  {
    id: "sugarcane",
    name: "Sugarcane",
    tamilName: "கரும்பு",
    emoji: "🎋",
    popularVarieties: "Co 86032, CoC 24, Co 0212, Co 11015",
    durationDays: "300 – 365 Days",
    durationDaysNum: 330,
    idealSoils: ["Deep Loamy Alluvium", "Well-Drained Red Loam", "Fertile Clay Loam"],
    unfavorableSoils: ["Saline Coastal Sand", "Shallow Rocky Red Gravel", "Acidic Peaty Forest Laterite"],
    waterRequiredLitersPerAcre: 7200000,
    waterRequiredMm: 2000,
    irrigationRounds: "30 to 36 irrigations throughout the 12-month lifecycle; drip fertigation recommended",
    optimalTempC: "25°C – 38°C",
    optimalMoisturePct: "50% – 70%",
    soilSuitabilityNotes: "Demands deep soil (>90 cm) with unrestricted root penetration and excellent water retention without water stagnation. Heavy cracking clay or well-drained river loam yields maximum sucrose recovery.",
    diseases: [
      {
        name: "Red Rot (Colletotrichum falcatum)",
        tamilName: "செவ்வழுகல் நோய்",
        symptoms: "Discoloration and drooping of third and fourth crown leaves. Longitudinal splitting reveals blood-red internal pith tissues interrupted by distinct white cross-bands and sour alcoholic smell.",
        chemicalTreatment: "Pre-planting sett treatment with Carbendazim 50% WP @ 2 g/L water for 20 minutes; soil drenching around infected stools with Copper Oxychloride @ 2.5 g/L.",
        organicTreatment: "Sett treatment with Trichoderma viride @ 10 g/L water; enrich soil with 2.5 tons of Farmyard Manure (FYM) fortified with 2.5 kg Trichoderma per acre.",
        prevention: "Plant disease-free tissue-cultured or breeder setts; adopt wider row spacing (120 cm) and avoid flood irrigation from infected plots."
      },
      {
        name: "Early Shoot Borer (Chilo infuscatellus)",
        tamilName: "இளம் குருத்து துளைப்பான்",
        symptoms: "Dead heart formation in 1 to 3-month-old shoots which can be pulled out easily and emits a foul rotting odor at the severed base.",
        chemicalTreatment: "Soil application of Chlorantraniliprole 0.4% Granules @ 7.5 kg/acre mixed with sand at 30 days after planting.",
        organicTreatment: "Trash mulching up to 10 cm thickness along rows within 3 days of planting; release egg parasitoid Trichogramma chilonis @ 2.5 cc/acre.",
        prevention: "Light earthing-up at 30th and 60th day after planting to prevent oviposition near shoot base."
      }
    ]
  },
  {
    id: "cotton",
    name: "Cotton",
    tamilName: "பருத்தி",
    emoji: "☁️",
    popularVarieties: "MCU 5, SVPR 2, Surabhi, Bunny Bt, RCH 2",
    durationDays: "140 – 165 Days",
    durationDaysNum: 150,
    idealSoils: ["Deep Black Cotton (Vertisols)", "Red Loam with Clay Subsoil"],
    unfavorableSoils: ["Light Marine Sand", "Waterlogged Cauvery Delta Alluvial Clay", "Acidic Peaty Forest Laterite"],
    waterRequiredLitersPerAcre: 2400000,
    waterRequiredMm: 700,
    irrigationRounds: "6 to 8 light irrigations at square formation, flowering, and boll development stages",
    optimalTempC: "24°C – 35°C",
    optimalMoisturePct: "40% – 60%",
    soilSuitabilityNotes: "Vertisols (Black cotton soil) are uniquely suited due to high montmorillonite clay content that locks moisture deep in the profile during dry boll maturation, while red loam allows deep taproot development.",
    diseases: [
      {
        name: "Bollworm Complex (Helicoverpa & Spodoptera)",
        tamilName: "காய்ப்புழு தாக்குதல்",
        symptoms: "Flared squares (bracts open out prematurely), bore holes on developing green bolls plugged with chewed excreta, premature boll dropping.",
        chemicalTreatment: "Spray Emamectin Benzoate 5% SG @ 88 g/acre OR Spinosad 45% SC @ 75 ml/acre in 200 L water during evening hours.",
        organicTreatment: "Erect 5 Pheromone traps per acre; spray Helicoverpa Nuclear Polyhedrosis Virus (H-NPV) @ 250 LE/acre + 5% Neem Seed Kernel Extract (NSKE).",
        prevention: "Plant Castor and Marigold as border and trap crops; handpick grown larvae in early mornings."
      },
      {
        name: "Root Rot & Wilt (Rhizoctonia & Fusarium)",
        tamilName: "வேரழுகல் மற்றும் வாடல்",
        symptoms: "Sudden drooping and yellowing of foliage; root cortex sloughs off leaving shredded fibrous vascular strands.",
        chemicalTreatment: "Spot drenching around affected plants with Copper Oxychloride 50% WP @ 2.5 g/L OR Carbendazim @ 1 g/L water.",
        organicTreatment: "Seed treatment with Pseudomonas fluorescens @ 10 g/kg seed followed by soil application with bio-fertilizers.",
        prevention: "Avoid water stagnation in black soils; ensure raised bed planting or ridge-and-furrow method."
      }
    ]
  },
  {
    id: "banana",
    name: "Banana",
    tamilName: "வாழை",
    emoji: "🍌",
    popularVarieties: "Grand Naine (G9), Nendran, Poovan, Rasthali, Red Banana",
    durationDays: "330 – 365 Days",
    durationDaysNum: 345,
    idealSoils: ["Deep Alluvial Valley Loam", "Fertile Clay Loam", "Rich River Silt"],
    unfavorableSoils: ["Coastal Marine Sand", "Shallow Rocky Red Gravel", "Alkaline Calcareous Black Soil"],
    waterRequiredLitersPerAcre: 6500000,
    waterRequiredMm: 1800,
    irrigationRounds: "Drip irrigation at 15 to 20 Liters per plant per day; flood every 4-6 days",
    optimalTempC: "20°C – 32°C",
    optimalMoisturePct: "60% – 75%",
    soilSuitabilityNotes: "Requires deep (>100 cm), humus-rich, friable loam with neutral pH (6.5 - 7.5). Susceptible to salt toxicity and poor aeration; cannot tolerate water stagnation for over 48 hours.",
    diseases: [
      {
        name: "Panama Wilt (Fusarium oxysporum f. sp. cubense)",
        tamilName: "பனாமா வாடல் நோய்",
        symptoms: "Yellowing of lower leaf margins progressing inward, followed by petiole buckling and hanging skirt-like around pseudostem. Longitudinal split at pseudostem base.",
        chemicalTreatment: "Corm injection with 3 ml of 2% Carbendazim solution into a 45° downward hole made 45 cm above ground.",
        organicTreatment: "Soil application of Trichoderma viride @ 25 g per plant along with 5 kg well-rotted FYM and 500 g neem cake at planting.",
        prevention: "Plant tissue-cultured virus/fungus-free plantlets; avoid planting suckers from previously infected fields."
      },
      {
        name: "Sigatoka Leaf Spot (Mycosphaerella musicola)",
        tamilName: "சிகடோகா இலைப்புள்ளி நோய்",
        symptoms: "Spindle-shaped reddish-brown streaks running parallel to leaf veins, coalescing into large dark brown necrotic patches with grey centers.",
        chemicalTreatment: "Spray Propiconazole 25% EC @ 200 ml/acre OR Azoxystrobin 23% SC @ 200 ml/acre mixed with 1 L mineral spray oil in 200 L water.",
        organicTreatment: "Foliar spray with Pseudomonas fluorescens @ 5 g/L mixed with 1% sticker solution; prune and burn severely dried leaves.",
        prevention: "Improve drainage; maintain adequate plant spacing to allow maximum sunlight and air circulation."
      }
    ]
  },
  {
    id: "groundnut",
    name: "Groundnut (Peanut)",
    tamilName: "நிலக்கடலை",
    emoji: "🥜",
    popularVarieties: "TMV 7, TMV 13, VRI 2, VRI 8, Dharani, Kadiri 6",
    durationDays: "100 – 115 Days",
    durationDaysNum: 105,
    idealSoils: ["Well-Drained Red Sandy Loam", "Light Friable Alluvial Loam"],
    unfavorableSoils: ["Heavy Riverine Alluvial Clay", "Cracking Vertisols", "Saline Coastal Sand"],
    waterRequiredLitersPerAcre: 1800000,
    waterRequiredMm: 500,
    irrigationRounds: "4 to 6 critical irrigations: Flowering (25 DAS), Peg penetration (40 DAS), Pod development (60 DAS)",
    optimalTempC: "22°C – 32°C",
    optimalMoisturePct: "45% – 60%",
    soilSuitabilityNotes: "Absolute requirement for porous, loose, friable sandy loam. Heavy clay soils harden and prevent the gynophores (pegs) from penetrating the ground, leading to 80% loss in pod yield.",
    diseases: [
      {
        name: "Tikka Leaf Spot (Cercospora personata)",
        tamilName: "டிக்கா இலைப்புள்ளி நோய்",
        symptoms: "Numerous small, circular, dark brown to black necrotic lesions on both leaf surfaces surrounded by a distinct yellow chlorotic halo. Severe premature defoliation.",
        chemicalTreatment: "Spray Mancozeb 75% WP @ 400 g/acre OR Tebuconazole 25.9% EC @ 300 ml/acre in 200 L water at 45 and 60 days after sowing.",
        organicTreatment: "Spray 5% Neem Seed Kernel Extract (NSKE) OR 3% fermented sour buttermilk solution (30 ml/L water) at 10-day intervals.",
        prevention: "Ensure seed treatment with Carbendazim @ 2 g/kg kernel; burn crop residues after harvest."
      },
      {
        name: "Collar Rot / Stem Rot (Sclerotium rolfsii)",
        tamilName: "கழுத்தழுகல் நோய்",
        symptoms: "Rapid wilting of entire plant; white fan-shaped fungal mycelial threads covered with mustard-seed-like brown sclerotial bodies at the soil collar.",
        chemicalTreatment: "Spot drenching around collar zone with Hexaconazole 5% SC @ 2 ml/L OR Saaf (Mancozeb + Carbendazim) @ 2 g/L water.",
        organicTreatment: "Seed dressing with Trichoderma harzianum @ 4 g/kg seed + soil broadcasting of 100 kg neem cake per acre.",
        prevention: "Avoid deep sowing; ensure seeds are placed not more than 4 cm deep in loose, warm soil."
      }
    ]
  },
  {
    id: "maize",
    name: "Maize (Corn)",
    tamilName: "மக்காச்சோளம்",
    emoji: "🌽",
    popularVarieties: "CO 6, COH(M) 8, Pioneer 3396, NK 6240",
    durationDays: "95 – 110 Days",
    durationDaysNum: 102,
    idealSoils: ["Well-Drained Loam", "Fertile Red Sandy Loam", "Deep Black Silt Loam"],
    unfavorableSoils: ["Saline Marine Sand", "Impermeable Waterlogged Clay", "Acidic Peaty Forest Laterite"],
    waterRequiredLitersPerAcre: 1950000,
    waterRequiredMm: 550,
    irrigationRounds: "5 to 6 irrigations at knee-high, tasseling, silking, and grain filling stages",
    optimalTempC: "20°C – 33°C",
    optimalMoisturePct: "50% – 65%",
    soilSuitabilityNotes: "Prefers deep, rich, organic-matter-abundant loams with neutral pH (6.5 - 7.5). It is sensitive to soil salinity and cannot withstand root waterlogging for more than 24 hours.",
    diseases: [
      {
        name: "Fall Armyworm (Spodoptera frugiperda)",
        tamilName: "படைப்புழு தாக்குதல்",
        symptoms: "Elongated ragged pinhole feeding tears on central whorl leaves with copious coarse sawdust-like larval fecal pellets accumulated inside the leaf funnel.",
        chemicalTreatment: "Whorl application of Chlorantraniliprole 18.5% SC @ 80 ml/acre OR Spinetoram 11.7% SC @ 100 ml/acre using a knapsack sprayer directed into whorls.",
        organicTreatment: "Apply dry sand mixed with neem cake powder (9:1 ratio) directly into the central plant whorl; release egg parasitoid Telenomus remus.",
        prevention: "Timely uniform planting within a contiguous block; avoid staggered sowing in the same village cluster."
      },
      {
        name: "Turcicum Leaf Blight (Exserohilum turcicum)",
        tamilName: "இலைக்கருகல் நோய்",
        symptoms: "Large, long, elliptical boat-shaped greyish-green to tan lesions on lower leaves progressing up the canopy during humid periods.",
        chemicalTreatment: "Foliar spray with Mancozeb 75% WP @ 400 g/acre OR Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 200 ml/acre.",
        organicTreatment: "Spray Pseudomonas fluorescens @ 10 g/L water; improve inter-row air circulation.",
        prevention: "Grow resistant TNAU hybrids such as CO 6 or COH(M) 8; eliminate collateral grass weeds."
      }
    ]
  },
  {
    id: "blackgram",
    name: "Black Gram (Urad)",
    tamilName: "உளுந்து",
    emoji: "🫘",
    popularVarieties: "VBN 4, VBN 6, VBN 8, ADT 5, MDU 1",
    durationDays: "65 – 75 Days",
    durationDaysNum: 70,
    idealSoils: ["Cauvery Delta Rice Fallow Clay", "Black Loam", "Red Sandy Loam"],
    unfavorableSoils: ["Acidic Peaty Forest Laterite", "Saline Coastal Marine Sand"],
    waterRequiredLitersPerAcre: 900000,
    waterRequiredMm: 270,
    irrigationRounds: "1 to 2 irrigations (often grown purely on residual soil moisture in rice fallows)",
    optimalTempC: "25°C – 35°C",
    optimalMoisturePct: "40% – 55%",
    soilSuitabilityNotes: "Thrives in residual moisture of heavy delta vertisols or friable red loams. Excellent nitrogen fixer that enhances soil health through Rhizobium root nodules.",
    diseases: [
      {
        name: "Yellow Mosaic Virus (YMV)",
        tamilName: "மஞ்சள் தேமல் நோய்",
        symptoms: "Alternating bright yellow and dark green mosaic patches on leaves, leaf size reduction, stunted growth, and production of few distorted small pods.",
        chemicalTreatment: "Control insect vector (Whitefly - Bemisia tabaci) by spraying Thiamethoxam 25% WG @ 40 g/acre OR Acetamiprid 20% SP @ 50 g/acre in 150 L water.",
        organicTreatment: "Install 12 Yellow Sticky Traps per acre; spray 5% Neem Seed Kernel Extract (NSKE) at weekly intervals.",
        prevention: "Select certified YMV-resistant cultivars such as VBN 8 or VBN(Bg) 11; rogue out infected plants immediately."
      },
      {
        name: "Root Rot & Powdery Mildew",
        tamilName: "சாம்பல் நோய்",
        symptoms: "White powdery talcum-like superficial fungal growth covering upper leaf surface, causing premature leaf yellowing and shedding.",
        chemicalTreatment: "Foliar spray of Wettable Sulphur 80% WP @ 500 g/acre OR Hexaconazole 5% SC @ 200 ml/acre.",
        organicTreatment: "Spray 10% cow milk spray (100 ml raw milk in 900 ml water) during sunny morning hours.",
        prevention: "Avoid dense crop population; maintain clean bunds free from weed hosts."
      }
    ]
  },
  {
    id: "chilli",
    name: "Chilli",
    tamilName: "மிளகாய்",
    emoji: "🌶️",
    popularVarieties: "K 1, K 2, PLR 1, CO 4, Ramanathapuram Mundu",
    durationDays: "140 – 160 Days",
    durationDaysNum: 150,
    idealSoils: ["Well-Drained Red Sandy Loam", "Deep Black Cotton Soil", "River Silt Loam"],
    unfavorableSoils: ["Heavy Waterlogged Alluvial Clay", "Saline Marine Sand"],
    waterRequiredLitersPerAcre: 2300000,
    waterRequiredMm: 650,
    irrigationRounds: "8 to 10 light irrigations; sensitive to both extreme drought and root waterlogging",
    optimalTempC: "20°C – 32°C",
    optimalMoisturePct: "45% – 60%",
    soilSuitabilityNotes: "Demands well-aerated, porous soil with rich organic matter. Standing water for even 24 hours triggers severe root asphyxiation and sudden wilt.",
    diseases: [
      {
        name: "Chilli Murda / Leaf Curl Virus & Thrips",
        tamilName: "இலை சுருட்டு மற்றும் இலைப்பேன்",
        symptoms: "Upward curling of leaves, crinkling, boat-shaped cupping with bronze sheen on underside caused by thrips; downward curling caused by mites.",
        chemicalTreatment: "Spray Fipronil 5% SC @ 300 ml/acre for thrips OR Diafenthiuron 50% WP @ 240 g/acre for broad mites.",
        organicTreatment: "Install 15 Blue Sticky Traps per acre for thrips; spray Pongamia oil 3% mixed with soap nut solution.",
        prevention: "Barrier cropping with 3 rows of Maize or Sorghum around chilli plot to block windborne insect vectors."
      },
      {
        name: "Anthracnose / Dieback & Fruit Rot (Colletotrichum capsici)",
        tamilName: "கனி அழுகல் நோய்",
        symptoms: "Circular sunken black spots with concentric rings of salmon-pink acervuli spores on ripe red fruits; shoot tips dry from top downwards (die-back).",
        chemicalTreatment: "Spray Azoxystrobin 23% SC @ 200 ml/acre OR Copper Oxychloride 50% WP @ 500 g/acre at early flowering and fruit set.",
        organicTreatment: "Seed treatment with Trichoderma viride @ 4 g/kg seed; spray Pseudomonas fluorescens @ 5 g/L.",
        prevention: "Harvest ripe fruits promptly; remove and destroy diseased mummified berries from the field."
      }
    ]
  },
  {
    id: "turmeric",
    name: "Turmeric",
    tamilName: "மஞ்சள்",
    emoji: "🟡",
    popularVarieties: "BSR 1, BSR 2, Erode Local, Alleppey, IISR Pratibha",
    durationDays: "240 – 270 Days",
    durationDaysNum: 255,
    idealSoils: ["Deep Friable Red Sandy Clay Loam", "River Silt Loam", "Bhavani Belt Alluvium"],
    unfavorableSoils: ["Shallow Rocky Gravel", "Impermeable Deltaic Silt Clay", "Saline Coastal Sand"],
    waterRequiredLitersPerAcre: 4600000,
    waterRequiredMm: 1300,
    irrigationRounds: "15 to 20 irrigations at 7 to 10-day intervals, or daily precision drip fertigation",
    optimalTempC: "20°C – 35°C",
    optimalMoisturePct: "55% – 70%",
    soilSuitabilityNotes: "Requires loose, well-tilled, highly friable soil rich in humus to allow unrestricted rhizome expansion. Heavy clay causes deformed, stunted rhizomes and rotting.",
    diseases: [
      {
        name: "Rhizome Rot (Pythium aphanidermatum)",
        tamilName: "கிழங்கு அழுகல் நோய்",
        symptoms: "Yellowing of leaves starting from margins of lower blades, basal pseudostem softens, turns dark water-soaked and pulls out effortlessly with decaying foul-smelling rhizome.",
        chemicalTreatment: "Rhizome treatment with Metalaxyl 35% WS @ 3 g/kg before planting; soil drenching with Metalaxyl-Mancozeb (Ridomil MZ) @ 2.5 g/L.",
        organicTreatment: "Soil application of Trichoderma harzianum @ 2.5 kg mixed in 100 kg farmyard manure and 25 kg neem cake per acre at planting and earthing-up.",
        prevention: "Ensure raised beds with 30 cm drainage channels; avoid fields with history of waterlogging."
      },
      {
        name: "Leaf Spot (Colletotrichum curcumae)",
        tamilName: "இலைப்புள்ளி நோய்",
        symptoms: "Elliptical brown spots with yellow margins on both leaf surfaces; spots coalesce turning large areas of leaf blade dry and papery.",
        chemicalTreatment: "Spray Mancozeb 75% WP @ 400 g/acre OR Propiconazole 25% EC @ 200 ml/acre in 200 L water.",
        organicTreatment: "Foliar spray with Pseudomonas fluorescens @ 1 kg/acre enriched in rice gruel broth.",
        prevention: "Collect and burn infected foliage post-harvest; maintain balanced micronutrient feeding (Zinc & Boron)."
      }
    ]
  },
  {
    id: "onion",
    name: "Small Onion (Shallots)",
    tamilName: "சின்ன வெங்காயம்",
    emoji: "🧅",
    popularVarieties: "CO (On) 5, Aggregatum Local, Dindigul Local, Perambalur Red",
    durationDays: "70 – 90 Days",
    durationDaysNum: 80,
    idealSoils: ["Porous Sandy Loam", "Friable Red Loam", "Humus-Rich River Silt"],
    unfavorableSoils: ["Heavy Cracking Vertisols", "Dense Clay Loam", "Saline Coastal Sand"],
    waterRequiredLitersPerAcre: 1500000,
    waterRequiredMm: 420,
    irrigationRounds: "Frequent light irrigations (every 5-7 days); bulb formation stage is critical",
    optimalTempC: "18°C – 30°C",
    optimalMoisturePct: "45% – 60%",
    soilSuitabilityNotes: "Requires shallow, highly aerated, friable topsoil with neutral pH (6.5 - 7.5). Soil crusting or heavy clay prevents bulb expansion and triggers basal rot.",
    diseases: [
      {
        name: "Purple Blotch (Alternaria porri)",
        tamilName: "வெங்காய ஊதா நிற இலைக்கருகல்",
        symptoms: "Small, water-soaked lesions on scapes and leaves that quickly enlarge into sunken, elliptical purple spots surrounded by a chlorotic yellow halo.",
        chemicalTreatment: "Spray Difenoconazole 25% EC @ 150 ml/acre OR Mancozeb 75% WP @ 400 g/acre mixed with a wetting agent/spreader.",
        organicTreatment: "Foliar spray with fermented Panchagavya 3% (30 ml/L) + Pseudomonas fluorescens @ 5 g/L.",
        prevention: "Avoid over-irrigation during bulb maturation; withhold water 10 days before pulling to ensure firm skin curing."
      },
      {
        name: "Basal Rot (Fusarium oxysporum f. sp. cepae)",
        tamilName: "அடி அழுகல் நோய்",
        symptoms: "Progressive yellowing and dieback of leaves starting from tips; underground bulb base softens into a watery rot with pinkish-white fungal growth.",
        chemicalTreatment: "Bulb dipping in Carbendazim 50% WP @ 2 g/L water for 15 mins prior to planting; soil drenching with Copper Oxychloride @ 2.5 g/L.",
        organicTreatment: "Soil treatment with Trichoderma viride @ 2.5 kg/acre mixed with 250 kg decomposed vermicompost.",
        prevention: "Implement 3-year crop rotation with non-allium crops; ensure excellent subsoil drainage."
      }
    ]
  },
  {
    id: "ragi",
    name: "Finger Millet (Ragi)",
    tamilName: "கேழ்வரகு",
    emoji: "🌾",
    popularVarieties: "CO 15, GPU 28, Paiyur 2, ML 365",
    durationDays: "100 – 115 Days",
    durationDaysNum: 108,
    idealSoils: ["Red Sandy Loam", "Porous Gravelly Red Soil", "Well-Drained Loam"],
    unfavorableSoils: ["Impermeable Deltaic Silt Clay", "Saline Coastal Sand"],
    waterRequiredLitersPerAcre: 1250000,
    waterRequiredMm: 350,
    irrigationRounds: "3 to 4 protective irrigations (largely rainfed resilient)",
    optimalTempC: "20°C – 34°C",
    optimalMoisturePct: "35% – 50%",
    soilSuitabilityNotes: "Extremely hardy drought-resilient crop that thrives in lean, shallow red sandy soils where most commercial crops fail. High tolerance to varying soil acidity.",
    diseases: [
      {
        name: "Ragi Blast (Pyricularia grisea)",
        tamilName: "கேழ்வரகு குலை நோய்",
        symptoms: "Spindle-shaped spots on leaves, blackening of the neck below fingers (neck blast) and blackened chaffy fingers that fail to set grains.",
        chemicalTreatment: "Spray Kitazin 48% EC @ 200 ml/acre OR Saaf @ 300 g/acre at earhead emergence.",
        organicTreatment: "Seed dressing with Pseudomonas fluorescens @ 10 g/kg seed; spray fermented butter milk 5%.",
        prevention: "Avoid late sowing in foggy weather; use blast-resistant lines like GPU 28."
      }
    ]
  },
  {
    id: "tapioca",
    name: "Tapioca (Cassava)",
    tamilName: "மரவள்ளிக்கிழங்கு",
    emoji: "🍠",
    popularVarieties: "Mulluvadi, CO 2, YTP 1, H 226",
    durationDays: "270 – 300 Days",
    durationDaysNum: 285,
    idealSoils: ["Deep Red Sandy Loam", "Friable Gravelly Loam"],
    unfavorableSoils: ["Heavy Impermeable Clay", "Waterlogged Vertisols", "Saline Sand"],
    waterRequiredLitersPerAcre: 3200000,
    waterRequiredMm: 900,
    irrigationRounds: "8 to 12 light irrigations; drought tolerant after initial 60-day establishment",
    optimalTempC: "24°C – 36°C",
    optimalMoisturePct: "40% – 55%",
    soilSuitabilityNotes: "Deep, porous sandy loam is critical to allow horizontal tuber expansion. Compact clay soils restrict tuber development, resulting in thin, fibrous, unmarketable tubers.",
    diseases: [
      {
        name: "Cassava Mosaic Disease (CMD)",
        tamilName: "தேமல் நோய்",
        symptoms: "Severe leaf distortion, crinkling, reduced leaf blade lamina with prominent bright chlorotic yellow and green mosaic pattern; stunted tubers.",
        chemicalTreatment: "Foliar spray to suppress vector (Whitefly) using Imidacloprid 17.8% SL @ 60 ml/acre.",
        organicTreatment: "Spray 5% NSKE at 15-day intervals; rogue and burn infected stems immediately.",
        prevention: "Use certified disease-free stem setts from virus-indexed nurseries (such as YTP 1)."
      }
    ]
  },
  {
    id: "coconut",
    name: "Coconut",
    tamilName: "தென்னை",
    emoji: "🥥",
    popularVarieties: "East Coast Tall (ECT), VHC 1, ALR (CN) 1, Chowghat Green Dwarf",
    durationDays: "Perennial (365 Days/yr)",
    durationDaysNum: 365,
    idealSoils: ["Coastal Alluvial Sandy Loam", "Deep Red Sandy Loam", "River Delta Silt"],
    unfavorableSoils: ["Shallow Gravel with Hard Rocky Pan (<60cm)", "Waterlogged Sticky Vertisol"],
    waterRequiredLitersPerAcre: 5200000,
    waterRequiredMm: 1500,
    irrigationRounds: "80 to 100 Liters per tree every 2-3 days under basin drip",
    optimalTempC: "22°C – 35°C",
    optimalMoisturePct: "50% – 70%",
    soilSuitabilityNotes: "Deep (>1.5m), well-aerated sandy loam with active underground freshwater aquifer movement. Cannot tolerate stagnating salt-crusted soils with poor internal drainage.",
    diseases: [
      {
        name: "Basal Stem Rot / Thanjavur Wilt (Ganoderma lucidum)",
        tamilName: "தஞ்சாவூர் வாடல் நோய்",
        symptoms: "Exudation of reddish-brown viscous gummy fluid from cortical cracks at tree base up to 1.5 meters; lower fronds drop, followed by bracket fungi conks emerging at trunk.",
        chemicalTreatment: "Trunk injection or root feeding with Hexaconazole 5% SC @ 2 ml in 100 ml water per palm at quarterly intervals.",
        organicTreatment: "Soil application of 5 kg neem cake + 200 g Trichoderma harzianum per palm around root basin.",
        prevention: "Dig isolation trenches (50 cm wide, 1 m deep) around infected trees to prevent fungal mycelial spread to adjoining palms."
      },
      {
        name: "Rhinoceros Beetle & Red Palm Weevil",
        tamilName: "காண்டாமிருக வண்டு & சிவப்பு கூன்வண்டு",
        symptoms: "V-shaped geometric cuts on emerging fronds; extrusion of chewed moist fiber and fermenting odor from bore holes on trunk.",
        chemicalTreatment: "Crown application of Cartap Hydrochloride 4G mixed with equal quantity of sand; trunk injection with Imidacloprid @ 5 ml in 20 ml water for weevil.",
        organicTreatment: "Install Rhynchophorus pheromone bucket traps @ 1 per 2 acres; incorporate Metarhizium anisopliae green muscardine fungus into FYM breeding pits.",
        prevention: "Clean palm crowns annually before monsoon; seal open wounds with copper oxychloride paste."
      }
    ]
  },
  {
    id: "jasmine",
    name: "Jasmine (Gundu Malli)",
    tamilName: "மல்லிகை",
    emoji: "🌸",
    popularVarieties: "Madurai Local, Ramanathapuram Local, Gundumalli",
    durationDays: "Perennial Shrub",
    durationDaysNum: 365,
    idealSoils: ["Well-Drained Red Loam", "Porous Sandy Loam", "Clay Loam"],
    unfavorableSoils: ["Waterlogged Cauvery Delta Heavy Clay", "Saline Coastal Sand"],
    waterRequiredLitersPerAcre: 3500000,
    waterRequiredMm: 1000,
    irrigationRounds: "Light weekly irrigation; withhold water before annual winter pruning",
    optimalTempC: "22°C – 36°C",
    optimalMoisturePct: "45% – 60%",
    soilSuitabilityNotes: "Thrives in sunny, warm red loamy soils of Madurai and Ramanathapuram. Good drainage is paramount; waterlogged conditions cause rapid root necrosis and leaf drop.",
    diseases: [
      {
        name: "Blossom Midge & Bud Worm (Contarinia & Hendecasis)",
        tamilName: "மொட்டுப்புழு தாக்குதல்",
        symptoms: "Developing flower buds turn violet or pinkish-purple and drop prematurely; bore holes with webbing on clustered buds.",
        chemicalTreatment: "Spray Chlorantraniliprole 18.5% SC @ 60 ml/acre OR Novaluron 10% EC @ 150 ml/acre during bud initiation stage.",
        organicTreatment: "Foliar spray with 5% Neem Seed Kernel Extract (NSKE); install light traps to attract adult moths.",
        prevention: "Rake soil beneath bushes regularly to expose pupae to sun and predatory ants."
      }
    ]
  }
];
