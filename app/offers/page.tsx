"use client";
import { motion } from "framer-motion";
import { Tag, Percent, Gift, Zap } from "lucide-react";
import Link from "next/link";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

const offers = [
  { id: 1, icon: <Zap size={16} />, title: "Flash Sale", desc: "Up to 40% off electronics — this weekend only", code: "FLASH40", color: "bg-[var(--status-transit-bg)] text-[var(--status-transit-text)]" },
  { id: 2, icon: <Gift size={16} />, title: "Free Shipping", desc: "On all orders over $50. No code needed.", code: null, color: "bg-[var(--status-delivered-bg)] text-[var(--status-delivered-text)]" },
  { id: 3, icon: <Percent size={16} />, title: "Member Discount", desc: "Extra 10% off for logged-in members.", code: "MEMBER10", color: "bg-[var(--bg-muted)] text-[var(--accent)]" },
  { id: 4, icon: <Tag size={16} />, title: "Bundle & Save", desc: "Buy 2 accessories, get 1 free.", code: "BUNDLE3", color: "bg-[var(--status-pending-bg)] text-[var(--status-pending-text)]" },
];

export default function OffersPage() {
  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-primary)]">
      <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <header>
            <p className="label-caps mb-1">Deals</p>
            <h1 className="text-xl font-bold tracking-tight">Offers & Coupons</h1>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
              Current promotions and discount codes
            </p>
          </header>

          <div className="space-y-2">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...spring, delay: offer.id * 0.05 }}
                className="bento-card p-4 flex items-center gap-4"
              >
                <div className={`w-10 h-10 rounded-lg ${offer.color} flex items-center justify-center shrink-0`}>
                  {offer.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[var(--foreground)]">{offer.title}</p>
                  <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{offer.desc}</p>
                </div>

                {offer.code ? (
                  <div className="shrink-0 border border-dashed border-[var(--accent)] rounded-lg px-3 py-1.5 text-center">
                    <p className="text-[8px] text-[var(--text-muted)] uppercase font-bold">Code</p>
                    <p className="text-[11px] font-bold text-[var(--accent)] tracking-wider">{offer.code}</p>
                  </div>
                ) : (
                  <span className="shrink-0 px-3 py-1.5 rounded-lg bg-[var(--status-delivered-bg)] text-[var(--status-delivered-text)] text-[9px] font-bold uppercase">
                    Auto-applied
                  </span>
                )}
              </motion.div>
            ))}
          </div>

          <div className="bento-card p-5 text-center">
            <p className="text-xs font-bold mb-1">Looking for more deals?</p>
            <p className="text-[10px] text-[var(--text-muted)] mb-3">Check the shop for marked-down items.</p>
            <Link
              href="/shop"
              className="inline-block bg-[var(--accent)] text-[var(--accent-contrast)] px-5 py-2 rounded-lg text-xs font-bold hover:bg-[var(--accent-hover)] transition-colors"
            >
              Browse Sale Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
