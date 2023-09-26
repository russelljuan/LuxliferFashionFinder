import React from 'react';
import { NavLink } from 'react-router-dom';

function Cancel() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-red-500 w-16 h-16 mx-auto"
        >
          <path
            fillRule="evenodd"
            d="M15.293 4.293a1 1 0 011.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 111.414-1.414L10 8.586l4.293-4.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-4">
          Payment Canceled
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Your payment was canceled.
        </p>
        <div className="flex justify-center mt-6">
          <NavLink
            to="/"
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
          >
            Return to Home
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Cancel;
