import React from "react";
import { Sprout, Clock, Droplets, CheckCircle2 } from "lucide-react";
import { TAMIL_NADU_CROPS } from "../data/tamilNaduData";
import { UI_TRANSLATIONS } from "../data/translations";

export function CropSelector({ selectedCrop, onSelectCrop, language = "en" }) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const isTa = language === "ta";

  const handleChange = (e) => {
    const found = TAMIL_NADU_CROPS.find((c) => c.id === e.target.value);
    if (found) onSelectCrop(found);
  };

  const cropDisplayName = (c) => {
    if (isTa) {
      return `${c.emoji} ${c.tamilName} (${c.name})`;
    }
    return `${c.emoji} ${c.name} (${c.tamilName})`;
  };

  const formatWater = (liters) => {
    if (isTa) {
      const lakhs = (liters / 100000).toFixed(1);
      return `~${lakhs} லட்சம் லிட்டர் / ஏக்கர்`;
    }
    const millions = (liters / 1000000).toFixed(1);
    return `~${millions}M Liters / Acre`;
  };

  return (
    <div className="royal-card crop-card">
      <div className="card-header-line">
        <div className="card-title-group">
          <Sprout className="gold-accent-icon" size={20} />
          <h2 className="card-heading">{t.step2Heading}</h2>
        </div>
        <span className="count-badge">{t.countCrops}</span>
      </div>

      <div className="field-group">
        <label htmlFor="crop-select" className="field-label">
          {t.cropSelection}
        </label>
        <div className="select-wrapper">
          <select
            id="crop-select"
            className="royal-select"
            value={selectedCrop?.id || ""}
            onChange={handleChange}
          >
            {TAMIL_NADU_CROPS.map((c) => (
              <option key={c.id} value={c.id}>
                {cropDisplayName(c)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedCrop && (
        <div className="crop-factsheet">
          <div className="crop-meta-row">
            <div className="meta-pill">
              <span className="crop-emoji-display">{selectedCrop.emoji}</span>
              <div>
                <span className="meta-sub">{t.cropLifecycle}</span>
                <strong className="meta-val">
                  <Clock size={13} /> {selectedCrop.durationDays}
                </strong>
              </div>
            </div>

            <div className="meta-pill">
              <div>
                <span className="meta-sub">{t.waterDemand}</span>
                <strong className="meta-val">
                  <Droplets size={13} /> {formatWater(selectedCrop.waterRequiredLitersPerAcre)}
                </strong>
              </div>
            </div>
          </div>

          <div className="fact-item full-width">
            <span className="fact-label">{t.tnauCultivars}</span>
            <span className="fact-value">{selectedCrop.popularVarieties}</span>
          </div>

          <div className="fact-item full-width">
            <span className="fact-label">
              <CheckCircle2 size={13} className="text-emerald" /> {t.optimalSoil}
            </span>
            <p className="fact-text-minor">{selectedCrop.idealSoils.join(", ")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
