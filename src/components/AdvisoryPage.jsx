import React from "react";
import { ArrowLeft, Droplets, Bug, Sprout, Layers, Printer, ShieldCheck, AlertCircle, Sparkles } from "lucide-react";
import { UI_TRANSLATIONS, DISTRICT_NAMES_TA, DISTRICT_ZONES_TA } from "../data/translations";

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
          <h4 className="schedule-card-title">{t.stageWiseSchedule}</h4>
          <div className="stages-timeline">
            <div className="timeline-step">
              <div className="step-badge">{isTa ? "பருவம் I" : "Stage I"}</div>
              <strong className="step-title">{t.stage1Title}</strong>
              <span className="step-days">{isTa ? "நாள் 1 முதல் 20 வரை" : "Day 1 to 20"}</span>
              <p className="step-desc">{t.stage1Desc}</p>
            </div>

            <div className="timeline-step">
              <div className="step-badge">{isTa ? "பருவம் II" : "Stage II"}</div>
              <strong className="step-title">{t.stage2Title}</strong>
              <span className="step-days">{isTa ? "நாள் 21 முதல் 55 வரை" : "Day 21 to 55"}</span>
              <p className="step-desc">{t.stage2Desc}</p>
            </div>

            <div className="timeline-step">
              <div className="step-badge">{isTa ? "பருவம் III" : "Stage III"}</div>
              <strong className="step-title">{t.stage3Title}</strong>
              <span className="step-days">{isTa ? "நாள் 56 முதல் 90 வரை" : "Day 56 to 90"}</span>
              <p className="step-desc">{t.stage3Desc}</p>
            </div>

            <div className="timeline-step">
              <div className="step-badge">{isTa ? "பருவம் IV" : "Stage IV"}</div>
              <strong className="step-title">{t.stage4Title}</strong>
              <span className="step-days">{isTa ? "நாள் 91 முதல் அறுவடை வரை" : "Day 91 till Harvest"}</span>
              <p className="step-desc">{t.stage4Desc}</p>
            </div>
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
