import React, { useRef } from "react";
import { FiChevronLeft,FiChevronRight } from "react-icons/fi";
import { NavLink } from "react-router-dom";

import Category from "../components/Category";
import Product from "../components/Product";
import Banner from "../components/Banner";

function Home(props) {
  const scrollCategories = useRef();
  
  return (
    <div className="font-primary">
      <Banner />
      {/* categories */}
      <div className="flex justify-center h-40 items-center w-[90%] mx-auto">
        <button
          onClick={() => scrollCategories.current.scrollBy(-200, 0)}
          className="hover:bg-slate-200 bg-slate-100 rounded-full p-2"
        >
          <FiChevronLeft size="20"/>
        </button>
        <div
          ref={scrollCategories}
          className="overflow-hidden flex justify-start items-center h-full scrollbar-hide whitespace-nowrap scroll-smooth"
        >
          {props.categories.map((category) => {
            return (
              <div key={category.id}>
                <Category category={category} products={props.products} />
              </div>
            );
          })}
        </div>
        <button
          onClick={() => scrollCategories.current.scrollBy(200, 0)}
          className="hover:bg-slate-200 bg-slate-100 rounded-full p-2"
        >
          <FiChevronRight size="20"/>
        </button>
      </div>
      {/* Products */}
      <div className="flex justify-between items-center pt-10 mx-auto w-[90%]">
        <h2 className="md:text-2xl text-lg text-primary">
          Our Cool Products
        </h2>
        <div className="md:block hidden">
          <NavLink
            to="/shop"
            className="mr-4 pt-3 pb-3 pl-6 pr-6 text-primary bg-blue-50 outline-none border rounded-full border-primary"
          >
            ALL
          </NavLink>
          <NavLink to="/shop/Hoodies" className="home-navlink mr-4 pt-3 pb-3 pl-6 pr-6 text-primary bg-blue-10 hover:bg-blue-50 outline-none border rounded-full border-primary">
            Hoodies
          </NavLink>

          <NavLink to="/shop/Sneakers" className="home-navlink pt-3 pb-3 pl-6 pr-6 text-primary bg-blue-10 outline-none hover:bg-blue-50 border rounded-full border-primary">
            Sneakers
          </NavLink>
         
        </div>
      </div>
      <div className="flex justify-between flex-wrap h-full pt-10 pb-10 items-center w-[90%] mx-auto">
        {props.products.map((product) => {
          return (
            <div key={product._id}>
              <Product product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
