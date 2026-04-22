"use client"
import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { useToast } from "./ToastContext";

// 1. Define what a Cart Item looks like
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartProduct {
  name: string;
  price: number | string;
}

// 2. Define what data the "Cloud" (Context) will hold
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: CartProduct) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "shopspace-cart";

// 3. The Provider: This component wraps your app and provides the data
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!storedCart) return [];
    try {
      const parsed = JSON.parse(storedCart) as CartItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const { addToast } = useToast();

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: CartProduct) => {
    const label = product?.name ? String(product.name) : "Item";
    addToast(`${label} added to cart`);
    setCart((prevCart) => {
      // Check if item already exists in cart
      const existingItem = prevCart.find(item => item.id === product.name);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      // Otherwise add new item
      return [...prevCart, { id: product.name, name: product.name, price: Number(product.price), quantity: 1 }];
    });
  };

  const clearCart = () => setCart([]);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart]
  );

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

// 4. Custom Hook: A shortcut to use the cart data
export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}