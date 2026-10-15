"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Moon, Sun, Globe, Menu, X, Code2 } from "lucide-react";
import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "#about",    en: "About",    th: "เกี่ยวกับ" },
  { href: "#skills",   en: "Skills",   th: "ทักษะ" },
  { href: "#projects", en: "Projects", th: "ผลงาน" },
  { href: "#blog",     en: "Blog",     th: "บทความ" },
  { href: "#contact",  en: "Contact",  th: "ติดต่อ" },
];

export default function Navbar() {
  const { theme, toggleTheme, lang, toggleLang } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  return (
    <header
      ref={navRef}
      className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}
      role="banner"
    >
      <nav className={`container ${styles.nav}`} aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Home">
          <Code2 size={20} />
          <span>sitth</span>
        </Link>

        {/* Desktop links */}
        <ul className={styles.links} role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className={styles.link}>
                {lang === "en" ? link.en : link.th}
              </a>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className={styles.controls}>
          {/* Language toggle */}
          <button
            id="lang-toggle"
            className={styles.iconBtn}
            onClick={toggleLang}
            aria-label={`Switch to ${lang === "en" ? "Thai" : "English"}`}
          >
            <Globe size={16} />
            <span className={styles.langLabel}>{lang.toUpperCase()}</span>
          </button>

          {/* Theme toggle */}
          <button
            id="theme-toggle"
            className={styles.iconBtn}
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {/* CTA */}
          <a href="#contact" className={`btn btn-primary ${styles.ctaBtn}`}>
            {lang === "en" ? "Hire Me" : "ติดต่อจ้าง"}
          </a>

          {/* Hamburger */}
          <button
            id="mobile-menu-toggle"
            className={styles.hamburger}
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle mobile menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`${styles.drawer} ${mobileOpen ? styles.drawerOpen : ""}`}>
        <ul role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.drawerLink}
                onClick={() => setMobileOpen(false)}
              >
                {lang === "en" ? link.en : link.th}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" className="btn btn-primary" onClick={() => setMobileOpen(false)}>
          {lang === "en" ? "Hire Me" : "ติดต่อจ้าง"}
        </a>
      </div>
    </header>
  );
}
