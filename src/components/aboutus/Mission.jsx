import { About_Us } from "../../constant";

const Mission = () => {
  const { title, content } = About_Us[3];
  return (
    <div className="lg:mx-32 my-12 max-md:px-4 xl:mx-40 flex flex-col gap-10">
      <div>
        <img
          src="https://dummyimage.com/1200x350"
          alt="#"
          className="rounded-3xl m-auto max-md:h-60"
        />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-3xl font-medium text-primary">
          {title}
        </h1>
        <p className="text-justify">{content}</p>
      </div>
    </div>
  );
};

export default Mission;
