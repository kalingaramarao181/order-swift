import React from 'react';
import './index.css';

const PrintableBill = ({
  restaurantName,
  billNumber,
  items,
  discount = 0,
  date,
  gaustName,
  mobileNumber,
  waiterId,
  tableId,
  tip = 0,
  tax = 0,
  totalBill = 0
}) => {
  const parsedDiscount = parseFloat(discount) || 0;
  const parsedTip = parseFloat(tip) || 0;
  const parsedTax = parseFloat(tax) || 0;
  const parsedTotalBill = parseFloat(totalBill) || 0;

  const getTotal = () => {
    return parsedTotalBill + parsedTax + parsedTip - parsedDiscount;
  };

  return (
    <div className="os-print-bill-container">
      <div className="os-bill-header">
        <h2>{restaurantName || 'Order Swift Restaurant'}</h2>
        <p className="os-bill-subheader">Customer Bill</p>
        <p>Bill No: <strong>{billNumber}</strong></p>
        <p>Date: <strong>{date || new Date().toLocaleDateString()}</strong></p>
        <p>table: <strong>{tableId}</strong> | waiter: <strong>{waiterId}</strong> | mobile: <strong>{mobileNumber}</strong></p>
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
              <td>${parseFloat(item.price).toFixed(2)}</td>
              <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="os-bill-summary">
        <div>
          <p>Subtotal: ${parsedTotalBill.toFixed(2)}</p>
          <p>Tip: ${parsedTip.toFixed(2)}</p>
          <p>Tax: ${parsedTax.toFixed(2)}</p>
          <p>Discount: ${parsedDiscount.toFixed(2)}</p>
          <h3>Total: ${getTotal().toFixed(2)}</h3>
        </div>
      </div>
      <p className="order-swift-discount-save">
        You Save ₹{parsedDiscount.toFixed(2)}
      </p>
      <p className="os-thank-you-msg">Thank you for dining with us!</p>
    </div>
  );
};

export default PrintableBill;
