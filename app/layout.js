import { client } from "@/lib/graphql/client";
import {
  GET_MENU,
  GET_THEME_OPTIONS,
  processMenuItems,
  toLocalPath,
} from "@/lib/graphql/queries";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "InfoNet Technology Corporation",
  description:
    "From 2 gas stations to convenience stores, InfoNet delivers integrated POS and fuel management systems that keep your business running smarter, faster, and more profitably.",
  openGraph: {
    title: "InfoNet Technology Corporation",
    description:
      "From 2 gas stations to convenience stores, InfoNet delivers integrated POS and fuel management systems that keep your business running smarter, faster, and more profitably.",
    images: [{ url: "/default-og.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InfoNet Technology Corporation",
    description:
      "From gas 2 stations to convenience stores, InfoNet delivers integrated POS and fuel management systems that keep your business running smarter, faster, and more profitably.",
    images: ["/default-og.jpg"],
  },
};

async function getThemeOptions() {
  try {
    const { data } = await client.query({
      query: GET_THEME_OPTIONS,
      fetchPolicy: "no-cache",
    });
    return data?.crbThemeOptions || {};
  } catch (error) {
    console.error("Error fetching theme options:", error);
    return {};
  }
}

async function getMenu() {
  const menuId = parseInt(process.env.NEXT_PUBLIC_PRIMARY_MENU_ID || "28", 10);
  try {
    const { data } = await client.query({
      query: GET_MENU,
      variables: { menuId },
      fetchPolicy: "no-cache",
    });
    const menu = data?.menu;
    const nodes = menu?.menuItems?.nodes ?? [];
    const topLevel = processMenuItems(Array.isArray(nodes) ? nodes : []);
    const getUrl = (item) => toLocalPath(item?.path ?? item?.url ?? item?.uri ?? item?.href ?? "#");
    return topLevel.map((item) => ({
      label: item.label,
      url: getUrl(item),
      children: (item.childItems?.nodes || item.childItems || []).map((c) => ({
        label: c.label,
        url: getUrl(c),
      })),
    }));
  } catch {
    return [];
  }
}

async function getFooterMenu(menuId) {
  try {
    const { data } = await client.query({
      query: GET_MENU,
      variables: { menuId },
      fetchPolicy: "no-cache",
    });
    const menu = data?.menu;
    const nodes = menu?.menuItems?.nodes ?? [];
    const getUrl = (item) => toLocalPath(item?.path ?? item?.url ?? item?.uri ?? "#");
    // Use top-level only (parentId null); if all have parentId, use all (simple list)
    const topLevel = nodes.filter((n) => n?.parentId == null);
    const items = topLevel.length > 0 ? topLevel : nodes;
    return items.flatMap((item) => {
      const children = item.childItems?.nodes ?? item.childItems ?? [];
      const hasChildren = Array.isArray(children) && children.length > 0;
      if (hasChildren) {
        return children.map((c) => ({ label: c.label, url: getUrl(c) }));
      }
      return [{ label: item.label, url: getUrl(item) }];
    });
  } catch {
    return [];
  }
}

async function getFooterMenus() {
  const [industries, solutions, services, insights, company, contact, social] =
    await Promise.all([
      getFooterMenu(18),
      getFooterMenu(22),
      getFooterMenu(17),
      getFooterMenu(23),
      getFooterMenu(24),
      getFooterMenu(25),
      getFooterMenu(26),
    ]);
  return {
    industries,
    solutions,
    services,
    insights,
    company,
    contact,
    social,
  };
}

export default async function RootLayout({ children }) {
  const [themeOptions, menuItems, footerMenus] = await Promise.all([
    getThemeOptions(),
    getMenu(),
    getFooterMenus(),
  ]);

  return (
    <html lang="en">
      <head></head>
      <body
        className={`${jetBrainsMono.variable} ${manrope.variable} antialiased bg-[#F8F8F3]`}
      >
        <Header themeOptions={themeOptions} menuItems={menuItems} />
        {children}
        <Footer footerMenus={footerMenus} themeOptions={themeOptions} />
      </body>
    </html>
  );
}
