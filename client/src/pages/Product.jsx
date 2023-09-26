import React, { useEffect, useState } from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
  AiOutlineCheck,
} from "react-icons/ai";

import { useParams } from "react-router-dom";
import toast from 'react-hot-toast';

import { MdOutlineKeyboardArrowRight, MdShoppingBasket } from "react-icons/md";

import { apiURL } from "../api/index";
import { useDispatch } from "react-redux";
import { addToCart} from "../actions/action";

function Product() {
  const params = useParams();
  const [productData, setProductData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    async function getProduct() {
      const singleProduct = await fetch(`${apiURL}/products/${params.id}`);
      const product = await singleProduct.json();
      setProductData(product);
    }
    getProduct();
  }, [params.id]);

  return (
    <>
      <div className="pl-5 pt-8 pb-5 w-[90%] mx-auto flex justify-start items-center">
        Home <MdOutlineKeyboardArrowRight size="20" /> Product
        <MdOutlineKeyboardArrowRight size="20" />
      </div>
      {productData.map((product) => {
        return (
          <div
            key={product._id}
            className="flex md:flex-row flex-col justify-around items-center md:items-start mx-auto md:w-[40%] w-[88%] my-10"
          >
            <div className="border border-black-400 rounded-2xl mt-1 mr-5">
              <img src={product.media.url} alt="Product" width="450px" height="500px"/>
            </div>
            <div className="w-[350px] text-center md:text-left mt-8 md:mt-0">
              <h1 className="text-3xl font-bold mb-2 text-primary">
                {product.title}
              </h1>
              <span className="text-gray-700 mb-2 font-bold text-2xl">
                ${product.price}
              </span>
              <p className="text-gray-600 my-5">{product.description}</p>
              <div className="flex justify-center md:justify-start items-center w-72 mb-5">
                <span className="font-semibold text-lg pr-2">
                  Availability:
                </span>
                <AiOutlineCheck color="green" />
                <span className="text-green-600 text-lg font-normal pl-2">
                  In Stock
                </span>
              </div>
              <button
                onClick={() =>{
                  dispatch(
                    addToCart({
                      id: product._id,
                      category: product.category,
                      name: product.title,
                      price: product.price,
                      image: product.media.url,
                      quantity: product.quantity,
                    })
                  )
                  toast.success("Item Added To Cart Successfully")
                }}
                className="bg-primary text-white py-4 px-2 rounded-xl mr-2 w-full text-lg flex justify-center items-center"
              >
                <span>Add to Cart</span> <MdShoppingBasket size="20" className="ml-2"/>
              </button>
             
              <hr className="mt-4" />
              <div className="mt-4 flex justify-center md:justify-start items-center w-72 mb-5 ">
                <span className="font-semibold text-lg pr-2">Category:</span>
                <span className="text-green-600 text-lg font-normal pl-2">
                  {product.category}
                </span>
              </div>
              <div className="mt-4 flex justify-center md:justify-start items-center w-72 mb-5">
                <span className="font-semibold text-lg pr-2">Share:</span>
                <div className="flex justify-center items-center">
                  <AiFillFacebook size="25" color="blue" />
                  <AiFillInstagram size="25" color="red" />
                  <AiFillTwitterCircle size="25" color="blue" />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Product;