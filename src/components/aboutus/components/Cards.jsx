/* eslint-disable react/prop-types */

const Cards = ({ image, title }) => {
  return (
    <div className="w-36 h-32 flex flex-col bg-white border border-primary rounded-3xl shadow-custom">
      <div className="my-auto">
        <img src={image} alt="#" className="mx-auto" />
        <h1 className="text-center text-sm text-slate-500">{title}</h1>
      </div>
    </div>
  );
};

export default Cards;
