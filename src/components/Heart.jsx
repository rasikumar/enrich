// import Navbar from "./Navbar"
import Hero from "./Hero"
import Introduction from './Introduction'
import Services from "./allservice/Services"
import Program from "./allprogram/Program"
import Testimonials from "./Testimonials"
import Blog from "../components/blogpages/Blog"
import GetIn from "./GetIn"
import Footer from "./Footer"
import ScrollAlert from "./ScrollMsg"

const Heart = () => {
  return (
        <>
            {/* <Navbar /> */}
            <Hero/>
            <Introduction/>
            <Services/>
            <Program/>
            <Testimonials/>
            <ScrollAlert/>
            <Blog/>
            <GetIn/>
            <Footer/>
        </>
      )
    }
export default Heart;
