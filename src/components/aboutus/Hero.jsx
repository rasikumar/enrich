import { Aboutus } from "../../assets";
import { About_Us } from "../../constant";
import RippleImage from "./components/RippleImage";

const Hero = () => {
  const { title, content } = About_Us[0];
  return (
    <div className="md:flex items-center md:p-10 p-4 max-md:py-0 justify-evenly">
      <div className="flex flex-col gap-3 relative">
        <h1 className="md:text-6xl text-9xl font-bold rotate-90 md:flex hidden fixed left-22 -z-10 text-slate-100 uppercase">
          Be Your Bestself
        </h1>
        <h1 className="text-3xl font-bold text-primary">{title}</h1>
        <p className="text-secondary font-semibold text-end">{content}</p>
      </div>
      <div>
        <RippleImage
          src={Aboutus}
          alt={title}
          width=""
          height=""
          className="rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Hero;
