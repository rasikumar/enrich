import { Moto1, Moto2 } from "../../assets";
import { About_Us } from "../../constant";

const Moto = () => {
  const { title, content, content2, content3 } = About_Us[4];
  return (
    <div className="flex md:h-[40rem] p-4 justify-center md:gap-32">
      <div className="relative md:w-[30%] h-full">
        <img
          src={Moto1}
          alt="Moto1"
          loading="lazy"
          className="absolute right-0 top-0 rounded-2xl"
        />
        <img
          src={Moto2}
          alt="Moto2"
          loading="lazy"
          className="absolute right-10 top-64 rounded-2xl"
        />
      </div>
      <div className="flex flex-col gap-4 md:w-[40%] md:mt-32 relative">
        <h1 className="text-3xl font-medium text-primary">{title}</h1>
        <p className="text-justify text-secondary font-semibold">
          &quot; {content} &quot;
        </p>
        <p className="text-justify">{content2}</p>
        <p className="text-justify">{content3}</p>
      </div>
    </div>
  );
};

export default Moto;
