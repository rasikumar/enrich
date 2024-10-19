import { useEffect, useState } from "react";
import { Brainimage, Butterfly, transformation } from "../../assets";
import { About_Us } from "../../constant";

const Details = () => {
  const { title, content } = About_Us[1];

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
    <div className="flex md:h-[50rem] p-4 justify-center md:gap-32">
      <div className="relative md:w-[30%] h-full">
        <img
          src={Brainimage}
          alt="Brainimage"
          width=""
          height=""
          loading="lazy"
          className="absolute right-0 top-0 rounded-2xl"
        />
        <img
          src={Butterfly}
          alt="Butterfly-image"
          width=""
          height=""
          loading="lazy"
          className="absolute right-10 top-64 rounded-2xl"
        />
        <h1
          className="md:flex hidden absolute bottom-0 text-6xl font-thin text-slate-300 -left-16 -z-20"
          style={{
            transform: `translateX(${scrollY * 0.12}px)`, // Parallax effect on scroll
          }}
        >
          Optimize <br /> Your <br /> Mind
        </h1>
      </div>
      <div className="flex flex-col gap-4 md:w-[40%] md:mt-20 relative">
        <h1
          className="text-3xl font-medium text-primary"
          style={{
            transform: `translateY(${scrollY * 0.12}px)`, // Parallax effect on scroll
          }}
        >
          {title}
        </h1>
        <p
          className="text-justify"
          style={{
            transform: `translateY(${scrollY * 0.12}px)`, // Parallax effect on scroll
          }}
        >
          {content}
        </p>
        <img
          src={transformation}
          alt="transformation image"
          width=""
          height=""
          loading="lazy"
          className="md:absolute max-md:h-56 bottom-10 rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Details;
