import Navbar from "@/components/Home/Navbar";
import "./globals.css";
import Footer from "@/components/Home/Footer";
import ScrollToTop from "@/components/Home/ScrollToTop";
import Loader from "@/components/Home/Loader";

export const metadata = {
  title: "Addins",
  description: "Addins",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Loader />
        <Navbar />
        {children}
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}