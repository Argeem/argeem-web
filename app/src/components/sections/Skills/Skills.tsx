"use client";

import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import { Layers } from "lucide-react";
import { SKILL_CATEGORIES, ADDITIONAL_TECH } from "@/data/skills";
import styles from "./Skills.module.css";

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
