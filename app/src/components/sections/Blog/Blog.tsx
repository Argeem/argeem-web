"use client";

import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import styles from "./Blog.module.css";

const POSTS = [
  {
    title_en: "Architecting a $10/mo Personal Cloud on GCP",
    title_th: "สร้าง Personal Cloud บน GCP ในงบ $10/เดือน",
    date: "Oct 12, 2026",
    readTime_en: "5 min read",
    readTime_th: "อ่าน 5 นาที",
    excerpt_en:
      "How to configure an e2-micro instance on Google Compute Engine with Nginx reverse proxy, PM2 process manager, and automated SSL.",
    excerpt_th:
      "แชร์วิธีตั้งค่า e2-micro บน Google Compute Engine พร้อม Nginx reverse proxy, PM2 และ SSL ฟรีอย่างคุ้มค่าที่สุด",
    tags: ["GCP", "DevOps", "Cloud"],
    slug: "#",
  },
  {
    title_en: "Modern Web Performance in 2026",
    title_th: "เทคนิคเพิ่มความเร็ว Web App ระดับ 99+ Lighthouse ในปี 2026",
    date: "Sep 28, 2026",
    readTime_en: "4 min read",
    readTime_th: "อ่าน 4 นาที",
    excerpt_en:
      "Practical optimizations: Server-side rendering, bundle splitting, fluid typography, and zero-runtime CSS strategies.",
    excerpt_th:
      "รวมเทคนิคการรีด Performance ทั้ง SSG/SSR, CSS Modules, font display และ image optimization ที่ใช้ได้จริง",
    tags: ["Performance", "Frontend", "React"],
    slug: "#",
  },
  {
    title_en: "Why TypeScript & Clean Architecture Make Code Joyful",
    title_th: "เหตุผลที่ TypeScript และ Clean Architecture ทำให้การเขียนโค้ดสนุกขึ้น",
    date: "Sep 15, 2026",
    readTime_en: "6 min read",
    readTime_th: "อ่าน 6 นาที",
    excerpt_en:
      "From strict type safety to modular decoupling — reflections on writing maintainable web applications for scale.",
    excerpt_th:
      "เจาะลึกประโยชน์ของ Type safety และการแบ่ง component ตามหน้าที่ เพื่อให้โปรเจกต์ขยายตัวได้โดยไม่ปวดหัว",
    tags: ["TypeScript", "Architecture", "Engineering"],
    slug: "#",
  },
];

export default function Blog() {
  const { lang } = useApp();

  return (
    <section className="section" id="blog" aria-labelledby="blog-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <BookOpen size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
            {lang === "en" ? "Articles" : "บทความ"}
          </span>
          <h2 id="blog-title" className="section-title">
            {lang === "en" ? "Latest Writings" : "บทความล่าสุด"}
          </h2>
          <p className="section-desc">
            {lang === "en"
              ? "Thoughts and tutorials on web technologies, cloud infrastructure, and software engineering."
              : "เรื่องราวและบทเรียนจากการพัฒนาซอฟต์แวร์ คลาวด์ และเทคโนโลยีเว็บ"}
          </p>
        </div>

        <div className={styles.grid}>
          {POSTS.map((post) => (
            <article key={post.title_en} className={`card ${styles.card}`}>
              <div className={styles.metaTop}>
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <h3 className={styles.title}>
                <a href={post.slug} className={styles.titleLink}>
                  {lang === "en" ? post.title_en : post.title_th}
                </a>
              </h3>

              <p className={styles.excerpt}>
                {lang === "en" ? post.excerpt_en : post.excerpt_th}
              </p>

              <div className={styles.footer}>
                <div className={styles.metaInfo}>
                  <span className={styles.metaItem}>
                    <Calendar size={13} />
                    {post.date}
                  </span>
                  <span className={styles.metaItem}>
                    <Clock size={13} />
                    {lang === "en" ? post.readTime_en : post.readTime_th}
                  </span>
                </div>

                <a href={post.slug} className={styles.readMore} aria-label={`Read article: ${post.title_en}`}>
                  <span>{lang === "en" ? "Read article" : "อ่านต่อ"}</span>
                  <ArrowRight size={14} className={styles.arrow} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
