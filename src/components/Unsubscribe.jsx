const Unsubscribe = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white border rounded p-6 max-w-md text-center">
        <h1 className="text-xl font-semibold text-red-500">Unsubscribed</h1>
        <p className="mt-4 text-gray-600">
          You have been successfully unsubscribed. If this was a mistake, you
          can resubscribe anytime.
        </p>
      </div>
    </div>
  );
};

export default Unsubscribe;
