"use client";

import { useEffect, useRef } from "react";

export interface BroadcastMessage {
  type:
    | "SELECT_ROBOT"
    | "TOGGLE_MAP"
    | "TOGGLE_LOG"
    | "TOGGLE_RADIO";
  value: any;
}

interface BroadcastSyncCallbacks {
  onSelectRobot: (id: string) => void;
  onToggleMap: (show: boolean) => void;
  onToggleLog: (show: boolean) => void;
  onToggleRadio: (show: boolean) => void;
}

const CHANNEL = "phoenix-mission-control";

export function useBroadcastSync(
  sendRef: React.MutableRefObject<BroadcastMessage | null>,
  callbacks: BroadcastSyncCallbacks
) {
  const channelRef = useRef<BroadcastChannel | null>(null);
  const cbRef = useRef(callbacks);
  cbRef.current = callbacks;

  useEffect(() => {
    try {
      const channel = new BroadcastChannel(CHANNEL);
      channelRef.current = channel;

      channel.onmessage = (event: MessageEvent<BroadcastMessage>) => {
        const msg = event.data;
        const cb = cbRef.current;
        switch (msg.type) {
          case "SELECT_ROBOT":
            cb.onSelectRobot(msg.value);
            break;
          case "TOGGLE_MAP":
            cb.onToggleMap(msg.value);
            break;
          case "TOGGLE_LOG":
            cb.onToggleLog(msg.value);
            break;
          case "TOGGLE_RADIO":
            cb.onToggleRadio(msg.value);
            break;
        }
      };

      return () => channel.close();
    } catch {
      // BroadcastChannel not supported
    }
  }, []);

  useEffect(() => {
    if (sendRef.current && channelRef.current) {
      try {
        channelRef.current.postMessage(sendRef.current);
      } catch {}
      sendRef.current = null;
    }
  });
}
