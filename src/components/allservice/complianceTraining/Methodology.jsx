import { useRef } from "react";
import { Compliance_Content } from "../index";
import { Card } from "./components/Card";
import { BsArrowRightCircle, BsArrowLeftCircle } from "react-icons/bs";

const Methodology = () => {
  const { heading, content, list } = Compliance_Content[2];
  const cardContainerRef = useRef(null);

  const scrollLeft = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (cardContainerRef.current) {
      cardContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollToCard = (index) => {
    if (cardContainerRef.current) {
      const cardWidth = 256; // Adjust based on the width of your card
      const scrollPosition = cardWidth * index;
      cardContainerRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="md:flex overflow-x-hidden md:mb-10">
      <div className="md:px-32 md:p-10 p-4 md:w-[40rem] w-[21rem] md:gap-4 gap-2 flex flex-col z-50 bg-white">
        <h1 className="xl:text-3xl lg:text-xl text-lg text-primary font-medium">{heading}</h1>
        <p className="tracking-wide xl:text-sm text-sm">{content}</p>
        <div className="flex md:text-4xl text-2xl gap-5">
          <BsArrowLeftCircle onClick={scrollLeft} className="cursor-pointer" />
          <BsArrowRightCircle onClick={scrollRight} className="cursor-pointer" />
        </div>
      </div>
      <div className="w-full absolute xl:h-44 h-32 bg-primary" />

      {/* Cards container */}
      <div
        ref={cardContainerRef}
        className="flex overflow-x-hidden scroll-smooth px-10"
      >
        {list.map((listItem, index) => (
          <div key={index} className="relative" onClick={() => scrollToCard(index)}>
            <Card
              image="https://dummyimage.com/100x100"
              title={listItem.title}
              content={listItem.content}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Methodology;
