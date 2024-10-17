import { useState } from "react";
import { FaClock, FaUser, FaVideo } from "react-icons/fa";

const PsychometricForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    assessmentType: "",
    paymentMethod: "",
    paymentDetails: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to an API
    console.log("Final Form Data Submitted:", formData);
  };

  return (
    <div className="p-5 flex my-auto mx-auto mt-4 rounded-lg border border-primary min-h-[25.5rem]">
      <div className="w-96 border-r-2  border-l-pink-700">
        <h1 className="text-lg font-bold mb-4 text-primary">
          Psychometric Assessment Form
        </h1>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FaClock />
            <span>30 min</span>
          </div>
          <div className="flex items-center gap-2">
            <FaVideo />
            <span>Psychometric Assessment</span>
          </div>
          {formData.name && (
            <div className="flex items-center gap-2">
              <FaUser />
              <span>{formData.name}</span>
            </div>
          )}
        </div>
      </div>

      <div className="w-full px-4">
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your age"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Assessment Type</label>
                <select
                  name="assessmentType"
                  value={formData.assessmentType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="personality">Personality Test</option>
                  <option value="cognitive">Cognitive Test</option>
                  <option value="emotional">Emotional Intelligence</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Next
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  <option value="">Select Payment Method</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Payment Details</label>
                <input
                  type="text"
                  name="paymentDetails"
                  value={formData.paymentDetails}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter payment details"
                  required
                />
              </div>

              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Next
              </button>
            </>
          )}

          {currentStep === 3 && (
            <>
              <h2 className="text-xl font-bold mb-4">Confirm Your Details</h2>
              <div className="mb-4">
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                <p>
                  <strong>Age:</strong> {formData.age}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Assessment Type:</strong> {formData.assessmentType}
                </p>
                <p>
                  <strong>Payment Method:</strong> {formData.paymentMethod}
                </p>
                <p>
                  <strong>Payment Details:</strong> {formData.paymentDetails}
                </p>
              </div>

              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2"
              >
                Previous
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default PsychometricForm;
