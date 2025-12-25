import axios from "axios";
import React, { useState } from "react";

const ProductModal = ({isOpen, onClose}) => {
  const [formData, setFormData] = useState({
    productName: "",
    casNumber: "",
    unit: "",
  });

  if (!isOpen) return null;

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };

  const { productName, casNumber, unit } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addProduct = async(e) => {
    e.preventDefault();
    try {
        if(!productName || !casNumber || !unit) {
            alert("All fields are mandatory");
            return;
        }

        const response = await axios.post("http://localhost:5000/api/addProduct", {productName, casNumber, unit}, {headers});
        alert(response.data.message);
        onClose();
        setFormData({productName: "", casNumber: "", unit: ""})
        window.location.reload();
    } catch (error) {
        alert(error.response.data.message);
    }
  }
  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <form
         className="space-y-4"
          onSubmit={addProduct}
        >
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>

          <div className="space-y-4">
            <input
              name="productName"
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Product Name"
              onChange={handleChange}
              value={productName}
            />

            <input
              name="casNumber"
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="CAS Number"
              onChange={handleChange}
              value={casNumber}
            />

            <input
              name="unit"
              type="text"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Unit"
              onChange={handleChange}
              value={unit}
            />

            <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 duration-100 ease-in-out">
              Add Product
            </button>
          </div>
        </form>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
