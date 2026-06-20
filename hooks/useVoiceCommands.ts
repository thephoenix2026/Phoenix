"use client";

import { useEffect, useRef, useCallback } from "react";

interface VoiceCommandCallbacks {
  onSelectRobot: (codename: string) => void;
  onToggleMap: (show: boolean) => void;
  onToggleLog: (show: boolean) => void;
  onToggleRadio: (show: boolean) => void;
  onDisconnect: () => void;
  onStartMission?: () => void;
  onResetMission?: () => void;
  onCommandHeard?: (transcript: string, action: string) => void;
}

const robotNames = ["HORUS", "ARGUS", "THOR", "ATLAS"];

function speak(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.7;
  utterance.pitch = 0.65;
  utterance.volume = 0.6;
  window.speechSynthesis.speak(utterance);
}

export function useVoiceCommands(callbacks: VoiceCommandCallbacks) {
  const listeningRef = useRef(false);
  const recognitionRef = useRef<any>(null);
  const cbRef = useRef(callbacks);
  cbRef.current = callbacks;

  const processCommand = useCallback((transcript: string) => {
    const cb = cbRef.current;
    const lower = transcript.toLowerCase().trim();

    const heard = (action: string) => {
      cb.onCommandHeard?.(transcript, action);
    };

    for (const name of robotNames) {
      if (
        lower.includes(`switch to ${name.toLowerCase()}`) ||
        lower.includes(`select ${name.toLowerCase()}`) ||
        lower.includes(`go to ${name.toLowerCase()}`) ||
        lower.includes(`show ${name.toLowerCase()}`)
      ) {
        cb.onSelectRobot(name);
        heard(`Switching to ${name}`);
        speak(`Switching to ${name}`);
        return;
      }
    }

    if (lower.includes("show map")) {
      cb.onToggleMap(true);
      heard("Map displayed");
      speak("Map displayed");
    } else if (lower.includes("hide map")) {
      cb.onToggleMap(false);
      heard("Map hidden");
      speak("Map hidden");
    }

    if (lower.includes("show log")) {
      cb.onToggleLog(true);
      heard("Communication log displayed");
      speak("Communication log displayed");
    } else if (lower.includes("hide log")) {
      cb.onToggleLog(false);
      heard("Log hidden");
      speak("Log hidden");
    }

    if (lower.includes("show radio") || lower.includes("show comms") || lower.includes("show communication")) {
      cb.onToggleRadio(true);
      heard("Radio panel active");
      speak("Radio panel active");
    } else if (lower.includes("hide radio") || lower.includes("hide comms") || lower.includes("hide communication")) {
      cb.onToggleRadio(false);
      heard("Radio panel closed");
      speak("Radio panel closed");
    }

    if (lower.includes("start mission")) {
      if (cb.onStartMission) cb.onStartMission();
      heard("Mission started");
      speak("Mission started");
    }
    if (lower.includes("reset mission")) {
      if (cb.onResetMission) cb.onResetMission();
      heard("Mission reset");
      speak("Mission reset");
    }

    if (lower.includes("disconnect") || lower.includes("log out") || lower.includes("sign out")) {
      cb.onDisconnect();
      heard("Disconnecting");
      speak("Disconnecting");
    }
  }, []);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          processCommand(event.results[i][0].transcript);
        }
      }
    };

    recognition.onerror = () => {
      listeningRef.current = false;
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {}
    };
  }, [processCommand]);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !listeningRef.current) {
      try {
        recognitionRef.current.start();
        listeningRef.current = true;
      } catch {}
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        listeningRef.current = false;
      } catch {}
    }
  }, []);

  return { startListening, stopListening, isListening: listeningRef };
}
