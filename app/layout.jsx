import "./globals.css";
import Script from "next/script";
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
import { GoogleAnalytics } from '@next/third-parties/google';

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
                  <Script id="facebook-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}
                (window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '1020389890874940');
                fbq('track', 'PageView');
              `}
            </Script>
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
        
        <GoogleAnalytics gaId="G-ZC7JK9KLZ6" />
      </body>
       
    </html>
  );
}