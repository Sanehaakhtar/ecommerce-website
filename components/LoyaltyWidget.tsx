"use client";

import { useEffect, useMemo, useRef } from "react";
import confetti from "canvas-confetti";
import { useCart } from "@/context/CartContext";

const LEVELS = [0, 200, 500, 1000];
const CONFETTI_TARGET = 500;

export default function LoyaltyWidget() {
  const { cartTotal } = useCart();
  const confettiTriggered = useRef(false);

  const { level, nextTarget, progress } = useMemo(() => {
    const currentLevelIndex = LEVELS.findIndex((value, index) => {
      const next = LEVELS[index + 1] ?? Infinity;
      return cartTotal >= value && cartTotal < next;
    });

    const safeLevel = currentLevelIndex === -1 ? LEVELS.length - 1 : currentLevelIndex;
    const target = LEVELS[safeLevel + 1] ?? LEVELS[safeLevel];
    const normalized = target === LEVELS[safeLevel]
      ? 1
      : Math.min(1, (cartTotal - LEVELS[safeLevel]) / (target - LEVELS[safeLevel]));

    return {
      level: safeLevel + 1,
      nextTarget: target,
      progress: normalized,
    };
  }, [cartTotal]);

  useEffect(() => {
    if (cartTotal >= CONFETTI_TARGET && !confettiTriggered.current) {
      confettiTriggered.current = true;
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#800000", "#d4af37", "#f7efe1"],
      });
    }
    if (cartTotal < CONFETTI_TARGET) {
      confettiTriggered.current = false;
    }
  }, [cartTotal]);

  return (
    <div className="bento-card bento-card-hover p-6">
      <p className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]">Maroon Club</p>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--foreground)]">Level {level}</p>
          <p className="text-[11px] text-[var(--text-secondary)]">Spend ${nextTarget} to unlock rewards.</p>
        </div>
        <span className="text-xs font-bold text-[var(--accent)]">${cartTotal.toFixed(0)}</span>
      </div>
      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[var(--bg-muted)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[#d4af37] transition-all"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>
    </div>
  );
}
