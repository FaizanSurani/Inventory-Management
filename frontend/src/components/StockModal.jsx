import axios from "axios";
import React, { useState } from "react";

const StockModal = ({ isOpen, onClose, productId, onUpdated }) => {
  const [stockQty, setStockQty] = useState();
  const [action, setAction] = useState("Increase");

  if (!isOpen) return null;

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };

  const handleQtyChange = (e) => {
  const value = Number(e.target.value);

  if (value < 1) return;   // 🚫 block invalid values
  setStockQty(value);
};


  const updateStock = async(e) => {
    e.preventDefault();

    if (stockQty <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    try {
        const res = await axios.patch(
        `http://localhost:5000/api/stockQty/${productId}`,
        { stockQty: Number(stockQty), action },
        { headers }
      );

      alert(res.data.message);
      onUpdated();
      onClose();
    } catch (error) {
        alert(error.response?.data?.message || error.message);
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
          <form className="space-y-4" onSubmit={updateStock}>
            <h2 className="text-xl font-semibold mb-4">Update Stock</h2>

            <div className="space-y-4">
              <input
                name="stockQty"
                min={1}
                type="number"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Stock Qty"
                onChange={handleQtyChange}
                required
                step={1}
                value={stockQty}
                />
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              >
                <option value="Increase">Increase</option>
                <option value="Decrease">Decrease</option>
              </select>
              <button className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 duration-100 ease-in-out">
                Update Stock
              </button>
              <button onClick={onClose} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 duration-100 ease-in-out">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StockModal;
