import type { WeatherCondition } from "./weather";

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

export interface AIModelOutput {
  model: string;
  status: "active" | "processing" | "idle";
  output: string;
  confidence: number;
}

export interface Alert {
  id: number;
  type: "critical" | "warning" | "info" | "success";
  message: string;
  timestamp: string;
  source: string;
}

export interface Communication {
  primaryMethod: "walkie-talkie" | "phone" | "satellite";
  walkieTalkie?: {
    frequency: string;
    channels: number;
    range: string;
  };
  phoneNumbers: string[];
  satellitePhone?: string;
}

export interface Facility {
  name: string;
  type: "hospital" | "fire_station" | "police_station" | "civil_defense" | "government_building" | "military_base" | "emergency_shelter";
  distance: string;
  contact: string;
  address: string;
  eta: string;
}

export interface Robot {
  id: string;
  codename: string;
  name: string;
  mission: string;
  missionCodename: string;
  location: string;
  coordinates: { lat: number; lng: number };
  status: "deployed" | "engaged" | "returning" | "standby" | "error";
  specialization: string;
  team: string;
  teamLead: string;
  battery: number;
  signal: number;
  missionStartTime: string;
  missionDuration: number;
  health: { motors: number; sensors: number; chassis: number; power: number };
  environment: string;
  threatLevel: "low" | "moderate" | "high" | "critical";
  survivorsFound: number;
  sectorLabel: string;
  color: string;
  sensors: SensorReading[];
  aiOutputs: AIModelOutput[];
  alerts: Alert[];
  communication: Communication;
  nearbyFacilities: Facility[];
  defaultWeather: WeatherCondition;
}

const now = new Date();
const ts = (offsetSec: number) => {
  const d = new Date(now.getTime() - offsetSec * 1000);
  return d.toLocaleTimeString("en-US", { hour12: false });
};

