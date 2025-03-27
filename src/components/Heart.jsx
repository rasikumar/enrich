// import Navbar from "./Navbar"
import Hero from "./Hero";
import Introduction from "./Introduction";
import Program from "./allprogram/Program";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import Insights from "../components/feature/Insights";
import HomeGetIn from "./HomeGetIn";
import Cursor from "./Cursor";
import Servicescopy from "./allservice/Servicescopy";
// import ScrollAlert from "./ScrollMsg";

const Heart = () => {
  return (
    <div className="cursor-none">
      <Cursor />
      <Hero />
      <Introduction />
      <Servicescopy />
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
