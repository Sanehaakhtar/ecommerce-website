"use client"
import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

interface UiContextType {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  activeCategory: string;
  setActiveCategory: (val: string) => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export function UiProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const value = useMemo(
    () => ({
      isSidebarOpen,
      openSidebar: () => setIsSidebarOpen(true),
      closeSidebar: () => setIsSidebarOpen(false),
      toggleSidebar: () => setIsSidebarOpen((prev) => !prev),
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      searchTerm,
      setSearchTerm,
      activeCategory,
      setActiveCategory,
    }),
    [isSidebarOpen, isCartOpen, searchTerm, activeCategory]
  );

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const context = useContext(UiContext);
  if (!context) throw new Error("useUi must be used within a UiProvider");
  return context;
}
