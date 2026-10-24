import React from "react";
import { MapPin, Layers, Droplets, CloudSun } from "lucide-react";
import { TAMIL_NADU_DISTRICTS } from "../data/tamilNaduData";
import { UI_TRANSLATIONS, DISTRICT_NAMES_TA, DISTRICT_ZONES_TA } from "../data/translations";

export function DistrictSelector({ selectedDistrict, onSelectDistrict, language = "en" }) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const isTa = language === "ta";

  const handleChange = (e) => {
    const found = TAMIL_NADU_DISTRICTS.find((d) => d.id === e.target.value);
    if (found) onSelectDistrict(found);
  };

  const getDistrictDisplayName = (d) => {
    if (isTa) {
      const taName = DISTRICT_NAMES_TA[d.id] || d.name;
      const taZone = DISTRICT_ZONES_TA[d.id] || d.zone;
      return `${taName} (${taZone})`;
    }
    return `${d.name} (${d.zone})`;
  };

  const activeName = isTa ? DISTRICT_NAMES_TA[selectedDistrict?.id] || selectedDistrict?.name : selectedDistrict?.name;
  const activeZone = isTa ? DISTRICT_ZONES_TA[selectedDistrict?.id] || selectedDistrict?.zone : selectedDistrict?.zone;

  return (
    <div className="royal-card district-card">
      <div className="card-header-line">
        <div className="card-title-group">
          <MapPin className="gold-accent-icon" size={20} />
          <h2 className="card-heading">{t.step1Heading}</h2>
        </div>
        <span className="count-badge">{t.countDistricts}</span>
      </div>

      <div className="field-group">
        <label htmlFor="district-select" className="field-label">
          {t.adminDistrict}
        </label>
        <div className="select-wrapper">
          <select
            id="district-select"
            className="royal-select"
            value={selectedDistrict?.id || ""}
            onChange={handleChange}
          >
            {TAMIL_NADU_DISTRICTS.map((d) => (
              <option key={d.id} value={d.id}>
                {getDistrictDisplayName(d)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedDistrict && (
        <div className="district-factsheet">
          <div className="fact-item">
            <span className="fact-label">
              <Layers size={14} /> {t.dominantSoil}
            </span>
            <span className="fact-value">
              {selectedDistrict.dominantSoils.join(", ")}
            </span>
          </div>

          <div className="fact-item">
            <span className="fact-label">
              <Droplets size={14} /> {t.annualRain}
            </span>
            <span className="fact-value">
              {selectedDistrict.annualRainfallMm} {isTa ? "மி.மீ / ஆண்டு" : "mm / year"}
            </span>
          </div>

          <div className="fact-item full-width">
            <span className="fact-label">{t.sandMineral}</span>
            <p className="fact-text-minor">{selectedDistrict.sandComposition}</p>
          </div>

          <div className="fact-item full-width season-note">
            <span className="fact-label">
              <CloudSun size={14} /> {t.upcomingClimate}
            </span>
            <p className="fact-text-minor highlight-gold">
              {selectedDistrict.upcomingSeasonSummary}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
