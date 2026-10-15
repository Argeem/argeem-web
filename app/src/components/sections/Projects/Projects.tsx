"use client";

import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Github } from "@/components/Icons";
import styles from "./Projects.module.css";

const PROJECTS = [
  {
    title: "E-Commerce Platform",
    desc_en: "A full-stack e-commerce app with real-time inventory, Stripe payments, and an admin dashboard.",
    desc_th: "แอป e-commerce แบบ full-stack พร้อม inventory real-time, ชำระเงินด้วย Stripe และ admin dashboard",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    github: "https://github.com/Argeem",
    live: "#",
    featured: true,
  },
  {
    title: "Dev Blog Engine",
    desc_en: "A markdown-based blog engine with syntax highlighting, search, and RSS feed.",
    desc_th: "Blog engine ที่ใช้ Markdown พร้อม syntax highlighting, ค้นหา, และ RSS feed",
    tags: ["Next.js", "MDX", "TypeScript"],
    github: "https://github.com/Argeem",
    live: "#",
    featured: true,
  },
  {
    title: "Task Manager API",
    desc_en: "RESTful API for task management with JWT auth, rate limiting, and OpenAPI docs.",
    desc_th: "RESTful API สำหรับจัดการงาน พร้อม JWT auth, rate limiting และเอกสาร OpenAPI",
    tags: ["Node.js", "Express", "PostgreSQL", "Docker"],
    github: "https://github.com/Argeem",
    live: undefined,
    featured: false,
  },
];

export default function Projects() {
  const { lang } = useApp();

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            {lang === "en" ? "Projects" : "ผลงาน"}
          </span>
          <h2 id="projects-title" className="section-title">
            {lang === "en" ? "Things I've Built" : "สิ่งที่ผมสร้าง"}
          </h2>
          <p className="section-desc">
            {lang === "en"
              ? "A selection of projects I've worked on — from side projects to production apps."
              : "รวมโปรเจกต์ที่ทำมา ตั้งแต่โปรเจกต์ส่วนตัวไปจนถึง production app"}
          </p>
        </div>

        <div className={styles.grid}>
          {PROJECTS.map((project) => (
            <article key={project.title} className={`card ${styles.card} ${project.featured ? styles.featured : ""}`}>
              {/* Header placeholder (image/preview) */}
              <div className={styles.preview}>
                <span className={styles.previewText}>{project.title[0]}</span>
              </div>

              <div className={styles.body}>
                <h3 className={styles.projectTitle}>{project.title}</h3>
                <p className={styles.projectDesc}>
                  {lang === "en" ? project.desc_en : project.desc_th}
                </p>

                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="badge">{tag}</span>
                  ))}
                </div>

                <div className={styles.links}>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label={`View ${project.title} on GitHub`}>
                    <Github size={15} /> GitHub
                  </a>
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" aria-label={`View ${project.title} live`}>
                      <ExternalLink size={15} />
                      {lang === "en" ? "Live Demo" : "ดูสด"}
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.footer}>
          <a href="https://github.com/Argeem" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            {lang === "en" ? "View all on GitHub" : "ดูทั้งหมดบน GitHub"}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
