import Details from "./Details";
import Hero from "./Hero";
import Whoweare from "./Whoweare";
import Corevalues from "./Corevalues";
import Mission from "./Mission";
import Moto from "./Moto";
import { About_Us } from "../../constant";

const Aboutus = () => {
  const { title } = About_Us[0];
  return (
    <div className="relative">
      <h1 className="text-6xl font-bold rotate-0 max-md:flex hidden sticky top-28 -z-10 text-slate-100 uppercase">
        {title}
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
