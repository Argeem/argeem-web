"use client";

import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import styles from "./Skills.module.css";

const SKILLS = [
  { category_en: "Frontend", category_th: "Frontend", items: [
    { name: "Next.js",    level: 90 },
    { name: "React",      level: 92 },
    { name: "TypeScript", level: 85 },
    { name: "CSS / SCSS", level: 88 },
  ]},
  { category_en: "Backend", category_th: "Backend", items: [
    { name: "Node.js",    level: 82 },
    { name: "Python",     level: 75 },
    { name: "REST APIs",  level: 88 },
    { name: "PostgreSQL", level: 78 },
  ]},
  { category_en: "DevOps & Tools", category_th: "DevOps & Tools", items: [
    { name: "Docker",  level: 72 },
    { name: "GCP",     level: 70 },
    { name: "Git",     level: 90 },
    { name: "CI/CD",   level: 75 },
  ]},
];

const TECH_ICONS = [
  "Next.js","React","TypeScript","Node.js","Python",
  "PostgreSQL","Docker","GCP","Git","Figma","VS Code","GitHub",
];

export default function Skills() {
  const { lang } = useApp();

  return (
    <section className={`section ${styles.section}`} id="skills" aria-labelledby="skills-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            {lang === "en" ? "Skills" : "ทักษะ"}
          </span>
          <h2 id="skills-title" className="section-title">
            {lang === "en" ? "My Tech Stack" : "เทคโนโลยีที่ใช้"}
          </h2>
          <p className="section-desc">
            {lang === "en"
              ? "Technologies and tools I work with daily to build production-ready applications."
              : "เครื่องมือและเทคโนโลยีที่ใช้งานประจำในการพัฒนาแอปพลิเคชัน"}
          </p>
        </div>

        {/* Skill bars */}
        <div className={styles.grid}>
          {SKILLS.map((group) => (
            <div key={group.category_en} className="card">
              <h3 className={styles.groupTitle}>
                {lang === "en" ? group.category_en : group.category_th}
              </h3>
              <div className={styles.bars}>
                {group.items.map((skill) => (
                  <div key={skill.name} className={styles.barItem}>
                    <div className={styles.barMeta}>
                      <span className={styles.skillName}>{skill.name}</span>
                      <span className={styles.skillLevel}>{skill.level}%</span>
                    </div>
                    <div className={styles.barTrack} role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={skill.name}>
                      <div className={styles.barFill} style={{ "--w": `${skill.level}%` } as React.CSSProperties} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech icon cloud */}
        <div className={styles.iconCloud}>
          <p className={styles.iconCloudLabel}>
            {lang === "en" ? "Also familiar with" : "รู้จักเพิ่มเติม"}
          </p>
          <div className={styles.icons}>
            {TECH_ICONS.map((name) => (
              <span key={name} className="badge">{name}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
