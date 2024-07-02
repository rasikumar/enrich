import Navbar from "./Navbar"
import Hero from "./Hero"
import Introduction from './Introduction'
import Services from "./Services"
import Program from "./Program"
import Testimonials from "./Testimonials"
import Blog from "./Blog"
import Footer from "./Footer"

const Heart = () => {
  return (
        <>
            <Navbar />
            <Hero/>
            <Introduction/>
            <Services/>
            <Program/>
            <Testimonials/>
            <Blog/>
            <Footer/>
        </>
      )
    }
export default Heart;
