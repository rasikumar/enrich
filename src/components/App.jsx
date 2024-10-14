import img from "../assets/hero/2.png";

// eslint-disable-next-line react/prop-types
const Card = ({ imageSrc, title, description, large }) => {
  return (
    <div
      className={`bg-white shadow-md rounded-lg overflow-hidden relative ${
        large ? "col-span-2 row-span-2" : ""
      }`}
    >
      <img
        src={imageSrc}
        alt={title}
        className={`w-full ${large ? "h-full" : "h-72"} object-cover`}
      />
      {!large && (
        <div className="absolute bottom-0 bg-white bg-opacity-90 gap-0 transition-opacity duration-300 flex flex-col justify-center p-4">
          <h3 className="text-lg font-bold ">{title}</h3>
          <p className="text-gray-600 line-clamp-2">{description}</p>
          <a href="#" className="text-blue-500 hover:text-blue-700">
            Read more →
          </a>
        </div>
      )}
      <div></div>
    </div>
  );
};

function App() {
  const cards = [
    {
      imageSrc: img,
      title: "cold, smooth & tasty.",
      description:
        "A marketing plan is a comprehensive document or blueprint that outlines a company's advertising and marketing efforts for the coming year.",
      large: true,
    },
    {
      imageSrc: img,
      title: "cold, smooth & tasty.",
      description:
        "A marketing plan is a comprehensive document or blueprint that outlines a company's advertising and marketing efforts for the coming year.",
    },
    {
      imageSrc: img,
      title: "cold, smooth & tasty.",
      description:
        "A marketing plan is a comprehensive document or blueprint that outlines a company's advertising and marketing efforts for the coming year.",
    },
    {
      imageSrc: img,
      title: "cold, smooth & tasty.",
      description:
        "A marketing plan is a comprehensive document or blueprint that outlines a company's advertising and marketing efforts for the coming year.",
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          imageSrc={cards[0].imageSrc}
          title={cards[0].title}
          description={cards[0].description}
          large={cards[0].large}
        />
        <div className="md:col-span-1 md:row-span-2 bg-gray-100 p-4 flex items-center justify-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">cold, smooth & tasty.</h2>
            <p className="text-gray-700 mb-6">
              A marketing plan is a comprehensive document or blueprint that
              outlines a companys advertising and marketing efforts for the
              coming year. A marketing plan is a comprehensive document or
              blueprint that outlines a companys advertising and marketing
              efforts for the coming year. A marketing plan is a comprehensive
              document or blueprint that outlines a companys advertising and
              marketing efforts for the coming year.
            </p>
            <a href="#" className="text-blue-500 hover:text-blue-700">
              Read more →
            </a>
          </div>
        </div>
        {cards.slice(1).map((card, index) => (
          <Card
            key={index}
            imageSrc={card.imageSrc}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
