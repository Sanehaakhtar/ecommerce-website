"use client"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import confetti from "canvas-confetti";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const { cart, clearCart } = useCart();
  const { addOrder } = useOrders();
  const shouldReduceMotion = useReducedMotion();
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const itemLabel = cart.length === 1 ? cart[0].name : `${cart[0].name} + ${cart.length - 1} items`;

    addOrder({
      item: itemLabel,
      amount: `$${total.toFixed(2)}`,
      status: "Processing",
    });
    confetti({
      particleCount: 140,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#800000", "#d4af37", "#f7efe1"],
    });
    clearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
            <motion.button
            type="button"
            aria-label="Close cart"
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className="relative w-full max-w-sm bg-[var(--bg-surface)] backdrop-blur-xl h-full p-5 flex flex-col border-l border-[var(--border-subtle)]"
            initial={shouldReduceMotion ? { x: 0, opacity: 1 } : { x: 320, opacity: 0.85 }}
            animate={shouldReduceMotion ? { x: 0, opacity: 1 } : { x: 0, opacity: 1 }}
            exit={shouldReduceMotion ? { x: 0, opacity: 1 } : { x: 320, opacity: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 28 }}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-bold flex items-center gap-2">
                <ShoppingBag size={18} className="text-[var(--accent)]" /> Your Cart
              </h2>
              <button onClick={onClose} className="p-1.5 hover:bg-[var(--bg-muted)] rounded-full"><X size={16} /></button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3">
              {cart.length === 0 ? (
                <p className="text-[var(--text-muted)] text-center mt-20 text-sm">Your cart is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-3 border-b border-[var(--border-subtle)] pb-3">
                    <div className="w-14 h-14 bg-[var(--bg-muted)] rounded-xl flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-bold text-xs text-[var(--foreground)]">{item.name}</p>
                      <p className="text-[var(--accent)] font-bold text-xs">${item.price}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-[var(--text-secondary)] font-medium">Qty: {item.quantity}</span>
                        <button className="text-[var(--text-muted)] hover:text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-auto pt-4 border-t border-[var(--border-subtle)]">
              <div className="flex justify-between mb-3">
                <span className="text-[var(--text-secondary)] text-sm">Subtotal</span>
                <span className="text-sm font-bold text-[var(--foreground)]">${total.toFixed(2)}</span>
              </div>
              <motion.button
                type="button"
                className="w-full bg-[var(--accent)] text-[var(--accent-contrast)] py-2.5 rounded-xl text-sm font-bold hover:bg-[var(--accent-hover)] transition-all disabled:opacity-50"
                onClick={handleCheckout}
                disabled={cart.length === 0}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Checkout Now
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}