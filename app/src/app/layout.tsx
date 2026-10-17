import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import ThemeProvider from "@/components/ThemeProvider/ThemeProvider";

export const metadata: Metadata = {
  title: "Sittisak Bannob (sitth) — Back End Developer",
  description: "Personal website & portfolio of Sittisak Bannob (sitth) — Back End Developer specializing in Golang, NestJS, Clean Architecture, and enterprise cloud solutions.",
  keywords: ["Sittisak Bannob", "sitth", "Back End Developer", "Backend Developer", "Golang", "NestJS", "TypeScript", "Clean Architecture", "Software Engineer", "Portfolio"],
  authors: [{ name: "Sittisak Bannob" }],
  openGraph: {
    title: "Sittisak Bannob (sitth) — Back End Developer",
    description: "Back End Developer with 3 years of experience specializing in Clean Architecture, procurement systems, and scalable backend infrastructure.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sittisak Bannob (sitth) — Back End Developer",
    description: "Back End Developer with 3 years of experience specializing in Clean Architecture, procurement systems, and scalable backend infrastructure.",
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
