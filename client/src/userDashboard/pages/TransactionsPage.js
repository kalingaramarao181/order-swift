import React from "react";
import "../styles/TransactionsPage.css";
import { FaRupeeSign, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const TransactionsTable = ({ transactions }) => {
  return (
    <div className="transactions-container">
      <h2 className="transactions-heading">💳 My Transactions</h2>

      {transactions.length > 0 ? (
        <div className="transactions-table-wrapper">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Transaction Date</th>
                <th>Restaurant</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((txn, idx) => (
                <tr key={txn.id}>
                  <td>{idx + 1}</td>
                  <td>{txn.date}</td>
                  <td>{txn.restaurant}</td>
                  <td>
                    <FaRupeeSign />
                    {txn.amount}
                  </td>
                  <td>{txn.method}</td>
                  <td className={`transactions-status ${txn.status.toLowerCase()}`}>
                    {txn.status === "Success" ? (
                      <FaCheckCircle className="transactions-icon success" />
                    ) : (
                      <FaTimesCircle className="transactions-icon failed" />
                    )}
                    {txn.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="transactions-empty">No transactions found.</p>
      )}
    </div>
  );
};

export default TransactionsTable;
