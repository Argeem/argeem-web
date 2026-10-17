"use client";

import { useState } from "react";
import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import { Download, Briefcase, GraduationCap, CheckCircle2, FileText, Check } from "lucide-react";
import styles from "./Resume.module.css";

const EXPERIENCES = [
  {
    period_en: "2023 — Present",
    period_th: "2023 — ปัจจุบัน",
    role_en: "Developer",
    role_th: "Developer (นักพัฒนา)",
    company: "AXONS (CPF IT CENTER CO., LTD.)",
    desc_en: "Continued development of enterprise ingredient procurement systems, packaging contracts & billing lifecycles, and freight transportation platforms.",
    desc_th: "พัฒนาระบบจัดซื้อวัตถุดิบระดับองค์กร ขยายฟีเจอร์และความเสถียรสำหรับใช้งานจริง รวมถึงพัฒนาระบบสัญญาและวางบิลบรรจุภัณฑ์ และระบบบริหารจัดการขนส่งสินค้า",
    highlights_en: [
      "Selected as Lead for Special Projects (Internal Hackathon) for 2 consecutive years, responsible for business planning, technical strategy, and executive-level pitching",
      "Developed a packaging contract and billing system, managing the complete lifecycle including customs clearance procedures",
      "Developed a transportation management system for both Sea and Air freight, covering all required shipping contracts",
      "Implemented automated document generation using JsPDF to create professional contracts and business reports",
      "Adhered to development standards and actively proposed new best practices: Unit Testing, SonarQube integration, Linters, and standardized project structures",
      "Led 'DOJO' knowledge-sharing sessions, upskilling the team on new technologies and best practices",
      "Presented product demonstrations to end-users and executives at the end of each sprint to showcase progress",
      "Conducted manual testing and meticulously documented sprint deliverables to ensure system reliability",
      "Contributed to requirement analysis, proposing solutions that balance Business needs, Technical feasibility, and UX/UI design",
    ],
    highlights_th: [
      "ได้รับเลือกเป็นหัวหน้าทีม Special Projects (Internal Hackathon) 2 ปีซ้อน รับผิดชอบการวางแผนธุรกิจ กลยุทธ์ทางเทคนิค และการนำเสนอระดับผู้บริหาร",
      "พัฒนาระบบสัญญาและวางบิลบรรจุภัณฑ์ ครอบคลุมวงจรการทำงานตั้งแต่เริ่มต้นจนถึงพิธีการทางศุลกากร",
      "พัฒนาระบบบริหารจัดการการขนส่งสินค้าทั้งทางเรือและทางอากาศ ครอบคลุมสัญญาการขนส่งทั้งหมดที่เกี่ยวข้อง",
      "พัฒนาระบบสร้างเอกสารอัตโนมัติด้วย JsPDF สำหรับออกสัญญาและรายงานธุรกิจระดับมืออาชีพ",
      "ปฏิบัติตามมาตรฐานการพัฒนาและริเริ่มเสนอ Best Practices ใหม่ๆ เช่น Unit Testing, SonarQube, Linters และโครงสร้างโปรเจกต์ที่เป็นมาตรฐาน",
      "เป็นผู้นำจัด Session แลกเปลี่ยนความรู้ 'DOJO' เพื่อยกระดับทักษะของทีมในด้านเทคโนโลยีใหม่ๆ และแนวทางการพัฒนาที่ดี",
      "นำเสนอการสาธิตระบบ (Demo) ให้แก่ผู้ใช้งานจริงและผู้บริหารเมื่อสิ้นสุดแต่ละ Sprint เพื่อแสดงความคืบหน้าและฟีเจอร์ใหม่",
      "ทดสอบระบบ (Manual Testing) และจัดทำเอกสารส่งมอบงานในแต่ละ Sprint อย่างละเอียดเพื่อความเสถียรของระบบ",
      "ร่วมวิเคราะห์ความต้องการของระบบ เสนอแนวทางแก้ปัญหาที่สมดุลระหว่างความต้องการทางธุรกิจ ความเป็นไปได้ทางเทคนิค และ UX/UI",
    ],
  },
  {
    period_en: "2022 — 2023",
    period_th: "2022 — 2023",
    role_en: "Developer (Cooperative Education)",
    role_th: "Developer (สหกิจศึกษา)",
    company: "BKP (CPF IT CENTER CO., LTD.)",
    desc_en: "Developed and maintained domestic ingredient procurement products using Angular and Golang, adhering to Clean Architecture principles.",
    desc_th: "พัฒนาและดูแลผลิตภัณฑ์จัดซื้อวัตถุดิบภายในประเทศด้วย Angular และ Golang ตามหลัก Clean Architecture",
    highlights_en: [
      "Refactored legacy codebases into modern architecture, significantly enhancing code readability and system maintainability",
      "Engineered a product price summary system by integrating Batch Processing with a hybrid data approach (MongoDB NoSQL & RDBMS)",
      "Collaborated with users to analyze and automate complex legacy calculation formulas, successfully migrating workflows from Excel to a web-based solution",
      "Designed and implemented a specialized procurement management system for the Vietnam market",
      "Communicated regularly with team to provide updates and ensure technical alignment with development plans",
    ],
    highlights_th: [
      "ปรับโครงสร้างโค้ดเดิม (Refactor Legacy Code) สู่สถาปัตยกรรมสมัยใหม่ เพิ่มความอ่านง่ายและง่ายต่อการดูแลรักษา",
      "พัฒนาระบบสรุปราคาสินค้าด้วย Batch Processing ร่วมกับการจัดเก็บข้อมูลแบบ Hybrid (Document NoSQL และ Relational RDBMS)",
      "ร่วมมือกับผู้ใช้งานวิเคราะห์และแปลงสูตรคำนวณที่ซับซ้อน ปรับเปลี่ยนการทำงานจาก Excel สู่ระบบเว็บอัตโนมัติ",
      "ออกแบบและพัฒนาระบบบริหารจัดการการจัดซื้อจัดจ้างสำหรับตลาดประเทศเวียดนามโดยเฉพาะ",
      "สื่อสารกับทีมอย่างสม่ำเสมอเพื่ออัปเดตความคืบหน้าและรักษาความสอดคล้องทางเทคนิคตามแผนการพัฒนา",
    ],
  },
];

