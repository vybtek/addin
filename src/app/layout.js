"use client";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import ScrollToTop from "@/components/Home/ScrollToTop";
import Loader from "@/components/Home/Loader";
import "./globals.css";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <html lang="en">
      <head>
        <title>{isAdminRoute ? "Addins Admin" : "Addins"}</title>
        <meta
          name="description"
          content={isAdminRoute ? "Admin Dashboard for Addins" : "Addins"}
        />
        <link
          rel="icon"
          href="https://www.addinsedu.com/assets/default/images/logo-1.png"
        />
      </head>
      <body className="flex flex-col min-h-screen">
        {!isAdminRoute && <Navbar />}
        <Loader />
        <main className="flex-1">{children}</main>
        <ScrollToTop />
        {!isAdminRoute && <Footer />}
      </body>
    </html>
  );
}