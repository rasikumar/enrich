import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Cursor from "./Cursor";

const HomeGetIn = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    number: "",
    type: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" && /[^a-zA-Z\s.]/.test(value)) {
      return; // Only accept characters, spaces, and periods for the name field
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, email, number, message, type } = formData;

    if (!name.trim()) {
      newErrors.name = "Name is required!";
    } else if (name.length > 100) {
      newErrors.name = "Max 100 characters!";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required!";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      email.length > 100
    ) {
      newErrors.email = "Enter a valid email!";
    }

    if (!number.trim()) {
      newErrors.number = "Number is required!";
    } else if (!/^\d{10}$/.test(number)) {
      newErrors.number = "Must be exactly 10 digits!";
    } else if (/^0000/.test(number)) {
      newErrors.number = "First four digits cannot be zeros!";
    }

    if (!message.trim()) {
      newErrors.message = "Message is required!";
    } else if (message.length > 200) {
      newErrors.message = "Max 200 characters!";
    }

    if (!type.trim()) {
      newErrors.type = "Please select an option!";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fill all required fields!");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post("http://localhost:5001/api/createmessages", formData);
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "", number: "", type: "" });
      setErrors({});
    } catch (error) {
      toast.error("Error sending message. Try again!");
    }
  };

  return (
    <div
      id="getIn"
      className="bg-gray-300 md:flex md:p-10 p-2 max-md:my-5 justify-between mb-8"
    >
      {/* <Cursor /> */}
      <div className="md:w-[40%] p-4 flex flex-col gap-5 md:mb-10">
        <h2 className="text-black md:text-4xl text-2xl font-semibold">
          Get in touch
        </h2>
        <p className="md:text-base xl:text-lg text-justify">
          Use our contact form for all information requests or contact us
          directly using the contact information below.
        </p>
        <div className="xl:text-lg sm:text-sm">
          <h3 className="highlight-color text-lg mb-3 primary-color font-medium">
            Our Office Location
          </h3>
          <p className="xl:text-lg md:text-sm">EnrichMinds Consulting</p>
          <p className="xl:text-lg md:text-sm">
            No 2/74-5, 1st Cross, Hosur Main Road
          </p>
          <p className="xl:text-lg md:text-sm">
            Madiwala, Bengaluru - 560068, Karnataka.
          </p>
        </div>
        <div>
          <h3 className="primary-color font-medium mb-3 text-lg">Support</h3>
          <p className="xl:text-lg md:text-sm">+91 99009 76464</p>
          <p className="xl:text-lg md:text-sm">info@enrichminds.co.in</p>
        </div>
      </div>

      <form
        className="space-y-4 md:w-[40%] xl:w-[35%] max-md:px-4 max-md:py-4"
        onSubmit={handleSubmit}
      >
        {[
          {
            label: "Name",
            name: "name",
            type: "text",
            placeholder: "Enter your Name",
          },
          {
            label: "Email",
            name: "email",
            type: "email",
            placeholder: "Enter your Email",
          },
          {
            label: "Mobile",
            name: "number",
            type: "number",
            placeholder: "Enter your Number",
          },
        ].map(({ label, name, type, placeholder }) => (
          <div key={name}>
            <label className="block xl:text-lg text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type={type}
              name={name}
              className={`mt-1 block w-full px-3 py-2 border ${
                errors[name]
                  ? "border-red-500 placeholder-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 xl:text-lg sm:text-sm`}
              placeholder={errors[name] || placeholder}
              value={formData[name]}
              onChange={handleChange}
            />
            {errors[name] && (
              <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
            )}
          </div>
        ))}

        <div>
          <label className="block xl:text-lg text-sm font-medium text-gray-700">
            Who Are You
          </label>
          <select
            name="type"
            className={`outline-none mt-1 block w-full px-3 py-2 border ${
              errors.type ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 xl:text-lg sm:text-sm`}
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            <option value="Individual">Individual</option>
            <option value="Business">Business</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type}</p>
          )}
        </div>

        <div>
          <label className="block xl:text-lg text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            name="message"
            className={`mt-1 block resize-none w-full h-32 px-3 py-2 border ${
              errors.message
                ? "border-red-500 placeholder-red-500"
                : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-yellow-500 focus:border-yellow-500 xl:text-lg sm:text-sm`}
            placeholder={errors.message || "Enter your message"}
            value={formData.message}
            onChange={handleChange}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
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

export default HomeGetIn;
