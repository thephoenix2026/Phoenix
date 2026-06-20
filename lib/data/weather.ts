export type WeatherCondition = "clear" | "rain" | "storm" | "fog" | "night" | "sandstorm";

export interface WeatherState {
  condition: WeatherCondition;
  label: string;
  icon: string;
  visibility: number;
  windSpeed: number;
  tempEffect: number;
  signalPenalty: number;
  sensorNoise: number;
  color: string;
}

export const weatherConditions: Record<WeatherCondition, WeatherState> = {
  clear: {
    condition: "clear",
    label: "Clear",
    icon: "☀️",
    visibility: 100,
    windSpeed: 5,
    tempEffect: 0,
    signalPenalty: 0,
    sensorNoise: 0,
    color: "#eab308",
  },
  rain: {
    condition: "rain",
    label: "Rain",
    icon: "🌧️",
    visibility: 45,
    windSpeed: 25,
    tempEffect: -5,
    signalPenalty: 10,
    sensorNoise: 20,
    color: "#3b82f6",
  },
  storm: {
    condition: "storm",
    label: "Storm",
    icon: "⛈️",
    visibility: 20,
    windSpeed: 60,
    tempEffect: -8,
    signalPenalty: 35,
    sensorNoise: 45,
    color: "#6366f1",
  },
  fog: {
    condition: "fog",
    label: "Fog",
    icon: "🌫️",
    visibility: 15,
    windSpeed: 8,
    tempEffect: -2,
    signalPenalty: 25,
    sensorNoise: 30,
    color: "#94a3b8",
  },
  night: {
    condition: "night",
    label: "Night",
    icon: "🌙",
    visibility: 30,
    windSpeed: 10,
    tempEffect: -6,
    signalPenalty: 5,
    sensorNoise: 10,
    color: "#1e293b",
  },
  sandstorm: {
    condition: "sandstorm",
    label: "Sandstorm",
    icon: "🌪️",
    visibility: 8,
    windSpeed: 70,
    tempEffect: 4,
    signalPenalty: 50,
    sensorNoise: 60,
    color: "#d97706",
  },
};

export const weatherCycle: WeatherCondition[] = [
  "clear",
  "rain",
  "storm",
  "fog",
  "night",
  "sandstorm",
];
