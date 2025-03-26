// import Navbar from "./Navbar"
import Hero from "./Hero";
import Introduction from "./Introduction";
import Services from "./allservice/Services";
import Program from "./allprogram/Program";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import Insights from "../components/feature/Insights";
import HomeGetIn from "./HomeGetIn";
// import ScrollAlert from "./ScrollMsg";

const Heart = () => {
  return (
    <div>
      <Hero />
      <Introduction />
      <Services />
      <Program />
      <Testimonials />
      {/* <ScrollAlert /> */}
      <Newsletter />
      <Insights />
      <HomeGetIn />
    </div>
  );
};
export default Heart;
