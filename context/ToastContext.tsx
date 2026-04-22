"use client";

import React, { createContext, useCallback, useContext, useMemo, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface Toast {
  id: string;
  message: string;
}

interface ToastContextType {
  addToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);
const TOAST_DURATION_MS = 2400;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string) => {
      const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      setToasts((prev) => [...prev, { id, message }]);
      window.setTimeout(() => removeToast(id), TOAST_DURATION_MS);
    },
    [removeToast]
  );

  const value = useMemo(() => ({ addToast }), [addToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed right-5 top-5 z-[60] flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -12, x: 16 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -12, x: 16 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className="rounded-xl bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold tracking-wide text-[var(--accent-contrast)] shadow-[0_10px_30px_rgb(0,0,0,0.18)]"
            >
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
