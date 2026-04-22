"use client"
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import CartDrawer from "@/components/cartDrawer";
import { useUi } from "@/context/UiContext";
import PageTransition from "@/components/PageTransition";
import LiveTicker from "@/components/LiveTicker";
import OfferBanner from "@/components/OfferBanner";
import CommandPalette from "@/components/CommandPalette";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, closeSidebar, isCartOpen, closeCart } = useUi();
  const pathname = usePathname();
  const router = useRouter();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const hideSidebar = pathname === "/login" || pathname === "/signup";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setIsCommandOpen(true);
      }

      if (!isTyping && event.key === "Escape") {
        setIsCommandOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const commandActions = useMemo(
    () => [
      {
        id: "shop",
        label: "Go to Shop",
        description: "Browse the full catalog",
        onSelect: () => router.push("/shop"),
      },
      {
        id: "orders",
        label: "View Orders",
        description: "Jump to recent orders",
        onSelect: () => router.push("/#recent-orders"),
      },
      {
        id: "search",
        label: "Search Products",
        description: "Open the Shop page",
        onSelect: () => router.push("/shop"),
      },
    ],
    [router]
  );

  if (hideSidebar) {
    return (
      <PageTransition className="min-h-screen bg-[var(--bg-primary)] text-[var(--foreground)]">
        {children}
      </PageTransition>
    );
  }

  return (
    <div className="flex h-screen bg-[var(--bg-primary)] text-[var(--foreground)] overflow-hidden">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/30 backdrop-blur-md"
              onClick={closeSidebar}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.aside
              className="relative z-50"
              initial={{ x: -320, opacity: 0.85 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -320, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            >
              <Sidebar />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden">
        <OfferBanner />
        <Header />
        <AnimatePresence mode="wait">
          <PageTransition key={pathname} className="flex-1 flex flex-col overflow-hidden">
            {children}
          </PageTransition>
        </AnimatePresence>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <LiveTicker />
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        actions={commandActions}
      />
    </div>
  );
}
