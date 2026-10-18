"use client";

import { useState, useRef, useEffect } from "react";
import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import {
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FolderGit2,
} from "lucide-react";
import { Github } from "@/components/Icons";
import { PROJECTS } from "@/data/projects";
import styles from "./Projects.module.css";

export default function Projects() {
  const { lang } = useApp();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const checkScrollState = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const firstCard = trackRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : clientWidth;
    const active = Math.round(scrollLeft / cardWidth);
    setCurrentIndex(Math.min(Math.max(active, 0), PROJECTS.length - 1));
  };

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScrollState();
    el.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);
    return () => {
      el.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, []);

  const handleScroll = (dir: "left" | "right") => {
    if (!trackRef.current) return;
    const firstCard = trackRef.current.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 360;
    trackRef.current.scrollBy({
      left: dir === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const scrollToSlide = (idx: number) => {
    if (!trackRef.current) return;
    const targetCard = trackRef.current.children[idx] as HTMLElement | undefined;
    if (targetCard) {
      targetCard.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  };

  return (
    <section className="section" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <FolderGit2 size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
            {lang === "en" ? "Projects" : "ผลงาน"}
          </span>
          <h2 id="projects-title" className="section-title">
            {lang === "en" ? "Featured Engineering Projects" : "สิ่งที่ผมสร้างและพัฒนา"}
          </h2>
          <p className="section-desc">
            {lang === "en"
              ? "A selection of mission-critical enterprise systems and technical projects I've built."
              : "รวมระบบระดับองค์กรและโปรเจกต์ทางเทคนิคที่ได้พัฒนาและส่งมอบเพื่อใช้งานจริง"}
          </p>
        </div>

        <div className={styles.sliderContainer}>
          {/* Slider controls header */}
          <div className={styles.controlsHeader}>
            <span className={styles.slideCounter}>
              {lang === "en"
                ? `Slide ${currentIndex + 1} of ${PROJECTS.length}`
                : `ผลงานที่ ${currentIndex + 1} จากทั้งหมด ${PROJECTS.length}`}
            </span>

            <div className={styles.navBtns}>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => handleScroll("left")}
                disabled={!canScrollLeft}
                aria-label="Previous project slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                className={styles.navBtn}
                onClick={() => handleScroll("right")}
                disabled={!canScrollRight}
                aria-label="Next project slide"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Slider track with cards */}
          <div ref={trackRef} className={styles.track} role="region" aria-label="Projects slider">
            {PROJECTS.map((project) => {
              const Icon = project.icon;
              return (
                <article
                  key={project.title}
                  className={styles.card}
                >
                  <div className={styles.preview}>
                    <div className={styles.previewIconWrap}>
                      <Icon size={24} />
                    </div>
                    <span className={styles.previewCategory}>
                      {lang === "en" ? project.category_en : project.category_th}
                    </span>
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
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-ghost"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <Github size={15} /> GitHub
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-ghost"
                          aria-label={`View ${project.title} live`}
                        >
                          <ExternalLink size={15} />
                          {lang === "en" ? "Live Demo" : "ดูสด"}
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Pagination dots */}
          <div className={styles.dots} aria-label="Slide navigation dots">
            {PROJECTS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.dot} ${idx === currentIndex ? styles.dotActive : ""}`}
                onClick={() => scrollToSlide(idx)}
                aria-label={`Go to project slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <a
            href="https://github.com/Argeem"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            {lang === "en" ? "View all on GitHub" : "ดูทั้งหมดบน GitHub"}
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
