export interface SensorReading {
  name: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  warningThreshold: number;
  criticalThreshold: number;
  icon: string;
  color: string;
}

export const initialSensorData: SensorReading[] = [
  { name: "Temperature", value: 24, unit: "°C", min: -10, max: 80, warningThreshold: 50, criticalThreshold: 65, icon: "Thermometer", color: "#ef4444" },
  { name: "Humidity", value: 45, unit: "%", min: 0, max: 100, warningThreshold: 75, criticalThreshold: 90, icon: "Droplets", color: "#3b82f6" },
  { name: "CO Level", value: 12, unit: "ppm", min: 0, max: 500, warningThreshold: 50, criticalThreshold: 100, icon: "Wind", color: "#f97316" },
  { name: "H2S Level", value: 0.5, unit: "ppm", min: 0, max: 50, warningThreshold: 10, criticalThreshold: 20, icon: "CloudFog", color: "#a855f7" },
  { name: "Methane", value: 1.2, unit: "%LEL", min: 0, max: 100, warningThreshold: 20, criticalThreshold: 40, icon: "Flame", color: "#eab308" },
  { name: "Noise Level", value: 42, unit: "dB", min: 0, max: 140, warningThreshold: 85, criticalThreshold: 100, icon: "Volume2", color: "#10b981" },
  { name: "Vibration", value: 0.02, unit: "g", min: 0, max: 5, warningThreshold: 1.5, criticalThreshold: 3, icon: "Activity", color: "#06b6d4" },
  { name: "Air Quality", value: 85, unit: "AQI", min: 0, max: 500, warningThreshold: 150, criticalThreshold: 300, icon: "Gauge", color: "#84cc16" }
];

export const rescueAlerts = [
  { id: 1, type: "critical", message: "High temperature detected in Sector 7", timestamp: "14:32:15", source: "Temperature Sensor" },
  { id: 2, type: "warning", message: "CO levels elevated near collapse zone", timestamp: "14:31:42", source: "Gas Sensor" },
  { id: 3, type: "info", message: "Thermal scan complete: 2 potential survivors identified", timestamp: "14:30:58", source: "AI - Thermal Model" },
  { id: 4, type: "success", message: "Safe corridor identified: Route B-7", timestamp: "14:30:15", source: "AI - Structural Model" },
  { id: 5, type: "critical", message: "Structural vibration anomaly detected", timestamp: "14:29:48", source: "MPU6050 IMU" },
  { id: 6, type: "info", message: "Acoustic analysis: No survivor sounds in current sector", timestamp: "14:28:30", source: "AI - Acoustic Model" },
  { id: 7, type: "warning", message: "Humidity rising above safe threshold", timestamp: "14:27:55", source: "Humidity Sensor" },
  { id: 8, type: "success", message: "Survivor confirmed: Sector 3, probability 94.2%", timestamp: "14:26:20", source: "AI - Multi-Model Fusion" }
];
