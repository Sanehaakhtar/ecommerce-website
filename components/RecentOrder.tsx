"use client"
import { useOrders } from "../context/OrdersContext";

export default function RecentOrders() {
  const { orders } = useOrders();
  const visibleOrders = orders.slice(0, 4);

  const getStatusClass = (status: string) => {
    if (status === "Delivered") return "bg-[var(--status-delivered-bg)] text-[var(--status-delivered-text)]";
    if (status === "In Transit") return "bg-[var(--status-transit-bg)] text-[var(--status-transit-text)]";
    return "bg-[var(--status-pending-bg)] text-[var(--status-pending-text)]";
  };

  return (
    <div id="recent-orders" className="bento-card p-4 flex-1">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-xs">Recent Orders</h3>
        <button className="text-[var(--accent)] text-[9px] font-bold uppercase tracking-wider">View all</button>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="text-[8px] text-[var(--text-muted)] uppercase tracking-widest border-b border-[var(--border-subtle)]">
            <th className="pb-2 font-bold">Order ID</th>
            <th className="pb-2 font-bold">Item</th>
            <th className="pb-2 font-bold">Date</th>
            <th className="pb-2 font-bold">Status</th>
            <th className="pb-2 font-bold text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--border-subtle)]">
          {visibleOrders.map((order) => (
            <tr key={order.id} className="text-[10px] font-medium">
              <td className="py-2.5 text-[var(--text-muted)]">{order.id}</td>
              <td className="py-2.5 font-bold text-[var(--foreground)]">{order.item}</td>
              <td className="py-2.5 text-[var(--text-muted)]">{order.date}</td>
              <td className="py-2.5">
                <span className={`px-2 py-0.5 rounded-full text-[7px] font-bold uppercase ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="py-2.5 font-bold text-right text-[var(--foreground)]">{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}