import React,{useState,useEffect} from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Cancel from "./pages/Cancel";
import Success from "./pages/Success";

import Dashboard from "./pages/Admin/Dashboard";

import { apiURL, categoriesData } from "./api/index";
import Header from './components/Header';
import Footer from './components/Footer';

import { useSelector } from "react-redux";
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const cart = useSelector((state) => state.AddToCart);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    setCategories(categoriesData);

    Promise.all([
      fetch(`${apiURL}/products`).then((response) => response.json()),
    ])
    .then(([productsData]) => {
      setProducts(productsData);
    })
    .catch((error) => console.error(error));
  }, []);
  
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route
            path="/"
            element={<Home products={products} categories={categories} />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/shop/:category"
            element={<Shop products={products} categories={categories} />}
          />
          <Route path="/product/:id" element={<Product/>} />
          <Route path="/cancel" element={<Cancel/>} />
          <Route path="/success" element={<Success/>} />

          {/* admin routes */}
          <Route path="/admin/dashboard/addnewproduct" element={<Dashboard/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
  );
}

export default App;
