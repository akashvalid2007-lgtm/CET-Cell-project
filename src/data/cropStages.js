// AgriPulse™ Stage-Wise Crop Water Requirements & Phenological Schedules
// Calibrated with Tamil Nadu Agricultural University (TNAU) Agronomy Guidelines

/**
 * Returns stage-wise phenological water distribution and agronomic guidance for a crop
 * @param {Object} crop - Crop object from TAMIL_NADU_CROPS
 * @returns {Array} List of phenological stages with water allocation in Liters, mm, and percentages
 */
export function getCropStageWiseWater(crop) {
  if (!crop) return [];

  const totalLiters = crop.waterRequiredLitersPerAcre || 3000000;
  const totalMm = crop.waterRequiredMm || 900;

  const cropStagesMap = {
    paddy: [
      {
        stageNumber: "Stage I",
        stageNumberTa: "பருவம் I",
        title: "Nursery Bed Raising & Sprouting",
        titleTa: "நாற்றங்கால் பருவம் (விதைப்பு & நாற்று வளர்ப்பு)",
        days: "Day 1 – 25 (25 Days)",
        daysTa: "நாள் 1 முதல் 25 வரை (25 நாட்கள்)",
        sharePct: 10,
        standingWater: "1.0 – 2.0 cm shallow saturation",
        standingWaterTa: "1.0 – 2.0 செ.மீ ஆழத்தில் மிதமான நீர்",
        desc: "Pre-germinated seeds are sown on raised nursery beds. Saturated soil condition maintained for initial 10 days, followed by 2 cm thin film of standing water. Prepares robust seedlings for transplanting.",
        descTa: "முளைகட்டிய விதைகள் நாற்றங்கால் பாத்திகளில் விதைக்கப்படுகின்றன. முதல் 10 நாட்களுக்கு சேற்றுப் பதமும், பின்னர் 2 செ.மீ மெல்லிய நீர் படலமும் பராமரிக்கப்பட்டு தரமான நாற்றுகள் உருவாக்கப்படுகின்றன."
      },
      {
        stageNumber: "Stage II",
        stageNumberTa: "பருவம் II",
        title: "Seedling Plucking & Mainfield Transplanting",
        titleTa: "நாற்று பறித்தல் & நடவுப் பருவம் (மறுநடவு)",
        days: "Day 26 – 45 (20 Days)",
        daysTa: "நாள் 26 முதல் 45 வரை (20 நாட்கள்)",
        sharePct: 20,
        standingWater: "2.5 – 3.0 cm puddle submergence",
        standingWaterTa: "2.5 – 3.0 செ.மீ சேற்றுழவு நீர் தேக்கம்",
        desc: "25-day-old nursery seedlings are gently plucked out and replanted into the puddled, leveled main field (2-3 seedlings per hill). High water demand for land soaking, puddling, and rapid root anchorage.",
        descTa: "25 நாள் வளர்ந்த நாற்றுகள் கவனமாக பிடுங்கப்பட்டு (நாற்று பறித்தல்), சேற்றுழவு செய்யப்பட்ட பிரதான வயலில் 2-3 நாற்றுகளாக நடவு செய்யப்படுகின்றன. நடவு அதிர்ச்சியைத் தணிக்க 2.5-3 செ.மீ நீர் நிற்க வேண்டும்."
      },
      {
        stageNumber: "Stage III",
        stageNumberTa: "பருவம் III",
        title: "Active Tillering & Stem Elongation",
        titleTa: "தூர்கட்டும் மற்றும் தண்டு நீட்சிப் பருவம்",
        days: "Day 46 – 75 (30 Days)",
        daysTa: "நாள் 46 முதல் 75 வரை (30 நாட்கள்)",
        sharePct: 30,
        standingWater: "3.0 – 5.0 cm cyclic ponding",
        standingWaterTa: "3.0 – 5.0 செ.மீ சுழற்சி முறை பாசனம்",
        desc: "Peak vegetative phase with rapid formation of tillers (shoots). Water ponding at 3-5 cm alternating with hairline field drying (Alternate Wetting and Drying - AWD) to boost root respiration and maximum tiller count.",
        descTa: "அதிகபட்ச தூர்கள் உருவாகும் தீவிர வளர்ச்சிப் பருவம். 3-5 செ.மீ நீர் தேக்கி, பின்னர் நிலத்தில் மெல்லிய வெடிப்பு தோன்றும் வரை நீர் பாய்ச்சி (AWD முறை) வேர்களுக்கு பிராணவாயு வழங்கி அதிக தூர்கள் பெறப்படுகின்றன."
      },
      {
        stageNumber: "Stage IV",
        stageNumberTa: "பருவம் IV",
        title: "Panicle Initiation & Flowering Peak",
        titleTa: "கதிர் உருவாகும் & பூக்கும் பருவம் (முக்கிய கட்டம்)",
        days: "Day 76 – 100 (25 Days)",
        daysTa: "நாள் 76 முதல் 100 வரை (25 நாட்கள்)",
        sharePct: 25,
        standingWater: "5.0 cm continuous standing water",
        standingWaterTa: "5.0 செ.மீ தொடர் தேங்கு நீர் நிலை",
        desc: "Most critical moisture period! Panicles emerge and anthesis (pollination) occurs. Even brief water stress during this window causes severe spikelet sterility (chaffy paddy) and up to 40% yield drop.",
        descTa: "மிகவும் முக்கியமான பாசனக் கட்டம்! கதிர் வெளியேறி பூக்கும் காலம். இக்கட்டத்தில் ஏற்படும் சிறிய நீர் வறட்சியும் பதர் நெல் உருவாவதை அதிகரித்து 40% வரை மகசூல் இழப்பை உண்டாக்கும்."
      },
      {
        stageNumber: "Stage V",
        stageNumberTa: "பருவம் V",
        title: "Grain Filling, Ripening & Terminal Drainage",
        titleTa: "பால் பிடித்தல் & அறுவடைக்கு முந்தைய வடிகால்",
        days: "Day 101 – 125 (25 Days)",
        daysTa: "நாள் 101 முதல் 125 வரை (25 நாட்கள்)",
        sharePct: 15,
        standingWater: "Shallow moisture, then complete drainage",
        standingWaterTa: "மிதமான ஈரம், பின் முழுமையான வடிகால்",
        desc: "Milky sap converts to hard starch dough inside grains. Keep shallow water during dough stage. Complete field drainage 10–14 days prior to harvest for uniform panicle drying and combine harvester access.",
        descTa: "நெல் மணிகளுக்குள் பால் பிடித்து மணி முதிர்ச்சி அடையும் காலம். பால் பிடிக்கும் போது மிதமான ஈரம் தேவை. அறுவடைக்கு 10-14 நாட்களுக்கு முன் வயலில் உள்ள நீரை முழுமையாக வடித்து விட வேண்டும்."
      }
    ],

    sugarcane: [
      {
        stageNumber: "Stage I",
        stageNumberTa: "பருவம் I",
        title: "Germination & Sett Sprouting",
        titleTa: "முளைப்பு மற்றும் கன்றுப் பருவம்",
        days: "Day 1 – 45 (45 Days)",
        daysTa: "நாள் 1 முதல் 45 வரை",
        sharePct: 15,
        standingWater: "Furrow irrigation every 6–8 days",
        standingWaterTa: "6-8 நாட்களுக்கு ஒருமுறை பார் பாசனம்",
        desc: "Planted cane setts establish root buds and primary shoots. Frequent light irrigations prevent eye-bud desiccation.",
        descTa: "நடவு செய்யப்பட்ட கரும்பு கரணைகள் வேர் பிடித்து முளைக்கின்றன. கண் குருத்துகள் காய்ந்து விடாமல் இருக்க மிதமான பாசனம் தேவை."
      },
      {
        stageNumber: "Stage II",
        stageNumberTa: "பருவம் II",
        title: "Tillering & Formative Phase",
        titleTa: "தூர் கட்டுதல் மற்றும் உருவமைப்புப் பருவம்",
        days: "Day 46 – 120 (75 Days)",
        daysTa: "நாள் 46 முதல் 120 வரை",
        sharePct: 25,
        standingWater: "Regular irrigation every 7–10 days",
        standingWaterTa: "7-10 நாட்களுக்கு ஒருமுறை சீரான பாசனம்",
        desc: "Intensive shoot branching and root canopy establishment. Critical for achieving millable stalk population per acre.",
        descTa: "ஏக்கருக்கு தேவையான தடிமனான கரும்பு தூர்கள் உருவாகும் காலம். தூர் பிடிக்கும் பருவத்தில் வறட்சி இருக்கக் கூடாது."
      },
      {
        stageNumber: "Stage III",
        stageNumberTa: "பருவம் III",
        title: "Grand Growth & Cane Elongation",
        titleTa: "தீவிர வளர்ச்சி மற்றும் கரும்பு நீட்சிப் பருவம்",
        days: "Day 121 – 250 (130 Days)",
        daysTa: "நாள் 121 முதல் 250 வரை",
        sharePct: 40,
        standingWater: "Peak water demand; drip fertigation ideal",
        standingWaterTa: "அதிகபட்ச நீர்த் தேவை; சொட்டுநீர் உகந்தது",
        desc: "Longest phase with rapid internode lengthening and biomass accumulation. Consumes 40% of total lifecycle water.",
        descTa: "கணுக்கள் வேகமாக நீண்டு கரும்பு எடையும் உயரமும் கூடும் உச்சக்கட்ட வளர்ச்சிப் பருவம். மொத்த நீரில் 40% தேவைப்படுகிறது."
      },
      {
        stageNumber: "Stage IV",
        stageNumberTa: "பருவம் IV",
        title: "Maturation & Sucrose Accumulation",
        titleTa: "முதிர்ச்சி மற்றும் சர்க்கரை திரட்சிப் பருவம்",
        days: "Day 251 – 330 (80 Days)",
        daysTa: "நாள் 251 முதல் 330 வரை",
        sharePct: 20,
        standingWater: "Tapered irrigation; stop 15 days before cut",
        standingWaterTa: "குறைந்த பாசனம்; வெட்டுவதற்கு 15 நாள் முன் நிறுத்தம்",
        desc: "Vegetative growth slows down and glucose converts into crystallizable sucrose. Irrigation interval widened to 15 days.",
        descTa: "கரும்பில் சர்க்கரைச் சத்து அதிகரிக்கும் பருவம். கரும்பு வெட்டுவதற்கு 15 நாட்களுக்கு முன் பாசனத்தை நிறுத்துவது சர்க்கரை அளவை உயர்த்தும்."
      }
    ],

    cotton: [
      {
        stageNumber: "Stage I",
        stageNumberTa: "பருவம் I",
        title: "Germination & Seedling Establishment",
        titleTa: "விதைப்பு மற்றும் நாற்று நிலை",
        days: "Day 1 – 35 (35 Days)",
        daysTa: "நாள் 1 முதல் 35 வரை",
        sharePct: 15,
        standingWater: "Light life irrigation at 4-5 DAS",
        standingWaterTa: "விதைத்த 4-5 நாளில் உயிர்த்தண்ணீர்",
        desc: "Deep taproot begins descent into black vertisols. Waterlogging must be avoided to prevent Pythium damping-off.",
        descTa: "ஆணிவேர் மண்ணில் ஆழமாக இறங்குகிறது. நீர் தேங்குவதை முற்றிலும் தவிர்த்து வேரழுகல் நோயைத் தடுக்க வேண்டும்."
      },
      {
        stageNumber: "Stage II",
        stageNumberTa: "பருவம் II",
        title: "Squaring (Flower Bud) Formation",
        titleTa: "சதுர அரும்பு (பூ மொட்டு) உருவாவது",
        days: "Day 36 – 70 (35 Days)",
        daysTa: "நாள் 36 முதல் 70 வரை",
        sharePct: 25,
        standingWater: "Irrigate every 12–15 days in vertisols",
        standingWaterTa: "12-15 நாட்களுக்கு ஒருமுறை பாசனம்",
        desc: "Sympodial fruiting branches emerge and flower squares develop. Moderate moisture required to prevent square shedding.",
        descTa: "பூ அரும்புகள் உருவாகும் நிலை. மொட்டுகள் உதிர்வதைத் தடுக்க மிதமான பாசனம் அவசியம்."
      },
      {
        stageNumber: "Stage III",
        stageNumberTa: "பருவம் III",
        title: "Peak Flowering & Boll Development",
        titleTa: "பூக்கும் மற்றும் காய்கள் உருவாகும் உச்ச நிலை",
        days: "Day 71 – 115 (45 Days)",
        daysTa: "நாள் 71 முதல் 115 வரை",
        sharePct: 40,
        standingWater: "Critical peak irrigation every 10 days",
        standingWaterTa: "முக்கிய பாசனம்: 10 நாட்களுக்கு ஒருமுறை",
        desc: "Highest moisture sensitivity! Water stress here causes premature boll shedding and weak fiber micronaire.",
        descTa: "அதிகபட்ச நீர்த் தேவை! இந்நேரத்தில் வறட்சி ஏற்பட்டால் பஞ்சுக் காய்கள் உதிர்ந்து பருத்தி இழைத்தரம் குறையும்."
      },
      {
        stageNumber: "Stage IV",
        stageNumberTa: "பருவம் IV",
        title: "Boll Bursting & Fiber Maturation",
        titleTa: "காய் வெடித்தல் மற்றும் பஞ்சு முதிர்ச்சி",
        days: "Day 116 – 150 (35 Days)",
        daysTa: "நாள் 116 முதல் 150 வரை",
        sharePct: 20,
        standingWater: "Withhold irrigation during boll opening",
        standingWaterTa: "காய் வெடிக்கும் போது பாசனத்தை நிறுத்துக",
        desc: "Bolls dry and crack open revealing fluffy cotton lint. Dry atmosphere and dry ground essential for clean picking.",
        descTa: "பஞ்சுக் காய்கள் வெடித்து தூய பஞ்சு வெளியேறும் பருவம். பஞ்சு நனையாமல் இருக்க பாசனத்தை கட்டுப்படுத்த வேண்டும்."
      }
    ],

    groundnut: [
      {
        stageNumber: "Stage I",
        stageNumberTa: "பருவம் I",
        title: "Seedling Emergence & Vegetative",
        titleTa: "முளைப்பு மற்றும் தழை வளர்ச்சிப் பருவம்",
        days: "Day 1 – 25 (25 Days)",
        daysTa: "நாள் 1 முதல் 25 வரை",
        sharePct: 15,
        standingWater: "Sowing irrigation + life irrigation",
        standingWaterTa: "விதைப்பு நீர் + உயிர்த்தண்ணீர்",
        desc: "Seeds germinate in loose red sandy loam. Deep root exploration with low surface water usage.",
        descTa: "செடிகள் முளைத்து தழைத்து வளர்கின்றன. தளர்வான மணல் கலந்த செம்மண்ணில் வேர்கள் பரவுகின்றன."
      },
      {
        stageNumber: "Stage II",
        stageNumberTa: "பருவம் II",
        title: "Flowering & Gynophore (Peg) Penetration",
        titleTa: "பூத்தல் & விழுது இறங்கும் பருவம் (முக்கியம்)",
        days: "Day 26 – 50 (25 Days)",
        daysTa: "நாள் 26 முதல் 50 வரை",
        sharePct: 35,
        standingWater: "Keep top 5 cm soil friable & moist",
        standingWaterTa: "மேல் மண் 5 செ.மீ தளர்வாகவும் ஈரமாகவும் இருக்க வேண்டும்",
        desc: "Most critical phase! Yellow flowers self-pollinate and send down sharp pegs into soil. If soil is dry or hard, pegs cannot penetrate, destroying yield.",
        descTa: "மிக முக்கியமான பருவம்! பூக்கள் மலர்ந்து விழுதுகள் பூமிக்குள் இறங்கும். மேல்மண் காய்ந்து இறுகினால் விழுதுகள் மண்ணுக்குள் இறங்க முடியாமல் மகசூல் பாழாகும்."
      },
      {
        stageNumber: "Stage III",
        stageNumberTa: "பருவம் III",
        title: "Pod Formation & Seed Filling",
        titleTa: "காய் உருவாவது மற்றும் பருப்பு திரட்சி",
        days: "Day 51 – 85 (35 Days)",
        daysTa: "நாள் 51 முதல் 85 வரை",
        sharePct: 35,
        standingWater: "Steady moisture every 7–10 days",
        standingWaterTa: "7-10 நாட்களுக்கு ஒருமுறை மிதமான பாசனம்",
        desc: "Underground pods swell and kernel oil accumulates. Steady moisture prevents hollow pods ('pops').",
        descTa: "மண்ணுக்குள் கடலைக்காய்கள் பருத்து எண்ணெய் சத்து சேரும் பருவம். சீரான ஈரம் சொத்தைக்காய் உருவாவதைத் தடுக்கும்."
      },
      {
        stageNumber: "Stage IV",
        stageNumberTa: "பருவம் IV",
        title: "Pod Maturation & Harvest",
        titleTa: "காய் முதிர்ச்சி மற்றும் அறுவடை",
        days: "Day 86 – 105 (20 Days)",
        daysTa: "நாள் 86 முதல் 105 வரை",
        sharePct: 15,
        standingWater: "Light pulling irrigation prior to harvest",
        standingWaterTa: "அறுவடைக்கு முன் செடி பிடுங்குவதற்கான நனைப்பு நீர்",
        desc: "Leaves turn yellowish and shed. One light irrigation given 2 days before pulling to ease harvest without breaking pods.",
        descTa: "இலைகள் மஞ்சளாக மாறும். செடிகளை பிடுங்கும்போது காய்கள் அறுந்து போகாமல் இருக்க லேசான நனைப்பு பாசனம் தேவை."
      }
    ],

    banana: [
      {
        stageNumber: "Stage I",
        stageNumberTa: "பருவம் I",
        title: "Sucker Planting & Root Establishment",
        titleTa: "கன்று நடுதல் மற்றும் வேர் ஊன்றும் பருவம்",
        days: "Day 1 – 90 (90 Days)",
        daysTa: "நாள் 1 முதல் 90 வரை",
        sharePct: 20,
        standingWater: "Frequent basin or drip (10–12 L/day)",
        standingWaterTa: "தொடர் பாத்தி அல்லது சொட்டுநீர் (10-12 லி/நாள்)",
        desc: "Corms establish dense feeder roots. Steady soil moisture prevents sucker rot and desiccated shoots.",
        descTa: "வாழைக் கிழங்கு வேர்விட்டு இளம் தளிர்கள் வளரும் பருவம். கன்று காய்ந்து போகாமல் தொடர் ஈரப்பதம் தேவை."
      },
      {
        stageNumber: "Stage II",
        stageNumberTa: "பருவம் II",
        title: "Rapid Pseudostem Canopy Growth",
        titleTa: "துரித தண்டு வளர்ச்சி மற்றும் இலை படர்ச்சி",
        days: "Day 91 – 180 (90 Days)",
        daysTa: "நாள் 91 முதல் 180 வரை",
        sharePct: 30,
        standingWater: "Drip at 15–18 L/plant/day",
        standingWaterTa: "மரம் ஒன்றுக்கு 15-18 லிட்டர் சொட்டுநீர்/நாள்",
        desc: "Broad leaves unfurl rapidly requiring high transpiration water. Essential for building strong trunk circumference.",
        descTa: "அகன்ற இலைகள் விரிந்து தண்டு தடிமனாகும் பருவம். ஒளிச்சேர்க்கைக்கும் தண்டு வலிமைக்கும் அதிக நீர் தேவைப்படுகிறது."
      },
      {
        stageNumber: "Stage III",
        stageNumberTa: "பருவம் III",
        title: "Shooting & Bunch Emergence",
        titleTa: "பூ வெளிவருதல் மற்றும் வாழைத்தார் தள்ளும் பருவம்",
        days: "Day 181 – 270 (90 Days)",
        daysTa: "நாள் 181 முதல் 270 வரை",
        sharePct: 35,
        standingWater: "Peak water demand (20–25 L/plant/day)",
        standingWaterTa: "உச்சக்கட்ட நீர்த் தேவை (20-25 லிட்டர்/மரம்/நாள்)",
        desc: "Inflorescence shoots out from heart of pseudostem. Highest water stress vulnerability; determines bunch weight.",
        descTa: "வாழைப்பூ வெளிவந்து காய்கள் சீப்பாக விரியும் உச்ச கட்டம். தாரின் எடை மற்றும் காய்களின் எண்ணிக்கை இக்கட்ட பாசனத்தை பொறுத்தது."
      },
      {
        stageNumber: "Stage IV",
        stageNumberTa: "பருவம் IV",
        title: "Bunch Maturation & Finger Filling",
        titleTa: "காய் திரட்சி மற்றும் முதிர்ச்சிப் பருவம்",
        days: "Day 271 – 345 (75 Days)",
        daysTa: "நாள் 271 முதல் 345 வரை",
        sharePct: 15,
        standingWater: "Gradual tapering; stop 10 days before harvest",
        standingWaterTa: "பாசனத்தைக் குறைத்து வெட்டுவதற்கு 10 நாள் முன் நிறுத்தம்",
        desc: "Starch fills the fruit fingers. Gradual reduction in water avoids peel splitting and enhances post-harvest shelf life.",
        descTa: "காய்கள் முற்றி வழுவழுப்பு அடையும் நிலை. காய்கள் வெடிப்பதைத் தவிர்க்க பாசனத்தை மிதப்படுத்த வேண்டும்."
      }
    ],

    maize: [
      {
        stageNumber: "Stage I",
        stageNumberTa: "பருவம் I",
        title: "Seedling to Knee-High Phase",
        titleTa: "முளைப்பு முதல் முழங்கால் உயர வளர்ச்சி",
        days: "Day 1 – 30 (30 Days)",
        daysTa: "நாள் 1 முதல் 30 வரை",
        sharePct: 20,
        standingWater: "Light furrow irrigation every 8–10 days",
        standingWaterTa: "8-10 நாட்களுக்கு ஒருமுறை பார் பாசனம்",
        desc: "Root establishment and whorl formation. Cannot tolerate waterlogging for >24 hours.",
        descTa: "நாற்று வேர்விட்டு இலைகள் விரிவடையும் காலம். 24 மணி நேரத்திற்கு மேல் நீர் தேங்கக் கூடாது."
      },
      {
        stageNumber: "Stage II",
        stageNumberTa: "பருவம் II",
        title: "Tasseling & Silking Peak",
        titleTa: "ஆண் பூ மற்றும் பெண் பூ (கதிர்) தோன்றும் உச்ச பருவம்",
        days: "Day 31 – 65 (35 Days)",
        daysTa: "நாள் 31 முதல் 65 வரை",
        sharePct: 45,
        standingWater: "Critical irrigation; zero moisture stress",
        standingWaterTa: "மிக முக்கிய பாசனம்; வறட்சி ஏற்படக் கூடாது",
        desc: "Tassels shed pollen onto silk. Water deficit during this 2-week window causes poor pollination and empty cobs.",
        descTa: "மகரந்தச் சேர்க்கை நிகழும் உச்சக்கட்ட பாசன பருவம். இந்நேரத்தில் வறட்சி ஏற்பட்டால் கதிர்களில் மணிகள் பிடிக்காது."
      },
      {
        stageNumber: "Stage III",
        stageNumberTa: "பருவம் III",
        title: "Grain Filling & Maturity",
        titleTa: "மணி திரட்சி மற்றும் முதிர்ச்சிப் பருவம்",
        days: "Day 66 – 102 (37 Days)",
        daysTa: "நாள் 66 முதல் 102 வரை",
        sharePct: 35,
        standingWater: "Irrigate at milky dough; drain before harvest",
        standingWaterTa: "பால் பிடிக்கும் போது பாசனம்; அறுவடைக்கு முன் நிறுத்தம்",
        desc: "Kernel dough hardens and husks turn straw-yellow. Withhold water 10 days prior to cob picking.",
        descTa: "சோள மணிகள் இறுகி தட்டைகள் காயும் பருவம். அறுவடைக்கு 10 நாட்களுக்கு முன் பாசனத்தை நிறுத்த வேண்டும்."
      }
    ],

    blackgram: [
      {
        stageNumber: "Stage I",
        stageNumberTa: "பருவம் I",
        title: "Sowing & Vegetative Branching",
        titleTa: "விதைப்பு மற்றும் கிளை வளர்ச்சிப் பருவம்",
        days: "Day 1 – 20 (20 Days)",
        daysTa: "நாள் 1 முதல் 20 வரை",
        sharePct: 25,
        standingWater: "Sowing moisture or residual paddy fallow",
        standingWaterTa: "விதைப்பு ஈரம் அல்லது நெல் தரிசு ஈரம்",
        desc: "Often sown in delta rice fallows utilizing residual moisture. Promotes nodule bacteria for nitrogen fixation.",
        descTa: "நெல் தரிசு வயல்களில் எஞ்சிய ஈரத்திலேயே பெரும்பாலும் பயிரிடப்படுகிறது. வேர் முடிச்சுகள் தழைச்சத்தை நிலைநிறுத்துகின்றன."
      },
      {
        stageNumber: "Stage II",
        stageNumberTa: "பருவம் II",
        title: "Flowering & Early Pod Formation",
        titleTa: "பூக்கும் மற்றும் பிஞ்சு உருவாவது",
        days: "Day 21 – 45 (25 Days)",
        daysTa: "நாள் 21 முதல் 45 வரை",
        sharePct: 45,
        standingWater: "One critical irrigation at 25-30 DAS",
        standingWaterTa: "விதைத்த 25-30 நாளில் ஒருமுறை முக்கிய பாசனம்",
        desc: "Critical flowering flush. Single irrigation at 30 days increases pod set by over 40%.",
        descTa: "பூக்கள் பூத்துக் குலுங்கும் நிலை. இந்நேரத்தில் பாய்ச்சப்படும் ஒரு தண்ணீர் 40% கூடுதல் காய்களை உருவாக்கும்."
      },
      {
        stageNumber: "Stage III",
        stageNumberTa: "பருவம் III",
        title: "Pod Filling & Maturity",
        titleTa: "காய் முதிர்ச்சி மற்றும் கறுப்புப் பருவம்",
        days: "Day 46 – 70 (25 Days)",
        daysTa: "நாள் 46 முதல் 70 வரை",
        sharePct: 30,
        standingWater: "Withhold water to prevent vegetative regrowth",
        standingWaterTa: "மறு தழைப்பு ஏற்படாமல் இருக்க பாசனத்தை நிறுத்துக",
        desc: "Pods turn black and dry uniformly. No irrigation given to avoid secondary vegetative flushing.",
        descTa: "காய்கள் கறுத்து உலரும் பருவம். மீண்டும் செடி தழைப்பதைத் தவிர்க்க பாசனம் முற்றிலும் நிறுத்தப்படுகிறது."
      }
    ]
  };

  // If specific crop template exists, use it; otherwise provide calibrated 4-stage agronomic template
  const rawStages = cropStagesMap[crop.id] || [
    {
      stageNumber: "Stage I",
      stageNumberTa: "பருவம் I",
      title: "Initial Sowing & Germination",
      titleTa: "விதைப்பு மற்றும் முளைப்புப் பருவம்",
      days: `Day 1 – ${Math.round(crop.durationDaysNum * 0.18)}`,
      daysTa: `நாள் 1 முதல் ${Math.round(crop.durationDaysNum * 0.18)} வரை`,
      sharePct: 15,
      standingWater: "Frequent light moisture",
      standingWaterTa: "தொடர் மிதமான ஈரம்",
      desc: "Seed emergence and early root anchoring. Soil moisture maintained at 60% field capacity without standing water.",
      descTa: "விதைகள் முளைத்து வேர் ஊன்றும் காலம். வயலில் நீர் தேங்காமல் 60% ஈரப்பதம் பேணப்பட வேண்டும்."
    },
    {
      stageNumber: "Stage II",
      stageNumberTa: "பருவம் II",
      title: "Vegetative Growth & Tillering",
      titleTa: "தழை வளர்ச்சி மற்றும் தூர் கட்டுதல்",
      days: `Day ${Math.round(crop.durationDaysNum * 0.18) + 1} – ${Math.round(crop.durationDaysNum * 0.45)}`,
      daysTa: `நாள் ${Math.round(crop.durationDaysNum * 0.18) + 1} முதல் ${Math.round(crop.durationDaysNum * 0.45)} வரை`,
      sharePct: 30,
      standingWater: "Steady irrigation according to soil texture",
      standingWaterTa: "மண் தன்மைக்கேற்ப சீரான பாசனம்",
      desc: "Active biomass and leaf area expansion. Steady moisture required to support nutrient uptake from soil.",
      descTa: "செடியின் கிளைகள் மற்றும் இலைகள் அடர்ந்து வளரும் பருவம். உரங்களை உறிஞ்ச சீரான பாசனம் தேவை."
    },
    {
      stageNumber: "Stage III",
      stageNumberTa: "பருவம் III",
      title: "Flowering & Reproductive Phase",
      titleTa: "பூத்தல் மற்றும் காய்/கதிர் உருவாகும் உச்ச பருவம்",
      days: `Day ${Math.round(crop.durationDaysNum * 0.45) + 1} – ${Math.round(crop.durationDaysNum * 0.75)}`,
      daysTa: `நாள் ${Math.round(crop.durationDaysNum * 0.45) + 1} முதல் ${Math.round(crop.durationDaysNum * 0.75)} வரை`,
      sharePct: 40,
      standingWater: "Critical peak moisture; zero drought tolerance",
      standingWaterTa: "மிக முக்கிய பாசனக் கட்டம்; வறட்சி கூடாது",
      desc: "Peak water consumption window. Water stress during flowering leads to severe flower drop and yield penalty.",
      descTa: "அதிகபட்ச பாசன நீர் தேவைப்படும் பருவம். பூக்கள் உதிராமல் இருக்க போதிய பாசனம் மிக அவசியம்."
    },
    {
      stageNumber: "Stage IV",
      stageNumberTa: "பருவம் IV",
      title: "Maturation & Pre-Harvest Drying",
      titleTa: "முதிர்ச்சி மற்றும் அறுவடைக்கு முந்தைய வடிகால்",
      days: `Day ${Math.round(crop.durationDaysNum * 0.75) + 1} – ${crop.durationDaysNum}`,
      daysTa: `நாள் ${Math.round(crop.durationDaysNum * 0.75) + 1} முதல் ${crop.durationDaysNum} வரை`,
      sharePct: 15,
      standingWater: "Taper off; drain 10–14 days prior to harvest",
      standingWaterTa: "பாசனத்தைக் குறைத்து அறுவடைக்கு முன் நிறுத்தம்",
      desc: "Grain/fruit filling hardens and foliage dries. Complete field drainage for uniform ripening.",
      descTa: "காய்கள்/மணிகள் முற்றி காய்ந்து அறுவடைக்கு தயாராகும் பருவம். அறுவடைக்கு 10-14 நாட்கள் முன் நீர் வடிப்பு."
    }
  ];

  // Calculate exact stage-wise volumetric metrics
  return rawStages.map((stage) => {
    const stageLiters = Math.round(totalLiters * (stage.sharePct / 100));
    const stageLitersLakh = (stageLiters / 100000).toFixed(1);
    const stageMm = Math.round(totalMm * (stage.sharePct / 100));

    return {
      ...stage,
      stageLiters,
      stageLitersLakh,
      stageMm
    };
  });
}
