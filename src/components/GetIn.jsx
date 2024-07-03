import { useState } from "react";
import axios from 'axios';


const GetIn = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);
  
    try {
      const response = await axios.post('http://localhost:5000/api/contact', formData);
      console.log('Server response:', response);
      alert('Message sent successfully!');
    } catch (error) {
      console.error('Error sending message:', error.response || error.message);
      alert('Error sending message.');
    }
  };

  
  return (
      <div id="getIn" className="bg-gray-200 justify-evenly p-10 md:flex rounded-lg shadow-md">

      <div className="md:w-[40%] flex flex-col gap-5 mb-10 ">
          <h2 className="heading text-red-600">Get in touch</h2>
          <p className="primary-color text-justify">Use our contact form for all information requests or contact us directly using the contact information below.</p>
          <div className="primary-color xl:text-base sm:text-sm">
            <h3 className="highlight-color mb-3">Our Office Location</h3>
            <p>Evvi Solutions Private Limited</p>
            <p>TCE - TBI,Thiagarajar Advanced Research Centre,</p>
            <p>Thiagarajar College of Engineering Campus,</p>
            <p>Thiruparankundram, Madurai -625015</p>
          </div>
          <div className=" primary-color">
           <h3 className="highlight-color mb-3">Email</h3>
            <p>info@evvisolutions.com</p>
          </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your Name"
              value={formData.name} 
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter a valid email address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              className="mt-1 block resize-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full btn-primary"
            >
              Submit your request
            </button>
          </div>
        </form>
      </div>
  );
};

export default GetIn;
