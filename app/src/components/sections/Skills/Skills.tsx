"use client";

import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import { Code2, Server, Database, Cloud, Layers } from "lucide-react";
import styles from "./Skills.module.css";

const SKILL_CATEGORIES = [
  {
    icon: Code2,
    title_en: "Languages",
    title_th: "ภาษาโปรแกรมมิ่ง",
    desc_en: "Core languages for high-performance backend systems & algorithms",
    desc_th: "ภาษาหลักสำหรับพัฒนาระบบ Backend ประสิทธิภาพสูงและอัลกอริทึม",
    items: [
      { name: "Golang", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "TypeScript", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "JavaScript", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "SQL", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "Python", tag_en: "Proficient", tag_th: "เชี่ยวชาญ", core: false },
      { name: "C / C++", tag_en: "Algorithms", tag_th: "อัลกอริทึม", core: false },
    ],
  },
  {
    icon: Server,
    title_en: "Backend & Architecture",
    title_th: "Backend & สถาปัตยกรรมระบบ",
    desc_en: "Decoupled architecture, microservices, and high-reliability APIs",
    desc_th: "การออกแบบระบบแบบแยกส่วน ไมโครเซอร์วิส และ API ที่เสถียร",
    items: [
      { name: "Clean Architecture", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "NestJS", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "ExpressJS", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "RESTful APIs", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "gRPC", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "Batch Processing", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "Jest / Unit Testing", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
    ],
  },
  {
    icon: Database,
    title_en: "Databases & Storage",
    title_th: "ฐานข้อมูลและพื้นที่จัดเก็บ",
    desc_en: "Hybrid relational & document databases for scale and integrity",
    desc_th: "การจัดการข้อมูลแบบ Hybrid ทั้งฐานข้อมูลเชิงสัมพันธ์และ NoSQL",
    items: [
      { name: "PostgreSQL", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "Oracle SQL", tag_en: "Production", tag_th: "ใช้งานจริง", core: true },
      { name: "MongoDB (NoSQL)", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "Redis (Caching)", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "AWS S3 Storage", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
    ],
  },
  {
    icon: Cloud,
    title_en: "DevOps, Cloud & Quality",
    title_th: "DevOps คลาวด์ และมาตรฐานคุณภาพ",
    desc_en: "Containerization, cloud monitoring, CI/CD, and code standards",
    desc_th: "การทำ Containerization, คลาวด์มอนิเตอร์ และมาตรฐานโค้ดระดับองค์กร",
    items: [
      { name: "Docker", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "Git & GitLab CI/CD", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "Azure Services", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "AWS CloudWatch", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "SonarQube & Linters", tag_en: "Quality", tag_th: "คุณภาพโค้ด", core: false },
      { name: "Postman & DBeaver", tag_en: "Tools", tag_th: "เครื่องมือ", core: false },
      { name: "JsPDF Document Engine", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
    ],
  },
];

const ADDITIONAL_TECH = [
  "Angular", "React", "LoopBack", "OpenCV", "SonarQube", "VS Code",
  "GitLab", "Linux", "Customs Clearance Systems", "TMS Logistics",
];

export default function Skills() {
  const { lang } = useApp();

  return (
    <section className={`section ${styles.section}`} id="skills" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <Layers size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
            {lang === "en" ? "Skills & Tools" : "ทักษะและเครื่องมือ"}
          </span>
          <h2 id="skills-title" className="section-title">
            {lang === "en" ? "Technical Expertise" : "ความเชี่ยวชาญทางเทคนิค"}
          </h2>
          <p className="section-desc">
            {lang === "en"
              ? "Battle-tested technologies and tools I work with daily to engineer production systems."
              : "เทคโนโลยีและเครื่องมือที่ใช้งานจริงเป็นประจำในการพัฒนาและดูแลระบบ Enterprise"}
          </p>
        </div>

        {/* Legend */}
        <div className={styles.legendBar}>
          <div className={styles.legendItem}>
            <span className={styles.dotCore} />
            <span>{lang === "en" ? "Core Stack" : "ทักษะหลัก (Core Stack)"}</span>
          </div>
          <div className={styles.legendItem}>
            <span className={styles.dotProd} />
            <span>{lang === "en" ? "Production / Enterprise" : "ใช้งานจริงในระดับองค์กร (Production)"}</span>
          </div>
        </div>

        {/* Categorized Pill Cards Grid */}
        <div className={styles.grid}>
          {SKILL_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.title_en} className={styles.categoryCard}>
                <div className={styles.categoryHeader}>
                  <div className={styles.categoryIconWrap}>
                    <Icon size={22} />
                  </div>
                  <div className={styles.categoryHeaderInfo}>
                    <h3 className={styles.categoryTitle}>
                      {lang === "en" ? cat.title_en : cat.title_th}
                    </h3>
                    <p className={styles.categoryDesc}>
                      {lang === "en" ? cat.desc_en : cat.desc_th}
                    </p>
                  </div>
                </div>

                <div className={styles.skillList}>
                  {cat.items.map((skill) => (
                    <div
                      key={skill.name}
                      className={`${styles.skillPill} ${skill.core ? styles.skillPillCore : ""}`}
                    >
                      <span className={skill.core ? styles.dotCore : styles.dotProd} />
                      <span>{skill.name}</span>
                      <span className={styles.pillBadge}>
                        {lang === "en" ? skill.tag_en : skill.tag_th}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Tech cloud */}
        <div className={styles.iconCloud}>
          <p className={styles.iconCloudLabel}>
            {lang === "en" ? "Also Experienced With" : "เทคโนโลยีและระบบอื่นที่เกี่ยวข้อง"}
          </p>
          <div className={styles.icons}>
            {ADDITIONAL_TECH.map((name) => (
              <span key={name} className="badge">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
