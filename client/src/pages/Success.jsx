import React from 'react';
import {NavLink} from "react-router-dom"
import {MdPaid} from 'react-icons/md'

function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-green-500 w-16 h-16 mx-auto"
        >
          <MdPaid/>
        </svg>
        <h2 className="text-2xl font-semibold text-gray-800 text-center mt-4">
          Payment Successful
        </h2>
        <p className="text-gray-600 text-center mt-2">
          Thank you for your payment!
        </p>
        <div className="flex justify-center mt-6">
          <NavLink
            to="/"
            className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Continue Shopping
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Success;
