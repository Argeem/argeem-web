import { Code2, Server, Database, Cloud, LucideIcon } from "lucide-react";

export interface SkillItem {
  name: string;
  tag_en: string;
  tag_th: string;
  core: boolean;
}

export interface SkillCategory {
  icon: LucideIcon;
  title_en: string;
  title_th: string;
  desc_en: string;
  desc_th: string;
  items: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    icon: Code2,
    title_en: "Languages",
    title_th: "ภาษาโปรแกรมมิ่ง",
    desc_en: "Core languages for high-performance backend systems & algorithms",
    desc_th: "ภาษาหลักสำหรับพัฒนาระบบ Backend ประสิทธิภาพสูงและอัลกอริทึม",
    items: [
      { name: "Golang", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "TypeScript", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "JavaScript", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "SQL", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "Python", tag_en: "Proficient", tag_th: "เชี่ยวชาญ", core: false },
      { name: "C / C++", tag_en: "Algorithms", tag_th: "อัลกอริทึม", core: false },
    ],
  },
  {
    icon: Server,
    title_en: "Backend & Architecture",
    title_th: "Backend & สถาปัตยกรรมระบบ",
    desc_en: "Decoupled architecture, microservices, and high-reliability APIs",
    desc_th: "การออกแบบระบบแบบแยกส่วน ไมโครเซอร์วิส และ API ที่เสถียร",
    items: [
      { name: "Clean Architecture", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "NestJS", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "ExpressJS", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "RESTful APIs", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "gRPC", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "Batch Processing", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "Jest / Unit Testing", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
    ],
  },
  {
    icon: Database,
    title_en: "Databases & Storage",
    title_th: "ฐานข้อมูลและพื้นที่จัดเก็บ",
    desc_en: "Hybrid relational & document databases for scale and integrity",
    desc_th: "การจัดการข้อมูลแบบ Hybrid ทั้งฐานข้อมูลเชิงสัมพันธ์และ NoSQL",
    items: [
      { name: "PostgreSQL", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "Oracle SQL", tag_en: "Production", tag_th: "ใช้งานจริง", core: true },
      { name: "MongoDB (NoSQL)", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "Redis (Caching)", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "AWS S3 Storage", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
    ],
  },
  {
    icon: Cloud,
    title_en: "DevOps, Cloud & Quality",
    title_th: "DevOps คลาวด์ และมาตรฐานคุณภาพ",
    desc_en: "Containerization, cloud monitoring, CI/CD, and code standards",
    desc_th: "การทำ Containerization, คลาวด์มอนิเตอร์ และมาตรฐานโค้ดระดับองค์กร",
    items: [
      { name: "Docker", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "Git & GitLab CI/CD", tag_en: "Core", tag_th: "หลัก", core: true },
      { name: "Azure Services", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "AWS CloudWatch", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
      { name: "SonarQube & Linters", tag_en: "Quality", tag_th: "คุณภาพโค้ด", core: false },
      { name: "Postman & DBeaver", tag_en: "Tools", tag_th: "เครื่องมือ", core: false },
      { name: "JsPDF Document Engine", tag_en: "Production", tag_th: "ใช้งานจริง", core: false },
    ],
  },
];

export const ADDITIONAL_TECH: string[] = [
  "Angular", "React", "LoopBack", "OpenCV", "SonarQube", "VS Code",
  "GitLab", "Linux", "Customs Clearance Systems", "TMS Logistics",
];
