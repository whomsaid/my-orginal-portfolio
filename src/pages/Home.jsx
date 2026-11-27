import { useEffect } from 'react'
import { usePortfolio } from '../data/usePortfolio.js'
import BackgroundFX from '../components/site/BackgroundFX.jsx'
import Navbar from '../components/site/Navbar.jsx'
import Hero from '../components/site/Hero.jsx'
import Identity from '../components/site/Identity.jsx'
import About from '../components/site/About.jsx'
import Skills from '../components/site/Skills.jsx'
import Projects from '../components/site/Projects.jsx'
import Services from '../components/site/Services.jsx'
import Research from '../components/site/Research.jsx'
import Education from '../components/site/Education.jsx'
import Contact from '../components/site/Contact.jsx'
import Footer from '../components/site/Footer.jsx'

export default function Home() {
  const { data } = usePortfolio()
  const focusProject = data.projects.find((p) => p.status === 'in_development') || data.projects.find((p) => p.featured)

  useEffect(() => {
    document.title = `${data.profile.fullName} — Full-Stack Developer in Kigali, Rwanda`
  }, [data.profile.fullName])

  return (
    <>
      <BackgroundFX />
      <Navbar name={data.profile.fullName} monogram={data.profile.monogram} />
      <main id="main" className="relative z-[2]">
        <Hero profile={data.profile} focusProject={focusProject} />
        <Identity identities={data.identities} />
        <About about={data.about} profile={data.profile} />
        <Skills categories={data.skillCategories} />
        <Projects projects={data.projects} />
        <Services services={data.services} />
        <Research entries={data.research} />
        <Education items={data.education} />
        <Contact contact={data.contact} profile={data.profile} socials={data.socials} />
      </main>
      <div className="relative z-[2]">
        <Footer profile={data.profile} contact={data.contact} socials={data.socials} />
      </div>
    </>
  )
}
