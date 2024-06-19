import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Services from "./components/Services"
import Testimonials from "./components/Testimonials"
import Blog from "./components/Blog"
import Footer from "./components/Footer"

import { useEffect,useState } from "react"

import Lenis from 'lenis';
import { SquareLoader } from "react-spinners"
import Program from "./components/Program"
import Introduction from "./components/Introduction"
import AboutUs from "./components/AboutUs"

const App = () => {

  // this is using for smooth-scrooling
  useEffect( () => {
    const lenis = new Lenis()

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  // this is using for preloading
  const [loading, setLoading] = useState (false)
  useEffect(()=>{
      setLoading(true);
      setTimeout(() => {
          setLoading(false)
      }, 100);
  },[])
  

  return (
    <div className="scroll-smooth">
      {loading ? (
        <SquareLoader
        color={'yellow'}
        loading={loading}
        size={50}
        className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2  w-full h-full z-[1000]"
      />
      ):(
        <>

        <Navbar />
        <Hero/>
        <Introduction/>
        <AboutUs/>
        <Services/>
        <Program/>
        <Testimonials/>
        <Blog/>
        <Footer/>
        
        </>
      )
      }
    </div>
  )
}

export default App
