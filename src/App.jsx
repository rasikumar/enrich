import Services from "./components/Services"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Testimonials from "./components/Testimonials"
import Blog from "./components/Blog"

const App = () => {
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
