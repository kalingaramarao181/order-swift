import React from 'react';
import './index.css';

const PrintableBill = ({ restaurantName, billNumber, items, discount, date }) => {
  const getTotal = () => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return subtotal - (discount || 0);
  };

  return (
    <div className="os-print-bill-container">
      <div className="os-bill-header">
        <h2>{restaurantName || 'Order Swift Restaurant'}</h2>
        <p className="os-bill-subheader">Customer Bill</p>
        <p>Bill No: <strong>{billNumber}</strong></p>
        <p>Date: <strong>{date || new Date().toLocaleDateString()}</strong></p>
      </div>

      <table className="os-bill-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Code</th>
            <th>Qty</th>
            <th>Plates</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td>{item.code}</td>
              <td>{item.quantity || 1}</td>
              <td>{item.plates || 1}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="os-bill-summary">
        <div>
          <p>Subtotal: ${items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0).toFixed(2)}</p>
          <p>Discount: ${discount?.toFixed(2) || '0.00'}</p>
          <h3>Total: ${getTotal().toFixed(2)}</h3>
        </div>
      </div>

      <p className="os-thank-you-msg">Thank you for dining with us!</p>
    </div>
  );
};

export default PrintableBill;
