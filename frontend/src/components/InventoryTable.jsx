import axios from "axios";
import React, { useEffect, useState } from "react";
import StockModal from "./StockModal";
import { useNavigate } from "react-router-dom";

const InventoryTable = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openStockModal, setOpenStockModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("authToken")}`,
  };

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("authToken");

  const requireAuth = (callback) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    callback();
  };

  const fetchInventoryData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/inventory");
      console.log(response.data);
      setInventory(response.data);
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/removeProduct/${productId}`,
        { headers }
      );
      alert(response.data.message);
      fetchInventoryData();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchInventoryData();
  }, []);

  const filteredInventory = inventory.filter((item) => {
    if (!item.product) return false;

    const search = searchTerm.toLowerCase();

    return (
      item.product.productName.toLowerCase().includes(search) ||
      item.product.casNumber.toLowerCase().includes(search)
    );
  });

  if (loading) {
    return <p className="text-center text-gray-500">Loading inventory...</p>;
  }

  return (
    <>
      <div className="flex flex-col sm:Flex-row justify-between items-center mb-4 gap-3">
        <input
          type="text"
          placeholder="Search by product name or CAS number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-[40%] sm:max px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-4 py-3 text-center">Sr No.</th>
              <th className="px-4 py-3 text-center">Product Name</th>
              <th className="px-4 py-3 text-center">CAS No</th>
              <th className="px-4 py-3 text-center">Unit</th>
              <th className="px-4 py-3 text-center">Stock Qty</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredInventory.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  {inventory.length === 0
                    ? "No Product available inside the inventory. <br /> Add Products in the inventory"
                    : "No Matching products found"}
                </td>
              </tr>
            ) : (
              filteredInventory.map((item, key) => (
                <tr key={item._id}>
                  <td className="px-4 py-3 text-center">{key + 1}</td>
                  <td className="px-4 py-3 font-medium text-center">
                    {item.product?.productName}
                  </td>
                  <td className="px-4 py-3 text-gray-600 text-center">
                    {item.product?.casNumber}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {item.product?.unit}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-semibold">
                        {item.stockQuantity}
                      </span>

                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          item.stockQuantity === 0
                            ? "bg-gray-200 text-gray-700"
                            : item.stockQuantity < 10
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {item.stockQuantity === 0
                          ? "Out of Stock"
                          : item.stockQuantity < 10
                          ? "Low Stock"
                          : "In Stock"}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center space-x-2">
                    <>
                      <button
                        onClick={() =>
                          requireAuth(() => {
                            setSelectedProductId(item.product._id);
                            setOpenStockModal(true);
                          })
                        }
                        className="px-3 py-1 text-xs rounded border border-blue-500 text-blue-600 hover:bg-blue-50"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          requireAuth(() => handleDelete(item.product._id))
                        }
                        className="px-3 py-1 text-xs rounded border border-red-500 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <StockModal
        isOpen={openStockModal}
        onClose={() => setOpenStockModal(false)}
        productId={selectedProductId}
        onUpdated={fetchInventoryData}
      />
    </>
  );
};

export default InventoryTable;
