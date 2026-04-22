"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface QuickLookProduct {
  name: string;
  price: number;
  description: string;
  imageGallery: string[];
  imageUrl: string;
}

interface QuickLookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  product: QuickLookProduct;
}

export default function QuickLookModal({ isOpen, onClose, onAddToCart, product }: QuickLookModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Close quick look"
            onClick={onClose}
            className="absolute inset-0 bg-black/35 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative w-full max-w-2xl bento-card bg-[var(--bg-surface)] p-4 md:p-5"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="grid grid-cols-3 gap-2 lg:w-1/2">
                {product.imageGallery.slice(0, 3).map((src, index) => (
                  <div key={`${product.name}-${index}`} className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src={src}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      sizes="(min-width: 1024px) 160px, 30vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <p className="text-[8px] uppercase tracking-[0.25em] text-[var(--text-muted)]">Quick Look</p>
                <h3 className="text-base font-bold text-[var(--foreground)] mt-1">{product.name}</h3>
                <p className="text-[11px] text-[var(--text-secondary)] mt-2">{product.description}</p>
                <p className="text-base font-bold text-[var(--accent)] mt-3">${product.price}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={onAddToCart}
                    className="flex-1 rounded-lg bg-[var(--accent)] py-2 text-xs font-semibold text-[var(--accent-contrast)] hover:bg-[var(--accent-hover)] transition"
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-lg border border-[var(--border-subtle)] px-3 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--bg-muted)] transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
