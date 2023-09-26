import React, { useState } from "react";
import { apiURL,categoriesData } from "../../api/index";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    file: null,
    price: "",
    description: ""
  });

  const [message, setMessage] = useState("");
  const [messageVisible, setMessageVisible] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("file", formData.file); // Ensure this matches the input name attribute
      formDataToSend.append("price", formData.price);
      formDataToSend.append("description", formData.description); // Add description

      const response = await fetch(`${apiURL}/createproduct`, {
        method: "POST",
        body: formDataToSend, // Use FormData
      });

      if (response.status === 200) {
        setMessage("Product added successfully!");
        setMessageVisible(true);

        setTimeout(() => {
          setMessageVisible(false);
        }, 5000);
      } else {
        setMessage("Failed to add product. Please try again.");
        setMessageVisible(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
      setMessageVisible(true);
    }
  };

  return (
    <div className="container mx-auto mt-8 mb-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow-lg" encType="multipart/form-data">
        <h2 className="text-xl font-semibold mb-4 w-full bg-primary text-center py-2 text-white">Add a New Product</h2>
        {messageVisible && (
          <div className="bg-green-200 text-green-700 p-2 rounded-md mb-4">
            {message}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title or Name
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select a category</option>
            {categoriesData.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="file">
            Upload Image
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="text-white px-4 py-2 rounded-full hover:bg-purple-900 bg-primary focus:outline-none focus:shadow-outline-blue w-full"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
