"use client";

import Image from "next/image";
import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import { MapPin, Calendar, Server } from "lucide-react";
import styles from "./About.module.css";

const STATS = [
  { icon: Calendar, en: "3+ Years",         th: "3+ ปี",           label_en: "Experience", label_th: "ประสบการณ์" },
  { icon: Server,   en: "AXONS (CPF)",      th: "AXONS (เครือซีพี)", label_en: "Company",    label_th: "องค์กร" },
  { icon: MapPin,   en: "Krabi, Thailand",  th: "กระบี่, ไทย",     label_en: "Based in",   label_th: "ที่อยู่" },
];

export default function About() {
  const { lang } = useApp();

  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <div className={styles.grid}>
          {/* Text */}
          <div className={styles.content}>
            <span className="section-label">
              {lang === "en" ? "About Me" : "เกี่ยวกับผม"}
            </span>
            <h2 id="about-title" className={styles.title}>
              {lang === "en"
                ? "Delivering business value through robust architecture"
                : "สร้างคุณค่าทางธุรกิจด้วยซอฟต์แวร์และสถาปัตยกรรมที่มั่นคง"}
            </h2>
            <div className={styles.bio}>
              <p>
                {lang === "en"
                  ? "I'm Sittisak Bannob, a Back End Developer with 3 years of experience specializing in building enterprise back-office solutions, contract procurement lifecycles, and transportation logistics systems."
                  : "ผมชื่อ สิทธิศักดิ์ บรรณอบ (sitth) เป็น Back End Developer ประสบการณ์ 3 ปี เชี่ยวชาญการพัฒนาระบบหลังบ้านระดับ Enterprise เช่น ระบบสัญญาจัดซื้อจัดจ้างวัตถุดิบ ระบบวางบิล และระบบบริหารจัดการขนส่งสินค้า"}
              </p>
              <p>
                {lang === "en"
                  ? "Dedicated to collaborative teamwork and bridging the gap between business requirements and technical execution. An advocate of Clean Architecture, automated testing, and standardized best practices — actively leading hackathon initiatives and technical DOJO knowledge-sharing sessions."
                  : "มุ่งเน้นการเชื่อมโยงความต้องการทางธุรกิจสู่การพัฒนาซอฟต์แวร์จริงที่เสถียรและยั่งยืน ยึดมั่นในหลัก Clean Architecture, Automated Testing และการพัฒนาอย่างต่อเนื่องผ่านการนำทีม Special Projects (Internal Hackathon) 2 ปีซ้อน และจัด Session ถ่ายทอดความรู้ (DOJO)"}
              </p>
            </div>
          </div>

          {/* Stats + image */}
          <div className={styles.side}>
            <div className={styles.photoCard}>
              <Image
                src="/profile.jpg"
                alt="Sittisak Bannob profile"
                width={400}
                height={300}
                className={styles.photoImg}
              />
            </div>
            <div className={styles.stats}>
              {STATS.map(({ icon: Icon, en, th, label_en, label_th }) => (
                <div key={label_en} className={styles.stat}>
                  <Icon size={18} className={styles.statIcon} />
                  <div>
                    <p className={styles.statValue}>{lang === "en" ? en : th}</p>
                    <p className={styles.statLabel}>{lang === "en" ? label_en : label_th}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
