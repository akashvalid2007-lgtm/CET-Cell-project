// Hardware Serial Telemetry Manager for ESP32 / ESP8266 / Arduino
// Connects via Web Serial API (USB COM Port) or Offline Simulation Mode

class HardwareSerialManager {
  constructor() {
    this.port = null;
    this.reader = null;
    this.keepReading = false;
    this.simInterval = null;
    this.isConnected = false;
    this.isSimulated = false;
  }

  // Check if Web Serial API is supported in this browser/desktop shell
  isWebSerialSupported() {
    return "serial" in navigator;
  }

  // Connect to physical ESP/Arduino via USB COM Port (115200 Baud)
  async connectSerial({ onData, onStatusChange, onError }) {
    if (!this.isWebSerialSupported()) {
      if (onError) {
        onError("Web Serial API is not supported in this browser. Please use Chrome, Edge, or the Electron Desktop Shell.");
      }
      return false;
    }

    try {
      this.port = await navigator.serial.requestPort();
      await this.port.open({ baudRate: 115200 });
      this.isConnected = true;
      this.isSimulated = false;

      if (onStatusChange) {
        onStatusChange({
          isConnected: true,
          isSimulated: false,
          portName: "USB COM Port (115200 Baud)"
        });
      }

      this.readSerialStream(onData, onError);
      return true;
    } catch (err) {
      this.isConnected = false;
      if (onError) {
        onError(`Connection failed: ${err.message || "Port selection was cancelled."}`);
      }
      return false;
    }
  }

  // Read line-delimited stream from microcontroller
  async readSerialStream(onData, onError) {
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
    this.reader = textDecoder.readable.getReader();
    let buffer = "";

    try {
      this.keepReading = true;
      while (this.keepReading) {
        const { value, done } = await this.reader.read();
        if (done) {
          break;
        }
        if (value) {
          buffer += value;
          const lines = buffer.split("\n");
          buffer = lines.pop(); // keep remainder

          for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed.length > 0) {
              const parsed = this.parseTelemetryLine(trimmed);
              if (parsed && onData) {
                onData(parsed);
              }
            }
          }
        }
      }
    } catch (err) {
      if (onError) onError(`Serial read error: ${err.message}`);
    } finally {
      this.reader.releaseLock();
    }
  }

  // Parse JSON or comma-separated CSV from Arduino
  parseTelemetryLine(line) {
    // 1. Try JSON
    if (line.startsWith("{") && line.endsWith("}")) {
      try {
        const json = JSON.parse(line);
        return {
          soilMoisture: parseFloat(json.soil_moisture ?? json.moisture ?? json.soil ?? 45.0).toFixed(1),
          temperature: parseFloat(json.temperature ?? json.temp ?? 28.5).toFixed(1),
          humidity: parseFloat(json.humidity ?? json.hum ?? 65.0).toFixed(1),
          rainDetected: Boolean(json.rain ?? json.rain_detected ?? false),
          raw: line
        };
      } catch (e) {
        // Fall through to CSV
      }
    }

    // 2. Try CSV: "soil_moisture,temperature,humidity,rain"
    const parts = line.split(",").map((p) => p.trim());
    if (parts.length >= 3) {
      const moisture = parseFloat(parts[0]);
      const temp = parseFloat(parts[1]);
      const hum = parseFloat(parts[2]);
      const rain = parts[3] ? parts[3] === "1" || parts[3].toLowerCase() === "true" : false;

      if (!isNaN(moisture) && !isNaN(temp)) {
        return {
          soilMoisture: moisture.toFixed(1),
          temperature: temp.toFixed(1),
          humidity: !isNaN(hum) ? hum.toFixed(1) : "60.0",
          rainDetected: rain,
          raw: line
        };
      }
    }

    return null;
  }

  // Disconnect physical COM port
  async disconnectSerial({ onStatusChange }) {
    this.keepReading = false;
    if (this.reader) {
      await this.reader.cancel();
    }
    if (this.port) {
      await this.port.close();
      this.port = null;
    }
    this.isConnected = false;
    this.isSimulated = false;

    if (onStatusChange) {
      onStatusChange({
        isConnected: false,
        isSimulated: false,
        portName: null
      });
    }
  }

  // Start Offline Simulated ESP Telemetry (for testing without physical board)
  startSimulation({ onData, onStatusChange }) {
    if (this.simInterval) clearInterval(this.simInterval);

    this.isConnected = true;
    this.isSimulated = true;

    if (onStatusChange) {
      onStatusChange({
        isConnected: true,
        isSimulated: true,
        portName: "Virtual ESP32 Simulator (Active)"
      });
    }

    // Produce realistic fluctuating agricultural readings every 1.5 seconds
    let baseMoisture = 52.4;
    let baseTemp = 29.8;
    let baseHum = 64.2;

    this.simInterval = setInterval(() => {
      baseMoisture += (Math.random() - 0.48) * 0.8;
      baseMoisture = Math.max(20, Math.min(85, baseMoisture));

      baseTemp += (Math.random() - 0.5) * 0.4;
      baseTemp = Math.max(22, Math.min(40, baseTemp));

      baseHum += (Math.random() - 0.5) * 0.6;
      baseHum = Math.max(35, Math.min(92, baseHum));

      const simulatedPacket = {
        soilMoisture: baseMoisture.toFixed(1),
        temperature: baseTemp.toFixed(1),
        humidity: baseHum.toFixed(1),
        rainDetected: Math.random() > 0.85,
        raw: "SIMULATED_ESP_PACKET"
      };

      if (onData) onData(simulatedPacket);
    }, 1500);
  }

  // Stop simulation
  stopSimulation({ onStatusChange }) {
    if (this.simInterval) {
      clearInterval(this.simInterval);
      this.simInterval = null;
    }
    this.isConnected = false;
    this.isSimulated = false;

    if (onStatusChange) {
      onStatusChange({
        isConnected: false,
        isSimulated: false,
        portName: null
      });
    }
  }
}

export const serialManager = new HardwareSerialManager();
