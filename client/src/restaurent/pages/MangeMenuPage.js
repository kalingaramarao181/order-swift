import React, { useState, useEffect } from "react";
import "../styles/MenuPage.css";
import { MdClose } from "react-icons/md";
import AddMenuItemForm from "../../forms/addMenuItemForm";
import { getCookiesData } from "../../utils/cookiesData";
import { getMenuItemById } from "../../api/menuItemApi";
import { baseUrl } from "../../config/env";

const ManageMenu = () => {
  const [isAddMenuItemOpen, setIsAddMenuItemOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const restaurantId = getCookiesData().userId;
        const data = await getMenuItemById(restaurantId);
        setMenuItems(data);
      } catch (error) {
        console.error("Error fetching menu items", error);
      }
    };
    fetchMenuItems();
  }, []);

  return (
    <div className="os-menu-container">
      <header className="os-menu-header">
        <h2 className="os-menu-title">Manage Menu</h2>
        <button
          className="os-add-item-btn"
          onClick={() => setIsAddMenuItemOpen(true)}
        >
          + Add New Item
        </button>
      </header>

      <table className="os-menu-table">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Item Id</th>
            <th>Price</th>
            <th>Available</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td className="os-menu-item"><img src={`${baseUrl}${item.image}`} alt={item.name} className="os-menu-item-image"/>{item.name}</td>
              <td>{item.id}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.available ? "Yes" : "No"}</td>
              <td>
                <button className="os-edit-btn">Edit</button>
                <button className="os-delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isAddMenuItemOpen && (
        <div className="login-popup-overlay">
          <div className="login-popup">
            <button
              className="order-login-close-button"
              onClick={() => setIsAddMenuItemOpen(false)}
            >
              <MdClose />
            </button>
            <div className="order-login-page">
              <AddMenuItemForm
                fullName={"Ramarao"}
                onClose={() => setIsAddMenuItemOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMenu;
