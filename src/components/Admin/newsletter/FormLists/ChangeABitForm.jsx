/* eslint-disable react/prop-types */
const changeABit = ({
    featuredArticleTitle,
    featuredImage,
    featuredContent,
  }) => {
    return (
      <div className="flex flex-col gap-4 text-sm w-full">
        <h2>{featuredArticleTitle}</h2>
        <div className="flex">
          {featuredImage && (
            <img
              src={featuredImage}
              alt={featuredArticleTitle}
              className="rounded-lg"
              style={{ width: "30%", objectFit: "cover", height: "auto" }}
            />
          )}
          {featuredContent && (
            <div
              className="ql-editor overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 3, // This will limit to 3 lines
                maxHeight: "5.3em", // Adjust this value based on line height
              }}
              dangerouslySetInnerHTML={{ __html: featuredContent }}
            />
          )}
        </div>
        <a href="">Read the Full Article</a>
      </div>
    );
  };
  
  export default changeABit;
  