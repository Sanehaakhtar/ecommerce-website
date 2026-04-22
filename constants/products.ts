export type ProductCategory = "Electronics" | "Clothing" | "Accessories";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: ProductCategory;
  tag?: string;
  imageUrl: string;
  imageBlur: string;
  description: string;
  imageGallery: string[];
  bgColor?: string;
}

const MAROON_BLUR =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><rect width='24' height='24' fill='%23800000' fill-opacity='0.12'/></svg>";

// Actual product-focused galleries
const HEADPHONES_GALLERY = [
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80",
];

const WATCH_GALLERY = [
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1546868871-af0de0ae72be?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
];

const KEYBOARD_GALLERY = [
  "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1541140532154-b024d7ea986b?auto=format&fit=crop&w=800&q=80",
];

const EARBUDS_GALLERY = [
  "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80",
];

const TABLET_GALLERY = [
  "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1561154464-82e9aab32f3c?auto=format&fit=crop&w=800&q=80",
];

const JACKET_GALLERY = [
  "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
];

const TSHIRT_GALLERY = [
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1503341504253-dff4f94032c2?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
];

const WALLET_GALLERY = [
  "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1612902456551-404b5c9e5ac1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?auto=format&fit=crop&w=800&q=80",
];

const BACKPACK_GALLERY = [
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80",
];

const SNEAKERS_GALLERY = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80",
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Sony WH-1000XM5",
    price: 299,
    category: "Electronics",
    tag: "Sale",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    imageBlur: MAROON_BLUR,
    description: "Noise-canceling headphones with studio-grade clarity and all-day comfort.",
    imageGallery: HEADPHONES_GALLERY,
    bgColor: "#e8a898",
  },
  {
    id: 2,
    name: "Apple Watch SE",
    price: 249,
    category: "Electronics",
    tag: "New",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    imageBlur: MAROON_BLUR,
    description: "Smart fitness companion designed for seamless daily performance.",
    imageGallery: WATCH_GALLERY,
    bgColor: "#8cbcb0",
  },
  {
    id: 3,
    name: "Logitech MX Keys",
    price: 109,
    category: "Electronics",
    tag: "Sale",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    imageBlur: MAROON_BLUR,
    description: "Premium mechanical feel with whisper-quiet keys and adaptive backlight.",
    imageGallery: KEYBOARD_GALLERY,
    bgColor: "#8bb88c",
  },
  {
    id: 4,
    name: "AirPods Pro 2",
    price: 219,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1590658268037-6bf12f032f55?auto=format&fit=crop&w=800&q=80",
    imageBlur: MAROON_BLUR,
    description: "Spatial audio and adaptive noise control for immersive listening.",
    imageGallery: EARBUDS_GALLERY,
    bgColor: "#ebc8a8",
  },
  {
    id: 5,
    name: "iPad Mini 6",
    price: 499,
    category: "Electronics",
    tag: "Sale",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
    imageBlur: MAROON_BLUR,
    description: "Compact power for creators, built for travel and effortless multitasking.",
    imageGallery: TABLET_GALLERY,
    bgColor: "#d4a878",
  },
  {
    id: 6,
    name: "Denim Jacket",
    price: 89,
    category: "Clothing",
    tag: "New",
    imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    imageBlur: MAROON_BLUR,
    description: "Luxury-weight denim with a tailored silhouette and soft wash.",
    imageGallery: JACKET_GALLERY,
    bgColor: "#a8c4d4",
  },
  {
    id: 7,
    name: "Graphic T-Shirt",
    price: 35,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    imageBlur: MAROON_BLUR,
    description: "Minimalist cotton tee with premium print and a relaxed fit.",
    imageGallery: TSHIRT_GALLERY,
    bgColor: "#c4a8d4",
  },
  {
    id: 8,
    name: "Leather Card Holder",
    price: 48,
    category: "Accessories",
    tag: "New",
    imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80",
    imageBlur: MAROON_BLUR,
    description: "Hand-finished leather with slim lines and luxury stitching.",
    imageGallery: WALLET_GALLERY,
    bgColor: "#d4c4a8",
  },
  {
    id: 9,
    name: "Travel Backpack",
    price: 129,
    category: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    imageBlur: MAROON_BLUR,
    description: "Boutique-grade carry with padded laptop protection and clean lines.",
    imageGallery: BACKPACK_GALLERY,
    bgColor: "#d4a8b4",
  },
  {
    id: 10,
    name: "Minimal Sneakers",
    price: 120,
    category: "Clothing",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    imageBlur: MAROON_BLUR,
    description: "Premium leather sneakers designed for all-day comfort and polish.",
    imageGallery: SNEAKERS_GALLERY,
    bgColor: "#c4d4c0",
  },
];
