import { Individuals_Content } from "../index";

const Training = () => {
  const { heading, content } = Individuals_Content[1];
  return (
    <div className="md:flex items-center justify-between md:px-64 px-10 mb-32">
      <div className="flex">
        <img
          src="https://dummyimage.com/400x400"
          alt="#"
          className="rounded-xl border border-primary shadow-drop mb-4"
        />
      </div>
      <div className="md:w-[28rem] flex flex-col gap-6">
        <h1 className="md:text-3xl text-lg">{heading}</h1>
        <p className="text-justify">{content}</p>
      </div>
    </div>
  );
};

export default Training;
