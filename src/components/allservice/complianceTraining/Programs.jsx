import { Compliance_Content } from "..";
import { heroimg } from "../../../assets";
const Programs = () => {
  const { heading, content } = Compliance_Content[4];
  return (
    <div className="relative xl:h-[14rem] h-[12rem] items-center flex xl:px-44 md:px-32 px-4">
      <div className="absolute inset-0 md:w-[90%] -z-10 bg-gradient-to-r from-primary to-primary/80 rounded-tr-md rounded-br-md">
        <img
          src={heroimg}
          alt="bg-Image"
          className="object-cover w-full h-full opacity-20 rounded-tr-md rounded-br-md"
        />
      </div>
      <div className="flex flex-col justify-center w-[42rem] gap-4">
        <h1 className="xl:text-3xl lg:text-2xl text-lg text-white font-medium">
          {heading}
        </h1>
        <p className="text-justify xl:text-lg text-sm">{content}</p>
      </div>
    </div>
  );
};

export default Programs;
