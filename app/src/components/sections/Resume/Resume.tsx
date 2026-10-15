"use client";

import { useState } from "react";
import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import { Download, Briefcase, GraduationCap, CheckCircle2, FileText, Check } from "lucide-react";
import styles from "./Resume.module.css";

const EXPERIENCES = [
  {
    period: "2024 — Present",
    role_en: "Senior Full-Stack Engineer",
    role_th: "Senior Full-Stack Engineer",
    company: "Tech Innovations Co.",
    desc_en: "Led frontend & cloud modernization using Next.js App Router, TypeScript, and microservices on GCP.",
    desc_th: "เป็นแกนหลักในการพัฒนาระบบคลาวด์และโมเดิร์นเว็บแอปด้วย Next.js, TypeScript และ microservices บน GCP",
    highlights: ["Improved Core Web Vitals to 95+", "Architected CI/CD workflows with automated tests", "Mentored junior developers"],
  },
  {
    period: "2022 — 2024",
    role_en: "Full-Stack Developer",
    role_th: "Full-Stack Developer",
    company: "Digital Solutions Studio",
    desc_en: "Built interactive web applications, REST APIs, and integrated payment gateways with Stripe & Omise.",
    desc_th: "พัฒนาเว็บแอปพลิเคชัน, RESTful API และเชื่อมต่อระบบการชำระเงินออนไลน์",
    highlights: ["Engineered responsive dashboards", "Decreased API latency by 40%", "Collaborated in Agile sprints"],
  },
];

const EDUCATION = [
  {
    period: "2018 — 2022",
    degree_en: "B.Sc. in Computer Science",
    degree_th: "วิทยาศาสตรบัณฑิต สาขาวิทยาการคอมพิวเตอร์",
    institution_en: "Faculty of Science",
    institution_th: "คณะวิทยาศาสตร์",
  },
];

export default function Resume() {
  const { lang } = useApp();
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section className={`section ${styles.section}`} id="resume" aria-labelledby="resume-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <FileText size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
            {lang === "en" ? "Experience & Education" : "ประวัติและผลงาน"}
          </span>
          <h2 id="resume-title" className="section-title">
            {lang === "en" ? "Work Experience & CV" : "ประวัติการทำงานและเรซูเม่"}
          </h2>
          <p className="section-desc">
            {lang === "en"
              ? "A summary of my professional journey, education, and career milestones."
              : "สรุปเส้นทางการทำงาน การศึกษา และประสบการณ์ตลอดการเป็นนักพัฒนาซอฟต์แวร์"}
          </p>
        </div>

        <div className={styles.wrapper}>
          {/* Timeline Experience */}
          <div className={styles.timelineCol}>
            <div className={styles.columnHeader}>
              <Briefcase className={styles.colIcon} size={20} />
              <h3 className={styles.colTitle}>
                {lang === "en" ? "Professional Experience" : "ประสบการณ์การทำงาน"}
              </h3>
            </div>

            <div className={styles.timeline}>
              {EXPERIENCES.map((exp) => (
                <div key={exp.company} className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <span className={styles.period}>{exp.period}</span>
                  <h4 className={styles.itemRole}>
                    {lang === "en" ? exp.role_en : exp.role_th}
                  </h4>
                  <p className={styles.itemCompany}>{exp.company}</p>
                  <p className={styles.itemDesc}>
                    {lang === "en" ? exp.desc_en : exp.desc_th}
                  </p>
                  <ul className={styles.highlightsList}>
                    {exp.highlights.map((h, i) => (
                      <li key={i} className={styles.highlightItem}>
                        <CheckCircle2 size={13} className={styles.checkIcon} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className={styles.columnHeader} style={{ marginTop: 36 }}>
              <GraduationCap className={styles.colIcon} size={20} />
              <h3 className={styles.colTitle}>
                {lang === "en" ? "Education" : "การศึกษา"}
              </h3>
            </div>

            <div className={styles.timeline}>
              {EDUCATION.map((edu) => (
                <div key={edu.institution_en} className={styles.timelineItem}>
                  <div className={styles.timelineDot} />
                  <span className={styles.period}>{edu.period}</span>
                  <h4 className={styles.itemRole}>
                    {lang === "en" ? edu.degree_en : edu.degree_th}
                  </h4>
                  <p className={styles.itemCompany}>
                    {lang === "en" ? edu.institution_en : edu.institution_th}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Download Card Side */}
          <div className={styles.downloadCol}>
            <div className={`card ${styles.downloadCard}`}>
              <div className={styles.cvIconWrap}>
                <FileText size={36} className={styles.cvIcon} />
              </div>
              <h3 className={styles.downloadTitle}>
                {lang === "en" ? "Download Full Resume" : "ดาวน์โหลดเรซูเม่ฉบับเต็ม"}
              </h3>
              <p className={styles.downloadText}>
                {lang === "en"
                  ? "Looking for an engineer who blends frontend aesthetics with robust backend infrastructure? Grab a copy of my PDF resume."
                  : "ต้องการนักพัฒนาที่เชี่ยวชาญทั้ง Frontend UX และ Backend Cloud Infrastructure? ดาวน์โหลด Resume ฉบับ PDF ได้ที่นี่"}
              </p>

              <div className={styles.cvMeta}>
                <span>Format: PDF</span>
                <span>•</span>
                <span>Updated: 2026</span>
              </div>

              <a
                href="#download-cv"
                onClick={handleDownload}
                className={`btn btn-primary ${styles.downloadBtn}`}
                id="download-resume-btn"
              >
                {downloaded ? (
                  <>
                    <Check size={16} />
                    {lang === "en" ? "Downloaded!" : "ดาวน์โหลดแล้ว!"}
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    {lang === "en" ? "Download Resume (PDF)" : "ดาวน์โหลด Resume (PDF)"}
                  </>
                )}
              </a>

              <div className={styles.quickHighlights}>
                <p className={styles.qhTitle}>{lang === "en" ? "Key Capabilities" : "ความสามารถเด่น"}</p>
                <div className={styles.qhTags}>
                  <span className="tag">Next.js & React</span>
                  <span className="tag">TypeScript</span>
                  <span className="tag">Node.js API</span>
                  <span className="tag">GCP & Docker</span>
                  <span className="tag">CI/CD & DevOps</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
