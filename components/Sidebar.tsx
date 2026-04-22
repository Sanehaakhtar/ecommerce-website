"use client"
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, LayoutDashboard, Package, Settings, ShoppingBag, Tag } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

const CATEGORIES = ["All Items", "Electronics", "Clothing", "Accessories"];

export default function Sidebar() {
  const { user } = useAuth();
  const router = useRouter();
  const initials = user?.name
    ? user.name.split(" ").map((part) => part[0]).join("").slice(0, 2)
    : "SA";

  const pathname = usePathname();

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/" },
    { icon: <ShoppingBag size={20} />, label: "Shop", href: "/shop" },
    { icon: <Heart size={20} />, label: "Wishlist", href: "/wishlist" },
    { icon: <Package size={20} />, label: "My Orders", href: "/orders" },
    { icon: <Tag size={20} />, label: "Offers", href: "/offers" },
    { icon: <Settings size={20} />, label: "Settings", href: "/settings" },
  ];

  const handleCategoryClick = (cat: string) => {
    const param = cat === "All Items" ? "" : `?category=${encodeURIComponent(cat)}`;
    router.push(`/shop${param}`);
  };

  return (
    <aside className="w-48 bg-[var(--bg-surface-alt)]/80 backdrop-blur-xl h-full flex flex-col px-3 py-4 text-[var(--text-muted)] shrink-0 border-r border-[var(--border-subtle)]">
      <Link href="/" className="flex items-center gap-2 mb-6 font-extrabold text-sm tracking-tight px-2">
        <div className="bg-[var(--accent)] text-[var(--accent-contrast)] p-1 rounded-lg text-[10px]">S</div>
        <span className="text-[var(--foreground)]">ShopSpace</span>
      </Link>

      <nav className="flex-1 space-y-0.5">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.label} href={item.href} className="block">
              <div className="relative">
                {isActive && (
                  <motion.div
                    layoutId="sidebar-pill"
                    className="absolute inset-0 rounded-xl bg-[var(--accent)]"
                    transition={spring}
                  />
                )}
                <motion.div
                  className={`relative z-10 flex items-center gap-2 px-2 py-2 rounded-xl transition-colors ${
                    isActive ? "text-[var(--accent-contrast)]" : "hover:bg-[var(--bg-muted)]"
                  }`}
                  whileHover={isActive ? {} : { x: 2 }}
                  transition={spring}
                >
                  {React.cloneElement(item.icon, { size: 15 })}
                  <span className="font-medium text-xs">{item.label}</span>
                </motion.div>
              </div>
            </Link>
          );
        })}

        {/* Categories Section */}
        <div className="pt-4 mt-3 border-t border-[var(--border-subtle)]">
          <p className="label-caps mb-2 px-2 !text-[8px]">Quick Browse</p>
          <div className="space-y-0.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryClick(cat)}
                className="w-full text-left px-2 py-1.5 text-[11px] rounded-lg flex items-center gap-1.5 transition-colors text-[var(--text-muted)] hover:text-[var(--foreground)] hover:bg-[var(--bg-muted)]"
              >
                <span className="w-1 h-1 rounded-full bg-[var(--accent)]/40" />
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="mt-auto pt-4 border-t border-[var(--border-subtle)] flex items-center gap-2 px-2">
        <div className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center text-[var(--accent-contrast)] font-bold text-[9px]">
          {initials.toUpperCase()}
        </div>
        <div>
            <p className="text-[var(--foreground)] font-semibold text-[10px]">{user?.name ?? "Saneha A."}</p>
            <p className="text-[8px]">Member</p>
        </div>
      </div>
    </aside>
  );
}