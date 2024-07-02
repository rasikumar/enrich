import Navbar from "./Navbar"
import Hero from "./Hero"
import Introduction from './Introduction'
import Services from "./Services"
import Program from "./Program"
import Testimonials from "./Testimonials"
import Blog from "./Blog"
import GetIn from "./GetIn"
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
            <GetIn/>
            <Footer/>
        </>
      )
    }
export default Heart;
