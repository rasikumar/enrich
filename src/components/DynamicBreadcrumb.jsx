// DynamicBreadcrumb.js
import { IoArrowBackCircle } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DynamicBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const navigate = useNavigate();

  return (
    <nav
      aria-label="breadcrumb"
      className="text-sm fixed md:w-full mx-auto px-6 flex items-center justify-center left-0 top-[5.6rem] py-2 z-50 bg-white"
    >
      <IoArrowBackCircle
        className="text-3xl md:flex items-start absolute md:left-10 hidden right-0"
        onClick={() => navigate(-1)}
      />
      <ol className="flex space-x-2">
        {/* Home Link */}
        <li className="flex items-center justify-center">
          <Link
            to="/"
            className="text-primary hover:text-neon-yellow transition-colors duration-300 font-medium"
          >
            Home
          </Link>
          {pathnames.length > 0 && (
            <span className="mx-2 text-gray-400">/</span>
          )}
        </li>

        {/* Dynamic Pathnames */}
        {pathnames.map((value, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={index} className="flex items-center">
              {!isLast ? (
                <Link
                  to={routeTo}
                  className="text-primary hover:text-neon-yellow transition-colors duration-300 font-medium capitalize"
                >
                  {decodeURIComponent(value)}
                </Link>
              ) : (
                <span className="text-secondary font-semibold capitalize">
                  {decodeURIComponent(value)}
                </span>
              )}
              {!isLast && <span className="mx-2 text-gray-400">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default DynamicBreadcrumb;
