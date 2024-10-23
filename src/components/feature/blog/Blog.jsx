import { Link } from "react-router-dom";
import { Blogs } from "../../../constant";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Instance from "../../Admin/Instance";
import { BiNavigation } from "react-icons/bi";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await Instance.get("/latestBlogs");
        setBlogs(response.data.blogs);
        setLoading(false);
      } catch (err) {
        setError("Failed to load blogs");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  const itemOneRender = blogs.slice(0, 1);
  const itemThreeRender = blogs.slice(1, 4);

  const dateString = itemOneRender[0].blog_date;
  const date = new Date(dateString);

  // Options for formatting the date in Indian style
  const options = { year: "numeric", month: "short", day: "numeric" };

  // Format the date as "21 Sep 2024"
  const formattedDate = date.toLocaleDateString("en-IN", options);
  console.log(itemOneRender[0].blog_date);

  console.log(formattedDate); // Output: 21 Sep 2024
  return (
    <div className="bg-blue-50 max-tablet:px-6 max-tablet:py-10 py-20">
      {Blogs.map((blog, index) => (
        <div
          key={index}
          className="list-none m-auto flex flex-col items-center justify-center gap-4 mb-4"
        >
          <h2 className="text-t-primary font-medium text-sm">{blog.heading}</h2>
          <p className="font-semibold text-2xl mb-6">{blog.title}</p>
          <div className="flex items-start max-tablet:flex-col justify-center gap-4 ">
            <div className=" w-[30%] max-tablet:w-full flex flex-col gap-4">
              {itemThreeRender.map((item) => (
                <motion.div
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 1,
                  }}
                  key={item.id}
                  className="border-b-[1px] py-3 flex items-start gap-4"
                >
                  <div>
                    <img
                      src={`http://192.168.20.5:5000/blog_images/${item.blog_image}`}
                      alt={item.title}
                      className="rounded-lg w-16 h-20 object-center"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 ">
                      <img
                        src={item.icon_1}
                        alt={item.title}
                        width={item.width}
                      />
                      <li className="text-xs text-t-primary font-medium">
                        {new Date(item.blog_date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </li>
                    </div>
                    <Link
                      to={`/blog/${item.id}`}
                      className="font-bold w-52 text-lg line-clamp-4 transition-all delay-75"
                    >
                      <h1 className="line-clamp-1">{item.blog_title}</h1>
                      <div
                        className="font-normal leading-tight text-xs text-justify line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: item.blog_body }} // Correct usage here
                      />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="bg-b-primary h-[120%] max-tablet:w-full w-[60%] rounded-lg">
              {itemOneRender.map((item) => (
                <div
                  key={item.id}
                  className="flex max-mobile:flex-col gap-2 max-mobile:gap-0 bg-[white] rounded-lg"
                >
                  <div>
                    <img
                      src={`http://192.168.20.5:5000/blog_images/${item.blog_image}`}
                      alt={item.title}
                      width={800}
                      className="h-[380px] max-mobile:h-[200px] rounded-lg object-cover"
                    />
                  </div>
                  <div className="flex flex-col w-full px-4 py-10 gap-4 max-mobile:gap-0">
                    <div className="flex items-center gap-2 w-[50%] text-t-primary">
                      <img
                        src={item.icon_1}
                        alt={item.title}
                        width={item.width}
                      />
                      <li className="text-sm font-medium">
                        {new Date(item.blog_date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                        })}
                      </li>
                    </div>
                    <h3 className="line-clamp-2 font-bold">
                      {item.blog_title}
                    </h3>
                    <div
                      className="line-clamp-5 w-full font-medium border-t-[1px] mt-4 mb-4 text-justify"
                      dangerouslySetInnerHTML={{ __html: item.blog_body }} // Correct usage here
                    />
                    <Link
                      to={`/blog/${item.id}`}
                      className="text-t-secondary font-semibold w-[50%] inline-flex items-center gap-2 "
                    >
                      ReadMore
                      <BiNavigation />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link className="btn-secondary" to={blog.link}>
            {blog.btn}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Blog;
