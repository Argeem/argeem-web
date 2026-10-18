export interface BlogPost {
  title_en: string;
  title_th: string;
  date: string;
  excerpt_en: string;
  excerpt_th: string;
  tags: string[];
  slug: string;
}

export const POSTS: BlogPost[] = [
  {
    title_en: "Architecting a $10/mo Personal Cloud on GCP",
    title_th: "สร้าง Personal Cloud บน GCP ในงบ $10/เดือน",
    date: "Oct 12, 2026",
    excerpt_en:
      "How to configure an e2-micro instance on Google Compute Engine with Nginx reverse proxy, PM2 process manager, and automated SSL.",
    excerpt_th:
      "แชร์วิธีตั้งค่า e2-micro บน Google Compute Engine พร้อม Nginx reverse proxy, PM2 และ SSL ฟรีอย่างคุ้มค่าที่สุด",
    tags: ["GCP", "DevOps", "Cloud"],
    slug: "https://medium.com/@sitthisakbannob",
  },
  {
    title_en: "Modern Web Performance in 2026",
    title_th: "เทคนิคเพิ่มความเร็ว Web App ระดับ 99+ Lighthouse ในปี 2026",
    date: "Sep 28, 2026",
    excerpt_en:
      "Practical optimizations: Server-side rendering, bundle splitting, fluid typography, and zero-runtime CSS strategies.",
    excerpt_th:
      "รวมเทคนิคการรีด Performance ทั้ง SSG/SSR, CSS Modules, font display และ image optimization ที่ใช้ได้จริง",
    tags: ["Performance", "Frontend", "React"],
    slug: "https://medium.com/@sitthisakbannob",
  },
  {
    title_en: "Why TypeScript & Clean Architecture Make Code Joyful",
    title_th: "เหตุผลที่ TypeScript และ Clean Architecture ทำให้การเขียนโค้ดสนุกขึ้น",
    date: "Sep 15, 2026",
    excerpt_en:
      "From strict type safety to modular decoupling — reflections on writing maintainable web applications for scale.",
    excerpt_th:
      "เจาะลึกประโยชน์ของ Type safety และการแบ่ง component ตามหน้าที่ เพื่อให้โปรเจกต์ขยายตัวได้โดยไม่ปวดหัว",
    tags: ["TypeScript", "Architecture", "Engineering"],
    slug: "https://medium.com/@sitthisakbannob",
  },
];
