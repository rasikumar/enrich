/* eslint-disable react/prop-types */

const Cards = ({ image, title,content }) => {
  return (
    <div className="w-36 h-32 flex flex-col bg-white border border-primary rounded-3xl shadow-custom">
      <div className="my-auto">
        <img src={image} alt={content} loading="lazy" className="mx-auto w-20 rounded-xl md:mb-1" />
        <h1 className="text-center text-sm text-slate-500">{title}</h1>
      </div>
    </div>
  );
};

export default Cards;
