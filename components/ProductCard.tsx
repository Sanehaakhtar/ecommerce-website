"use client"
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, Plus } from "lucide-react";
import Link from 'next/link';
import { useCart } from "../context/CartContext";
import { useState } from "react";
import type { Product } from "@/constants/products";
import QuickLookModal from "@/components/QuickLookModal";

type ProductProps = Product;

const spring = { type: "spring" as const, stiffness: 300, damping: 20 };

const cardVariants = {
  rest: {
    y: 0,
    boxShadow: "0 10px 40px rgba(128, 0, 0, 0.03)",
  },
  hover: {
    y: -4,
    boxShadow: "0 20px 50px rgba(128, 0, 0, 0.06)",
  },
};

const imageVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.04 },
};

const RECENT_STORAGE_KEY = "shopspace-recent-products";

export default function ProductCard({ name, price, tag, imageUrl, imageBlur, imageGallery, description, bgColor }: ProductProps) {
  const slug = name.toLowerCase().replace(/ /g, '-');
  const { addToCart } = useCart();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isQuickLookOpen, setIsQuickLookOpen] = useState(false);
  const formattedPrice = price.toLocaleString("en-US");
  const gallery = imageGallery?.length ? imageGallery : [imageUrl, imageUrl, imageUrl];

  const handleAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ name, price });
  };

  const handleCardClick = () => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem(RECENT_STORAGE_KEY);
    const prev = stored ? (JSON.parse(stored) as string[]) : [];
    const next = [name, ...prev.filter((item) => item !== name)].slice(0, 3);
    localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(next));
  };

  const handleQuickLook = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsQuickLookOpen(true);
  };

  const tagColor = tag === "Sale"
    ? "bg-[var(--accent)] text-[var(--accent-contrast)]"
    : tag === "New"
      ? "bg-[#d4713d] text-white"
      : "bg-[var(--accent)] text-[var(--accent-contrast)]";

  return (
    <>
      <Link href={`/product/${slug}`} className="block" onClick={handleCardClick}>
      <motion.div
        layout
        initial="rest"
        animate="rest"
        whileHover="hover"
        transition={spring}
        variants={cardVariants}
        className="relative bento-card p-2.5 group"
      >
        {/* Product Image */}
        <div
          className="aspect-[4/3] rounded-xl mb-2.5 relative overflow-hidden"
          style={{ backgroundColor: bgColor ?? "#e8a898" }}
        >
          {tag && (
            <span className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[7px] font-black uppercase ${tagColor}`}>
              {tag}
            </span>
          )}
          <motion.button
            type="button"
            onClick={handleQuickLook}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="absolute top-2 right-2 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[8px] font-bold uppercase text-[var(--accent)] opacity-0 transition-opacity group-hover:opacity-100"
          >
            <Eye size={12} /> Quick Look
          </motion.button>
          <motion.div
            variants={imageVariants}
            className="absolute inset-0"
          >
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(min-width: 1280px) 220px, (min-width: 768px) 30vw, 80vw"
              className="object-cover"
              placeholder="blur"
              blurDataURL={imageBlur}
              onLoadingComplete={() => setIsImageLoaded(true)}
            />
          </motion.div>
          <div
            className={`absolute inset-0 bg-[var(--accent)]/15 animate-pulse transition-opacity duration-300 ${
              isImageLoaded ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* Product Info */}
        <div className="px-1">
          <p className="text-[10px] font-bold text-[var(--foreground)] mb-0.5">{name}</p>
          <div className="flex items-center gap-0.5 mb-1">
            {[1,2,3,4,5].map((dot) => (
              <span key={dot} className={`w-1 h-1 rounded-full ${dot <= 4 ? "bg-[var(--accent)]" : "bg-[var(--accent)]/20"}`} />
            ))}
            <span className="text-[8px] text-[var(--text-muted)] font-medium ml-0.5">(1.2k)</span>
          </div>
          <p className="font-bold text-sm mb-2">${formattedPrice}</p>
          <div className="flex items-center gap-1.5">
            <motion.button
              type="button"
              onClick={handleAddClick}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-1.5 rounded-lg border-2 border-[var(--accent)] text-[var(--accent)] text-[8px] font-bold uppercase tracking-wider hover:bg-[var(--accent)] hover:text-[var(--accent-contrast)] transition-colors"
            >
              Add to Cart
            </motion.button>
            <motion.button
              type="button"
              onClick={handleAddClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-7 h-7 rounded-lg border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
            >
              <Plus size={12} />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>

      <QuickLookModal
        isOpen={isQuickLookOpen}
        onClose={() => setIsQuickLookOpen(false)}
        product={{ name, price, description, imageGallery: gallery, imageUrl }}
        onAddToCart={() => addToCart({ name, price })}
      />
    </>
  );
}