import { Corporates_Content } from "../index";

const Training = () => {
  const { heading, content } = Corporates_Content[1];
  return (
    <div className="md:flex flex-row-reverse items-center xl:justify-between justify-center gap-24 xl:px-52 lg:px-20 px-4 md:mb-32 mb-8">
      <div className="md:w-[28rem] flex flex-col md:gap-6 gap-2 max-md:mb-4">
        <h1 className="xl:text-3xl lg:text-2xl text-lg text-primary font-medium">
          {heading}
        </h1>
        <p className="text-justify xl:text-lg text-sm">{content}</p>
      </div>
      <div className="flex">
        <img
          src="https://dummyimage.com/500x400"
          alt="#"
          loading="lazy"
          className="rounded-xl border border-primary shadow-drop "
        />
      </div>
    </div>
  );
};

export default Training;
