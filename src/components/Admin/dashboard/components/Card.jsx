/* eslint-disable react/prop-types */

const Card = ({ title, totalCount, error }) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-4  w-full">
        <h2 className="text-xl font-bold">{title}</h2>
        {error ? (
          <p>Failed to Load - {error}</p>
        ) : (
          totalCount && (
            <div className="mt-2">
              <p>
                Total {title}: {totalCount}
              </p>
            </div>
          )
        )}
      </div>
    );
  };
  
  export default Card;