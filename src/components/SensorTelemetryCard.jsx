import React from "react";
import { Cpu, Droplet, Thermometer, CloudRain, Cable, RefreshCw, Power } from "lucide-react";
import { UI_TRANSLATIONS } from "../data/translations";

export function SensorTelemetryCard({
  telemetry,
  isConnected,
  isSimulated,
  portName,
  onConnectSerial,
  onDisconnectSerial,
  onToggleSimulation,
  errorMessage,
  language = "en"
}) {
  const t = UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
  const isTa = language === "ta";
  const hasValues = isConnected && telemetry !== null;

  return (
    <div className={`royal-card sensor-telemetry-box ${isConnected ? "telemetry-active-glow" : "telemetry-idle"}`}>
      <div className="card-header-line">
        <div className="card-title-group">
          <Cpu className="gold-accent-icon" size={20} />
          <div>
            <h2 className="card-heading">{t.telemetryHeading}</h2>
            <span className="card-subheading">{t.telemetrySub}</span>
          </div>
        </div>

        <div className="telemetry-actions">
          {!isConnected ? (
            <>
              <button
                type="button"
                className="btn-royal-secondary btn-sm"
                onClick={onConnectSerial}
                title="Connect physical Arduino/ESP via USB COM port (115200 Baud)"
              >
                <Cable size={14} /> {t.connectUsb}
              </button>
              <button
                type="button"
                className="btn-royal-outline btn-sm"
                onClick={onToggleSimulation}
                title="Simulate active ESP stream for testing when board is not plugged in"
              >
                <RefreshCw size={14} /> {t.simulateEsp}
              </button>
            </>
          ) : (
            <div className="connected-badge-group">
              <span className="active-stream-pill">
                <span className="pulsing-green-dot"></span>
                {portName || t.streamActive}
              </span>
              <button
                type="button"
                className="btn-royal-danger btn-sm"
                onClick={isSimulated ? onToggleSimulation : onDisconnectSerial}
              >
                <Power size={14} /> {t.disconnect}
              </button>
            </div>
          )}
        </div>
      </div>

      {errorMessage && (
        <div className="serial-alert-banner">
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 4 Sensor Pods: Empty dashes by default until connected & executed */}
      <div className="sensor-pods-grid">
        {/* POD 1: Soil Moisture */}
        <div className={`sensor-pod ${hasValues ? "pod-live" : "pod-empty"}`}>
          <div className="pod-header">
            <span className="pod-icon-wrap moisture-icon">
              <Droplet size={18} />
            </span>
            <span className="pod-title">{t.soilMoisture}</span>
          </div>
          <div className="pod-value-display">
            {hasValues ? (
              <>
                <span className="pod-number">{telemetry.soilMoisture}</span>
                <span className="pod-unit">%</span>
              </>
            ) : (
              <span className="pod-placeholder">--.- %</span>
            )}
          </div>
          <div className="pod-footer">
            <span className="pod-status-text">
              {hasValues
                ? parseFloat(telemetry.soilMoisture) < 30
                  ? t.statusLow
                  : parseFloat(telemetry.soilMoisture) > 70
                  ? t.statusHigh
                  : t.statusOptimal
                : t.awaitingExecution}
            </span>
          </div>
        </div>

        {/* POD 2: DHT11 Ambient Temperature */}
        <div className={`sensor-pod ${hasValues ? "pod-live" : "pod-empty"}`}>
          <div className="pod-header">
            <span className="pod-icon-wrap temp-icon">
              <Thermometer size={18} />
            </span>
            <span className="pod-title">{t.dhtTemp}</span>
          </div>
          <div className="pod-value-display">
            {hasValues ? (
              <>
                <span className="pod-number">{telemetry.temperature}</span>
                <span className="pod-unit">°C</span>
              </>
            ) : (
              <span className="pod-placeholder">--.- °C</span>
            )}
          </div>
          <div className="pod-footer">
            <span className="pod-status-text">
              {hasValues ? t.ambientTemp : t.awaitingExecution}
            </span>
          </div>
        </div>

        {/* POD 3: DHT11 Relative Humidity */}
        <div className={`sensor-pod ${hasValues ? "pod-live" : "pod-empty"}`}>
          <div className="pod-header">
            <span className="pod-icon-wrap hum-icon">
              <Droplet size={18} />
            </span>
            <span className="pod-title">{t.dhtHum}</span>
          </div>
          <div className="pod-value-display">
            {hasValues ? (
              <>
                <span className="pod-number">{telemetry.humidity}</span>
                <span className="pod-unit">% RH</span>
              </>
            ) : (
              <span className="pod-placeholder">--.- % RH</span>
            )}
          </div>
          <div className="pod-footer">
            <span className="pod-status-text">
              {hasValues ? t.relAirMoist : t.awaitingExecution}
            </span>
          </div>
        </div>

        {/* POD 4: Rain Sensor */}
        <div className={`sensor-pod ${hasValues ? "pod-live" : "pod-empty"}`}>
          <div className="pod-header">
            <span className="pod-icon-wrap rain-icon">
              <CloudRain size={18} />
            </span>
            <span className="pod-title">{t.rainSensor}</span>
          </div>
          <div className="pod-value-display">
            {hasValues ? (
              <span className={`rain-tag ${telemetry.rainDetected ? "rain-detected" : "rain-dry"}`}>
                {telemetry.rainDetected ? t.rainDetected : t.rainDry}
              </span>
            ) : (
              <span className="pod-placeholder">--.- ({isTa ? "காத்திருக்கிறது" : "WAITING"})</span>
            )}
          </div>
          <div className="pod-footer">
            <span className="pod-status-text">
              {hasValues
                ? telemetry.rainDetected
                  ? t.rainActive
                  : t.zeroRain
                : t.awaitingExecution}
            </span>
          </div>
        </div>
      </div>

      <div className="sensor-box-note">
        {!isConnected ? (
          <p className="sensor-note-text amber-pulse">
            {t.telemetryIdleNote}
          </p>
        ) : (
          <p className="sensor-note-text emerald-stream">
            {t.telemetryActiveNote}
          </p>
        )}
      </div>
    </div>
  );
}
