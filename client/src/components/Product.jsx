import React from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineEye, AiOutlineShoppingCart } from "react-icons/ai";

import { useDispatch } from "react-redux";
import { addToCart} from "../actions/action";
import toast from 'react-hot-toast';

function Product(props) {
  const dispatch = useDispatch();

  return (
    <div className="lg:w-[450px] w-full relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-10">
      <NavLink
        to={`/product/${props.product._id}`}
        className="absolute right-5 top-5"
      >
        <button className="p-2 text-primary hover:bg-gray-200 bg-gray-100 outline-none border rounded-full">
          <AiOutlineEye color="black" size="20"/>
        </button>
      </NavLink>
      <NavLink to={`/product/${props.product._id}`}>
        
        <img
        width="100%"
        height="200px"
          src={props?.product?.media?.url}
          alt="Product Image"
        />
      </NavLink>
      <div className="px-5 pb-5">
        <NavLink to={`/product/${props.product._id}`}>
          <h5 className="text-xl pt-4 font-semibold tracking-tight text-gray-900 dark:text-white">
            {props.product.title}          
          </h5>
        </NavLink>
        <div className="pt-4 flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            ${props.product.price}
          </span>
          <button
            className="mr-0 py-2 pl-1.5 pr-2 text-primary hover:bg-gray-200 bg-gray-100 outline-none border rounded-full"
            
            onClick={() =>{
              dispatch(
                addToCart({
                  id: props.product._id,
                  category: props.product.category,
                  name: props.product.title,
                  price: props.product.price,
                  image: props.product.media.url,
                  quantity: props.product.quantity,
                })
              )
              toast.success("Item Added To Cart Successfully")
            }}
          >
            <AiOutlineShoppingCart size="25" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
