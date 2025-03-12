import { Link } from "react-router-dom";
import InsightList from "./InsightsLists";
import { useState } from "react";
import Instance from "../Admin/Instance";
import { toast } from "react-toastify";

const App = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Submitting form data:", formData);

    try {
      const response = await Instance.post("/subscribe", formData);
      // if (response.status === true) {
      console.log(response);
      toast.success("You're in! Welcome aboard!");
      // } else {
      //   console.log(response);
      //   toast.error("Failed to subscribe");
      //   toast.error(
      //     response.error ||
      //       "Oops! We encountered an issue. Please retry in a bit."
      //   );
      // }
      setFormData({
        email: "",
      });
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.error || "Please enter your email address");
    }
  };

  return (
    <div className="md:m-8 px-4 App xl:h-full">
      <header className="md:p-4 flex flex-col gap-4 text-center ">
        <h1 className="text-black md:text-4xl text-2xl font-semibold text-center">
          Insights Hub
        </h1>
        <h2 className="xl:text-xl md:text-lg w-full  font-[600] text-center">
          In our pursuit of growth, giving back becomes our compass, guiding us
          to empower and elevate others along the way.
        </h2>
        <p className="xl:text-lg text-sm text-gray-500 md:w-[80%] mx-auto ">
          Stay informed with our latest blog posts. Discover expert tips,
          industry trends, and practical advice on behavioral skills, corporate
          training, and personal development.
        </p>
      </header>
      <main>
        <InsightList />
      </main>
      <Link to={"/insights"}>
        <button className="mt-10 mb-10 btn-primary flex m-auto">
          More Insights
        </button>
      </Link>
      <div className="py-6 px-4 m-auto w-full gap-3 flex flex-col bg-slate-300">
        <h1 className="text-center xl:text-lg md:text-sm  ">
          Subscribe for Insights, Updates, and More!
        </h1>
        <form
          onSubmit={handleSubmit}
          className="lg:flex border lg:w-[38rem] w-full justify-center m-auto border-gray-300 focus-within:border-primary rounded-lg gap-3 bg-white px-4 py-2 "
        >
          <input
            type="email"
            placeholder="Enter Your Mail"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 block bg-none w-full px-3 py-2 rounded-md focus:outline-none  xl:text-lg sm:text-sm max-md:mb-4"
          />
          <button
            type="submit"
            className="py-2 px-5 max-md:text-xs bg-yellow-600 transition max-md:w-full delay-75 text-white font-semibold rounded-md hover:shadow-md hover:bg-white hover:text-yellow-600 "
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
