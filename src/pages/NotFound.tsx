import { Link } from "react-router-dom";

const NotFound = () => {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-6">
        <h1 className="text-9xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold mt-4 text-gray-700">
          Oops! Page not found
        </h2>
        <p className="text-gray-500 mt-2">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-gray-900 text-white rounded-xl shadow hover:bg-gray-800 transition"
        >
          Go Back Home
        </Link>
      </div>
    );
};

export default NotFound;