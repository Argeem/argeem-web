"use client";

import { useState } from "react";
import { useApp } from "@/components/ThemeProvider/ThemeProvider";
import { Mail, MapPin, Send, Check, Copy, MessageSquare, Sparkles } from "lucide-react";
import { Github, Linkedin } from "@/components/Icons";
import styles from "./Contact.module.css";

export default function Contact() {
  const { lang } = useApp();
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const email = "hello@sitth.dev";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSubmitted(false), 6000);
    }, 600);
  };

  return (
    <section className="section" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <MessageSquare size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 6 }} />
            {lang === "en" ? "Get in Touch" : "ติดต่อเรา"}
          </span>
          <h2 id="contact-title" className="section-title">
            {lang === "en" ? "Let's Build Something Together" : "มาร่วมสร้างสรรค์ผลงานด้วยกัน"}
          </h2>
          <p className="section-desc">
            {lang === "en"
              ? "Have a project in mind, an engineering role open, or just want to chat tech? My inbox is always open."
              : "มีโปรเจกต์ที่น่าสนใจ มองหา Developer หรืออยากพูดคุยแลกเปลี่ยนเรื่องเทคโนโลยี สามารถทักมาได้เสมอครับ"}
          </p>
        </div>

        <div className={styles.grid}>
          {/* Info Card */}
          <div className={styles.infoCol}>
            <div className={`card ${styles.infoCard}`}>
              <div className={styles.statusBadge}>
                <span className={styles.statusDot} />
                <span>{lang === "en" ? "Available for new projects" : "พร้อมรับงานโปรเจกต์ใหม่"}</span>
              </div>

              <h3 className={styles.infoHeading}>
                {lang === "en" ? "Direct Contact" : "ช่องทางติดต่อโดยตรง"}
              </h3>
              <p className={styles.infoText}>
                {lang === "en"
                  ? "Feel free to reach out via email or connect with me across professional networks."
                  : "ติดต่อผ่านอีเมลโดยตรงหรือเชื่อมต่อผ่านช่องทาง Social ต่างๆ ได้เลยครับ"}
              </p>

              <div className={styles.contactDetails}>
                <div className={styles.detailRow}>
                  <Mail className={styles.detailIcon} size={18} />
                  <div className={styles.detailText}>
                    <span className={styles.detailLabel}>Email</span>
                    <a href={`mailto:${email}`} className={styles.detailVal}>
                      {email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={styles.copyBtn}
                    aria-label="Copy email to clipboard"
                    title="Copy email"
                  >
                    {copied ? <Check size={14} className={styles.copiedIcon} /> : <Copy size={14} />}
                  </button>
                </div>

                <div className={styles.detailRow}>
                  <MapPin className={styles.detailIcon} size={18} />
                  <div className={styles.detailText}>
                    <span className={styles.detailLabel}>{lang === "en" ? "Location" : "สถานที่"}</span>
                    <span className={styles.detailVal}>Bangkok, Thailand (UTC+7)</span>
                  </div>
                </div>
              </div>

              <div className={styles.socialBox}>
                <p className={styles.socialTitle}>{lang === "en" ? "Find me on" : "ติดตามผมได้ที่"}</p>
                <div className={styles.socialLinks}>
                  <a
                    href="https://github.com/sitth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label="GitHub profile"
                  >
                    <Github size={18} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://linkedin.com/in/sitth"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialBtn}
                    aria-label="LinkedIn profile"
                  >
                    <Linkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={styles.formCol}>
            <form className={`card ${styles.formCard}`} onSubmit={handleSubmit}>
              <h3 className={styles.formHeading}>
                <Sparkles size={18} className={styles.sparkleIcon} />
                {lang === "en" ? "Send a Message" : "ส่งข้อความ"}
              </h3>

              {submitted && (
                <div className={styles.successBanner} role="alert">
                  <Check size={18} />
                  <span>
                    {lang === "en"
                      ? "Thank you! Your message has been sent successfully."
                      : "ขอบคุณครับ! ได้รับข้อความของคุณเรียบร้อยแล้ว"}
                  </span>
                </div>
              )}

              <div className={styles.formRow}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>
                    {lang === "en" ? "Your Name" : "ชื่อของคุณ"} *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={lang === "en" ? "Alex Doe" : "สมชาย ใจดี"}
                    className={styles.input}
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>
                    {lang === "en" ? "Your Email" : "อีเมลของคุณ"} *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="alex@example.com"
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="subject" className={styles.label}>
                  {lang === "en" ? "Subject" : "หัวข้อ"}
                </label>
                <input
                  id="subject"
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder={lang === "en" ? "Project inquiry / Opportunity" : "สอบถามโปรเจกต์ / ติดต่องาน"}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="message" className={styles.label}>
                  {lang === "en" ? "Message" : "ข้อความ"} *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={
                    lang === "en"
                      ? "Tell me about your project, timeline, and goals..."
                      : "บอกเล่าเกี่ยวกับโปรเจกต์ของคุณ ระยะเวลา และเป้าหมาย..."
                  }
                  className={styles.textarea}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`btn btn-primary ${styles.submitBtn}`}
                id="submit-contact-btn"
              >
                {loading ? (
                  <span>{lang === "en" ? "Sending..." : "กำลังส่ง..."}</span>
                ) : (
                  <>
                    <Send size={16} />
                    <span>{lang === "en" ? "Send Message" : "ส่งข้อความ"}</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
