// DynamicBreadcrumb.js
import { Link, useLocation } from 'react-router-dom';

const DynamicBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav
      aria-label="breadcrumb"
      className="text-sm fixed w-full mx-auto flex items-center justify-center left-0 top-[5.6rem] py-2 z-50"
      style={{
        backgroundColor: '#fff', // Dark background
        color: '#ffffff',
        padding: '10px 20px',
        // borderRadius: '8px',
        // border: '1px solid #333',
      }}
    >
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
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
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
