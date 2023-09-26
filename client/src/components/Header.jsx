import React,{useState,useEffect} from "react";

import { useSelector } from "react-redux";
import {NavLink} from "react-router-dom";
import {apiURL} from "../api/index"

function Header() {
  const cartItems = useSelector((state) => state.AddToCart);
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function TotalCartItems() {
    const CartTotal = cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    return CartTotal;
  }

  function NetTotal() {
    const Total = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    return Total;
  }

  const tAmount = NetTotal() + 5;

  const CheckLogin = async () => {
    try {
      const res = await fetch(`${apiURL}/check`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setName(data.name);
      setEmail(data.email);

      setIsLogin(true);
    } catch (error) {
      setIsLogin(false);
    }
  };
  useEffect(() => {
    CheckLogin();
  });

  function logout() {
    fetch(`${apiURL}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((data) => {
        const result = data.json();
        if (result) {
          window.location.reload();
          Navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="navbar bg-base-100 w-[90%] mx-auto">
      <div className="flex-1">
        <NavLink to="/">
          <img src="/images/LUXLIFERLOGO1.png" width="150px" alt="logo" />
        </NavLink>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">{TotalCartItems()}</span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">{TotalCartItems()} Items</span>
              <span className="text-info">Net Total: ${tAmount}</span>
              <div className="card-actions">
                <NavLink to="/cart" className="btn btn-primary btn-block">View cart</NavLink>
              </div>
            </div>
          </div>
        </div>
        {isLogin ? (
        <div className="dropdown dropdown-end ml-3">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/images/profile.png" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64"
          >
            <li>
              <a className="justify-start">
                <span className="font-bold">Hi,</span>{name.slice(0,6)}
              </a>
            </li>
            <li>
              <a>{email}</a>
            </li>
            <li>
              <a onClick={logout}>Logout</a>
            </li>
          </ul>
        </div>):""}
      </div>
    </div>
  );
}

export default Header;
