import React, { useState, useEffect } from "react";
import "../styles/MenuPage.css";
import { MdClose } from "react-icons/md";
import AddMenuItemForm from "../../forms/addMenuItemForm";
import { getCookiesData } from "../../utils/cookiesData";
import { getMenuItemById, deleteMenuItem } from "../../api/menuItemApi";
import { baseUrl } from "../../config/env";

const ManageMenu = () => {
  const [isAddMenuItemOpen, setIsAddMenuItemOpen] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [editItemData, setEditItemData] = useState(null); 

  const fetchMenuItems = async () => {
    try {
      const restaurantId = getCookiesData().userId;
      const data = await getMenuItemById(restaurantId);
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items", error);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleDelete = async (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteMenuItem(itemId);
        fetchMenuItems();
      } catch (error) {
        alert("Failed to delete item.");
      }
    }
  };

  const handleEdit = (item) => {
    
    setEditItemData(item);
    setIsAddMenuItemOpen(true);
  };


  const handleCloseForm = () => {
    setIsAddMenuItemOpen(false);
    setEditItemData(null);
    fetchMenuItems();
  };

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
              <td className="os-menu-item">
                <img
                  src={`${baseUrl}${item.image}`}
                  alt={item.name}
                  className="os-menu-item-image"
                />
                {item.name}
              </td>
              <td>{item.id}</td>
              <td>₹{item.price.toFixed(2)}</td>
              <td>{item.available ? "Yes" : "No"}</td>
              <td>
                <button className="os-edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                <button className="os-delete-btn" onClick={() => handleDelete(item.id)}>Delete</button>
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
              onClick={handleCloseForm}
            >
              <MdClose />
            </button>
            <div className="order-login-page">
              <AddMenuItemForm
                onClose={handleCloseForm}
                editData={editItemData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageMenu;
