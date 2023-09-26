import { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";

import { apiURL } from "../api/index";
import { ClipLoader } from "react-spinners";

function Login() {
  const Navigate = useNavigate();
  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await fetch(`${apiURL}/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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
          Navigate("/cart");
          window.location.reload()
        }, 2000);
      } else if (res.status === 450) {
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
              message.message === "Login Successfull!"
                ? "bg-green-600"
                : "bg-red-600"
            } text-white flex justify-center px-4 rounded-full items-center lg:mt-[220px] mt-[200px] py-3 lg:w-[20%] w-[60%] text-center font-semibold absolute`}
          >
            {message.message}
          </div>
        )}
        <div className="font-primary bg-blue-200 opacity-0.2 flex justify-center items-center w-full mx-auto h-[100vh]">
          <div className="w-[90%] lg:w-96 flex text-center bg-white text-black rounded-2xl p-10 flex-col mt-1 justify-between ">
            <h2 className="text-2xl font-semibold mb-4">Sign In</h2>

            <input
              className="bg-gray-200 rounded-xl p-3 outline-none text-gray-600 mb-2"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="*Enter Email..."
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 rounded-xl p-3 outline-none text-gray-600 mb-2"
              type="password"
              name="password"
              placeholder="*Password..."
            />
            <button
              onClick={(e) => login(e)}
              className="my-2 text-white hover:bg-purple-900 border font-semibold text-md font-primary border-primary bg-primary  rounded-lg p-2 outline-none"
              disabled={loading}
            >
              {loading ? (
                <ClipLoader color="#ffffff" size={15} loading={loading} />
              ) : (
                "Continue"
              )}
            </button>

            <span className="text-md mt-4 text-gray-700 font-semibold font-primary">
              Don't have an account?
              <button className="text-primary hover:text-purple-900 font-semibold pl-1">
                <NavLink to="/register">Register</NavLink>
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
