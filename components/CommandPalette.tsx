"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface CommandAction {
  id: string;
  label: string;
  description?: string;
  onSelect: () => void;
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  actions: CommandAction[];
}

export default function CommandPalette({ isOpen, onClose, actions }: CommandPaletteProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setActiveIndex(0);
    requestAnimationFrame(() => inputRef.current?.focus());
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActiveIndex((prev) => (prev + 1) % actions.length);
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        setActiveIndex((prev) => (prev - 1 + actions.length) % actions.length);
      }
      if (event.key === "Enter") {
        event.preventDefault();
        actions[activeIndex]?.onSelect();
        onClose();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [actions, activeIndex, isOpen, onClose]);

  const renderedActions = useMemo(() => actions, [actions]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close command palette"
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ y: 18, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="relative w-full max-w-xl bento-card p-5"
          >
            <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] pb-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--text-muted)]">Command</span>
              <input
                ref={inputRef}
                placeholder="Type a command..."
                className="flex-1 bg-transparent text-sm outline-none text-[var(--foreground)] placeholder:text-[var(--text-muted)]"
              />
              <span className="text-[10px] font-semibold text-[var(--text-muted)]">Ctrl / Cmd + K</span>
            </div>
            <div className="mt-4 space-y-2">
              {renderedActions.map((action, index) => (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => {
                    action.onSelect();
                    onClose();
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition ${
                    index === activeIndex
                      ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
                      : "bg-[var(--bg-surface-alt)] text-[var(--foreground)] hover:bg-[var(--bg-muted)]"
                  }`}
                >
                  <span className="font-semibold">{action.label}</span>
                  <span className="text-[11px] opacity-80">{action.description}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
