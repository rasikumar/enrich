import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { QR, Sending } from "../../../../assets";
// import { FaClock, FaVideo } from "react-icons/fa";

const PsychometricForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const [isOpenAssesment, setIsOpenAssesment] = useState(false);

  const timeOptions = [
    { value: "6.00pm - 7.00pm", label: "6.00pm - 7.00pm" },
    { value: "7.00pm - 8.00pm", label: "7.00pm - 8.00pm" },
    { value: "8.00pm - 9.00pm", label: "8.00pm - 9.00pm" },
  ];

  const assesmentOptions = [
    { value: "Personality Test", label: "Personality Test" },
    { value: "Cognitive Test", label: "Cognitive Test" },
    { value: "Emotional Intelligence", label: "Emotional Intelligence" },
  ];

  const assesmentDropDown = () => setIsOpenAssesment(!isOpenAssesment);

  const handleAssesmentSelect = (value) => {
    setFormData({ ...formData, selectedAssessment: value });
    setIsOpenAssesment(false);
  };

  const timeDropDown = () => setIsOpenTime(!isOpenTime);

  const handleTimeSelect = (value) => {
    setFormData({ ...formData, slots: value });
    setIsOpenTime(false);
  };

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    age: "",
    selectedAssessment: "",
    selectDate: "",
    slots: "",
    paymentDetails: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    number: "",
    age: "",
    assessmentType: "",
    selectDate: "",
    selectTime: "",
    paymentMethod: "",
    paymentDetails: "",
  });

  const validateStepOne = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.number.trim()) {
      newErrors.number = "Number is required";
    } else if (formData.number.length < 10) {
      newErrors.number = "Number must be at least 10 digits";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = "Age must be a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors = {};

    if (!formData.selectedAssessment) {
      newErrors.selectedAssessment = "Assessment type is required";
    }
    if (!formData.slots) {
      newErrors.slots = "Slots type is required";
    }
    if (!selectedDate) {
      newErrors.selectDate = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepThree = () => {
    const newErrors = {};

    if (!formData.paymentDetails) {
      newErrors.paymentDetails = "Payment details are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (currentStep === 1 || validateStepOne()) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else if (currentStep === 2 || validateStepTwo()) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else if (currentStep === 3 && validateStepThree()) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show the success message
    setSuccessMessage(true);
    console.log("Final Form Data Submitted:", formData);

    // Delay the page reload
    setTimeout(() => {
      // Optional: If you want to perform additional actions or reset the form
      // Reset the form data if needed, e.g., setFormData(initialState);

      // Reload the page
      window.location.reload();
    }, 3000); // Adjust the timeout duration as needed (3000ms = 3 seconds)
  };

  return (
    <div className="flex my-auto mx-auto mt-4 rounded-lg min-h-[26.5rem]">
      <div className="w-60 h-[30rem] rounded-xl items-start flex flex-col px-3 bg-primary">
        {/* Step 1 */}
        <div className={`flex items-center gap-3 justify-center mt-5 `}>
          <span
            className={`${
              currentStep === 1
                ? "bg-secondary text-white"
                : "border text-white"
            } w-[30px] text-center`}
            style={{ lineHeight: "30px", borderRadius: "50%" }}
          >
            1
          </span>
          <p className="text-white text-sm">YOUR INFO</p>
        </div>

        {/* Step 2 */}
        <div className={`flex items-center gap-3 justify-center mt-5`}>
          <span
            className={`${
              currentStep === 2
                ? "bg-secondary text-white"
                : "border text-white"
            } w-[30px] text-center`}
            style={{ lineHeight: "30px", borderRadius: "50%" }}
          >
            2
          </span>
          <p className="text-white text-sm">SELECT PLAN</p>
        </div>

        {/* Step 3 */}
        <div className={`flex items-center gap-3 justify-center mt-5`}>
          <span
            className={`${
              currentStep === 3
                ? "bg-secondary text-white"
                : "border text-white"
            } w-[30px] text-center`}
            style={{ lineHeight: "30px", borderRadius: "50%" }}
          >
            3
          </span>
          <p className="text-white text-sm">PAYMENT</p>
        </div>

        {/* Step 4 */}
        <div className={`flex items-center gap-3 justify-center mt-5`}>
          <span
            className={`${
              currentStep === 4
                ? "bg-secondary text-white"
                : "border text-white"
            } w-[30px] text-center`}
            style={{ lineHeight: "30px", borderRadius: "50%" }}
          >
            4
          </span>
          <p className="text-white text-sm">VERIFY</p>
        </div>
      </div>

      <div className="w-full bg-formback bg-center bg-contain bg-no-repeat px-16 py-2 relative">
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <>
              <motion.h1
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 0 }}
                className="text-2xl font-semibold"
              >
                Personal Info
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 0 }}
                className="text-slate-400 text-sm"
              >
                Kindly Provide your personal Information
              </motion.p>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, x: 10 }}
              >
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
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name}</p>
                )}
              </motion.div>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, x: 10 }}
              >
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
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </motion.div>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, x: 10 }}
              >
                <label className="block text-gray-700">Number</label>
                <input
                  type="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Enter your number"
                  required
                />
                {errors.number && (
                  <p className="text-red-500 text-sm">{errors.number}</p>
                )}
              </motion.div>

              <motion.div
                className="mb-4"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, x: 10 }}
              >
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
                {errors.age && (
                  <p className="text-red-500 text-sm">{errors.age}</p>
                )}
              </motion.div>

              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 absolute right-0 -bottom-4"
              >
                Next
              </button>
            </>
          )}
          {currentStep === 2 && (
            <>
              <motion.h1
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, x: 10 }}
                className="text-2xl font-semibold"
              >
                Type & Date
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, x: 10 }}
                className="text-slate-400 text-sm"
              >
                Choose your Assesment type and Schedule
              </motion.p>
              <motion.div
                className="relative w-full mb-4"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, x: 10 }}
              >
                <label className="block text-gray-700">Assessment Type</label>
                <div
                  className="p-2 border rounded cursor-pointer"
                  onClick={assesmentDropDown}
                  role="button"
                  aria-haspopup="true"
                  aria-expanded={isOpenAssesment}
                >
                  {formData.selectedAssessment
                    ? assesmentOptions.find(
                        (opt) => opt.value === formData.selectedAssessment
                      ).label
                    : "Select Assessment"}
                </div>

                <AnimatePresence>
                  {isOpenAssesment && (
                    <motion.ul
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      role="menu"
                      className="absolute w-full bg-white border rounded mt-2 shadow-md"
                    >
                      {assesmentOptions.map((option) => (
                        <motion.li
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          key={option.value}
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleAssesmentSelect(option.value)}
                          role="menuitem"
                        >
                          {option.value}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>

                {errors.selectedAssessment && (
                  <p className="text-red-500 text-sm">
                    {errors.selectedAssessment}
                  </p>
                )}
              </motion.div>
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, x: 10 }}
              >
                <label className="block text-gray-700 mb-2">Select Date</label>
                <input
                  type="date"
                  name="selectDate"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={today}
                  className="w-full p-2 border rounded"
                />
                {errors.selectDate && (
                  <p className="text-red-500 text-sm">{errors.selectDate}</p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, x: 10 }}
                className="relative w-full"
              >
                <label className="block text-gray-700 mb-2">Slots</label>
                <div
                  className="p-2 border rounded cursor-pointer"
                  onClick={timeDropDown}
                >
                  {formData.slots
                    ? timeOptions.find((opt) => opt.value === formData.slots)
                        .label
                    : "Select Type"}
                </div>
                <AnimatePresence>
                  {isOpenTime && (
                    <motion.ul
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute w-full bg-white border rounded mt-2 shadow-md"
                    >
                      {timeOptions.map((option) => (
                        <motion.li
                          key={option.value}
                          className="p-2 hover:bg-gray-200 cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          onClick={() => handleTimeSelect(option.value)}
                        >
                          {option.label}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
                {errors.slots && (
                  <p className="text-red-500 text-sm">{errors.slots}</p>
                )}
              </motion.div>

              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2 absolute right-20 -bottom-4"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 absolute right-0 -bottom-4"
              >
                Next
              </button>
            </>
          )}
          {currentStep === 3 && (
            <>
              <motion.h1
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, x: 10 }}
                className="text-2xl font-semibold"
              >
                Payment
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, x: 10 }}
                className="text-slate-400 text-sm"
              >
                Complete your booking by providing payment details and scanning
                the QR code.
              </motion.p>
              <div className="mb-4">
                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, x: 15 }}
                >
                  <label className="block text-gray-700">Payment Details</label>
                  <input
                    type="file"
                    name="paymentDetails"
                    value={formData.paymentDetails}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    placeholder="Enter payment details"
                    required
                  />
                  {errors.paymentDetails && (
                    <p className="text-red-500 text-sm">
                      {errors.paymentDetails}
                    </p>
                  )}
                </motion.div>
                <img src={QR} width={150} height={150} alt="QR" />
                <span>Amout : ₹ 499</span>
              </div>

              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2 absolute right-20 -bottom-4"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 absolute right-0 -bottom-4"
              >
                Next
              </button>
            </>
          )}
          {currentStep === 4 && (
            <>
              <motion.h1
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, x: 10 }}
                className="text-2xl font-semibold"
              >
                Pesronal info
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, x: 10 }}
                className="text-slate-400 text-sm"
              >
                Kindly Provide your pesronal Information
              </motion.p>
              <div className="mb-4">
                <p>
                  <strong>Name:</strong> {formData.name}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {formData.number}
                </p>
                <p>
                  <strong>Age:</strong> {formData.age}
                </p>
                <p>
                  <strong>Assessment Type:</strong>{" "}
                  {formData.selectedAssessment}
                </p>
                <p>
                  <strong>Date and Time</strong> {selectedDate} {formData.slots}
                </p>
                <p>
                  <strong>Payment Details:</strong> {formData.paymentDetails}
                </p>
                {formData.paymentDetails && (
                  <div className="mt-2">
                    <strong>Uploaded Image:</strong>
                    <img
                      src={formData.paymentDetails}
                      alt="Uploaded"
                      className="mt-2 w-32 h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2 absolute right-20 -bottom-4"
              >
                Previous
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 absolute right-0 -bottom-4"
              >
                Book
              </button>
            </>
          )}
          {successMessage && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-4 relative flex items-center flex-col">
                <h2 className="text-green-500 font-semibold text-lg">
                  Success!
                </h2>
                <p>Your booking was successful!</p>
                <video src={Sending} autoPlay loop={true}></video>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PsychometricForm;
