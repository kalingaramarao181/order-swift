import React from "react";
import "../styles/RestaurantsPage.css";

const UsersPage = ({ users }) => {
    
  return (
    <div className="transactions-container">
      <h2 className="transactions-heading">Users</h2>
      {users.length > 0 ? (
        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user.id}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
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
        <p className="transactions-empty">No Users found.</p>
      )}
    </div>
  );
};

export default UsersPage;
