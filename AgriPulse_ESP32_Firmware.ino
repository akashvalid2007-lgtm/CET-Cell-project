/*
  =============================================================================
  AgriPulse™ IoT Sensor Firmware for ESP32 / Arduino
  Sensors:
    1. Capacitive / Resistive Soil Moisture Sensor (Analog Pin 34 / A0)
    2. DHT11 / DHT22 Ambient Temperature & Humidity Sensor (GPIO 4 / Pin 2)
    3. FC-37 / YL-83 Raindrop Sensor (Digital Pin 5 / Analog Pin 35)
  Baud Rate: 115200 Baud
  Protocol: JSON Line-Delimited Telemetry
  =============================================================================
*/

#include <DHT.h>

// PIN CONFIGURATION
#define DHTPIN 4           // Digital GPIO connected to DHT11 Data Pin
#define DHTTYPE DHT11      // Sensor Type: DHT11 (or DHT22)
#define SOIL_PIN 34        // ADC pin for Soil Moisture (ESP32: GPIO 34, Arduino: A0)
#define RAIN_PIN 5         // Digital or Analog pin for Rain Sensor (LOW = Rain Detected)

// Calibration constants for Soil Moisture Sensor (Adjust based on your dry/wet calibration)
const int DRY_SENSOR_VALUE = 3200;  // Value in air (ESP32 12-bit ADC: 0-4095)
const int WET_SENSOR_VALUE = 1400;  // Value submerged in water

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  while (!Serial) {
    ; // Wait for serial port to initialize
  }

  pinMode(SOIL_PIN, INPUT);
  pinMode(RAIN_PIN, INPUT);
  dht.begin();

  // Initial startup announcement
  delay(1000);
  Serial.println("{\"status\":\"AgriPulse ESP32 Node Initialized\",\"baud\":115200}");
}

void loop() {
  // 1. Read Soil Moisture (Analog ADC)
  int rawSoil = analogRead(SOIL_PIN);
  // Map raw ADC to percentage (0% to 100%)
  float soilMoisturePct = map(rawSoil, DRY_SENSOR_VALUE, WET_SENSOR_VALUE, 0, 100);
  soilMoisturePct = constrain(soilMoisturePct, 0.0, 100.0);

  // 2. Read DHT11 Temperature & Humidity
  float temperatureC = dht.readTemperature();
  float humidityPct = dht.readHumidity();

  // Validate DHT readings
  if (isnan(temperatureC) || isnan(humidityPct)) {
    temperatureC = 29.5; // Fallback safe baseline if sensor wire is loose
    humidityPct = 65.0;
  }

  // 3. Read Rain Sensor
  // Most FC-37 modules pull LOW when rain is detected on the probe
  int rainReading = digitalRead(RAIN_PIN);
  bool rainDetected = (rainReading == LOW);

  // 4. Output JSON packet over Serial for AgriPulse Desktop App
  Serial.print("{\"soil_moisture\":");
  Serial.print(soilMoisturePct, 1);
  Serial.print(",\"temperature\":");
  Serial.print(temperatureC, 1);
  Serial.print(",\"humidity\":");
  Serial.print(humidityPct, 1);
  Serial.print(",\"rain_detected\":");
  Serial.print(rainDetected ? "true" : "false");
  Serial.println("}");

  // Transmit telemetry every 1.5 seconds
  delay(1500);
}
