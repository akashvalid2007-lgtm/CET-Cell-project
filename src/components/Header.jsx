import React from "react";
import { ShieldCheck, WifiOff, Cpu, Compass, Globe } from "lucide-react";
import { UI_TRANSLATIONS } from "../data/translations";

export function Header({ isConnected, isSimulated, portName, language, onToggleLanguage }) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  return (
    <header className="royal-header">
      <div className="royal-header-content">
        <div className="royal-brand">
          <div className="royal-crest">
            <Compass className="crest-icon" size={28} />
          </div>
          <div>
            <div className="brand-super" dangerouslySetInnerHTML={{ __html: t.brandSuper }} />
            <h1 className="brand-title">
              {t.brandTitle} <span>{t.brandTitleSpan}</span>
            </h1>
            <p className="brand-subtitle">{t.brandSubtitle}</p>
          </div>
        </div>

        <div className="royal-badges">
          {/* Language Switcher Toggle */}
          <button
            type="button"
            className="status-pill language-toggle-pill"
            onClick={onToggleLanguage}
            title={language === "en" ? "தமிழில் மாற்றவும்" : "Switch to English"}
          >
            <Globe size={14} />
            <span className="lang-text">{language === "en" ? "தமிழ்" : "English"}</span>
          </button>

          <div className="status-pill flight-ready">
            <WifiOff size={14} />
            <span>{t.flightReady}</span>
          </div>

          <div className="status-pill tnau-verified">
            <ShieldCheck size={14} />
            <span>{t.tnauVerified}</span>
          </div>

          <div className={`status-pill hardware-status ${isConnected ? "hardware-online" : "hardware-idle"}`}>
            <Cpu size={14} />
            <span>
              {isConnected
                ? isSimulated
                  ? t.virtualLinked
                  : t.hardwareOnline
                : t.hardwareIdle}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
