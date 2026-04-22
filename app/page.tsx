"use client"
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import RecentOrders from "@/components/RecentOrder";
import { PRODUCTS } from "@/constants/products";
import { useUi } from "@/context/UiContext";

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

export default function Dashboard() {

  const gridVariants = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
  };

  const { searchTerm, activeCategory } = useUi();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-primary)]">

      <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
        <div className="space-y-8">
        {isLoading ? (
          <>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-8 bento-card bento-card-alt p-8 md:p-12 min-h-[300px] animate-pulse">
                <div className="h-3 w-32 rounded mb-6 skeleton-shimmer" />
                <div className="h-12 md:h-14 rounded w-3/4 mb-3 skeleton-shimmer" />
                <div className="h-12 md:h-14 rounded w-2/3 mb-8 skeleton-shimmer" />
                <div className="h-12 w-40 rounded-2xl skeleton-shimmer" />
              </div>
              <div className="col-span-12 lg:col-span-4 flex flex-col gap-4">
                <div className="flex-1 bento-card p-6 animate-pulse">
                  <div className="h-3 w-28 rounded mb-4 skeleton-shimmer" />
                  <div className="h-10 w-16 rounded skeleton-shimmer" />
                </div>
                <div className="flex-1 bento-card p-6 animate-pulse">
                  <div className="h-3 w-32 rounded mb-4 skeleton-shimmer" />
                  <div className="h-10 w-24 rounded skeleton-shimmer" />
                </div>
                <div className="flex-1 bento-card p-6 animate-pulse">
                  <div className="h-3 w-32 rounded mb-4 skeleton-shimmer" />
                  <div className="h-2 rounded skeleton-shimmer" />
                </div>
              </div>
            </div>

            <section>
              <div className="flex justify-between items-end mb-8">
                <div className="space-y-2 animate-pulse">
                  <div className="h-6 w-56 rounded skeleton-shimmer" />
                  <div className="h-3 w-32 rounded skeleton-shimmer" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="bento-card p-3 animate-pulse">
                    <div className="h-40 rounded-[20px] mb-4 skeleton-shimmer" />
                    <div className="h-3 rounded mb-2 w-3/4 skeleton-shimmer" />
                    <div className="h-2 rounded mb-4 w-1/2 skeleton-shimmer" />
                    <div className="flex items-center justify-between">
                      <div className="h-4 rounded w-16 skeleton-shimmer" />
                      <div className="h-8 w-8 rounded-xl skeleton-shimmer" />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2 bento-card p-8 animate-pulse">
                <div className="h-5 w-40 rounded mb-6 skeleton-shimmer" />
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="h-8 rounded skeleton-shimmer" />
                  ))}
                </div>
              </div>
              <div className="bento-card p-6 animate-pulse">
                <div className="h-5 w-32 rounded mb-4 skeleton-shimmer" />
                <div className="h-24 rounded-2xl skeleton-shimmer" />
              </div>
            </section>
          </>
        ) : (
          <>
            {/* HERO SECTION - Bento Layout */}
            <motion.div
              className="flex flex-col lg:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...spring, delay: 0.1 }}
            >
              {/* Main Sale Banner — uses theme vars */}
              <div className="lg:w-[62%] rounded-2xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-center min-h-[200px]"
                style={{ background: "var(--banner-bg)" }}
              >
                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "var(--banner-accent)" }}>Summer Sale</p>
                 <h2 className="text-2xl md:text-3xl font-extrabold leading-[1.1] tracking-tight mb-1" style={{ color: "var(--banner-text)" }}>
                   Up to 40% off<br/>
                   <span style={{ color: "var(--banner-accent)" }}>Electronics</span>
                 </h2>
                 <p className="text-xs mb-5" style={{ color: "var(--banner-sub)" }}>Limited offer — ends Sunday</p>
                 <motion.button
                   type="button"
                   className="px-6 py-2.5 rounded-xl text-xs font-bold w-fit transition-all"
                   style={{ background: "var(--banner-accent)", color: "var(--banner-text)" }}
                   whileHover={{ scale: 1.02, boxShadow: "0 12px 32px rgba(212,113,61,0.25)" }}
                   whileTap={{ scale: 0.98 }}
                   transition={spring}
                 >
                    Shop Now
                 </motion.button>
                 {/* Decorative Circles */}
                 <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full" style={{ background: "var(--banner-text)", opacity: 0.04 }} />
                 <div className="absolute right-16 -bottom-8 w-32 h-32 rounded-full" style={{ background: "var(--banner-text)", opacity: 0.03 }} />
              </div>

              {/* Quick Stats — 2x2 grid */}
              <div className="lg:w-[38%] grid grid-cols-2 gap-3">
                <motion.div className="bento-card p-4 flex flex-col rounded-2xl" whileHover={{ y: -2 }} transition={spring}>
                    <div className="flex items-center gap-1.5 mb-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2ecc71]" />
                      <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">Active Orders</p>
                    </div>
                    <p className="text-2xl font-extrabold tracking-tight mt-3">3</p>
                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5">2 in transit</p>
                </motion.div>
                <motion.div className="bento-card p-4 flex flex-col rounded-2xl" whileHover={{ y: -2 }} transition={spring}>
                    <div className="flex items-center gap-1.5 mb-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2ecc71]" />
                      <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">Total Savings</p>
                    </div>
                    <p className="text-2xl font-extrabold tracking-tight mt-3">$84</p>
                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5">This month</p>
                </motion.div>
                <motion.div className="bento-card p-4 flex flex-col rounded-2xl" whileHover={{ y: -2 }} transition={spring}>
                    <div className="flex items-center gap-1.5 mb-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3498db]" />
                      <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">Reward Points</p>
                    </div>
                    <p className="text-2xl font-extrabold tracking-tight mt-3">520</p>
                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Redeem anytime</p>
                </motion.div>
                <motion.div className="bento-card p-4 flex flex-col rounded-2xl" whileHover={{ y: -2 }} transition={spring}>
                    <div className="flex items-center gap-1.5 mb-auto">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e67e22]" />
                      <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-[var(--text-muted)]">Wishlist</p>
                    </div>
                    <p className="text-2xl font-extrabold tracking-tight mt-3">7</p>
                    <p className="text-[10px] text-[var(--text-muted)] mt-0.5">Items saved</p>
                </motion.div>
              </div>
            </motion.div>

            {/* PRODUCTS SECTION */}
            <section>
              <div className="flex justify-between items-end mb-5">
                <div>
                  <h3 className="text-lg font-bold tracking-tight">Featured for You</h3>
                  <p className="text-[var(--text-muted)] text-[11px] mt-0.5">Based on your browsing</p>
                </div>
                <button className="text-[var(--accent)] text-[10px] font-bold uppercase tracking-wider hover:underline">See all</button>
              </div>

              <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
                variants={gridVariants}
                initial="hidden"
                animate="show"
              >
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      variants={itemVariants}
                    >
                      <ProductCard {...product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              {filteredProducts.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-[var(--text-muted)]">No products found matching &ldquo;{searchTerm}&rdquo;</p>
                </div>
              )}
            </section>

            {/* BOTTOM SECTION — Orders + Trending */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <RecentOrders />
              <div className="bento-card p-4">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-bold text-xs">Trending Now</h3>
                  <Link href="/shop" className="text-[var(--accent)] text-[9px] font-bold uppercase tracking-wider hover:underline">See all</Link>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {PRODUCTS.filter(p => p.tag).slice(0, 4).map((product) => (
                    <Link key={product.id} href={`/product/${product.name.toLowerCase().replace(/ /g, '-')}`} className="block group">
                      <div
                        className="aspect-[4/3] rounded-lg mb-1.5 relative overflow-hidden"
                        style={{ backgroundColor: product.bgColor ?? "#e8a898" }}
                      >
                        {product.tag && (
                          <span className={`absolute top-1 left-1 z-10 px-1.5 py-0.5 rounded text-[6px] font-black uppercase text-white ${
                            product.tag === "Sale" ? "bg-[var(--accent)]" : product.tag === "New" ? "bg-[#d4713d]" : "bg-[var(--accent)]"
                          }`}>
                            {product.tag === "Sale" ? "HOT" : product.tag}
                          </span>
                        )}
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          sizes="80px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-[9px] font-bold truncate">{product.name}</p>
                      <p className="font-bold text-[10px] mt-0.5">${product.price}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}