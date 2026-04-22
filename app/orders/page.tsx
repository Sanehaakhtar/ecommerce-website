"use client";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { useOrders } from "@/context/OrdersContext";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

const statusConfig: Record<string, { icon: React.ReactNode; bg: string; text: string }> = {
  Delivered: { icon: <CheckCircle size={13} />, bg: "bg-[var(--status-delivered-bg)]", text: "text-[var(--status-delivered-text)]" },
  "In Transit": { icon: <Truck size={13} />, bg: "bg-[var(--status-transit-bg)]", text: "text-[var(--status-transit-text)]" },
  Processing: { icon: <Clock size={13} />, bg: "bg-[var(--status-pending-bg)]", text: "text-[var(--status-pending-text)]" },
};

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-primary)]">
      <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <header>
            <p className="label-caps mb-1">History</p>
            <h1 className="text-xl font-bold tracking-tight">My Orders</h1>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">{orders.length} orders total</p>
          </header>

          {orders.length === 0 ? (
            <div className="bento-card p-10 text-center">
              <Package size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
              <p className="text-sm font-bold mb-1">No orders yet</p>
              <p className="text-[11px] text-[var(--text-muted)] mb-4">
                Your order history will appear here once you make a purchase.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-[var(--accent)] text-[var(--accent-contrast)] px-5 py-2 rounded-lg text-xs font-bold hover:bg-[var(--accent-hover)] transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {orders.map((order) => {
                const config = statusConfig[order.status] ?? statusConfig.Processing;
                return (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={spring}
                    className="bento-card p-4 flex items-center gap-4"
                  >
                    <div className={`w-9 h-9 rounded-lg ${config.bg} ${config.text} flex items-center justify-center shrink-0`}>
                      {config.icon}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-[var(--foreground)] truncate">{order.item}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-[var(--text-muted)]">{order.id}</span>
                        <span className="text-[10px] text-[var(--text-muted)]">·</span>
                        <span className="text-[10px] text-[var(--text-muted)]">{order.date}</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-xs font-bold text-[var(--foreground)]">{order.amount}</p>
                      <span className={`inline-block mt-0.5 px-2 py-0.5 rounded-full text-[8px] font-bold uppercase ${config.bg} ${config.text}`}>
                        {order.status}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
