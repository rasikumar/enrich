/* eslint-disable react/prop-types */

const Card = ({ title, totalCount, error }) => {
  return (
    <div className="bg-custom-gradient text-white shadow-lg rounded-lg p-5 w-full transform transition-all duration-300 hover:shadow-2xl hover:translate-y-[-5px]">
      <h2 className="text-2xl font-semibold mb-3">{title}</h2>
      {error ? (
        <p className="text-red-300 mt-2 font-medium">{error}</p>
      ) : (
        totalCount !== undefined && (
          <div className="mt-3">
            <p className="text-lg">
              Total {title}: <span className="font-bold text-yellow-300">{totalCount}</span>
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default Card;
