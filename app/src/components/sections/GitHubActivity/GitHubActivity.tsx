"use client";

import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import { GitCommit, Star, GitFork, ExternalLink } from "lucide-react";
import styles from "./GitHubActivity.module.css";

const REPOS = [
  { name: "personal-website", desc_en: "My personal website built with Next.js and deployed on GCP.", desc_th: "เว็บส่วนตัวสร้างด้วย Next.js deploy บน GCP", stars: 12, forks: 3, lang: "TypeScript" },
  { name: "blog-engine",      desc_en: "Markdown blog engine with MDX support.",                       desc_th: "Blog engine รองรับ MDX",                stars: 8,  forks: 1, lang: "TypeScript" },
  { name: "task-api",         desc_en: "RESTful task management API with JWT auth.",                   desc_th: "RESTful API จัดการงาน พร้อม JWT auth",  stars: 5,  forks: 2, lang: "JavaScript" },
];

// Deterministic contribution grid pattern
const WEEKS = 26;
const DAYS  = 7;
const grid = Array.from({ length: WEEKS }, (_, wi) =>
  Array.from({ length: DAYS }, (_, di) => {
    const seed = (wi * 13 + di * 17 + (wi % 4) * 7) % 23;
    if (seed < 7) return 0;
    if (seed < 12) return 1;
    if (seed < 17) return 2;
    if (seed < 21) return 3;
    return 4;
  })
);

const LEVELS = ["", "rgba(124,58,237,0.15)", "rgba(124,58,237,0.35)", "rgba(124,58,237,0.6)", "rgba(124,58,237,0.9)"];

export default function GitHubActivity() {
  const { lang } = useApp();

  return (
    <section className={`section ${styles.section}`} id="github" aria-labelledby="github-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">GitHub</span>
          <h2 id="github-title" className="section-title">
            {lang === "en" ? "Open Source Activity" : "กิจกรรม Open Source"}
          </h2>
        </div>

        {/* Contribution heatmap */}
        <div className={styles.heatmapCard}>
          <p className={styles.heatmapLabel}>
            {lang === "en" ? "Contribution activity (last 6 months)" : "กิจกรรมการ contribute (6 เดือนล่าสุด)"}
          </p>
          <div className={styles.heatmap} aria-label="Contribution heatmap">
            {grid.map((week, wi) => (
              <div key={wi} className={styles.week}>
                {week.map((level, di) => (
                  <div
                    key={di}
                    className={styles.cell}
                    style={{ background: LEVELS[level] || "var(--bg-elevated)" }}
                    title={`Level ${level}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className={styles.heatmapLegend}>
            <span>{lang === "en" ? "Less" : "น้อย"}</span>
            {LEVELS.map((c, i) => (
              <div key={i} className={styles.cell} style={{ background: c || "var(--bg-elevated)" }} />
            ))}
            <span>{lang === "en" ? "More" : "มาก"}</span>
          </div>
        </div>

        {/* Pinned repos */}
        <div className={styles.repos}>
          {REPOS.map((repo) => (
            <a key={repo.name} href={`https://github.com/sitth/${repo.name}`} target="_blank" rel="noopener noreferrer" className={`card ${styles.repo}`}>
              <div className={styles.repoHeader}>
                <GitCommit size={15} className={styles.repoIcon} />
                <span className={styles.repoName}>sitth / {repo.name}</span>
                <ExternalLink size={13} className={styles.repoExternal} />
              </div>
              <p className={styles.repoDesc}>{lang === "en" ? repo.desc_en : repo.desc_th}</p>
              <div className={styles.repoMeta}>
                <span className={styles.repoLang}>
                  <span className={styles.langDot} />
                  {repo.lang}
                </span>
                <span className={styles.repoStat}><Star size={12} /> {repo.stars}</span>
                <span className={styles.repoStat}><GitFork size={12} /> {repo.forks}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
