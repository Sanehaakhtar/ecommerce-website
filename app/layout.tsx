import { Inter } from "next/font/google";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { OrdersProvider } from "../context/OrdersContext";
import { UiProvider } from "../context/UiContext";
import { ToastProvider } from "../context/ToastContext";
import { ThemeProvider } from "../context/ThemeContext";
import AppShell from "../components/AppShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        <ThemeProvider>
          <ToastProvider>
            <UiProvider>
              <AuthProvider>
                <CartProvider>
                  <OrdersProvider>
                    <AppShell>{children}</AppShell>
                  </OrdersProvider>
                </CartProvider>
              </AuthProvider>
            </UiProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}