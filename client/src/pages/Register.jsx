import { useState } from "react";
import { ClipLoader } from "react-spinners";
import { NavLink, useNavigate } from "react-router-dom";

import { apiURL } from "../api/index";

function Register() {
  const Navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = {
        username,
        email,
        password,
        cpassword,
        address,
        city
      };

      const res = await fetch(`${apiURL}/register`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 400) {
        setMessage(data);
        setTimeout(() => {
          setMessage("");
        }, 2000);
        setLoading(false);
      } else if (res.status === 420) {
        setMessage(data);
        setTimeout(() => {
          setMessage("");
        }, 2000);
        setLoading(false);
      } else if (res.status === 200) {
        setLoading(false);
        setMessage(data);
        setTimeout(() => {
          setMessage("");
          Navigate("/login");
        }, 2000);
      } else if (res.status === 450) {
        setMessage(data);
        setTimeout(() => {
          setMessage("");
        }, 2000);
        setLoading(false);
      } else if (res.status === 422) {
        setMessage(data);
        setTimeout(() => {
          setMessage("");
        }, 2000);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        {message && (
          <div
            className={`${
              message.message === "Registration Successfull!"
                ? "bg-green-600"
                : "bg-red-600"
            } text-white flex justify-center px-4 rounded-full items-center lg:mt-[142px] mt-[140px] py-3 lg:w-[30%] w-[80%] text-center font-semibold absolute`}
          >
            {message.message}
          </div>
        )}

        <div className="font-primary bg-blue-100 opacity-0.2 flex justify-center pt-1 items-center w-full mx-auto h-[100vh]">
          <div className="flex text-center bg-white text-black rounded-2xl px-4 lg:px-10 py-7 flex-col w-[95%] h-[70vh] md:w-[600px] my-10 justify-between">
            <h2 className="text-3xl font-bold text-gray-900 font-primary mb-3">
              Sign Up
            </h2>

            <input
              className="bg-gray-200 rounded-xl p-3 outline-none text-gray-600 mb-2"
              type="text"
              name="name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="*Name..."
            />

            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="bg-gray-200 rounded-xl p-3 outline-none text-gray-600 mb-2"
              type="text"
              name="city"
              placeholder="*City..."
            />

            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-gray-200 rounded-xl p-3 outline-none text-gray-600 mb-2"
              type="text"
              name="address"
              placeholder="*Address..."
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 rounded-xl p-3 outline-none text-gray-600 mb-2"
              type="text"
              name="email"
              placeholder="*Email..."
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 rounded-xl p-3 outline-none text-gray-600 mb-2"
              type="password"
              name="password"
              placeholder="*Password..."
            />
            <input
              value={cpassword}
              onChange={(e) => setcPassword(e.target.value)}
              className="bg-gray-200 rounded-xl p-3 outline-none text-gray-600"
              type="password"
              name="cpassword"
              placeholder="*Confirm Password..."
            />
            <button
              onClick={(e) => register(e)}
              className="my-2 text-white hover:bg-purple-900 border font-semibold text-md font-primary border-primary bg-primary  rounded-lg p-2 outline-none"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color="#ffffff" size={15} loading={loading} />
              ) : (
                "Continue"
              )}
            </button>
            <span className="text-lg my-1">
              Already have an account?
              <button className="text-primary hover:text-purple-900 font-semibold pl-1">
                <NavLink to="/login">Login</NavLink>
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;