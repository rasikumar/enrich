import Services from "./components/Services"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Testimonials from "./components/Testimonials"
import Blog from "./components/Blog"
import { useEffect } from "react"
import Lenis from 'lenis';

const App = () => {
  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])
  return (
    <div className="scroll-smooth">
      <Navbar/>
      <Hero/>
      <Services/>
      <Testimonials/>
      <Blog/>

    </div>
  )
}

export default App
