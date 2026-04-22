"use client"
import { Bell, Menu, Search, ShoppingCart, SunMoon } from "lucide-react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useUi } from "../context/UiContext";
import { useTheme } from "@/context/ThemeContext";
import { PRODUCTS } from "@/constants/products";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function Header() {
  const { cartCount } = useCart();
  const { user } = useAuth();
  const { toggleSidebar, openCart, searchTerm, setSearchTerm, activeCategory, setActiveCategory } = useUi();
  const { theme, toggleTheme } = useTheme();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentProducts, setRecentProducts] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("shopspace-recent-products");
    if (!stored) return [];
    try {
      const parsed = JSON.parse(stored) as string[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const blurTimer = useRef<number | null>(null);
  const initials = user?.name
    ? user.name.split(" ").map((part) => part[0]).join("").slice(0, 2)
    : "SA";

  const TRENDING = PRODUCTS.slice(0, 4).map((product) => product.name);
  const RECENT_KEY = "shopspace-recent-products";

  const handleFocus = () => {
    if (blurTimer.current) {
      window.clearTimeout(blurTimer.current);
      blurTimer.current = null;
    }
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(RECENT_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored) as string[];
          setRecentProducts(Array.isArray(parsed) ? parsed : []);
        } catch {
          setRecentProducts([]);
        }
      }
    }
    setShowSuggestions(true);
  };

  const handleBlur = () => {
    blurTimer.current = window.setTimeout(() => {
      setShowSuggestions(false);
    }, 150);
  };

  const handleChipClick = (label: string) => {
    setSearchTerm(label);
    if (inputRef.current) {
      inputRef.current.value = label;
    }
    setShowSuggestions(false);
  };
  
  return (
    <header className="sticky top-0 z-30 flex flex-col gap-2 bg-[var(--bg-surface-alt)]/80 backdrop-blur-xl px-4 py-2.5 md:px-6 md:py-3 border-b border-[var(--border-subtle)]">
      <div className="flex items-center gap-3 w-full">
        <motion.button
          type="button"
          onClick={toggleSidebar}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] md:hidden"
          aria-label="Open menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={spring}
        >
          <Menu size={18} />
        </motion.button>

        <div className="relative flex flex-1 items-center bg-[var(--bg-surface)] rounded-xl px-3 py-1.5 border border-[var(--border-subtle)] focus-within:border-[var(--accent)] focus-within:shadow-[0_0_0_3px_rgba(128,0,0,0.08)] transition-all duration-200">
          <Search size={14} className="text-[var(--text-muted)]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products, brands..."
            className="ml-2 outline-none bg-transparent w-full text-xs placeholder:text-[var(--text-muted)]"
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {showSuggestions && (
            <div className="absolute left-0 top-full mt-3 w-full bento-card p-5 text-xs">
              {recentProducts.length > 0 && (
                <div className="mb-4">
                  <p className="label-caps">Recently viewed</p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {recentProducts.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => handleChipClick(item)}
                        className="rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface-alt)] px-3 py-1.5 text-[11px] font-semibold hover:bg-[var(--bg-muted)] transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="label-caps">Trending now</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {TRENDING.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleChipClick(item)}
                      className="rounded-full bg-[var(--accent)]/8 px-3 py-1.5 text-[11px] font-semibold text-[var(--accent)] hover:bg-[var(--accent)]/12 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <motion.button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)]"
            aria-label="Toggle theme"
            title={theme === "soft" ? "Switch to Midnight" : "Switch to Soft Cream"}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={spring}
          >
            <SunMoon size={13} />
          </motion.button>
          <motion.button
            type="button"
            onClick={openCart}
            className="p-1.5 bg-[var(--bg-surface)] rounded-full border border-[var(--border-subtle)] relative cursor-pointer"
            aria-label="Open cart"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={spring}
          >
            <ShoppingCart size={14} className="text-[var(--text-muted)]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent)] text-[var(--accent-contrast)] text-[8px] flex items-center justify-center rounded-full border-2 border-[var(--bg-surface-alt)] font-bold">
                {cartCount}
              </span>
            )}
          </motion.button>
          <motion.div
            className="p-1.5 bg-[var(--bg-surface)] rounded-full border border-[var(--border-subtle)] relative cursor-pointer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={spring}
          >
            <Bell size={14} className="text-[var(--text-muted)]" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[var(--accent)] rounded-full border-2 border-[var(--bg-surface)]" />
          </motion.div>
          <div className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--accent-contrast)] font-bold text-[9px]">
            {initials.toUpperCase()}
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-1.5 w-full">
        <div className="relative flex items-center gap-1 bg-[var(--bg-muted)] p-1 rounded-xl">
          {["All", "Electronics", "Clothing", "Sale"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="relative px-4 py-1.5 rounded-lg text-xs font-semibold transition-colors z-10"
              style={{ color: activeCategory === cat ? 'var(--accent-contrast)' : 'var(--text-muted)' }}
            >
              {activeCategory === cat && (
                <motion.div
                  layoutId="category-pill"
                  className="absolute inset-0 bg-[var(--accent)] rounded-lg shadow-sm"
                  transition={spring}
                  style={{ zIndex: -1 }}
                />
              )}
              {cat}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}