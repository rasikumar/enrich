/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const Card = ({ title, totalCount, error, link, listType }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link, { state: { selectedList: listType } });
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-custom-gradient text-white shadow-lg rounded-lg p-5 w-full transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
    >
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>

      {error ? (
        <p className="text-red-300 mt-2 font-medium">{error}</p>
      ) : (
        <p className="text-lg mt-3">
          Total {title}:{" "}
          <span className="font-bold text-yellow-300">
            {totalCount ?? "N/A"}
          </span>
        </p>
      )}
    </div>
  );
};

export default Card;
