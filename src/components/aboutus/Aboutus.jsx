import Details from "./Details";
import Hero from "./Hero";
import Whoweare from "./Whoweare";
import Corevalues from "./Corevalues";
import Mission from "./Mission";
import Moto from "./Moto";
// import SquiggleScroll from "./components/SquiggleScroll";
import { Helmet } from "react-helmet";
import { IoArrowBackCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Cursor from "../Cursor";

const Aboutus = () => {
  const navigate = useNavigate();
  return (
    <div className="relative cursor-none">
      <Helmet>
        <title>About Us | Enrich Minds</title>
        <meta
          name="description"
          content="Learn more about Enrich mission and our mission."
        />
      </Helmet>
      <Cursor />
      {/* <SquiggleScroll /> */}

      <h1 className="text-6xl font-bold rotate-0 max-md:flex hidden sticky top-28 text-slate-100 uppercase -z-20">
        YOUR BEST SELF{" "}
      </h1>
      <IoArrowBackCircle
        className="text-3xl"
        onClick={() => navigate(-1)}
      />
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
