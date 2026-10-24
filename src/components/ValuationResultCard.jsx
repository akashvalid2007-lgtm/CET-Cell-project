import React from "react";
import { Sparkles, AlertTriangle, CheckCircle, ArrowRight, ShieldAlert, Layers, Droplets, Clock, Cpu } from "lucide-react";
import { UI_TRANSLATIONS, DISTRICT_NAMES_TA } from "../data/translations";

export function ValuationResultCard({
  valuation,
  isEvaluating,
  onRunValuation,
  onProceedToAdvisory,
  selectedDistrict,
  selectedCrop,
  telemetry,
  language = "en"
}) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const isTa = language === "ta";

  const districtDisplayName = isTa
    ? DISTRICT_NAMES_TA[selectedDistrict?.id] || selectedDistrict?.name
    : selectedDistrict?.name;

  const cropDisplayName = isTa
    ? `${selectedCrop?.emoji} ${selectedCrop?.tamilName || selectedCrop?.name}`
    : `${selectedCrop?.emoji} ${selectedCrop?.name}`;

  return (
    <div className="royal-card valuation-card">
      <div className="card-header-line">
        <div className="card-title-group">
          <Sparkles className="gold-accent-icon" size={20} />
          <div>
            <h2 className="card-heading">{t.step3Heading}</h2>
            <span className="card-subheading">{t.step3Sub}</span>
          </div>
        </div>

        <button
          type="button"
          className="btn-royal-gold"
          onClick={onRunValuation}
          disabled={isEvaluating || !selectedDistrict || !selectedCrop}
        >
          {isEvaluating ? (
            <>
              <span className="spinner-border"></span>
              {t.evaluating}
            </>
          ) : (
            <>
              <Sparkles size={16} /> {t.executeValuation}
            </>
          )}
        </button>
      </div>

      {valuation ? (
        <div className={`valuation-result-content result-${valuation.verdictClass}`}>
          <div className="verdict-banner-wrap">
            <div className="risk-gauge-container">
              <div className="risk-gauge-dial">
                <svg className="radial-progress" viewBox="0 0 120 120">
                  <circle
                    className="gauge-bg"
                    cx="60"
                    cy="60"
                    r="48"
                    strokeWidth="10"
                  />
                  <circle
                    className={`gauge-fill gauge-${valuation.verdictClass}`}
                    cx="60"
                    cy="60"
                    r="48"
                    strokeWidth="10"
                    strokeDasharray={301.6}
                    strokeDashoffset={301.6 - (301.6 * (100 - valuation.riskPercentage)) / 100}
                  />
                </svg>
                <div className="gauge-text-inner">
                  <span className="risk-number">{valuation.riskPercentage}%</span>
                  <span className="risk-sub">{t.riskFactor}</span>
                </div>
              </div>
            </div>

            <div className="verdict-text-group">
              <span className="verdict-eyebrow">{t.finalConclusion}</span>
              <h3 className={`verdict-heading verdict-text-${valuation.verdictClass}`}>
                {valuation.isRecommended ? (
                  <>
                    <CheckCircle className="inline-icon" size={28} /> {valuation.verdict}
                  </>
                ) : (
                  <>
                    <AlertTriangle className="inline-icon" size={28} /> {valuation.verdict}
                  </>
                )}
              </h3>
              <p className="tier-badge">{valuation.tierLabel}</p>
              <div className="verdict-summary-pills">
                <span className="summary-pill">
                  <strong>{isTa ? "மாவட்டம்:" : "District:"}</strong> {districtDisplayName}
                </span>
                <span className="summary-pill">
                  <strong>{isTa ? "பயிர்:" : "Crop:"}</strong> {cropDisplayName}
                </span>
                <span className="summary-pill">
                  <strong>{isTa ? "காலம்:" : "Duration:"}</strong> {selectedCrop.durationDays}
                </span>
                <span className="summary-pill">
                  <strong>{isTa ? "தொலைஅளவியல்:" : "Telemetry:"}</strong> {valuation.telemetryStatusMode}
                </span>
              </div>
            </div>
          </div>

          {/* EXACT SCIENTIFIC SUB-FACTOR BREAKDOWN */}
          {valuation.subScores && (
            <div className="subscores-breakdown-card">
              <span className="subscores-title">
                {isTa ? "🔬 துல்லியமான காரணிகள் அடிப்படையிலான இடர் பகுப்பாய்வு:" : "🔬 Exact Scientific Sub-Factor Risk Breakdown:"}
              </span>
              <div className="subscores-grid">
                <div className="subscore-item">
                  <div className="subscore-header">
                    <span className="subscore-icon"><Layers size={14} /></span>
                    <span className="subscore-label">{t.subScoreSoil}</span>
                  </div>
                  <div className="subscore-progress-wrap">
                    <div
                      className={`subscore-bar ${valuation.subScores.soilRisk > 50 ? "bar-danger" : "bar-success"}`}
                      style={{ width: `${valuation.subScores.soilRisk}%` }}
                    ></div>
                  </div>
                  <strong className="subscore-val">{valuation.subScores.soilRisk}%</strong>
                </div>

                <div className="subscore-item">
                  <div className="subscore-header">
                    <span className="subscore-icon"><Droplets size={14} /></span>
                    <span className="subscore-label">{t.subScoreWater}</span>
                  </div>
                  <div className="subscore-progress-wrap">
                    <div
                      className={`subscore-bar ${valuation.subScores.waterRisk > 50 ? "bar-danger" : "bar-success"}`}
                      style={{ width: `${valuation.subScores.waterRisk}%` }}
                    ></div>
                  </div>
                  <strong className="subscore-val">{valuation.subScores.waterRisk}%</strong>
                </div>

                <div className="subscore-item">
                  <div className="subscore-header">
                    <span className="subscore-icon"><Clock size={14} /></span>
                    <span className="subscore-label">{t.subScoreClimate}</span>
                  </div>
                  <div className="subscore-progress-wrap">
                    <div
                      className={`subscore-bar ${valuation.subScores.climateRisk > 50 ? "bar-danger" : "bar-success"}`}
                      style={{ width: `${valuation.subScores.climateRisk}%` }}
                    ></div>
                  </div>
                  <strong className="subscore-val">{valuation.subScores.climateRisk}%</strong>
                </div>

                <div className="subscore-item">
                  <div className="subscore-header">
                    <span className="subscore-icon"><Cpu size={14} /></span>
                    <span className="subscore-label">{t.subScoreSensor}</span>
                  </div>
                  <div className="subscore-progress-wrap">
                    <div
                      className={`subscore-bar ${valuation.subScores.telemetryRisk > 50 ? "bar-danger" : "bar-success"}`}
                      style={{ width: `${valuation.subScores.telemetryRisk}%` }}
                    ></div>
                  </div>
                  <strong className="subscore-val">{valuation.subScores.telemetryRisk}%</strong>
                </div>
              </div>
            </div>
          )}

          <div className="valuation-factors-grid">
            <div className="factor-col positive-col">
              <h4 className="factor-heading">
                <CheckCircle size={15} /> {t.evaluatedAlignments}
              </h4>
              <ul className="factors-list">
                {valuation.reasons.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            {valuation.limitingFactors && valuation.limitingFactors.length > 0 && (
              <div className="factor-col warning-col">
                <h4 className="factor-heading">
                  <AlertTriangle size={15} /> {t.limitingFactors}
                </h4>
                <ul className="factors-list">
                  {valuation.limitingFactors.map((l, i) => (
                    <li key={i}>{l}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Conditional Routing: If RECOMMENDED -> Redirect Button to Deep Advisory */}
          {valuation.isRecommended ? (
            <div className="recommendation-callout-box">
              <div className="callout-inner">
                <div>
                  <h4 className="callout-title">
                    {t.calloutTitle} {districtDisplayName}
                  </h4>
                  <p className="callout-desc">{t.calloutDesc}</p>
                </div>
                <button
                  type="button"
                  className="btn-royal-gold btn-lg pulse-glow"
                  onClick={onProceedToAdvisory}
                >
                  {t.proceedAdvisory} <ArrowRight size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="rejection-callout-box">
              <div className="rejection-inner">
                <div className="rejection-badge">
                  <ShieldAlert size={20} />
                  <span>{t.notAdvisedBadge}</span>
                </div>
                <p className="rejection-desc">{t.notAdvisedDesc}</p>

                {valuation.alternativeCrops && valuation.alternativeCrops.length > 0 && (
                  <div className="alternatives-section">
                    <span className="alt-title">
                      {t.recommendedAlt} {districtDisplayName}:
                    </span>
                    <div className="alt-chips-row">
                      {valuation.alternativeCrops.map((alt, idx) => (
                        <div key={idx} className="alt-chip">
                          <span className="alt-emoji">{alt.emoji}</span>
                          <div>
                            <strong>{alt.name}</strong>
                            <span className="alt-reason">{alt.reason}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="valuation-idle-placeholder">
          <Sparkles className="idle-sparkle" size={36} />
          <p className="idle-text">{t.idleText}</p>
        </div>
      )}
    </div>
  );
}
