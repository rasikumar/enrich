import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

const GetIn = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    number: "",
    type: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);

    try {
      const response = await axios.post(
        "https://enrichminds.co.in/api/createmessages",
        // "https://enrichminds.co.in/api/createmessages",
        formData
      );
      console.log("Server response:", response);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Error sending message:", error);

      // If the error has a response, use it; otherwise, fallback to a general message
      const errorMessage =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        "Error sending message.";

      toast.error(errorMessage);
    }
  };

  return (
    <div
      id="getIn"
      className="bg-gray-300 md:flex md:p-10 p-2 max-md:my-5 justify-between mb-8"
    >
      <div className="md:w-[40%] p-4 flex flex-col gap-5 md:mb-10 ">
        <h2 className="text-black md:text-4xl text-2xl font-semibold ">
          Get in touch
        </h2>
        <p className=" md:text-base xl:text-lg text-justify">
          Use our contact form for all information requests or contact us
          directly using the contact information below.
        </p>
        <div className="xl:text-lg sm:text-sm">
          <h3 className="highlight-color text-lg mb-3 primary-color font-medium">
            Our Office Location
          </h3>
          <p className="xl:text-lg md:text-sm ">EnrichMinds Consulting</p>
          <p className="xl:text-lg md:text-sm ">
            No 2/74-5, 1st Cross, Hosur Main Road
          </p>
          <p className="xl:text-lg md:text-sm ">
            Madiwala, Bengaluru - 560068,
          </p>
          <p className="xl:text-lg md:text-sm ">Karnataka.</p>
        </div>
        <div>
          <h3 className="primary-color font-medium mb-3 text-lg">Support</h3>
          <p className="xl:text-lg md:text-sm ">+91 99009 76464</p>
          <p className="xl:text-lg md:text-sm ">info@enrichminds.co.in</p>
        </div>
      </div>

      <form
        className="space-y-4 md:w-[40%] xl:w-[35%] max-md:px-4 max-md:py-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block xl:text-lg text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 xl:text-lg sm:text-sm"
            placeholder="Enter your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block xl:text-lg text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 xl:text-lg sm:text-sm"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block xl:text-lg text-sm font-medium text-gray-700">
            Mobile
          </label>
          <input
            type="number"
            name="number"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 xl:text-lg sm:text-sm"
            placeholder="Enter your Number"
            value={formData.number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block xl:text-lg text-sm font-medium text-gray-700">
            Who Are You
          </label>
          <select
            name="type"
            className="outline-none mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 xl:text-lg sm:text-sm"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value="Individual">Individual</option>
            <option value="Business">Business</option>
          </select>
        </div>
        <div>
          <label className="block xl:text-lg text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            name="message"
            className="mt-1 block resize-none w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-50 xl:text-lg sm:text-sm"
            placeholder="Enter your message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" className="w-full btn-primary">
            Submit your request
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default GetIn;