const EDUCATION = [
  {
    period_en: "2019 — 2023",
    period_th: "2019 — 2023",
    degree_en: "Bachelor of Computer Engineering (Second Class Honors)",
    degree_th: "วิศวกรรมศาสตรบัณฑิต สาขาวิศวกรรมคอมพิวเตอร์ (เกียรตินิยมอันดับ 2)",
    institution_en: "Prince of Songkla University, Hatyai (GPA: 3.35)",
    institution_th: "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่ (GPA: 3.35)",
    highlights_en: [
      "Second Class Honors (GPA 3.35)",
      "Huawei ICT Competition 2021-2022 Cloud Track (Honorable reward)",
      "KPMG Cyber Security Challenge 2021 & Shopee Code League 2022",
      "Teaching Assistant for Introduction to Computer Programming (2020, 2021, 2022)",
      "Teaching Assistant for Data Science for Tourism Course",
      "Design Department in Prince of Songkla Rotaract Club",
    ],
    highlights_th: [
      "เกียรตินิยมอันดับ 2 (GPA 3.35)",
      "รางวัลชมเชย Huawei ICT Competition 2021-2022 สาขา Cloud Track",
      "เข้าร่วมการแข่งขัน KPMG Cyber Security Challenge 2021 และ Shopee Code League 2022",
      "ผู้ช่วยสอน (TA) วิชาการเขียนโปรแกรมคอมพิวเตอร์เบื้องต้น (ปี 2020, 2021, 2022)",
      "ผู้ช่วยสอน (TA) วิชา Data Science สำหรับการท่องเที่ยว",
      "ฝ่ายออกแบบ สโมสรโรแทแรคท์ มหาวิทยาลัยสงขลานครินทร์",
    ],
  },
  {
    period_en: "2013 — 2018",
    period_th: "2013 — 2018",
    degree_en: "Science Math Technology and Environment (SMTE)",
    degree_th: "แผนการเรียน SMTE (วิทยาศาสตร์ คณิตศาสตร์ เทคโนโลยี และสิ่งแวดล้อม)",
    institution_en: "Ammart Panitchanukul School, Krabi (GPA: 2.75)",
    institution_th: "โรงเรียนอำมาตย์พานิชนุกูล กระบี่ (GPA: 2.75)",
    highlights_en: [
      "Participated in the second round of POSN Computer Olympiad Camp (2016 & 2017)",
      "Face detection project using OpenCV C++",
    ],
    highlights_th: [
      "ผ่านการคัดเลือกเข้าค่ายโอลิมปิกวิชาการ สอวน. คอมพิวเตอร์ รอบที่ 2 (ปี 2016 และ 2017)",
      "โครงงานระบบตรวจจับใบหน้าด้วย OpenCV และภาษา C++",
    ],
  },
];

