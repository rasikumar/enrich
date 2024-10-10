import { Brainimage, Butterfly, transformation } from "../../assets";
import { About_Us } from "../../constant";

const Details = () => {
  const { title, content } = About_Us[1];
  return (
    <div className="flex md:h-[50rem] p-4 justify-center md:gap-32">
      <div className="relative md:w-[30%] h-full">
        <img
          src={Brainimage}
          alt="Brainimage"
          width=""
          height=""
          className="absolute right-0 top-0 rounded-2xl"
        />
        <img
          src={Butterfly}
          alt="Butterfly-image"
          width=""
          height=""
          className="absolute right-10 top-64 rounded-2xl"
        />
        <h1 className="md:flex hidden absolute bottom-0 text-6xl font-thin text-slate-300 left-10 -z-20">
          Optimize <br /> Your <br /> Mind
        </h1>
      </div>
      <div className="flex flex-col gap-4 md:w-[40%] md:mt-32 relative">
        <h1 className="text-3xl font-medium text-primary">{title}</h1>
        <p className="text-justify">{content}</p>
        <img
          src={transformation}
          alt="transformation image"
          width=""
          height= ""
          className="md:absolute max-md:h-56 bottom-10 rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Details;
