"use client";

import { useEffect, useState } from "react";
import { Mail, Code2, Heart } from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import styles from "./Footer.module.css";

const SOCIALS = [
  { href: "https://github.com/Argeem", label: "GitHub", icon: Github },
  { href: "https://linkedin.com/in/sitth", label: "LinkedIn", icon: Linkedin },
  { href: "mailto:hello@sitth.dev", label: "Email", icon: Mail },
];

const LINKS = [
  { href: "#about",    en: "About",    th: "เกี่ยวกับ" },
  { href: "#projects", en: "Projects", th: "ผลงาน" },
  { href: "#blog",     en: "Blog",     th: "บทความ" },
  { href: "#contact",  en: "Contact",  th: "ติดต่อ" },
];

export default function Footer() {
  const { lang } = useApp();
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Code2 size={18} />
            <span>sitth</span>
          </div>
          <p className={styles.tagline}>
            {lang === "en"
              ? "Building things for the web."
              : "สร้างสิ่งดีๆ บนโลกอินเทอร์เน็ต"}
          </p>
          <div className={styles.socials}>
            {SOCIALS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav */}
        <nav className={styles.nav} aria-label="Footer navigation">
          <p className={styles.navTitle}>
            {lang === "en" ? "Navigation" : "เมนู"}
          </p>
          <ul role="list">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink}>
                  {lang === "en" ? link.en : link.th}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} sitth.{" "}
          {lang === "en"
            ? "Built with"
            : "สร้างด้วย"}{" "}
          <Heart size={12} className={styles.heart} />{" "}
          {lang === "en" ? "and Next.js" : "และ Next.js"}
        </p>
        <p className={styles.stack}>Next.js · TypeScript · GCP</p>
      </div>
    </footer>
  );
}
