import React from "react";
import { NavLink } from "react-router-dom";

function Category(props) {
  function getItemsByCategory(products, category) {
    if (category === "All Categories") {
      return props.products;
    }
    return products.filter((item) => item.category === category);
  }

  const itemsInCategory = getItemsByCategory(
    props.products,
    props.category.title
  );
  const numItemsInCategory = itemsInCategory.length;
  return (
    <NavLink to={`/shop/${props.category.title}`}>
      <button className={`mr-8 w-[200px] h-[80px] ml-2 ${props.category.id===3?"w-[240px]":""} ${props.category.id===2?"w-[300px]":""} ${props.category.title==="All Categories"?"bg-blue-50":"bg-blue-10"} rounded-lg outline-none border border-primary pl-8 pr-8 flex justify-center items-center pt-3 pb-3`}>
        <img
          className="pr-3 pl-3"
          src={props.category.img}
          width="70px"
          alt="battery"
        />
        <div className="flex flex-col justify-center items-center">
          <h3 className="pr-4">{props.category.title}</h3>
          <h5 className="pr-4">({numItemsInCategory} items)</h5>
        </div>
      </button>
    </NavLink>
  );
}

export default Category;