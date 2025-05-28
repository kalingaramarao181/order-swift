import React from "react";
import "../styles/RestaurantsPage.css";
import { FaRupeeSign } from "react-icons/fa";

const RestaurantsPage = ({ restaurants }) => {
    
  return (
    <div className="transactions-container">
      <h2 className="transactions-heading">💳 My Transactions</h2>

      {restaurants.length > 0 ? (
        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Restaurant Name</th>
                <th>Restaurant Owner</th>
                <th>Location</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant, idx) => (
                <tr key={restaurant.id}>
                  <td>{idx + 1}</td>
                  <td>{restaurant.name}</td>
                  <td>{restaurant.ownerName}</td>
                  <td>
                    <FaRupeeSign />
                    {restaurant.location}
                  </td>
                  <td>{restaurant.description}</td>
                  <td>
                    <button className="res-edit-button">Edit</button>
                    <button className="res-delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="transactions-empty">No Restaurants found.</p>
      )}
    </div>
  );
};

export default RestaurantsPage;
