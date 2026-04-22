"use client"
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useParams } from 'next/navigation';
import { ChevronLeft, ShoppingCart, ShieldCheck, Truck, Heart, Star, Minus, Plus, RotateCcw, Check, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PRODUCTS } from '@/constants/products';
import { useCart } from '@/context/CartContext';

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

const REVIEWS = [
  { name: "Alex M.", rating: 5, text: "Excellent quality, exactly as described. Fast shipping too!", date: "2 weeks ago", verified: true },
  { name: "Sarah K.", rating: 4, text: "Great product overall. The build quality is impressive for the price.", date: "1 month ago", verified: true },
  { name: "James R.", rating: 5, text: "Been using it daily for 3 months now. Holds up perfectly.", date: "3 months ago", verified: false },
];

export default function ProductDetail() {
  const params = useParams();
  const slug = params.id as string;
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isFav, setIsFav] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "reviews">("details");

  const product = PRODUCTS.find(p => p.name.toLowerCase().replace(/ /g, '-') === slug);

  if (!product) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[var(--bg-primary)] p-8">
        <div className="text-center">
          <p className="text-4xl mb-3">🔍</p>
          <h2 className="text-sm font-bold mb-1">Product not found</h2>
          <p className="text-[10px] text-[var(--text-muted)] mb-4">The item you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="text-[var(--accent)] text-[10px] font-bold hover:underline">← Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const gallery = product.imageGallery?.length ? product.imageGallery : [product.imageUrl];
  const relatedProducts = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const otherProducts = PRODUCTS.filter(p => p.category !== product.category).slice(0, 4);

  return (
    <div className="flex-1 bg-[var(--bg-primary)] overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-4 md:px-6 md:py-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)] mb-4">
          <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
          <ChevronRight size={10} />
          <Link href="/shop" className="hover:text-[var(--accent)] transition-colors">{product.category}</Link>
          <ChevronRight size={10} />
          <span className="text-[var(--foreground)] font-medium">{product.name}</span>
        </div>

        {/* Main Product Card */}
        <div className="bento-card p-4 md:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Gallery */}
            <div>
              <div
                className="rounded-lg overflow-hidden relative aspect-square mb-2"
                style={{ backgroundColor: product.bgColor ?? "#e8a898" }}
              >
                <Image
                  src={gallery[activeImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 380px, 90vw"
                />
                {product.tag && (
                  <span className="absolute top-2 left-2 bg-[var(--accent)] text-[var(--accent-contrast)] px-1.5 py-0.5 rounded text-[7px] font-bold uppercase">
                    {product.tag}
                  </span>
                )}
                <motion.button
                  type="button"
                  onClick={() => setIsFav(!isFav)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/80 backdrop-blur-sm"
                >
                  <Heart size={14} className={isFav ? "fill-[var(--accent)] text-[var(--accent)]" : "text-[var(--text-muted)]"} />
                </motion.button>
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-1.5">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className={`w-14 h-14 rounded-md overflow-hidden relative border-2 transition-all ${
                        activeImage === i ? "border-[var(--accent)] opacity-100" : "border-transparent opacity-50 hover:opacity-80"
                      }`}
                      style={{ backgroundColor: product.bgColor ?? "#e8a898" }}
                    >
                      <Image src={img} alt="" fill className="object-cover" sizes="56px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Details */}
            <div className="flex flex-col">
              <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)] mb-0.5">{product.category}</p>
              <h1 className="text-lg font-bold text-[var(--foreground)] mb-1.5">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mb-3">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={10} className={s <= 4 ? "fill-[#d4713d] text-[#d4713d]" : "text-[#d4713d]/30"} />
                  ))}
                </div>
                <span className="text-[9px] text-[var(--text-muted)] font-medium">4.8 · 1,240 reviews</span>
              </div>

              <div className="flex items-baseline gap-2 mb-3">
                <p className="text-xl font-extrabold text-[var(--foreground)]">${product.price.toLocaleString()}</p>
                {product.tag === "Sale" && (
                  <span className="text-xs text-[var(--text-muted)] line-through">${Math.round(product.price * 1.3)}</span>
                )}
              </div>

              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-4">{product.description}</p>

              {/* Quantity + Add to cart */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center border border-[var(--border-subtle)] rounded-lg overflow-hidden">
                  <button type="button" onClick={() => setQty(q => Math.max(1, q - 1))} className="px-2 py-1.5 hover:bg-[var(--bg-muted)] transition-colors">
                    <Minus size={11} />
                  </button>
                  <span className="px-2.5 text-[11px] font-bold tabular-nums">{qty}</span>
                  <button type="button" onClick={() => setQty(q => q + 1)} className="px-2 py-1.5 hover:bg-[var(--bg-muted)] transition-colors">
                    <Plus size={11} />
                  </button>
                </div>
                <motion.button
                  type="button"
                  onClick={() => { for (let i = 0; i < qty; i++) addToCart({ name: product.name, price: product.price }); }}
                  className="flex-1 bg-[var(--accent)] text-[var(--accent-contrast)] py-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 hover:bg-[var(--accent-hover)] transition-colors"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={spring}
                >
                  <ShoppingCart size={12} /> Add to Cart
                </motion.button>
              </div>

              {/* Trust Badges - compact */}
              <div className="grid grid-cols-3 gap-2 border-t border-[var(--border-subtle)] pt-3">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={13} className="text-[#2ecc71] shrink-0" />
                  <p className="text-[8px] font-medium text-[var(--text-muted)]">2 Year Warranty</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck size={13} className="text-[#3498db] shrink-0" />
                  <p className="text-[8px] font-medium text-[var(--text-muted)]">Free Delivery</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw size={13} className="text-[#d4713d] shrink-0" />
                  <p className="text-[8px] font-medium text-[var(--text-muted)]">30-Day Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs: Details / Reviews */}
        <div className="mt-5">
          <div className="flex gap-1 bg-[var(--bg-muted)] p-0.5 rounded-lg w-fit mb-4">
            {(["details", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-[10px] font-bold capitalize transition-all ${
                  activeTab === tab
                    ? "bg-[var(--bg-surface)] text-[var(--foreground)] shadow-sm"
                    : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {tab === "reviews" ? `Reviews (${REVIEWS.length})` : "Product Details"}
              </button>
            ))}
          </div>

          {activeTab === "details" ? (
            <div className="bento-card p-4 space-y-3">
              <h4 className="text-xs font-bold">Highlights</h4>
              <ul className="space-y-1.5">
                {[
                  "Premium build quality with durable materials",
                  "Ergonomic design for all-day comfort",
                  "Industry-leading performance in its category",
                  "Eco-friendly packaging & carbon-neutral shipping",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[10px] text-[var(--text-muted)]">
                    <Check size={11} className="text-[#2ecc71] mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="space-y-2">
              {REVIEWS.map((review) => (
                <div key={review.name} className="bento-card p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[8px] font-bold text-[var(--accent)]">
                        {review.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-[var(--foreground)]">
                          {review.name}
                          {review.verified && (
                            <span className="ml-1 text-[7px] text-[#2ecc71] font-medium">✓ Verified</span>
                          )}
                        </p>
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} size={8} className={s <= review.rating ? "fill-[#d4713d] text-[#d4713d]" : "text-[#d4713d]/20"} />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-[8px] text-[var(--text-muted)]">{review.date}</span>
                  </div>
                  <p className="text-[10px] text-[var(--text-muted)] leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-5">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-bold">More in {product.category}</h3>
              <Link href="/shop" className="text-[var(--accent)] text-[9px] font-bold hover:underline">View all</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.name.toLowerCase().replace(/ /g, '-')}`} className="block group">
                  <div className="bento-card p-2 hover:shadow-md transition-shadow">
                    <div className="aspect-[4/3] rounded-md overflow-hidden relative mb-1.5" style={{ backgroundColor: p.bgColor ?? "#e8a898" }}>
                      <Image src={p.imageUrl} alt={p.name} fill sizes="120px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <p className="text-[9px] font-bold truncate">{p.name}</p>
                    <p className="text-[10px] font-bold">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Discover More */}
        <div className="mt-5 mb-4">
          <h3 className="text-xs font-bold mb-3">Discover something different</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {otherProducts.map((p) => (
              <Link key={p.id} href={`/product/${p.name.toLowerCase().replace(/ /g, '-')}`} className="block group">
                <div className="bento-card p-2 hover:shadow-md transition-shadow">
                  <div className="aspect-[4/3] rounded-md overflow-hidden relative mb-1.5" style={{ backgroundColor: p.bgColor ?? "#e8a898" }}>
                    <Image src={p.imageUrl} alt={p.name} fill sizes="120px" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="text-[9px] font-bold truncate">{p.name}</p>
                  <p className="text-[10px] font-bold">${p.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}