export const robots: Robot[] = [
  {
    id: "phx-01",
    codename: "HORUS",
    name: "PHX-01",
    mission: "Operation Dawn Rescue",
    missionCodename: "DAWN-7",
    location: "Downtown Sector 3 — Collapsed Commercial Building",
    coordinates: { lat: 30.0444, lng: 31.2357 },
    status: "engaged",
    specialization: "Multi-Sensor Search & Rescue",
    team: "Alpha Squad",
    teamLead: "Lt. Amina Hassan",
    battery: 68,
    signal: 92,
    missionStartTime: "06:30:00",
    missionDuration: 47,
    health: { motors: 87, sensors: 94, chassis: 76, power: 68 },
    environment: "Urban collapse — reinforced concrete, dust, confined voids",
    threatLevel: "high",
    survivorsFound: 3,
    sectorLabel: "SECTOR 3",
    color: "#00d4ff",
    sensors: [
      { name: "Temperature", value: 32.5, unit: "°C", min: -10, max: 80, warningThreshold: 50, criticalThreshold: 65, icon: "Thermometer", color: "#ef4444" },
      { name: "CO₂ Level", value: 4200, unit: "ppm", min: 400, max: 10000, warningThreshold: 5000, criticalThreshold: 8000, icon: "Wind", color: "#f97316" },
      { name: "Dust Particulate", value: 850, unit: "µg/m³", min: 0, max: 2000, warningThreshold: 1000, criticalThreshold: 1500, icon: "CloudFog", color: "#a855f7" },
      { name: "Structural Vibration", value: 0.45, unit: "Hz", min: 0, max: 5, warningThreshold: 1.5, criticalThreshold: 3, icon: "Activity", color: "#06b6d4" },
      { name: "Oxygen Level", value: 18.2, unit: "%", min: 0, max: 25, warningThreshold: 19.5, criticalThreshold: 18, icon: "Gauge", color: "#10b981" },
      { name: "Noise Level", value: 58, unit: "dB", min: 0, max: 140, warningThreshold: 85, criticalThreshold: 100, icon: "Volume2", color: "#84cc16" },
      { name: "Methane", value: 0.8, unit: "%LEL", min: 0, max: 100, warningThreshold: 20, criticalThreshold: 40, icon: "Flame", color: "#eab308" },
      { name: "Air Pressure", value: 1012, unit: "hPa", min: 950, max: 1050, warningThreshold: 980, criticalThreshold: 960, icon: "ArrowUpDown", color: "#3b82f6" },
    ],
    aiOutputs: [
      { model: "Thermal Detection", status: "active", output: "3 survivors located — Sector 3B, 2nd floor rubble pile", confidence: 94.2 },
      { model: "Acoustic Analysis", status: "active", output: "Faint tapping detected at 340Hz — human origin confirmed", confidence: 91.7 },
      { model: "Hazard Assessment", status: "active", output: "Risk: HIGH — Unstable debris, secondary collapse possible", confidence: 88.4 },
      { model: "Structural Risk", status: "active", output: "Collapse Probability: 34% — MODERATE — Reinforce north wall", confidence: 92.1 },
      { model: "Rescue Assistant", status: "active", output: "Recommended: Clear Route B corridor before extraction", confidence: 96.0 },
    ],
    alerts: [
      { id: 1, type: "critical", message: "O₂ level dropping below safe threshold in Sector 3B", timestamp: ts(30), source: "Environmental Sensor" },
      { id: 2, type: "success", message: "Survivor confirmed: 3 individuals located, vital signs stable", timestamp: ts(90), source: "AI — Thermal Model" },
      { id: 3, type: "warning", message: "Dust particulate spike — vision systems degrading", timestamp: ts(150), source: "Navigation System" },
      { id: 4, type: "info", message: "Safe corridor identified: Route B-7 through east stairwell", timestamp: ts(220), source: "AI — Structural Model" },
      { id: 5, type: "warning", message: "Minor structural tremor detected — 0.45Hz oscillation", timestamp: ts(300), source: "MPU6050 IMU" },
    ],
    communication: {
      primaryMethod: "walkie-talkie",
      walkieTalkie: { frequency: "462.675 MHz (UHF)", channels: 8, range: "2 km (urban)" },
      phoneNumbers: [
        "+20 100 456 7890 — Rescue HQ Coordinator",
        "+20 100 456 7891 — Field Medical Officer",
        "+20 100 456 7892 — Structural Engineer Desk",
        "+20 100 456 7893 — Logistics & Supply Chain",
      ],
      satellitePhone: "+8816 314 567 8901",
    },
    nearbyFacilities: [
      { name: "Downtown General Hospital", type: "hospital", distance: "1.2 km", contact: "+20 100 789 0123", address: "15 Tahrir Street, Downtown", eta: "3 min" },
      { name: "Qasr El-Nil Police Station", type: "police_station", distance: "0.8 km", contact: "+20 100 789 0124", address: "42 Corniche El-Nil", eta: "2 min" },
      { name: "Cairo Civil Defense HQ", type: "civil_defense", distance: "2.5 km", contact: "+20 100 789 0125", address: "10 Ramsis Street, Abbaseya", eta: "5 min" },
      { name: "Emergency Field Hospital (Tent-3)", type: "emergency_shelter", distance: "0.3 km", contact: "+20 100 789 0126", address: "Sector 3B — Temporary Medical Post", eta: "1 min" },
      { name: "Central Security Forces Barracks", type: "military_base", distance: "3.8 km", contact: "+20 100 789 0127", address: "Almaza Military Compound", eta: "8 min" },
    ],
    defaultWeather: "fog",
  },
  {
    id: "phx-02",
    codename: "ARGUS",
    name: "PHX-02",
    mission: "Operation Inferno Contain",
    missionCodename: "INFERNO-3",
    location: "Factory Zone 7 — Chemical Processing Plant",
    coordinates: { lat: 30.0824, lng: 31.3402 },
    status: "deployed",
    specialization: "Thermal & Chemical Hazard Mapping",
    team: "Bravo Squad",
    teamLead: "Capt. Karim El-Shafei",
    battery: 81,
    signal: 78,
    missionStartTime: "07:15:00",
    missionDuration: 32,
    health: { motors: 92, sensors: 88, chassis: 95, power: 81 },
    environment: "Industrial fire — chemical storage, toxic fumes, extreme heat",
    threatLevel: "critical",
    survivorsFound: 1,
    sectorLabel: "SECTOR 7",
    color: "#ef4444",
    sensors: [
      { name: "Temperature", value: 64.8, unit: "°C", min: -10, max: 150, warningThreshold: 80, criticalThreshold: 120, icon: "Thermometer", color: "#ef4444" },
      { name: "CO Level", value: 320, unit: "ppm", min: 0, max: 1000, warningThreshold: 200, criticalThreshold: 400, icon: "Wind", color: "#f97316" },
      { name: "H₂S Level", value: 15.3, unit: "ppm", min: 0, max: 100, warningThreshold: 10, criticalThreshold: 25, icon: "CloudFog", color: "#a855f7" },
      { name: "Radiation", value: 0.12, unit: "µSv/h", min: 0, max: 10, warningThreshold: 1, criticalThreshold: 3, icon: "Activity", color: "#eab308" },
      { name: "Oxygen Level", value: 17.1, unit: "%", min: 0, max: 25, warningThreshold: 19.5, criticalThreshold: 18, icon: "Gauge", color: "#ef4444" },
      { name: "Flame Detection", value: 3, unit: "sources", min: 0, max: 10, warningThreshold: 5, criticalThreshold: 8, icon: "Flame", color: "#f97316" },
      { name: "Toxic Index", value: 68, unit: "TLV", min: 0, max: 100, warningThreshold: 50, criticalThreshold: 75, icon: "Skull", color: "#a855f7" },
      { name: "Air Pressure", value: 1005, unit: "hPa", min: 950, max: 1050, warningThreshold: 980, criticalThreshold: 960, icon: "ArrowUpDown", color: "#3b82f6" },
    ],
    aiOutputs: [
      { model: "Thermal Detection", status: "active", output: "1 survivor isolated in west containment room — heat signature fading", confidence: 89.5 },
      { model: "Acoustic Analysis", status: "active", output: "Crackling fire detected — structure compromised, evacuate", confidence: 93.2 },
      { model: "Hazard Assessment", status: "active", output: "Risk: CRITICAL — Toxic plume spreading southwest", confidence: 96.8 },
      { model: "Structural Risk", status: "active", output: "Collapse Probability: 58% — HIGH — Steel beams weakening", confidence: 91.0 },
      { model: "Rescue Assistant", status: "active", output: "Recommended: Deploy fire suppression before extraction attempt", confidence: 94.7 },
    ],
    alerts: [
      { id: 1, type: "critical", message: "Toxic gas plume detected — evacuation zone extended to 500m", timestamp: ts(15), source: "Chemical Sensor Array" },
      { id: 2, type: "critical", message: "Temperature spike: 64.8°C near storage tank T-07", timestamp: ts(60), source: "Temperature Sensor" },
      { id: 3, type: "warning", message: "O₂ level critically low — 17.1% in containment area", timestamp: ts(120), source: "Environmental Sensor" },
      { id: 4, type: "info", message: "Fire suppression system activated in Sector 7A", timestamp: ts(200), source: "Fire Control System" },
      { id: 5, type: "success", message: "1 survivor located via thermal — rescue team dispatched", timestamp: ts(300), source: "AI — Thermal Model" },
    ],
    communication: {
      primaryMethod: "phone",
      walkieTalkie: { frequency: "467.850 MHz (UHF)", channels: 16, range: "3 km (industrial)" },
      phoneNumbers: [
        "+20 100 854 3210 — HAZMAT Coordination Unit",
        "+20 100 854 3211 — Industrial Fire Brigade Command",
        "+20 100 854 3212 — Chemical Spill Response Team",
        "+20 100 854 3213 — Toxicology & Medical Support",
        "+20 100 854 3214 — Evacuation Logistics Center",
      ],
      satellitePhone: "+8816 314 567 8902",
    },
    nearbyFacilities: [
      { name: "Industrial Zone Fire Station #7", type: "fire_station", distance: "0.6 km", contact: "+20 100 890 1234", address: "25 Factory Road, Sector 7A", eta: "1 min" },
      { name: "Al-Salam General Hospital", type: "hospital", distance: "4.2 km", contact: "+20 100 890 1235", address: "180 Salam City, Heliopolis", eta: "7 min" },
      { name: "Chemical Emergency Response Center", type: "civil_defense", distance: "1.5 km", contact: "+20 100 890 1236", address: "7 Hazmat Lane, Industrial Zone", eta: "3 min" },
      { name: "Factory Zone Police Post", type: "police_station", distance: "1.8 km", contact: "+20 100 890 1237", address: "12 Security Road, Sector 7B", eta: "4 min" },
      { name: "Environmental Protection Agency Field Office", type: "government_building", distance: "3.0 km", contact: "+20 100 890 1238", address: "50 Environment Street, Nasr City", eta: "6 min" },
    ],
    defaultWeather: "clear",
  },
  {
    id: "phx-03",
    codename: "THOR",
    name: "PHX-03",
    mission: "Operation Tremor Response",
    missionCodename: "TREMOR-12",
    location: "Residential District 12 — Earthquake Zone",
    coordinates: { lat: 30.0124, lng: 31.4792 },
    status: "engaged",
    specialization: "Structural Assessment & Void Penetration",
    team: "Charlie Squad",
    teamLead: "Sgt. Youssef Mansour",
    battery: 43,
    signal: 55,
    missionStartTime: "05:45:00",
    missionDuration: 112,
    health: { motors: 62, sensors: 71, chassis: 45, power: 43 },
    environment: "Post-earthquake — pancake collapse, voids, aftershocks",
    threatLevel: "critical",
    survivorsFound: 5,
    sectorLabel: "SECTOR 12",
    color: "#f97316",
    sensors: [
      { name: "Temperature", value: 28.3, unit: "°C", min: -10, max: 80, warningThreshold: 50, criticalThreshold: 65, icon: "Thermometer", color: "#ef4444" },
      { name: "CO₂ Level", value: 6800, unit: "ppm", min: 400, max: 10000, warningThreshold: 5000, criticalThreshold: 8000, icon: "Wind", color: "#f97316" },
      { name: "Seismic Activity", value: 2.3, unit: "Hz", min: 0, max: 10, warningThreshold: 3.5, criticalThreshold: 5, icon: "Activity", color: "#eab308" },
      { name: "Void Space", value: 0.8, unit: "m³", min: 0, max: 5, warningThreshold: 0.5, criticalThreshold: 0.3, icon: "Box", color: "#06b6d4" },
      { name: "Structural Load", value: 72, unit: "%", min: 0, max: 100, warningThreshold: 60, criticalThreshold: 80, icon: "Gauge", color: "#ef4444" },
      { name: "Methane", value: 3.7, unit: "%LEL", min: 0, max: 100, warningThreshold: 20, criticalThreshold: 40, icon: "Flame", color: "#eab308" },
      { name: "Noise Level", value: 45, unit: "dB", min: 0, max: 140, warningThreshold: 85, criticalThreshold: 100, icon: "Volume2", color: "#84cc16" },
      { name: "Humidity", value: 78, unit: "%", min: 0, max: 100, warningThreshold: 75, criticalThreshold: 90, icon: "Droplets", color: "#3b82f6" },
    ],
    aiOutputs: [
      { model: "Thermal Detection", status: "active", output: "5 survivors across 3 voids — prioritizing void V-2 (2 survivors)", confidence: 91.3 },
      { model: "Acoustic Analysis", status: "active", output: "Human voices detected: faint — direction 030°, depth ~4m", confidence: 87.6 },
      { model: "Hazard Assessment", status: "active", output: "Risk: CRITICAL — Aftershock probability 42% within 2 hours", confidence: 94.0 },
      { model: "Structural Risk", status: "active", output: "Collapse Probability: 72% — HIGH — Multiple load-bearing walls failed", confidence: 95.2 },
      { model: "Rescue Assistant", status: "active", output: "Recommended: Stabilize void V-2 before attempting extraction", confidence: 92.8 },
    ],
    alerts: [
      { id: 1, type: "critical", message: "Aftershock detected: 3.2 magnitude — structural integrity degrading", timestamp: ts(10), source: "Seismic Sensor" },
      { id: 2, type: "warning", message: "CO₂ levels critical — 6800ppm in void spaces", timestamp: ts(45), source: "Gas Sensor" },
      { id: 3, type: "success", message: "5 survivors confirmed across 3 survival voids", timestamp: ts(120), source: "AI — Thermal Model" },
      { id: 4, type: "info", message: "Void V-2 accessible via north trench — 4m clearance", timestamp: ts(200), source: "LIDAR Mapping" },
      { id: 5, type: "warning", message: "Battery critical — 43%, switching to power-save mode", timestamp: ts(300), source: "Power System" },
    ],
    communication: {
      primaryMethod: "satellite",
      walkieTalkie: { frequency: "451.300 MHz (VHF)", channels: 4, range: "1.5 km (damaged structures)" },
      phoneNumbers: [
        "+20 100 678 5432 — Disaster Relief Command Post",
        "+20 100 678 5433 — Medical Triage Unit (North)",
        "+20 100 678 5434 — Heavy Equipment & Debris Removal",
        "+20 100 678 5435 — Volunteer Coordination Center",
      ],
      satellitePhone: "+8816 314 567 8903",
    },
    nearbyFacilities: [
      { name: "12th District Field Hospital (MSF)", type: "hospital", distance: "0.4 km", contact: "+20 100 901 2345", address: "Corner of Olive & Palm Streets", eta: "1 min" },
      { name: "Military Engineering Corps Base", type: "military_base", distance: "2.8 km", contact: "+20 100 901 2346", address: "Almaza Military Engineering HQ", eta: "5 min" },
      { name: "Emergency Shelter Camp — Stadium Zone", type: "emergency_shelter", distance: "1.5 km", contact: "+20 100 901 2347", address: "District 12 Sports Complex", eta: "3 min" },
      { name: "Civil Defense Earthquake Response Unit", type: "civil_defense", distance: "3.5 km", contact: "+20 100 901 2348", address: "22 Rescue Boulevard, Nasr City", eta: "7 min" },
      { name: "Local Government Crisis Center", type: "government_building", distance: "2.0 km", contact: "+20 100 901 2349", address: "5 Administration Square, District 12", eta: "4 min" },
    ],
    defaultWeather: "night",
  },
  {
    id: "phx-04",
    codename: "ATLAS",
    name: "PHX-04",
    mission: "Operation High Tide",
    missionCodename: "HIGHTIDE-5",
    location: "Coastal Area 5 — Flood Zone",
    coordinates: { lat: 30.0967, lng: 31.5817 },
    status: "standby",
    specialization: "Amphibious Rescue & Flood Assessment",
    team: "Delta Squad",
    teamLead: "Lt. Nora Abdel-Rahman",
    battery: 97,
    signal: 88,
    missionStartTime: "08:00:00",
    missionDuration: 15,
    health: { motors: 98, sensors: 95, chassis: 91, power: 97 },
    environment: "Coastal flooding — submerged streets, strong currents, debris flow",
    threatLevel: "moderate",
    survivorsFound: 0,
    sectorLabel: "SECTOR 5",
    color: "#10b981",
    sensors: [
      { name: "Water Level", value: 3.2, unit: "m", min: 0, max: 10, warningThreshold: 4, criticalThreshold: 6, icon: "Waves", color: "#3b82f6" },
      { name: "Current Speed", value: 2.8, unit: "m/s", min: 0, max: 10, warningThreshold: 4, criticalThreshold: 6, icon: "ArrowUpDown", color: "#06b6d4" },
      { name: "Water Temperature", value: 14.2, unit: "°C", min: 0, max: 40, warningThreshold: 35, criticalThreshold: 38, icon: "Thermometer", color: "#3b82f6" },
      { name: "Debris Density", value: 35, unit: "%", min: 0, max: 100, warningThreshold: 60, criticalThreshold: 80, icon: "Box", color: "#f97316" },
      { name: "Turbidity", value: 280, unit: "NTU", min: 0, max: 500, warningThreshold: 300, criticalThreshold: 400, icon: "CloudFog", color: "#a855f7" },
      { name: "Wind Speed", value: 45, unit: "km/h", min: 0, max: 120, warningThreshold: 60, criticalThreshold: 80, icon: "Wind", color: "#84cc16" },
      { name: "Rainfall", value: 28, unit: "mm/h", min: 0, max: 100, warningThreshold: 40, criticalThreshold: 60, icon: "Droplets", color: "#06b6d4" },
      { name: "Conductivity", value: 45, unit: "mS/cm", min: 0, max: 80, warningThreshold: 50, criticalThreshold: 60, icon: "Gauge", color: "#10b981" },
    ],
    aiOutputs: [
      { model: "Thermal Detection", status: "idle", output: "Water surface scan — no thermal anomalies detected", confidence: 82.0 },
      { model: "Acoustic Analysis", status: "idle", output: "Sonar mapping: 80% area scanned — 2 submerged vehicles detected", confidence: 90.4 },
      { model: "Hazard Assessment", status: "active", output: "Risk: MODERATE — Currents increasing, debris flow expected", confidence: 87.5 },
      { model: "Structural Risk", status: "active", output: "Collapse Probability: 15% — LOW — Coastal buildings stable", confidence: 93.1 },
      { model: "Rescue Assistant", status: "active", output: "Standing by for deployment — awaiting weather window", confidence: 98.2 },
    ],
    alerts: [
      { id: 1, type: "warning", message: "Water level rising: 3.2m — expected peak 4.5m at 11:00", timestamp: ts(60), source: "Flood Monitoring System" },
      { id: 2, type: "info", message: "Sonar scan complete: 2 submerged vehicles identified", timestamp: ts(180), source: "AI — Acoustic Model" },
      { id: 3, type: "success", message: "Evacuation route mapped — 3 safe corridors identified", timestamp: ts(300), source: "AI — Pathfinding" },
      { id: 4, type: "warning", message: "Current speed increasing: 2.8 m/s — near operational limit", timestamp: ts(420), source: "Current Sensor" },
      { id: 5, type: "info", message: "Weather advisory: Storm expected to intensify in 2 hours", timestamp: ts(600), source: "Meteorological Service" },
    ],
    communication: {
      primaryMethod: "satellite",
      walkieTalkie: { frequency: "457.525 MHz (Marine VHF)", channels: 12, range: "5 km (open water)" },
      phoneNumbers: [
        "+20 100 234 8765 — Coastal Flood Command Center",
        "+20 100 234 8766 — Maritime Rescue Coordination",
        "+20 100 234 8767 — Evacuation Shelter Management",
        "+20 100 234 8768 — Weather Monitoring & Forecasting Unit",
      ],
      satellitePhone: "+8816 314 567 8904",
    },
    nearbyFacilities: [
      { name: "Coastal Emergency Operations Center", type: "government_building", distance: "1.0 km", contact: "+20 100 012 3456", address: "100 Coast Road, Sector 5", eta: "2 min" },
      { name: "Alexandria Naval Base — Rescue Unit", type: "military_base", distance: "5.5 km", contact: "+20 100 012 3457", address: "Naval Harbor, Eastern Port", eta: "10 min" },
      { name: "Flood Relief Field Hospital", type: "hospital", distance: "2.0 km", contact: "+20 100 012 3458", address: "Higher Ground Camp, Hill Road", eta: "4 min" },
      { name: "Public Evacuation Shelter — School #15", type: "emergency_shelter", distance: "0.7 km", contact: "+20 100 012 3459", address: "15 Education Street, Coastal District", eta: "1 min" },
      { name: "Coastal Police & Rescue Station", type: "police_station", distance: "1.3 km", contact: "+20 100 012 3460", address: "3 Harbor Boulevard", eta: "3 min" },
    ],
    defaultWeather: "storm",
  },
];

export const users = [
  { username: "commander", password: "phoenix", role: "Mission Commander", clearance: "Alpha-1" },
  { username: "operator", password: "phoenix", role: "Robot Operator", clearance: "Alpha-2" },
  { username: "analyst", password: "phoenix", role: "Intelligence Analyst", clearance: "Beta-1" },
];
