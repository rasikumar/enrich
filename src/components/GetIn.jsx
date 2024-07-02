
const GetIn = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6">Get in touch</h2>
        <p className="mb-6">Use our contact form for all information requests or contact us directly using the contact information below.</p>
        <div className="mb-6">
          <h3 className="font-semibold">Our Office Location</h3>
          <p>The Interior Design Studio Company</p>
          <p>The Courtyard, Al Quoz 1, Colorado, USA</p>
        </div>
        <div className="mb-6">
          <h3 className="font-semibold">Phone (Landline)</h3>
          <p>+912 3 567 8987</p>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
            >
              Submit your request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GetIn;
