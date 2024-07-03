
const GetIn = () => {
  return (
      <div id="getIn" className="bg-gray-200 justify-evenly p-10 md:flex rounded-lg shadow-md">

      <div className="md:w-[40%] flex flex-col gap-5 mb-10 ">
          <h2 className="heading">Get in touch</h2>
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

      <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your Name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter a valid email address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              className="mt-1 block resize-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your message"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="terms"
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I accept the <a href="#" className="text-indigo-600 hover:text-indigo-500">Terms of Service</a>
            </label>
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
