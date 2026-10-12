"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  const id = setInterval(onChange, 1000);
  return () => clearInterval(id);
}

export function LocalTime({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => new Date().toLocaleTimeString("en-US", { timeZone }),
    () => "",
  );

  return <span className="inline-block min-w-[10ch] tabular-nums">{time}</span>;
}