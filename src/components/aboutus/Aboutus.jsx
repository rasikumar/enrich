import Details from "./Details";
import Hero from "./Hero";
import Whoweare from "./Whoweare";
import Corevalues from "./Corevalues";
import Mission from "./Mission";
import Moto from "./Moto";
// import SquiggleScroll from "./components/SquiggleScroll";
import { Helmet } from "react-helmet";
import Cursor from "../Cursor";

const Aboutus = () => {
  return (
    <div className="relative">
      <Helmet>
        <title>About Us | Enrich Minds</title>
        <meta
          name="description"
          content="Learn more about Enrich mission and our mission."
        />
      </Helmet>
      {/* <SquiggleScroll /> */}
      <h1 className="text-6xl font-bold rotate-0 max-md:flex hidden sticky top-28 text-slate-100 uppercase -z-20">
        YOUR BEST SELF{" "}
      </h1>
      <Cursor />

      <Hero />
      <Details />
      <Whoweare />
      <Corevalues />
      <Mission />
      <Moto />
    </div>
  );
};

export default Aboutus;
