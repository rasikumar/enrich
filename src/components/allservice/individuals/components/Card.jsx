/* eslint-disable react/prop-types */

export const Card = ({ image, title, content }) => {
  return (
    <div className="flex flex-col w-[16rem] m-auto p-5 bg-red-50 gap-4 md:mr-10 rounded-lg mt-10 mb-28">
      <div className="flex items-center justify-center mt-4">
        <img
          src={image}
          alt={title}
          width={100}
          height={100}
          className="rounded-full"
        />
      </div>
      <h1 className="text-center">{title}</h1>
      <p>{content}</p>
    </div>
  );
};
