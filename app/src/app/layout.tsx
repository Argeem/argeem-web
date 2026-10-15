import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";

export const metadata: Metadata = {
  title: "sitth — Developer & Engineer",
  description: "Personal website of sitth — Full-stack developer passionate about building clean, performant web applications.",
  keywords: ["developer", "engineer", "portfolio", "full-stack", "react", "nextjs"],
  authors: [{ name: "sitth" }],
  openGraph: {
    title: "sitth — Developer & Engineer",
    description: "Full-stack developer passionate about building clean, performant web applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "sitth — Developer & Engineer",
    description: "Full-stack developer passionate about building clean, performant web applications.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
