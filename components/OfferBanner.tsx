"use client";

import { useMemo, useState, useEffect } from "react";

const OFFER_STORAGE_KEY = "shopspace-offer-ends";
const OFFER_DURATION_MS = 24 * 60 * 60 * 1000;

function getStoredEndTime() {
  if (typeof window === "undefined") return Date.now() + OFFER_DURATION_MS;
  const stored = localStorage.getItem(OFFER_STORAGE_KEY);
  if (!stored) {
    const next = Date.now() + OFFER_DURATION_MS;
    localStorage.setItem(OFFER_STORAGE_KEY, String(next));
    return next;
  }
  const parsed = Number(stored);
  if (Number.isNaN(parsed) || parsed < Date.now()) {
    const next = Date.now() + OFFER_DURATION_MS;
    localStorage.setItem(OFFER_STORAGE_KEY, String(next));
    return next;
  }
  return parsed;
}

export default function OfferBanner() {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const [endTime] = useState(() => getStoredEndTime());

  useEffect(() => {
    setMounted(true);
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const { hours, minutes, seconds } = useMemo(() => {
    const remaining = Math.max(0, endTime - now);
    const totalSeconds = Math.floor(remaining / 1000);
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return {
      hours: String(hrs).padStart(2, "0"),
      minutes: String(mins).padStart(2, "0"),
      seconds: String(secs).padStart(2, "0"),
    };
  }, [endTime, now]);

  return (
    <div className="w-full bg-[var(--accent)] text-[var(--accent-contrast)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-1.5 text-[10px] font-semibold tracking-wide">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#fdf5e6] animate-pulse" />
          Limited Offer Live
        </div>
        <div className="flex items-center gap-2">
          <span className="uppercase tracking-[0.3em] text-[9px] text-[#f3e6d6]">Ends in</span>
          <span className="font-bold tabular-nums">
            {mounted ? `${hours}:${minutes}:${seconds}` : "--:--:--"}
          </span>
        </div>
      </div>
    </div>
  );
}
