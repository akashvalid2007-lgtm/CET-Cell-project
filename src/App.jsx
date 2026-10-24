import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { DistrictSelector } from "./components/DistrictSelector";
import { CropSelector } from "./components/CropSelector";
import { SensorTelemetryCard } from "./components/SensorTelemetryCard";
import { ValuationResultCard } from "./components/ValuationResultCard";
import { AdvisoryPage } from "./components/AdvisoryPage";
import { TAMIL_NADU_DISTRICTS, TAMIL_NADU_CROPS } from "./data/tamilNaduData";
import { evaluateCropCultivation } from "./utils/aiValuationEngine";
import { serialManager } from "./utils/serialManager";
import { UI_TRANSLATIONS } from "./data/translations";

export default function App() {
  const [activeView, setActiveView] = useState("dashboard"); // "dashboard" | "advisory"
  const [selectedDistrict, setSelectedDistrict] = useState(TAMIL_NADU_DISTRICTS[25]); // Default: Thanjavur (Cauvery Delta)
  const [selectedCrop, setSelectedCrop] = useState(TAMIL_NADU_CROPS[0]); // Default: 🌾 Paddy (Rice)
  
  // Language State: "en" | "ta" (Tamil)
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("agripulse_lang") || "en";
  });

  // Hardware Telemetry State (Starts empty / null as requested)
  const [telemetry, setTelemetry] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSimulated, setIsSimulated] = useState(false);
  const [portName, setPortName] = useState(null);
  const [serialError, setSerialError] = useState(null);

  // AI Valuation State
  const [valuation, setValuation] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;

  // Language toggle handler
  const handleToggleLanguage = () => {
    const newLang = language === "en" ? "ta" : "en";
    setLanguage(newLang);
    localStorage.setItem("agripulse_lang", newLang);

    // If a valuation is already computed, re-evaluate with the new language
    if (valuation && selectedDistrict && selectedCrop) {
      const updated = evaluateCropCultivation({
        district: selectedDistrict,
        crop: selectedCrop,
        telemetry: isConnected && telemetry ? { ...telemetry, isConnected: true } : null,
        language: newLang
      });
      setValuation(updated);
    }
  };

  // Connect Physical Arduino/ESP over USB COM
  const handleConnectSerial = async () => {
    setSerialError(null);
    await serialManager.connectSerial({
      onData: (data) => {
        setTelemetry(data);
      },
      onStatusChange: (status) => {
        setIsConnected(status.isConnected);
        setIsSimulated(status.isSimulated);
        setPortName(status.portName);
      },
      onError: (err) => {
        setSerialError(err);
      }
    });
  };

  // Disconnect Physical Arduino
  const handleDisconnectSerial = async () => {
    await serialManager.disconnectSerial({
      onStatusChange: (status) => {
        setIsConnected(status.isConnected);
        setIsSimulated(status.isSimulated);
        setPortName(status.portName);
        setTelemetry(null); // Return to empty state
      }
    });
  };

  // Toggle Virtual Simulation for field testing in offline airplane mode
  const handleToggleSimulation = () => {
    if (isSimulated && isConnected) {
      serialManager.stopSimulation({
        onStatusChange: (status) => {
          setIsConnected(false);
          setIsSimulated(false);
          setPortName(null);
          setTelemetry(null);
        }
      });
    } else {
      setSerialError(null);
      serialManager.startSimulation({
        onData: (data) => {
          setTelemetry(data);
        },
        onStatusChange: (status) => {
          setIsConnected(status.isConnected);
          setIsSimulated(status.isSimulated);
          setPortName(status.portName);
        }
      });
    }
  };

  // Run AI Valuation (Calculates exact mathematical risk %)
  const handleRunValuation = () => {
    if (!selectedDistrict || !selectedCrop) return;
    setIsEvaluating(true);
    setValuation(null);

    setTimeout(() => {
      const result = evaluateCropCultivation({
        district: selectedDistrict,
        crop: selectedCrop,
        telemetry: isConnected && telemetry ? { ...telemetry, isConnected: true } : null,
        language
      });
      setValuation(result);
      setIsEvaluating(false);
    }, 400);
  };

  // Invalidate previous valuation if crop or district changes
  const handleSelectDistrict = (d) => {
    setSelectedDistrict(d);
    setValuation(null);
  };

  const handleSelectCrop = (c) => {
    setSelectedCrop(c);
    setValuation(null);
  };

  // Navigation handlers
  const handleProceedToAdvisory = () => {
    setActiveView("advisory");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToDashboard = () => {
    setActiveView("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="agripulse-app-shell">
      <Header
        isConnected={isConnected}
        isSimulated={isSimulated}
        portName={portName}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      <main className="royal-main-content">
        {activeView === "dashboard" ? (
          <div className="dashboard-layout">
            <div className="dashboard-grid-two-col">
              {/* Box 1: District Selector */}
              <DistrictSelector
                selectedDistrict={selectedDistrict}
                onSelectDistrict={handleSelectDistrict}
                language={language}
              />

              {/* Box 2: Crop Selector */}
              <CropSelector
                selectedCrop={selectedCrop}
                onSelectCrop={handleSelectCrop}
                language={language}
              />
            </div>

            {/* Box 3: Hardware Sensor Telemetry Box (Empty until connected) */}
            <SensorTelemetryCard
              telemetry={telemetry}
              isConnected={isConnected}
              isSimulated={isSimulated}
              portName={portName}
              onConnectSerial={handleConnectSerial}
              onDisconnectSerial={handleDisconnectSerial}
              onToggleSimulation={handleToggleSimulation}
              errorMessage={serialError}
              language={language}
            />

            {/* Box 4: AI Valuation Engine & Verdict Card */}
            <ValuationResultCard
              valuation={valuation}
              isEvaluating={isEvaluating}
              onRunValuation={handleRunValuation}
              onProceedToAdvisory={handleProceedToAdvisory}
              selectedDistrict={selectedDistrict}
              selectedCrop={selectedCrop}
              telemetry={telemetry}
              language={language}
            />
          </div>
        ) : (
          <AdvisoryPage
            district={selectedDistrict}
            crop={selectedCrop}
            valuation={valuation}
            onBackToDashboard={handleBackToDashboard}
            language={language}
          />
        )}
      </main>

      <footer className="royal-footer">
        <div className="footer-content">
          <p className="footer-title">{t.footerTitle}</p>
          <p className="footer-sub">{t.footerSub}</p>
        </div>
      </footer>
    </div>
  );
}
