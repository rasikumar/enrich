import { About_Us } from "../../constant";
import Cards from "./components/Cards";

const Corevalues = () => {
  const { title, content, lists } = About_Us[5];
  return (
    <div className="lg:mx-32 md:my-12 my-4  xl:mx-40 flex flex-col gap-4 justify-center">
      <div className="md:flex justify-center max-md:m-auto md:gap-32">
        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-primary">{title}</h1>
          <p className="text-slate-400 max-md:mb-4">{content}</p>
        </div>
        <div className="gap-4 flex">
          <Cards image="https://dummyimage.com/50" title="Resourcefulnes" />
          <Cards image="https://dummyimage.com/50" title="Integrity" />
        </div>
      </div>
      <div className="md:flex flex-row-reverse gap-24 items-start justify-center">
        <div className="flex gap-4 max-md:ml-3">
          <Cards image="https://dummyimage.com/50" title="Creativity" />
          <Cards image="https://dummyimage.com/50" title="Holistic" />
        </div>
        <div className="md:-mt-16 mt-10">
          {lists.map((list) => {
            return (
              <div key={list.id} className="flex flex-col md:w-80 max-md:px-4 mt-2 m-auto ">
                <h1 className="text-sm font-medium text-secondary">{list.title}</h1>
                <p className="text-sm text-justify">{list.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Corevalues;
