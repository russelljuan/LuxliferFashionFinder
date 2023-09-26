import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Product from "../components/Product";
import { useParams } from "react-router-dom";

function Shop(props) {
  const params = useParams();
  const [selectedValue, setSelectedValue] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (
      params.category === "category" ||
      params.category === "All Categories"
    ) {
      setSelectedValue("All Categories");
      setProducts(props.products);
    } else {
      const filterItems = props.products.filter((item) => {
        return item.category === params.category;
      });
      setProducts(filterItems);
      setSelectedValue(params.category);
    }
  }, [params.category, props.products, props.category]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    setSelectedValue(value === selectedValue ? null : value);

    const filterItems = props.products.filter((item) => {
      if (value === "All Categories") {
        return item;
      } else {
        return item.category === value;
      }
    });
    setProducts(filterItems);
  };

  const getNumItemsInCategory = (categoryTitle) => {
    if (categoryTitle === "All Categories") {
      return props.products.length;
    }
    return props.products.filter((item) => item.category === categoryTitle)
      .length;
  };

  return (
    <div className="font-primary">
      <div className="w-[88%] mx-auto flex justify-start items-center my-10 bg-slate-10 py-5">
        Home <MdOutlineKeyboardArrowRight size="20" /> Shop
        <MdOutlineKeyboardArrowRight size="20" />
      </div>
      <div className="w-[88%] flex mb-10 items-center md:justify-between justify-center md:flex-row flex-col md:items-start mx-auto">
        <div className="flex justify-center flex-col items-center">
          <div className="flex flex-col justify-center items-start">
            {props.categories.map((category) => {
              return (
                <div
                  key={category.title}
                  className="flex py-2 justify-between w-52 items-center"
                >
                  <div>
                    <input
                      type="checkbox"
                      className="form-checkbox mr-2"
                      value={category.title}
                      checked={selectedValue === category.title}
                      onChange={handleCheckboxChange}
                    />
                    {category.title}
                  </div>
                  <div>{getNumItemsInCategory(category.title)}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-wrap md:ml-36 md:justify-between justify-center md:mt-0 mt-6">
          {products.map((product) => {
            return (
              <div key={product._id} className="mx-2">
                <Product product={product} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Shop;