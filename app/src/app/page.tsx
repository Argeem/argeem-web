import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Skills from "@/components/sections/Skills/Skills";
import Projects from "@/components/sections/Projects/Projects";
import Blog from "@/components/sections/Blog/Blog";
import Resume from "@/components/sections/Resume/Resume";
import Contact from "@/components/sections/Contact/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blog />
      <Resume />
      <Contact />
    </>
  );
}
