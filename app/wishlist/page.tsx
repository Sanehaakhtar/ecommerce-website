"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCTS, type Product } from "@/constants/products";
import { useCart } from "@/context/CartContext";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function WishlistPage() {
  const { addToCart } = useCart();
  // Start with a few pre-populated wishlist items for demo
  const [wishlist, setWishlist] = useState<Product[]>(() =>
    PRODUCTS.filter((p) => p.tag === "New" || p.tag === "Sale").slice(0, 5)
  );

  const removeItem = (id: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const moveToCart = (product: Product) => {
    addToCart({ name: product.name, price: product.price });
    removeItem(product.id);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-primary)]">
      <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <header>
            <p className="label-caps mb-1">Collection</p>
            <h1 className="text-xl font-bold tracking-tight">Wishlist</h1>
            <p className="text-[11px] text-[var(--text-muted)] mt-0.5">
              {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
            </p>
          </header>

          {wishlist.length === 0 ? (
            <div className="bento-card p-10 text-center">
              <Heart size={32} className="mx-auto text-[var(--text-muted)] mb-3" />
              <p className="text-sm font-bold mb-1">Your wishlist is empty</p>
              <p className="text-[11px] text-[var(--text-muted)] mb-4">
                Browse products and tap the heart to save them here.
              </p>
              <Link
                href="/shop"
                className="inline-block bg-[var(--accent)] text-[var(--accent-contrast)] px-5 py-2 rounded-lg text-xs font-bold hover:bg-[var(--accent-hover)] transition-colors"
              >
                Browse Shop
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {wishlist.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={spring}
                    className="bento-card p-3 flex items-center gap-4"
                  >
                    <Link
                      href={`/product/${product.name.toLowerCase().replace(/ /g, "-")}`}
                      className="shrink-0"
                    >
                      <div
                        className="w-16 h-16 rounded-lg overflow-hidden relative"
                        style={{ backgroundColor: product.bgColor ?? "#e8a898" }}
                      >
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/product/${product.name.toLowerCase().replace(/ /g, "-")}`}
                        className="text-xs font-bold text-[var(--foreground)] hover:text-[var(--accent)] transition-colors truncate block"
                      >
                        {product.name}
                      </Link>
                      <p className="text-[10px] text-[var(--text-muted)]">{product.category}</p>
                      <p className="text-sm font-bold mt-0.5">${product.price}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <motion.button
                        type="button"
                        onClick={() => moveToCart(product)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--accent)] text-[var(--accent-contrast)] text-[9px] font-bold uppercase tracking-wider hover:bg-[var(--accent-hover)] transition-colors"
                      >
                        <ShoppingCart size={11} /> Add to Cart
                      </motion.button>
                      <motion.button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-1.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-red-500 hover:border-red-200 transition-colors"
                      >
                        <Trash2 size={12} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Suggestions */}
          {wishlist.length > 0 && (
            <div>
              <h3 className="text-xs font-bold mb-3">You might also like</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {PRODUCTS.filter((p) => !wishlist.find((w) => w.id === p.id))
                  .slice(0, 4)
                  .map((p) => (
                    <Link
                      key={p.id}
                      href={`/product/${p.name.toLowerCase().replace(/ /g, "-")}`}
                      className="block"
                    >
                      <div className="bento-card p-2 hover:shadow-md transition-shadow">
                        <div
                          className="aspect-square rounded-lg overflow-hidden relative mb-1.5"
                          style={{ backgroundColor: p.bgColor ?? "#e8a898" }}
                        >
                          <Image
                            src={p.imageUrl}
                            alt={p.name}
                            fill
                            sizes="120px"
                            className="object-cover"
                          />
                        </div>
                        <p className="text-[9px] font-bold truncate">{p.name}</p>
                        <p className="text-[10px] font-bold">${p.price}</p>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
