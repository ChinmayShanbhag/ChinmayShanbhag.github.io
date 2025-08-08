import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chinmay Shanbhag • Data Analyst",
  description:
    "Analyst specializing in KPI dashboards, financial modelling, automation, and data storytelling with SQL, Tableau, and Power BI",
  metadataBase: undefined,
  openGraph: {
    title: "Chinmay Shanbhag • Data Analyst",
    description:
      "Analyst specializing in KPI dashboards, financial modelling, automation, and data storytelling with SQL, Tableau, and Power BI",
    url: undefined,
    siteName: "Chinmay Shanbhag Portfolio",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Chinmay Shanbhag" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chinmay Shanbhag • Data Analyst",
    description:
      "Analyst specializing in KPI dashboards, financial modelling, automation, and data storytelling with SQL, Tableau, and Power BI",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black text-black dark:text-white`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
