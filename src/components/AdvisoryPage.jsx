import React from "react";
import { ArrowLeft, Droplets, Bug, Sprout, Layers, Printer, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";
import { UI_TRANSLATIONS, DISTRICT_NAMES_TA, DISTRICT_ZONES_TA } from "../data/translations";
import { getCropStageWiseWater } from "../data/cropStages";

export function AdvisoryPage({ district, crop, valuation, onBackToDashboard, language = "en" }) {
  if (!district || !crop || !valuation) {
    return null;
  }

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const isTa = language === "ta";

  const handlePrint = () => {
    window.print();
  };

  const districtDisplayName = isTa
    ? DISTRICT_NAMES_TA[district.id] || district.name
    : district.name;

  const districtZoneName = isTa
    ? DISTRICT_ZONES_TA[district.id] || district.zone
    : district.zone;

  const cropDisplayName = isTa
    ? `${crop.tamilName || crop.name}`
    : `${crop.name}`;

  const waterInLakhLiters = (crop.waterRequiredLitersPerAcre / 100000).toFixed(1);
  const waterInMillionLiters = (crop.waterRequiredLitersPerAcre / 1000000).toFixed(2);
  const waterInAcreInches = Math.round(crop.waterRequiredMm / 25.4);

  const growthStages = getCropStageWiseWater(crop);

  const stageColors = [
    "#10b981", // Emerald green
    "#38bdf8", // Sky blue
    "#f59e0b", // Amber gold
    "#ec4899", // Rose / pink
    "#8b5cf6"  // Purple
  ];

  return (
    <div className="advisory-page-container">
      {/* Top Navigation Bar */}
      <div className="advisory-top-nav">
        <button type="button" className="btn-royal-outline" onClick={onBackToDashboard}>
          <ArrowLeft size={16} /> {t.returnDashboard}
        </button>

        <div className="advisory-nav-title">
          <span className="nav-eyebrow">{t.tnauSpec}</span>
          <h2 className="nav-heading">
            {crop.emoji} {cropDisplayName} {t.dossier} &bull; {districtDisplayName}
          </h2>
        </div>

        <button type="button" className="btn-royal-secondary" onClick={handlePrint}>
          <Printer size={16} /> {t.printPdf}
        </button>
      </div>

      {/* Hero Clearance Banner */}
      <div className="clearance-banner">
        <div className="clearance-icon-wrap">
          <ShieldCheck size={36} />
        </div>
        <div className="clearance-details">
          <div className="clearance-tag">{t.clearedVerdict}</div>
          <h3 className="clearance-title">
            {t.clearedTitle} {districtDisplayName} ({districtZoneName})
          </h3>
          <p className="clearance-subtitle">
            {t.calculatedRisk} <strong>{valuation.riskPercentage}%</strong> &bull; {t.suitabilityIndex}{" "}
            <strong>{valuation.suitabilityScore} / 100</strong> &bull; {t.estimatedDuration}{" "}
            <strong>{crop.durationDays}</strong>
          </p>
        </div>
      </div>

      {/* SECTION 1: TOTAL WATER REQUIREMENT TILL HARVESTING */}
      <section className="advisory-section">
        <div className="section-title-bar">
          <div className="section-title-group">
            <Droplets className="gold-accent-icon" size={22} />
            <div>
              <h3 className="section-heading">{t.section1Heading}</h3>
              <span className="section-subheading">{t.section1Sub}</span>
            </div>
          </div>
        </div>

        <div className="water-metrics-grid">
          <div className="water-metric-card highlight-gold-border">
            <span className="water-metric-sub">{t.totalBudget}</span>
            <div className="water-metric-main">
              <span className="water-big-number">{crop.waterRequiredLitersPerAcre.toLocaleString()}</span>
              <span className="water-unit">{t.litersAcre}</span>
            </div>
            <span className="water-metric-footer">
              {isTa
                ? `(~${waterInLakhLiters} லட்சம் லிட்டர் அல்லது ${waterInMillionLiters} மில்லியன் லிட்டர் / ஏக்கர்)`
                : `(~${waterInMillionLiters} Million Liters or ${waterInLakhLiters} Lakh Liters per Acre)`}
            </span>
          </div>

          <div className="water-metric-card">
            <span className="water-metric-sub">{t.depthEquiv}</span>
            <div className="water-metric-main">
              <span className="water-big-number">{crop.waterRequiredMm}</span>
              <span className="water-unit">{t.mmDepth}</span>
            </div>
            <span className="water-metric-footer">
              {isTa
                ? `ஏறத்தாழ ~${waterInAcreInches} ஏக்கர்-அங்குல பாசன ஆழத்திற்கு சமம்`
                : `Equivalent to ~${waterInAcreInches} Acre-Inches of irrigation depth`}
            </span>
          </div>

          <div className="water-metric-card">
            <span className="water-metric-sub">{t.irrigationProtocol}</span>
            <div className="water-metric-main text-small">
              <span className="water-text-bold">{crop.irrigationRounds}</span>
            </div>
            <span className="water-metric-footer">
              {isTa
                ? `மாவட்ட மழைப்பொழிவு: ${district.annualRainfallMm} மி.மீ (கால்வாய் & நிலத்தடி நீர் இருப்பு மேலாண்மை)`
                : `District Annual Rain: ${district.annualRainfallMm} mm (Residual Water Balance Managed)`}
            </span>
          </div>
        </div>

        {/* Stage-wise Water Allocation Schedule */}
        <div className="water-schedule-card">
          <div className="schedule-card-header">
            <h4 className="schedule-card-title">
              {isTa ? "🌾 பயிர் வளர்ச்சி நிலை வாரியான பாசன நீர் மதிப்பீடு & அட்டவணை" : "🌾 Phenological Stage-Wise Water Allocation & Irrigation Protocol"}
            </h4>
            <p className="section-subheading" style={{ marginBottom: "16px", fontSize: "12.5px" }}>
              {isTa
                ? `மொத்த பாசன நீர் (${crop.waterRequiredLitersPerAcre.toLocaleString()} லிட்டர் / ஏக்கர்) பயிரின் வளர்ச்சி பருவங்களுக்கு ஏற்ப கணக்கிடப்பட்டு பிரிக்கப்பட்டுள்ளது:`
                : `Stage-by-stage water volume for ${cropDisplayName} calibrated from nursery/planting through final harvest:`}
            </p>
          </div>

          {/* Stacked Water Distribution Bar */}
          <div className="stage-stacked-bar-card">
            <div className="stage-stacked-bar-header">
              <span>{isTa ? "முழுமையான நீர் ஒதுக்கீடு விகிதம் (%):" : "Cumulative Lifecycle Water Distribution:"}</span>
              <span className="highlight-gold font-mono" style={{ fontWeight: 700 }}>100% &bull; {crop.waterRequiredLitersPerAcre.toLocaleString()} L / Acre</span>
            </div>
            <div className="stage-stacked-bar">
              {growthStages.map((stg, i) => (
                <div
                  key={stg.stageNumber || i}
                  className="stage-stacked-segment"
                  style={{
                    width: `${stg.sharePct}%`,
                    backgroundColor: stageColors[i % stageColors.length]
                  }}
                  title={`${isTa ? stg.titleTa : stg.title}: ${stg.sharePct}% (${stg.stageLiters.toLocaleString()} L)`}
                />
              ))}
            </div>
            <div className="stage-stacked-legend">
              {growthStages.map((stg, i) => (
                <div key={stg.stageNumber || i} className="stage-legend-item">
                  <span
                    className="legend-color-dot"
                    style={{ backgroundColor: stageColors[i % stageColors.length] }}
                  />
                  <span>
                    <strong>{isTa ? stg.stageNumberTa : stg.stageNumber}</strong>: {stg.sharePct}% ({stg.stageLitersLakh} {isTa ? "லட்சம் லி." : "Lakh L"})
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Stage Cards */}
          <div className="stages-timeline">
            {growthStages.map((stg, i) => {
              const stageTitle = isTa ? stg.titleTa : stg.title;
              const stageNumber = isTa ? stg.stageNumberTa : stg.stageNumber;
              const stageDays = isTa ? stg.daysTa : stg.days;
              const standingWater = isTa ? stg.standingWaterTa : stg.standingWater;
              const desc = isTa ? stg.descTa : stg.desc;

              return (
                <div key={stg.stageNumber || i} className="timeline-step">
                  <div className="step-top-row">
                    <span className="step-badge">{stageNumber}</span>
                    <span className="step-share-pill">{stg.sharePct}% {isTa ? "பங்கு" : "Budget"}</span>
                  </div>

                  <strong className="step-title">{stageTitle}</strong>
                  <span className="step-days">{stageDays}</span>

                  {/* Water Volume Box */}
                  <div className="stage-water-box">
                    <div className="stage-water-label">
                      <span>{isTa ? "தேவைப்படும் நீர்" : "Estimated Water"}</span>
                      <span className="font-mono" style={{ color: "var(--gold-primary)" }}>{stg.sharePct}%</span>
                    </div>

                    <div className="stage-water-liters-row">
                      <span className="stage-water-number">{stg.stageLiters.toLocaleString()}</span>
                      <span className="stage-water-unit">{isTa ? "லிட்டர் / ஏக்." : "L / Acre"}</span>
                    </div>

                    <div className="stage-progress-track">
                      <div
                        className="stage-progress-fill"
                        style={{
                          width: `${stg.sharePct * 2.5}%`,
                          backgroundColor: stageColors[i % stageColors.length]
                        }}
                      />
                    </div>

                    <div className="stage-water-submetrics">
                      <span>{isTa ? `~${stg.stageLitersLakh} லட்சம் லிட்டர்` : `~${stg.stageLitersLakh} Lakh Liters`}</span>
                      <span className="font-mono" style={{ color: "#38bdf8" }}>{stg.stageMm} mm {isTa ? "ஆழம்" : "depth"}</span>
                    </div>
                  </div>

                  {/* Standing Water / Irrigation Protocol */}
                  <div className="stage-protocol-tag">
                    <Droplets size={13} style={{ flexShrink: 0 }} />
                    <span>{standingWater}</span>
                  </div>

                  <p className="step-desc">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 2: DISTRICT SOIL & SAND SUITABILITY REPORT */}
      <section className="advisory-section">
        <div className="section-title-bar">
          <div className="section-title-group">
            <Layers className="gold-accent-icon" size={22} />
            <div>
              <h3 className="section-heading">{t.section2Heading}</h3>
              <span className="section-subheading">{t.section2Sub}</span>
            </div>
          </div>
        </div>

        <div className="soil-analysis-grid">
          {/* Column A: District Soil & Sand Makeup */}
          <div className="analysis-card">
            <div className="card-top-tag">{t.localGeology} {districtDisplayName.toUpperCase()}</div>
            <h4 className="analysis-card-title">{t.sandSiltClay}</h4>
            <div className="geology-detail-box">
              <p className="geology-highlight">{district.sandComposition}</p>
            </div>

            <div className="soil-meta-list">
              <div className="soil-meta-row">
                <span className="s-label">{t.dominantSoilTypes}</span>
                <span className="s-val">{district.dominantSoils.join(", ")}</span>
              </div>
              <div className="soil-meta-row">
                <span className="s-label">{t.soilPhProfile}</span>
                <span className="s-val">{district.soilPH}</span>
              </div>
              <div className="soil-meta-row">
                <span className="s-label">{t.internalDrainage}</span>
                <span className="s-val">{district.drainage}</span>
              </div>
              <div className="soil-meta-row">
                <span className="s-label">{t.moistureRetention}</span>
                <span className="s-val">{district.waterRetention}</span>
              </div>
            </div>
          </div>

          {/* Column B: Crop Soil Affinity & Suitability */}
          <div className="analysis-card">
            <div className="card-top-tag">{t.agronomicAffinity}</div>
            <h4 className="analysis-card-title">{t.inWhatSoilGrowsBest}</h4>
            <div className="ideal-soils-box">
              <span className="ideal-label">{t.optimalRootMedia}</span>
              <ul className="ideal-soils-list">
                {crop.idealSoils.map((soil, idx) => (
                  <li key={idx}>&bull; {soil}</li>
                ))}
              </ul>
            </div>

            <div className="suitability-verdict-box">
              <span className="suitability-label">{t.howDistrictSuits}</span>
              <p className="suitability-text">{crop.soilSuitabilityNotes}</p>
            </div>

            <div className="soil-conditioning-box">
              <span className="conditioning-label">
                <Sparkles size={14} className="gold-accent-icon" /> {t.suggestedConditioning} {districtDisplayName}:
              </span>
              <p className="conditioning-text">
                {t.conditioningDefault}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: POSSIBLE DISEASES & SUGGESTED FERTILIZERS / TREATMENTS */}
      <section className="advisory-section">
        <div className="section-title-bar">
          <div className="section-title-group">
            <Bug className="gold-accent-icon" size={22} />
            <div>
              <h3 className="section-heading">{t.section3Heading}</h3>
              <span className="section-subheading">{t.section3Sub}</span>
            </div>
          </div>
        </div>

        <div className="diseases-accordion-list">
          {crop.diseases.map((dis, idx) => (
            <div key={idx} className="disease-card">
              <div className="disease-header">
                <div className="disease-title-block">
                  <span className="disease-index">D-{idx + 1}</span>
                  <div>
                    <h4 className="disease-name">
                      {isTa ? dis.tamilName || dis.name : dis.name}
                    </h4>
                    <span className="disease-tamil">
                      {isTa ? dis.name : dis.tamilName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="disease-body">
                <div className="disease-symptoms-row">
                  <span className="row-label">{t.symptoms}</span>
                  <p className="row-text">{dis.symptoms}</p>
                </div>

                <div className="treatments-split-grid">
                  <div className="treatment-box chemical-box">
                    <div className="treatment-header">
                      <span className="treatment-badge chemical-badge">{t.chemicalFormulation}</span>
                    </div>
                    <p className="treatment-content">{dis.chemicalTreatment}</p>
                  </div>

                  <div className="treatment-box organic-box">
                    <div className="treatment-header">
                      <span className="treatment-badge organic-badge">{t.organicAlternative}</span>
                    </div>
                    <p className="treatment-content">{dis.organicTreatment}</p>
                  </div>
                </div>

                <div className="prevention-strip">
                  <AlertCircle size={14} />
                  <span>
                    <strong>{t.preventiveMeasure}</strong> {dis.prevention}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Action Footer */}
      <div className="advisory-footer-actions">
        <button type="button" className="btn-royal-gold btn-lg" onClick={onBackToDashboard}>
          <ArrowLeft size={18} /> {t.returnToEvaluateAnother}
        </button>
      </div>
    </div>
  );
}
