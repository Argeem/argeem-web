import { FileCheck2, Ship, Cpu, ScanFace, LucideIcon } from "lucide-react";

export interface Project {
  title: string;
  category_en: string;
  category_th: string;
  icon: LucideIcon;
  desc_en: string;
  desc_th: string;
  tags: string[];
  github: string;
  live?: string;
  featured: boolean;
}

export const PROJECTS: Project[] = [
  {
    title: "Enterprise Ingredient Procurement & Billing",
    category_en: "Procurement & Contracts",
    category_th: "ระบบจัดซื้อและสัญญา",
    icon: FileCheck2,
    desc_en: "Mission-critical back-office procurement system managing the complete contract lifecycle, customs clearance procedures, and automated document generation with JsPDF.",
    desc_th: "ระบบจัดซื้อจัดจ้างวัตถุดิบและจัดการสัญญา พร้อมระบบวางบิลและพิธีการศุลกากรระดับองค์กร สร้างเอกสารสัญญาอัตโนมัติด้วย JsPDF ตามหลัก Clean Architecture",
    tags: ["Golang", "Oracle SQL", "Clean Architecture", "JsPDF", "Angular"],
    github: "https://github.com/Argeem",
    live: undefined,
    featured: true,
  },
  {
    title: "Transportation Management System (Sea & Air)",
    category_en: "Logistics & Freight TMS",
    category_th: "โลจิสติกส์และการขนส่ง",
    icon: Ship,
    desc_en: "Multi-modal logistics platform managing Sea and Air freight shipping contracts, carrier scheduling, and shipment compliance.",
    desc_th: "ระบบบริหารจัดการการขนส่งสินค้าทางเรือและทางอากาศ ครอบคลุมสัญญาการขนส่ง ตรวจสอบเอกสาร shipping และระบบความปลอดภัย",
    tags: ["NestJS", "TypeScript", "PostgreSQL", "Docker", "REST API"],
    github: "https://github.com/Argeem",
    live: undefined,
    featured: true,
  },
  {
    title: "Hybrid Batch Pricing & Calculation Engine",
    category_en: "Batch & Hybrid Storage",
    category_th: "Batch & ฐานข้อมูล Hybrid",
    icon: Cpu,
    desc_en: "High-throughput product price summary engine integrating Batch Processing with hybrid data storage (MongoDB NoSQL & RDBMS), automating legacy calculation models.",
    desc_th: "ระบบคำนวณและสรุปราคาสินค้าประสิทธิภาพสูงด้วย Batch Processing เชื่อมโยงฐานข้อมูลแบบ Hybrid (MongoDB + RDBMS) อัปเกรดสูตรคำนวณจาก Excel สู่ระบบเว็บ",
    tags: ["Golang", "MongoDB", "PostgreSQL", "Batch Processing"],
    github: "https://github.com/Argeem",
    live: undefined,
    featured: false,
  },
  {
    title: "Computer Vision Face Detection System",
    category_en: "Computer Vision & Algorithms",
    category_th: "คอมพิวเตอร์วิทัศน์",
    icon: ScanFace,
    desc_en: "Facial detection and image analysis pipeline engineered in C++ utilizing OpenCV algorithms for fast feature extraction.",
    desc_th: "ระบบตรวจจับใบหน้าและวิเคราะห์รูปภาพแบบ Real-time พัฒนาด้วย C++ และไลบรารี OpenCV สำหรับการประมวลผลภาพอย่างรวดเร็ว",
    tags: ["C++", "OpenCV", "Algorithms"],
    github: "https://github.com/Argeem",
    live: undefined,
    featured: false,
  },
];