export default function Resume() {
  const { lang } = useApp();
  const [downloaded, setDownloaded] = useState(false);

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
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
              ? "A complete record of professional enterprise experience, academic achievements, and leadership milestones."
              : "สรุปเส้นทางการทำงานระดับ Enterprise ผลงานทางวิชาการ และบทบาทความเป็นผู้นำ"}
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
              {EXPERIENCES.map((exp) => {
                const highlights = lang === "en" ? exp.highlights_en : exp.highlights_th;
                return (
                  <div key={exp.company} className={styles.timelineItem}>
                    <div className={styles.timelineDot} />
                    <span className={styles.period}>
                      {lang === "en" ? exp.period_en : exp.period_th}
                    </span>
                    <h4 className={styles.itemRole}>
                      {lang === "en" ? exp.role_en : exp.role_th}
                    </h4>
                    <p className={styles.itemCompany}>{exp.company}</p>
                    <p className={styles.itemDesc}>
                      {lang === "en" ? exp.desc_en : exp.desc_th}
                    </p>
                    <ul className={styles.highlightsList}>
                      {highlights.map((h, i) => (
                        <li key={i} className={styles.highlightItem}>
                          <CheckCircle2 size={13} className={styles.checkIcon} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <div className={styles.columnHeader} style={{ marginTop: 36 }}>
              <GraduationCap className={styles.colIcon} size={20} />
              <h3 className={styles.colTitle}>
                {lang === "en" ? "Education & Achievements" : "การศึกษาและรางวัล"}
              </h3>
            </div>

            <div className={styles.timeline}>
              {EDUCATION.map((edu) => {
                const highlights = lang === "en" ? edu.highlights_en : edu.highlights_th;
                return (
                  <div key={edu.institution_en} className={styles.timelineItem}>
                    <div className={styles.timelineDot} />
                    <span className={styles.period}>
                      {lang === "en" ? edu.period_en : edu.period_th}
                    </span>
                    <h4 className={styles.itemRole}>
                      {lang === "en" ? edu.degree_en : edu.degree_th}
                    </h4>
                    <p className={styles.itemCompany}>
                      {lang === "en" ? edu.institution_en : edu.institution_th}
                    </p>
                    {highlights && (
                      <ul className={styles.highlightsList}>
                        {highlights.map((h, i) => (
                          <li key={i} className={styles.highlightItem}>
                            <CheckCircle2 size={13} className={styles.checkIcon} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
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
                  ? "Looking for a Back End Developer with proven enterprise experience in Golang, Clean Architecture, and contract management systems? Grab a copy of my PDF resume."
                  : "ต้องการ Back End Developer ที่เชี่ยวชาญการพัฒนาระบบ Enterprise ด้วย Golang, Clean Architecture และระบบจัดการสัญญา? ดาวน์โหลด Resume ฉบับ PDF ได้ที่นี่"}
              </p>

              <div className={styles.cvMeta}>
                <span>{lang === "en" ? "Format: PDF" : "รูปแบบ: PDF"}</span>
                <span>•</span>
                <span>{lang === "en" ? "Updated: 2026" : "อัปเดต: 2026"}</span>
              </div>

              <a
                href="/resume.pdf"
                download="Sittisak_Bannob_Resume.pdf"
                onClick={handleDownload}
                className={`btn btn-primary ${styles.downloadBtn}`}
                id="download-resume-btn"
              >
                {downloaded ? (
                  <>
                    <Check size={16} />
                    {lang === "en" ? "Downloading..." : "กำลังดาวน์โหลด..."}
                  </>
                ) : (
                  <>
                    <Download size={16} />
                    {lang === "en" ? "Download Resume (PDF)" : "ดาวน์โหลด Resume (PDF)"}
                  </>
                )}
              </a>

              <div className={styles.quickHighlights}>
                <p className={styles.qhTitle}>{lang === "en" ? "Key Capabilities" : "ความสามารถและความเชี่ยวชาญ"}</p>
                <div className={styles.qhTags}>
                  <span className="tag">Golang & NestJS</span>
                  <span className="tag">Clean Architecture</span>
                  <span className="tag">PostgreSQL & Oracle</span>
                  <span className="tag">MongoDB & Redis</span>
                  <span className="tag">Docker & Cloud</span>
                  <span className="tag">REST API & gRPC</span>
                  <span className="tag">Batch Processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
