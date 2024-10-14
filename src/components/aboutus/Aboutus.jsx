import Details from "./Details";
import Hero from "./Hero";
import Whoweare from "./Whoweare";
import Corevalues from "./Corevalues";
import Mission from "./Mission";
import Moto from "./Moto";

const Aboutus = () => {
  return (
    <div className="relative">
      <h1 className="text-6xl font-bold rotate-0 max-md:flex hidden sticky top-28 text-slate-100 uppercase -z-20">
        Be Your Bestself
      </h1>
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
