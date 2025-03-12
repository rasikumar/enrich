import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { QR, Sending } from "../../assets";
import Instance from "../Admin/Instance";
import { ChevronDown } from "lucide-react";
// import { FaClock, FaVideo } from "react-icons/fa";

const PsychometricForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [isOpenTime, setIsOpenTime] = useState(false);
  const [isOpenAssesment, setIsOpenAssesment] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isBoxopen, setIsBoxopen] = useState(true);
  const [availableSlot, setAvailableSlot] = useState([]);

  const handleClick = () => setIsBoxopen((prev) => !prev);

  // const timeOptions = [
  //   {availableSlot }
  // ];

  const formatDate = (dateString, slot) => {
    const date = new Date(dateString);
    const day = date.getDate(); // Removes leading zero automatically
    const month = date.toLocaleString("en-GB", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year} at ${slot}`;
  };

  const assesmentOptions = [
    {
      value: "Consult on which assessment to take",
      label: "Consult on which assessment to take",
    },
    {
      value: "Understand more about emotional intelligence assessment",
      label: "Understand more about emotional intelligence assessment",
    },
    {
      value:
        "Discuss specific areas of interest (e.g., career, personal development)",
      label:
        "Discuss specific areas of interest (e.g., career, personal development)",
    },
    { value: "Other", label: "Other" },
  ];

  const handleAssesmentSelect = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      selectedAssessment: value,
      otherAssessment: value === "Other" ? "" : null, // Reset or clear custom input if "Other" is selected
    }));
    setIsOpenAssesment(false); // Close dropdown after selection
  };

  const handleOtherInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      otherAssessment: e.target.value,
    }));
  };
  const timeDropDown = () => setIsOpenTime(!isOpenTime);

  const handleTimeSelect = (value) => {
    setFormData({ ...formData, slots: value });
    setIsOpenTime(false);
  };

  // const today = new Date().toISOString().split("T")[0];

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    number: "",
    location: "",
    selectedAssessment: "",
    otherAssessment: "",
    selectDate: "",
    slots: "",
    file: "",
  });

  const validateStepOne = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must not exceed 100 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    } else if (formData.email.length > 100) {
      newErrors.email = "Email must not exceed 100 characters";
    }

    if (!formData.number.trim()) {
      newErrors.number = "Number is required";
    } else if (formData.number.length < 10) {
      newErrors.number = "Number must be at least 10 digits";
    } else if (formData.number.length > 13) {
      newErrors.number = "Number must not exceed 13 digits";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    } else if (formData.location.length > 100) {
      newErrors.location = "Location must not exceed 100 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepTwo = () => {
    const newErrors = {};

    if (!formData.selectedAssessment) {
      newErrors.selectedAssessment = "Assessment type is required";
    } else if (
      formData.selectedAssessment === "Other" &&
      !formData.otherAssessment
    ) {
      newErrors.otherAssessment = "Please specify the assessment type";
    }
    if (!formData.slots) {
      newErrors.slots = "Slots type is required";
    }
    if (!formData.selectDate) {
      newErrors.selectDate = "Date is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStepThree = () => {
    const newErrors = {};

    if (!formData.file) {
      newErrors.file = "Payment is required";
    }
    if (!formData.isConsentChecked || !formData.isTermsChecked) {
      alert("You must agree to the consent and terms and conditions.");
      return;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStepOne()) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else if (currentStep === 2 && validateStepTwo()) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else if (currentStep === 3 && validateStepThree()) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    location: "",
    selectedAssessment: "",
    otherAssessment: "",
    selectDate: "",
    slots: "",
    file: "",
    isConsentChecked: false, // New field for consent checkbox
    isTermsChecked: false, // New field for terms checkbox
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        file: file, // Store the file object
      }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleDateChange = (e) => {
  //   const { value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     selectDate: value,
  //   }));
  // };

  const handleDateChange = async (e) => {
    const selectedDate = e.target.value;
    setFormData((prev) => ({ ...prev, selectDate: selectedDate }));

    try {
      // Send the selected date to your API
      const response = await Instance.post("/checkSlots", {
        date: selectedDate,
      });
      if (response.data && response.data.availableSlots) {
        const slots = response.data.availableSlots.map((slot) => ({
          label: slot,
          value: slot,
        }));
        setAvailableSlot(slots);
      } else {
        setAvailableSlot([]);
      }
      // console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error sending date to API:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formSubmissionData = new FormData();
    const fields = [
      "name",
      "email",
      "number",
      "location",
      "selectedAssessment",
      "selectDate",
      "slots",
      "isConsentChecked", // Include consent checkbox value
      "isTermsChecked", // Include terms checkbox value
    ];

    fields.forEach((field) => {
      const value = formData[field] || "";
      formSubmissionData.append(field, value);
    });

    if (formData.selectedAssessment === "Other") {
      formSubmissionData.append("otherAssessment", formData.otherAssessment);
    }
    // Include file if it exists
    if (formData.file) {
      formSubmissionData.append("file", formData.file);
    }

    console.log(
      "Form Submission Data:",
      Array.from(formSubmissionData.entries())
    );

    try {
      const response = await Instance.post(
        "/appointments",
        formSubmissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("Response:", response.data);

      // Clear the success message after 3 seconds
      setSuccessMessage(null); // Clear the success message
      setSuccessMessage(
        response.data.message || "Appointment created successfully"
      );
      setTimeout(() => {
        window.location.reload(); // Reload the page after clearing the message
      }, 5000); // 3-second delay before clearing the message and reloading
    } catch (error) {
      console.error(error);
      setErrorMessage(error.data.message || "Failed to create appointment");
    }
  };

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 45); // Add 45 days to today's date
  const maxDateString = maxDate.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format

  return (
    <div className="flex my-auto mx-auto rounded-lg min-h-[26.5rem]">
      {isBoxopen ? (
        <>
          <div className="bg-white flex flex-col justify-center items-center rounded-xl p-2">
            <div className="w-[80%] mx-auto flex flex-col gap-4 border-2 p-4 border-primary rounded-xl">
              <h1 className="text-xl font-medium">
                Why Psychometric Assessment?
              </h1>
              <p className="text-xs">
                Psychometric assessments provide valuable insights into areas
                such as personality, emotional intelligence, job preferences,
                and areas of growth. These assessments can help you understand
                yourself better, aligning your Personal and professional
                development goals.
              </p>
              <p className="text-xs">
                If you’re unsure of which assessment is requiredright for you or
                want to discuss how psychometric insights can benefit you,
                schedule a consultation with one of our experts.
              </p>
              <button className="btn-primary" onClick={handleClick}>
                Book an Appointment
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-72 h-[30rem] rounded-xl items-start md:flex hidden flex-col px-4 bg-[#203B93] ">
            {/* Step 1 */}
            <div className={`flex items-center gap-3 justify-center mt-5 `}>
              <span
                className={`${
                  currentStep === 1
                    ? "bg-[#f3BE54] text-white"
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
                    ? "bg-[#f3BE54] text-white"
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
                    ? "bg-[#f3BE54] text-white"
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
                    ? "bg-[#f3BE54] text-white"
                    : "border text-white"
                } w-[30px] text-center`}
                style={{ lineHeight: "30px", borderRadius: "50%" }}
              >
                4
              </span>
              <p className="text-white text-sm">VERIFY</p>
            </div>
          </div>

          <div className="w-full bg-formback bg-center bg-contain bg-no-repeat md:px-16 py-2 relative">
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
                    Kindly Provide your Personal Information
                  </motion.p>

                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, x: 10 }}
                  >
                    <label className="block text-gray-700">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Enter your name"
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
                    <label className="block text-gray-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Enter your email"
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
                    <label className="block text-gray-700">
                      Contact Number
                    </label>
                    <input
                      type="number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Enter your number"
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
                    <label className="block text-gray-700">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full p-2 border rounded"
                      placeholder="Enter your location"
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm">{errors.location}</p>
                    )}
                  </motion.div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 absolute right-0 md:bottom-0"
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
                    <label className="block text-gray-700">
                      Purpose of Appointment
                    </label>
                    <div
                      className="p-2 border rounded cursor-pointer flex justify-between"
                      onClick={() => setIsOpenAssesment(!isOpenAssesment)}
                      role="button"
                      aria-haspopup="true"
                      aria-expanded={isOpenAssesment}
                    >
                      {formData.selectedAssessment &&
                      formData.selectedAssessment !== "Other"
                        ? assesmentOptions.find(
                            (opt) => opt.value === formData.selectedAssessment
                          ).label
                        : formData.selectedAssessment === "Other"
                        ? "Other"
                        : "Select Assessment"}
                      <ChevronDown />
                    </div>

                    <AnimatePresence>
                      {isOpenAssesment && (
                        <motion.ul
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          role="menu"
                          className="absolute w-full bg-white border rounded mt-2 shadow-md z-50"
                        >
                          {assesmentOptions.map((option) => (
                            <motion.li
                              className="p-2 hover:bg-gray-200 cursor-pointer"
                              key={option.value}
                              whileHover={{ scale: 1.05 }}
                              onClick={() =>
                                handleAssesmentSelect(option.value)
                              }
                              role="menuitem"
                            >
                              {option.label}
                            </motion.li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>

                    {formData.selectedAssessment === "Other" && (
                      <input
                        type="text"
                        placeholder="Please specify"
                        value={formData.otherAssessment || ""}
                        onChange={handleOtherInputChange}
                        className="w-full p-2 mt-2 border rounded"
                      />
                    )}

                    {errors.selectedAssessment && (
                      <p className="text-red-500 text-sm">
                        {errors.selectedAssessment}
                      </p>
                    )}

                    {errors.otherAssessment && (
                      <p className="text-red-500 text-sm">
                        {errors.otherAssessment}
                      </p>
                    )}
                  </motion.div>
                  <motion.div
                    className="mb-4"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, x: 10 }}
                  >
                    <label className="block text-gray-700 mb-2">
                      Preferred Appointment Date
                    </label>
                    <input
                      type="date"
                      name="selectDate"
                      value={formData.selectDate}
                      onChange={handleDateChange}
                      min={today}
                      max={maxDateString}
                      className="w-full p-2 border rounded"
                      onKeyDown={(e) => e.preventDefault()}
                    />
                    {errors.selectDate && (
                      <p className="text-red-500 text-sm">
                        {errors.selectDate}
                      </p>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 80 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, x: 10 }}
                    className="relative w-full"
                  >
                    <label className="block text-gray-700 mb-2">
                      Preferred Appointment Time
                    </label>
                    <div
                      className="p-2 border rounded cursor-pointer flex justify-between"
                      onClick={timeDropDown}
                    >
                      {formData.slots
                        ? availableSlot.find(
                            (opt) => opt.value === formData.slots
                          )?.label || "Select Type"
                        : "Select Type"}
                      <ChevronDown />
                    </div>
                    <AnimatePresence>
                      {isOpenTime && (
                        <motion.ul
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="absolute w-full bg-white border rounded mt-2 shadow-md z-50"
                        >
                          {availableSlot.map((option) => (
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

                    {availableSlot.length === 0 && (
                      <p className="text-gray-500 text-sm mt-2">
                        Please select other dates for appointment
                      </p>
                    )}
                    {errors.slots && (
                      <p className="text-red-500 text-sm">{errors.slots}</p>
                    )}
                  </motion.div>

                  <button
                    type="button"
                    onClick={handlePrev}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2 absolute right-20 md:bottom-0 -bottom-5"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 absolute right-0 md:bottom-0 -bottom-5"
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
                    Complete your booking by providing payment details and
                    scanning the QR code.
                  </motion.p>
                  <div className="mb-4">
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, x: 15 }}
                    >
                      <label className="block text-gray-700">
                        Payment Details
                      </label>
                      <input
                        type="file"
                        name="file"
                        className="relative w-full mb-4"
                        placeholder="Enter payment details"
                        onChange={handleImageChange}
                      />
                      {errors.file && (
                        <p className="text-red-500 text-sm">{errors.file}</p>
                      )}
                    </motion.div>
                    <img
                      src={QR}
                      width={150}
                      height={150}
                      alt="QR"
                      className="m-auto"
                    />
                    <p className="text-sm italic mb-2">
                      <span className="text-primary">Note:</span> If you decide
                      to proceed with a psychometric assessment after the
                      consultation, a discount will be applied to the assessment
                      cost, considering the consultation payment.
                    </p>
                    <span>Amount : ₹ 499</span>
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="consentCheckbox"
                      checked={formData.isConsentChecked}
                      onChange={() =>
                        setFormData((prevData) => ({
                          ...prevData,
                          isConsentChecked: !prevData.isConsentChecked, // Toggle consent checkbox
                        }))
                      }
                      required
                    />
                    <label htmlFor="consentCheckbox" className="ml-2 text-xs">
                      I understand that the consultation is a paid session. I
                      consent to provide necessary information for a
                      personalized consultation and agree to the terms and
                      conditions.
                    </label>
                  </div>

                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="termsCheckbox"
                      checked={formData.isTermsChecked}
                      onChange={() =>
                        setFormData((prevData) => ({
                          ...prevData,
                          isTermsChecked: !prevData.isTermsChecked, // Toggle terms checkbox
                        }))
                      }
                      required
                    />
                    <label htmlFor="termsCheckbox" className="ml-2 text-xs">
                      I agree to the{" "}
                      <a
                        href="/terms-and-conditions"
                        className="text-blue-600 underline"
                      >
                        terms and conditions
                      </a>
                      .
                    </label>
                  </div>

                  <button
                    type="button"
                    onClick={handlePrev}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2 absolute right-20 md:bottom-0 -bottom-5"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 absolute right-0 md:bottom-0 -bottom-5"
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
                  <div className="mb-4 max-md:h-64 overflow-scroll w-96">
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
                      <strong>Location:</strong> {formData.location}
                    </p>
                    <p>
                      <strong>Assessment Type:</strong>{" "}
                      {formData.selectedAssessment === "Other"
                        ? formData.otherAssessment || "none" // Show the custom input value or "none" if it's empty
                        : formData.selectedAssessment || "none"}{" "}
                    </p>

                    <p>
                      <strong>Date and Time:</strong>
                      {formatDate(formData.selectDate, formData.slots)}
                    </p>

                    <p>
                      <strong>Payment Details:</strong> ₹ 499
                    </p>
                    {previewUrl && (
                      <div className="mt-2">
                        <strong>Uploaded Image:</strong>
                        <img
                          src={previewUrl}
                          alt="Uploaded Preview"
                          className="mt-2 w-32 object-fit rounded"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-10">
                    <span className="text-red-600">*</span>Note: If you decide
                    to proceed with a psychometric assessment after the
                    consultation, a discount will be applied to the assessment
                    cost, considering the consultation payment.
                  </p>
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700 mr-2 absolute right-20 md:-bottom-0 -bottom-4"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 absolute right-0 md:-bottom-0 -bottom-4"
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
                    <p>{successMessage}</p>
                    <video src={Sending} autoPlay loop={true}></video>
                  </div>
                </div>
              )}
              {errorMessage && (
                <div className="absolute inset-0 flex items-center justify-center"></div>
              )}
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default PsychometricForm;
