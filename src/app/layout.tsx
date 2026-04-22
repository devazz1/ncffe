import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/header/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getCategories } from "@/lib/api";
import type { Category } from "@/lib/types";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NGO Donation Platform",
  description: "Functional public website bootstrap for NGO donation flows",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let categories: Category[] = [];
  try {
    const response = await getCategories();
    categories = response.data.items;
  } catch {
    categories = [];
  }

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-50 text-zinc-900">
        <Providers>
          <div className="flex min-h-full flex-col">
            <SiteHeader categories={categories} />
            <main className="flex-1">{children}</main>
            <SiteFooter categories={categories} />
          </div>
        </Providers>
      </body>
    </html>
  );
}
