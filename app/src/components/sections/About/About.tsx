"use client";

import Image from "next/image";
import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import { MapPin, Calendar, Server, User } from "lucide-react";
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
        {/* Centered Section Header */}
        <div className="section-header">
          <span className="section-label">
            <User size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
            {lang === "en" ? "About Me" : "เกี่ยวกับผม"}
          </span>
          <h2 id="about-title" className="section-title">
            {lang === "en"
              ? "Delivering business value through robust architecture"
              : "สร้างคุณค่าทางธุรกิจด้วยซอฟต์แวร์และสถาปัตยกรรมที่มั่นคง"}
          </h2>
        </div>

        <div className={styles.grid}>
          {/* Left Column: Bio & Stats */}
          <div className={styles.content}>
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
              <p>
                {lang === "en"
                  ? "Always eager to master modern technologies, optimize database queries, and architect resilient services that empower teams and delight stakeholders."
                  : "พร้อมเปิดรับและเรียนรู้เทคโนโลยีใหม่ๆ อยู่เสมอ ใส่ใจในประสิทธิภาพของฐานข้อมูล และการออกแบบระบบที่ยืดหยุ่น รองรับการเติบโตขององค์กร"}
              </p>
            </div>

            {/* Stats row on the left */}
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

          {/* Right Column: Frameless, Enlarged Profile Photo */}
          <div className={styles.photoColumn}>
            <div className={styles.photoWrapper}>
              <div className={styles.ambientGlow} aria-hidden="true" />
              <Image
                src="/profile-about.png"
                alt="Sittisak Bannob profile"
                width={360}
                height={520}
                className={styles.profileImg}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
