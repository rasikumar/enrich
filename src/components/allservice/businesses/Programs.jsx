import { Corporates_Content } from "..";
import { Corparate_footer } from "../../../assets";
const Programs = () => {
  const { heading, content } = Corporates_Content[4];
  return (
    <div className="relative xl:h-[14rem] h-[12rem] items-center flex xl:px-24 lg:px-20 md:px-32 px-4">
      <div className="absolute inset-0 md:w-[90%] -z-10 bg-gradient-to-r from-primary to-primary/80 rounded-tr-md rounded-br-md">
        <img
          src={Corparate_footer}
          alt="Corparate_footer"
          width=""
          height=""
          className="object-cover w-full h-full opacity-20 rounded-tr-md rounded-br-md"
        />
      </div>
      <div className="flex flex-col justify-center w-[42rem] gap-4">
        <h1 className="xl:text-3xl lg:text-2xl text-lg text-white font-medium">
          {heading}
        </h1>
        <p className="text-justify xl:text-base text-sm text-white">{content}</p>
      </div>
    </div>
  );
};

export default Programs;
