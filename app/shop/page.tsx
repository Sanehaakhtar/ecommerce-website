"use client";

import { Suspense } from "react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/constants/products";

const categories = Array.from(new Set(PRODUCTS.map((product) => product.category)));
const minPrice = Math.min(...PRODUCTS.map((product) => product.price));
const maxPrice = Math.max(...PRODUCTS.map((product) => product.price));

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const gridVariants = {
    hidden: { opacity: 1 },
    show: { opacity: 1, transition: { staggerChildren: 0.06 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories);
  const [priceCap, setPriceCap] = useState(maxPrice);

  // Apply category from URL param
  useEffect(() => {
    if (categoryParam && categories.includes(categoryParam as typeof categories[number])) {
      setSelectedCategories([categoryParam as typeof categories[number]]);
    }
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategories.includes(product.category);
      const matchesPrice = product.price <= priceCap;
      return matchesCategory && matchesPrice;
    });
  }, [priceCap, selectedCategories]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[var(--bg-primary)]">
      <div className="flex-1 overflow-y-auto px-4 py-5 md:px-6 md:py-6">
        <div className="max-w-6xl mx-auto space-y-4">
        <header className="flex items-end justify-between">
          <div>
            <p className="label-caps mb-1">Catalog</p>
            <h1 className="text-xl font-bold tracking-tight">Shop</h1>
          </div>
          <p className="text-[10px] text-[var(--text-muted)]">{filteredProducts.length} items</p>
        </header>

        {/* Horizontal Filter Bar */}
        <div className="bento-card px-4 py-3 flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-[10px] font-semibold text-[var(--foreground)]">Category</p>
            <div className="flex items-center gap-1 bg-[var(--bg-muted)] p-0.5 rounded-lg">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategories(
                    selectedCategories.length === 1 && selectedCategories[0] === category
                      ? categories
                      : [category]
                  )}
                  className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all ${
                    selectedCategories.length === 1 && selectedCategories[0] === category
                      ? "bg-[var(--accent)] text-[var(--accent-contrast)] shadow-sm"
                      : selectedCategories.includes(category)
                        ? "text-[var(--foreground)] hover:bg-[var(--bg-surface)]"
                        : "text-[var(--text-muted)] hover:bg-[var(--bg-surface)]"
                  }`}
                >
                  {category}
                </button>
              ))}
              {selectedCategories.length < categories.length && (
                <button
                  type="button"
                  onClick={() => { setSelectedCategories(categories); setPriceCap(maxPrice); }}
                  className="px-2 py-1 rounded-md text-[9px] font-semibold text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors"
                >
                  All
                </button>
              )}
            </div>
          </div>

          <div className="h-4 w-px bg-[var(--border-subtle)]" />

          <div className="flex items-center gap-3 flex-1 min-w-[180px] max-w-[280px]">
            <p className="text-[10px] font-semibold text-[var(--foreground)] whitespace-nowrap">Price</p>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              step={10}
              value={priceCap}
              onChange={(event) => setPriceCap(Number(event.target.value))}
              className="flex-1 accent-[var(--accent)]"
            />
            <span className="text-[10px] font-bold text-[var(--accent)] whitespace-nowrap">${priceCap}</span>
          </div>

          {(selectedCategories.length < categories.length || priceCap < maxPrice) && (
            <>
              <div className="h-4 w-px bg-[var(--border-subtle)]" />
              <button
                type="button"
                onClick={() => { setSelectedCategories(categories); setPriceCap(maxPrice); }}
                className="text-[9px] font-semibold text-[var(--accent)] hover:underline"
              >
                Reset
              </button>
            </>
          )}
        </div>

        {/* Product Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3"
          variants={gridVariants}
          initial="hidden"
          animate="show"
        >
          {filteredProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard {...product} />
            </motion.div>
          ))}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="rounded-lg border border-dashed border-[var(--border-subtle)] p-8 text-center text-[11px] text-[var(--text-muted)]">
            No products match this filter.
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
