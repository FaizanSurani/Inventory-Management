import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductModal from "./ProductModal";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem("authToken");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("id");
    navigate("/login");
  };

  const requireAuth = (callback) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    callback();
  };

  return (
    <>
      <nav className="bg-white border-b px-6 py-3 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Inventory Management</h1>

        <div className="space-x-4 flex items-center">
          <Link to={"/"} className="px-4 py-2 text-sm rounded">
            Home
          </Link>
          <button
            onClick={() => requireAuth(() => setOpenModal(true))}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Add Product
          </button>

          {!isAuthenticated ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Signup
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      <ProductModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};

export default Navbar;
