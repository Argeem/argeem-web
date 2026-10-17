"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, Mail, Sparkles } from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import styles from "./Hero.module.css";

const SOCIALS = [
  { href: "https://github.com/Argeem",             icon: Github,   label: "GitHub" },
  { href: "https://linkedin.com/in/sitth",        icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:sitthisakbannob@gmail.com",      icon: Mail,     label: "Email" },
];

const CODE_SNIPPET = `const sitth = {
  name: "Sittisak Bannob",
  role: "Back End Developer",
  experience: "3+ years",
  stack: ["Golang", "NestJS", "TypeScript",
          "PostgreSQL", "Docker", "Clean Arch"],
  passion: "High-performance systems",
  available: true,
};`;

export default function Hero() {
  const { lang } = useApp();
  const codeRef = useRef<HTMLPreElement>(null);

  // Typing effect for code block
  useEffect(() => {
    const el = codeRef.current;
    if (!el) return;
    el.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
      el.textContent = CODE_SNIPPET.slice(0, i++);
      if (i > CODE_SNIPPET.length) clearInterval(timer);
    }, 18);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.hero} id="hero" aria-label="Hero">
      {/* Decorative background blobs */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        {/* Left — Text content */}
        <div className={styles.content}>
          <div className={styles.badge}>
            <Sparkles size={12} />
            {lang === "en" ? "Available for opportunities" : "พร้อมรับโอกาสการทำงานใหม่"}
          </div>

          <h1 className={styles.heading}>
            {lang === "en" ? (
              <>
                Hi, I&apos;m{" "}
                <span className="gradient-text">Sittisak</span>
                <br />
                <span className={styles.subHeading}>
                  Back End<br />Developer
                </span>
              </>
            ) : (
              <>
                สวัสดี ผม{" "}
                <span className="gradient-text">สิทธิศักดิ์</span>
                <br />
                <span className={styles.subHeading}>
                  นักพัฒนา<br />Back End
                </span>
              </>
            )}
          </h1>

          <p className={styles.desc}>
            {lang === "en"
              ? "Back End Developer with 3 years of experience delivering robust business value. Specialized in Clean Architecture, procurement & billing systems, hybrid databases, and scalable cloud solutions."
              : "นักพัฒนา Back End ประสบการณ์ 3 ปี มุ่งเน้นการสร้างคุณค่าทางธุรกิจด้วยเทคโนโลยี เชี่ยวชาญ Clean Architecture, ระบบสัญญาและวางบิลระดับองค์กร, ฐานข้อมูล Hybrid และ Cloud Services"}
          </p>

          <div className={styles.actions}>
            <a href="#projects" className="btn btn-primary" id="hero-cta-projects">
              {lang === "en" ? "View My Work" : "ดูผลงาน"}
              <ArrowDown size={16} />
            </a>
            <a href="#contact" className="btn btn-secondary" id="hero-cta-contact">
              {lang === "en" ? "Get in Touch" : "ติดต่อ"}
            </a>
          </div>

          <div className={styles.socials}>
            {SOCIALS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label={label}
              >
                <Icon size={18} />
              </a>
            ))}
            <span className={styles.socialDivider} />
            <span className={styles.socialText}>
              {lang === "en" ? "Find me on" : "ตามหาได้ที่"}
            </span>
          </div>
        </div>

        {/* Right — Photo + Code card */}
        <div className={styles.visual}>
          {/* Profile photo */}
          <div className={styles.photoWrapper}>
            <div className={styles.photo} aria-label="Profile photo of Sittisak Bannob">
              <Image
                src="/profile.jpg"
                alt="Sittisak Bannob"
                width={160}
                height={160}
                className={styles.photoImg}
                priority
              />
            </div>
            {/* Floating badge */}
            <div className={styles.floatingBadge}>
              <span className={styles.dot} />
              {lang === "en" ? "Open to work" : "พร้อมร่วมงาน"}
            </div>
          </div>

          {/* Code snippet card */}
          <div className={styles.codeCard}>
            <div className={styles.codeHeader}>
              <span className={styles.dot1} />
              <span className={styles.dot2} />
              <span className={styles.dot3} />
              <span className={styles.fileName}>profile.ts</span>
            </div>
            <pre ref={codeRef} className={styles.code} aria-label="Code snippet" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#about" className={styles.scrollIndicator} aria-label="Scroll to About">
        <ArrowDown size={16} />
      </a>
    </section>
  );
}
