import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  emptyCart,
  incrementQuantity,
  removeCartItem,
  totalAmount,
} from "../actions/action";

import {loadStripe} from '@stripe/stripe-js';
import toast from 'react-hot-toast';

import { NavLink, useNavigate } from "react-router-dom";

import {apiURL} from "../api/index";

function Cart() {
  const cart = useSelector((state) => state.AddToCart);

  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const LoadPage = async () => {
      try {
        const res = await fetch(`${apiURL}/cart`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const data = await res.json();
        setCity(data.city);
        setAddress(data.address);
        setName(data.name);
        setEmail(data.email);
      } catch (error) {
        Navigate("/login");
      }
    };
    LoadPage();
  }, [Navigate]);

  function NetTotal() {
    const Total = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    return Total;
  }

  function totalCartNumber() {
    const CartTotal = cart.reduce((total, item) => {
      return total + item.quantity;
    }, 0);
    return CartTotal;
  }

  const tAmount = NetTotal();

  // payment integration
  const makePayment = async()=>{
    const stripe = await loadStripe("pk_live_51KgaWKD6w6ECJGA2Pu7kA1UW3Yfkqj3pUwQAP3Ku2VOJJ8kYwasLgxgG1jYx2hUXGcXLRR1kTXyC9pYEA9m6Mr5i00g24KgPQb");

    const body = {
        products:cart
    }
    const headers = {
        "Content-Type":"application/json"
    }
    const response = await fetch(`${apiURL}/create-checkout-session`,{
        method:"POST",
        headers:headers,
        body:JSON.stringify(body)
    });

    const session = await response.json();

    const result = stripe.redirectToCheckout({
        sessionId:session.id
    });
    
    if(result.error){
        console.log(result.error);
    }
}

  return (
    <>
      <div className="font-primary overflow-hidden">
        <div className="pl-5 pt-14 pb-10 w-[90%] mx-auto flex justify-start items-center">
          Home <MdOutlineKeyboardArrowRight size="20" /> Cart
          <MdOutlineKeyboardArrowRight size="20" />
        </div>
        {/* table of cart */}
        <div className="flex justify-between md:w-[88%] md:flex-row flex-col mx-auto">
          <div className="md:w-[70%] w-[88%] md:mx-0 mx-auto overflow-scroll lg:overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-background text-gray-900">
                  <th className="py-2 px-4 font-semibold">Product</th>
                  <th className="py-2 px-4 font-semibold">Price</th>
                  <th className="py-2 px-4 font-semibold">Quantity</th>
                  <th className="py-2 px-4 font-semibold">Subtotal</th>
                  <th className="py-2 px-4 font-semibold"></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => {
                  return (
                    <tr key={product.id}>
                      <td className="py-2 px-4 font-bold text-primary lg:w-auto w-52 flex items-center">
                        <img width="30" src={product.image} alt="product" />
                        <span className="pl-2">{product.name}</span>
                      </td>
                      <td className="py-2 px-4">${product.price}</td>
                      <td className="py-2 px-4 flex">
                        <button
                          onClick={() => {
                            dispatch(decrementQuantity(product.id));
                            dispatch(totalAmount(product.id));
                          }}
                          className="bg-transparent text-black border px-2 border-gray-500"
                        >
                          -
                        </button>
                        <button className="cursor-auto bg-transparent text-black border px-4 border-gray-500">
                          {product.quantity}
                        </button>
                        <button
                          onClick={() => {
                            dispatch(incrementQuantity(product.id));
                            dispatch(totalAmount(product.id));
                          }}
                          className="bg-transparent text-black border px-2 border-gray-500"
                        >
                          +
                        </button>
                      </td>
                      <td className="py-2 px-4">
                        $
                        {product.quantity === 1 ? product.price : product.total}
                      </td>
                      <td className="py-2 px-4">
                        <button
                          onClick={() => {dispatch(removeCartItem(product.id))
                            toast.success("Item Removed From Cart Successfully")
                          
                          }}
                        >
                          <AiOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-between pt-10 pb-6">
              <NavLink
                to="/shop/category"
                className="bg-primary text-white px-6 py-4 rounded-2xl"
              >
                Continue Shopping
              </NavLink>
              <button
                onClick={() => {dispatch(emptyCart())
                  toast.error("Your Cart is Empty!")
                
                }}
                className="bg-transparent border border-blue-400 text-blue-600 px-6 py-4 rounded-2xl"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* order summary */}
          <div className="pb-3 mb-5 right-0 top-0 flex justify-around items-start bg-white">
            <div className="flex flex-col pb-3 px-6 border border-gray-300 ">
              <h1 className="text-center bg-background p-2 font-bold">Order Details</h1>
              <div className="flex justify-between py-5 font-semibold">
                <span>Sub Total</span>
                <span>${NetTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold py-5">
                <span>Tax</span>
                <span>0</span>
              </div>
              
              <div className="flex justify-between py-5 font-normal">
                <span>Total Amount</span>
                <span className="pl-1">
                  ${NetTotal() === 0 ? NetTotal().toFixed(2) : NetTotal().toFixed(2)}
                </span>
              </div>
              <button onClick={makePayment} className={`text-white ${tAmount===0?"bg-gray-400":"bg-primary"} p-2 rounded-sm w-full`}>
                Pay ${tAmount === 0 ? 0 : tAmount.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
