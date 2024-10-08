import { Individuals_Content } from "../index";

const Skill = () => {
  const { heading, content } = Individuals_Content[3];
  return (
    <div className="md:flex flex-row-reverse items-center xl:justify-between lg:justify-center gap-32 xl:px-52 md:px-10 px-4 mb-20">
      <div className="md:w-[28rem] flex flex-col md:gap-6 gap-2 max-md:mb-4">
        <h1 className="xl:text-3xl lg:text-2xl text-lg text-primary font-medium">
          {heading}
        </h1>
        <p className="text-justify xl:text-lg text-sm">{content}</p>
      </div>
      <div className="">
        <img
          src="https://dummyimage.com/500x400"
          alt={content}
          className="rounded-xl border border-primary shadow-drop mb-4 xl:w-[500px] xl:h-[400px] h-[300px] "
        />
      </div>
    </div>
  );
};

export default Skill;
