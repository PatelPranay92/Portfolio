import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getPortfolioData } from "@/lib/db";

export default function Home() {
  const data = getPortfolioData();

  return (
    <>
      <Navbar />
      <main>
        <Hero profile={data.profile} resume={data.resume} />
        <About />
        <Skills />
        <Projects projects={data.projects} />
        <Contact social={data.social} />
      </main>
      <Footer social={data.social} />
    </>
  );
}
