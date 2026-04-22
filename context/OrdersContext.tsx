"use client"
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";

export interface OrderItem {
  id: string;
  item: string;
  date: string;
  status: "In Transit" | "Delivered" | "Processing";
  amount: string;
}

interface OrdersContextType {
  orders: OrderItem[];
  addOrder: (order: Omit<OrderItem, "id" | "date"> & { id?: string; date?: string }) => void;
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined);
const ORDERS_STORAGE_KEY = "shopspace-orders";

const SEED_ORDERS: OrderItem[] = [
  { id: "#5241", item: "Sony WH-1000XM5", date: "Apr 14", status: "In Transit", amount: "$299" },
  { id: "#5188", item: "Logitech MX Keys", date: "Apr 08", status: "Delivered", amount: "$109" },
  { id: "#5102", item: "USB-C Hub", date: "Mar 29", status: "Delivered", amount: "$44" },
];

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<OrderItem[]>(SEED_ORDERS);

  useEffect(() => {
    const storedOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (storedOrders) {
      try {
        const parsed = JSON.parse(storedOrders) as OrderItem[];
        setOrders(Array.isArray(parsed) && parsed.length ? parsed : SEED_ORDERS);
      } catch {
        setOrders(SEED_ORDERS);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder: OrdersContextType["addOrder"] = useCallback((order) => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
    const nextOrder: OrderItem = {
      id: order.id ?? `#${Math.floor(1000 + Math.random() * 9000)}`,
      item: order.item,
      date: order.date ?? formattedDate,
      status: order.status ?? "Processing",
      amount: order.amount,
    };

    setOrders((prev) => [nextOrder, ...prev]);
  }, []);

  const value = useMemo(() => ({ orders, addOrder }), [addOrder, orders]);

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) throw new Error("useOrders must be used within an OrdersProvider");
  return context;
}
