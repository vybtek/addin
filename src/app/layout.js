import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import ScrollToTop from "@/components/Home/ScrollToTop";
import Loader from "@/components/Home/Loader";
import "./globals.css";

export const metadata = {
  title: "Addins",
  description: "Addins",
  icon: "https://www.addinsedu.com/assets/default/images/logo-1.png",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <Loader />
        <main className="flex-1">{children}</main>
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
