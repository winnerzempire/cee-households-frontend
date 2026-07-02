import "./globals.css";
import { CartProvider } from "@/context/CartContext";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PromoSection from "@/components/PromoSection";
import MustHaveSlider from "@/components/Must-Have";
import TopBar from "@/components/TopBar";
import AnnouncementBar from "@/components/AnnouncementBar";
import Organization from "@/components/OrganizersSlider"
import Kitchenware from "@/components/KitchenwareSider"
import WhatsAppFloat from "@/components/WhatsAppFloat/WhatsAppFloat";

export const metadata = {
  title: {
    default:
      "Cee Households & Decor | Home Decor & Household Essentials in Kenya",
    template: "%s | Cee Households & Decor",
  },

  description:
    "Shop home decor, kitchenware, household essentials, wall art, and interior styling services in Kenya.",

  keywords: [
    "home decor kenya",
    "household items kenya",
    "kitchenware kenya",
    "interior styling kenya",
    "wall art kenya",
    "home accessories kenya",
    "living room decor kenya",
    "cee households",
  ],

  authors: [
    {
      name: "Cee Households & Decor",
    },
  ],

  creator: "Cee Households & Decor",

  openGraph: {
    title:
      "Cee Households & Decor | Home Decor & Household Essentials in Kenya",

    description:
      "Shop home decor, kitchenware, household essentials, wall art, and interior styling services in Kenya.",

    url: "https://ceehouseholds.co.ke",

    siteName: "Cee Households & Decor",

    locale: "en_KE",

    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <TopBar />
          <Navbar />
          <AnnouncementBar />

          <main>{children}</main>

          <MustHaveSlider />
          <Organization />
          <Kitchenware />
          <PromoSection />
          <Footer />
           <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}