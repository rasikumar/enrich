// import Navbar from "./Navbar"
import Hero from "./Hero";
import Introduction from "./Introduction";
import Services from "./allservice/Services";
import Program from "./allprogram/Program";
import Testimonials from "./Testimonials";
import Newsletter from "./Newsletter";
import Blog from "../components/feature/blog/Blog";
import GetIn from "./GetIn";
// import ScrollAlert from "./ScrollMsg";

const Heart = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Hero />
      <Introduction />
      <Services />
      <Program />
      <Testimonials />
      {/* <ScrollAlert /> */}
      <Newsletter />
      <Blog />
      <GetIn />
    </>
  );
};
export default Heart;
