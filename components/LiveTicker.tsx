"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  "🔥 12 people are looking at the Sony WH-1000XM5 right now!",
  "📦 Free shipping unlocked for your current order!",
  "✨ New arrivals just dropped in the Shop tab.",
];

export default function LiveTicker() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="fixed bottom-4 left-1/2 z-40 w-[92%] max-w-2xl -translate-x-1/2">
      <div className="bento-card bento-card-hover bg-[var(--bg-surface-alt)] px-4 py-2 text-center text-xs font-semibold text-[var(--foreground)] backdrop-blur-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {MESSAGES[index]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
