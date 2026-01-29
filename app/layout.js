import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Favicon from "@/public/assets/logo.png";

// JetBrains Mono font
const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

// Manrope font
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "InfoNet Technology Corporation",
  description:
    "From gas stations to convenience stores, InfoNet delivers integrated POS and fuel management systems that keep your business running smarter, faster, and more profitably.",
  icons: {
    icon: "/assets/InfonetLogo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${jetBrainsMono.variable} ${manrope.variable} antialiased bg-[#F8F8F3]`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
