import { useEffect, useState } from "react";
import { Aboutus } from "../../assets";
import { About_Us } from "../../constant";
import RippleImage from "./components/RippleImage";

const Hero = () => {
  const { title, content } = About_Us[0];

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setScrollY(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="md:flex items-center md:p-10 p-4 max-md:py-0 justify-evenly">
      <div className="flex flex-col gap-3 relative">
        <h1 className="md:text-6xl text-9xl font-bold rotate-90 md:flex hidden fixed left-22 -z-20 text-slate-100 uppercase">
          Be Your Bestself
        </h1>
        <h1
          className="text-3xl font-bold text-primary"
          style={{
            transform: `translateY(${scrollY * 0.3}px) `,
            transition: "all",
          }}
        >
          {title}
        </h1>
        <p
          className="text-secondary md:text-6xl text-5xl max-md:mb-2 font-semibold md:text-end"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: "all",
          }}
        >
          {content}
        </p>
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
