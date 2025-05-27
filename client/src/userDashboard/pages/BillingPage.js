import React from "react";
import "../styles/BillingPage.css";
import { FaRupeeSign, FaDownload } from "react-icons/fa";

const BillingTable = ({ bills }) => {
  return (
    <div className="billing-container">
      <h2 className="billing-heading">🧾 My Bills</h2>

      {bills.length > 0 ? (
        <div className="billing-table-wrapper">
          <table className="billing-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Bill Date</th>
                <th>Restaurant</th>
                <th>Amount</th>
                <th>Discount</th>
                <th>Final</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill, idx) => (
                <tr key={bill.id}>
                  <td>{idx + 1}</td>
                  <td>{bill.date}</td>
                  <td>{bill.restaurant}</td>
                  <td>
                    <FaRupeeSign />
                    {bill.totalAmount}
                  </td>
                  <td>{bill.discount}%</td>
                  <td>
                    <FaRupeeSign />
                    {bill.finalAmount}
                  </td>
                  <td>
                    <button className="billing-btn-download">
                      <FaDownload style={{ marginRight: "4px" }} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="billing-empty">No bills found.</p>
      )}
    </div>
  );
};

export default BillingTable;
