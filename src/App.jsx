import Services from "./components/Services"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Testimonials from "./components/Testimonials"

const App = () => {
  return (
    <div className="scroll-smooth">
      <Navbar/>
      <Hero/>
      <Services/>
      <Testimonials/>
    </div>
  )
}

export default App
