"use client";

import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import { Calendar, ArrowRight, BookOpen } from "lucide-react";
import { POSTS } from "@/data/blog";
import styles from "./Blog.module.css";

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
                <a
                  href={post.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.titleLink}
                >
                  {lang === "en" ? post.title_en : post.title_th}
                </a>
              </h3>

              <p className={styles.excerpt}>
                {lang === "en" ? post.excerpt_en : post.excerpt_th}
              </p>

              <div className={styles.footer}>
                <span className={styles.metaItem}>
                  <Calendar size={13} />
                  {post.date}
                </span>

                <a
                  href={post.slug}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.readMore}
                  aria-label={`Read article: ${post.title_en}`}
                >
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
