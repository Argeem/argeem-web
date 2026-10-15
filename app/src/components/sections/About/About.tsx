"use client";

import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import { MapPin, Calendar, Coffee } from "lucide-react";
import styles from "./About.module.css";

const STATS = [
  { icon: Calendar, en: "3+ Years",  th: "3+ ปี",   label_en: "Experience", label_th: "ประสบการณ์" },
  { icon: Coffee,   en: "50+",       th: "50+",      label_en: "Projects",   label_th: "โปรเจกต์" },
  { icon: MapPin,   en: "Bangkok",   th: "กรุงเทพฯ", label_en: "Based in",   label_th: "ที่อยู่" },
];

export default function About() {
  const { lang } = useApp();

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className={styles.grid}>
          {/* Text */}
          <div className={styles.content}>
            <span className="section-label">
              {lang === "en" ? "About Me" : "เกี่ยวกับผม"}
            </span>
            <h2 id="about-title" className={styles.title}>
              {lang === "en"
                ? "Crafting digital experiences with purpose"
                : "สร้าง digital experience ที่มีความหมาย"}
            </h2>
            <div className={styles.bio}>
              <p>
                {lang === "en"
                  ? "I'm a full-stack developer based in Bangkok, Thailand. I love turning complex problems into simple, beautiful, and intuitive digital products."
                  : "ผมเป็น full-stack developer ที่อยู่ในกรุงเทพฯ ชอบเปลี่ยนปัญหาที่ซับซ้อนให้กลายเป็น digital product ที่เรียบง่าย สวยงาม และใช้งานง่าย"}
              </p>
              <p>
                {lang === "en"
                  ? "When I'm not coding, I write technical articles, contribute to open-source projects, and explore new technologies. I believe in writing clean, maintainable code that scales."
                  : "เวลาว่างจากการเขียนโค้ด ผมเขียนบทความเทคนิค, contribute โปรเจกต์ open-source และสำรวจเทคโนโลยีใหม่ๆ เชื่อในการเขียนโค้ดที่สะอาดและ scale ได้"}
              </p>
            </div>
          </div>

          {/* Stats + image */}
          <div className={styles.side}>
            <div className={styles.photoCard}>
              <div className={styles.photoInner}>
                <span>S</span>
              </div>
            </div>
            <div className={styles.stats}>
              {STATS.map(({ icon: Icon, en, th, label_en, label_th }) => (
                <div key={label_en} className={styles.stat}>
                  <Icon size={18} className={styles.statIcon} />
                  <div>
                    <p className={styles.statValue}>{lang === "en" ? en : th}</p>
                    <p className={styles.statLabel}>{lang === "en" ? label_en : label_th}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
