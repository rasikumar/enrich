import { Individuals_Content } from "../index";
import { Card } from "./components/Card";

const Methodology = () => {
  const { heading, content, list } = Individuals_Content[2];
  return (
    <div className="md:flex overflow-x-hidden mb-10">
      <div className="md:px-32 p-10 md:w-[40rem] w-[21rem] gap-4 flex flex-col">
        <h1 className="md:text-3xl text-lg">{heading}</h1>
        <p className="tracking-wide">{content}</p>
      </div>
      {list.map((listItem, index) => {
        return (
          <div key={index} className="relative">
            <div className="w-full h-44 -z-10 md:right-10 -top-10 p-10 absolute bg-primary rounded-2xl" />
            <Card
              image="https://dummyimage.com/100x100"
              title={listItem.title}
              content={listItem.content}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Methodology;
