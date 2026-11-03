const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      {/* Status Code */}
      <h1 className="text-6xl font-extrabold text-bice-blue sm:text-8xl">
        404
      </h1>
      
      {/* Main Message */}
      <h2 className="mt-2 text-2xl font-semibold text-gray-800 sm:text-3xl">
        Oops! Page not found.
      </h2>
      
      {/* Subtext */}
      <p className="mt-2 text-gray-600 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      
      {/* Return Button */}
      <a
        href="/"
        className="mt-6 inline-block rounded bg-bice-blue px-5 py-3 text-sm font-medium text-white hover:bg-bice-blue-dark focus:outline-none focus:ring-2 focus:ring-bice-blue focus:ring-offset-2"
      >
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
