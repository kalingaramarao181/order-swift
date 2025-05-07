import React, { useState } from "react";
import "./index.css";
import { FiArrowLeft } from "react-icons/fi";
import PrintableBill from "../../components/printBill";
import { useLocation, useNavigate } from "react-router-dom";

const itemDatabase = {
  32: { name: "CHICKEN DHUM BIRYANI", unit: "PLATE", rate: 199 },
  12: { name: "SPECIAL DHUM BIRYANI", unit: "PLATE", rate: 249 },
  19: { name: "FRI PIECE BIRYANI", unit: "PLATE", rate: 199 },
  17: { name: "LOLLY POP BIRYANI", unit: "PLATE", rate: 219 },
  9: { name: "THANDI BIRYANI", unit: "PLATE", rate: 199 },
  10: { name: "FRIED RICE", unit: "PLATE", rate: 99 },
  11: { name: "SPECIAL FRIED RICE", unit: "PLATE", rate: 179 },
  13: { name: "LOLLY POP", unit: "PLATE", rate: 129 },
  14: { name: "THANDURI", unit: "PLATE", rate: 179 },
  15: { name: "CHICKEN 65", unit: "PLATE", rate: 129 },
  16: { name: "CHICKEN SPECIAL", unit: "PLATE", rate: 199 },
};

const OrderSwiftBilling = () => {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    code: "",
    name: "",
    qty: 1,
    unit: "PLATE",
    rate: "",
    amount: "",
  });


  const [totals, setTotals] = useState({
    subtotal: 0,
    tax: 0,
    discount: 0,
    tip: 0,
    received: "",
  });

  const [openPrintView, setOpenPrintView] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const previousPath = location.state?.from || '/dashboard/billing';

  const handleCodeChange = (e) => {
    const code = e.target.value;
    const found = itemDatabase[code];
    if (found) {
      const amount = found.rate * currentItem.qty;
      setCurrentItem({
        ...currentItem,
        code,
        name: found.name,
        unit: found.unit,
        rate: found.rate,
        amount,
      });
    } else {
      setCurrentItem({ ...currentItem, code });
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (!currentItem.code) {
        alert("Invalid code. Please enter a valid item code.");
        return;
      }
  
      setItems([...items, currentItem]);
  
      const newSubtotal = items.reduce(
        (acc, i) => acc + i.amount,
        currentItem.amount
      );
      const newTax = (newSubtotal * 0.05).toFixed(2);
  
      setTotals({ ...totals, subtotal: newSubtotal, tax: parseFloat(newTax) });
  
      setCurrentItem({
        code: "",
        name: "",
        qty: 1,
        unit: "PLATE",
        rate: "",
        amount: "",
      });
    }
  };
  

  return (
    <div className="order-swift-billing-container">
      <div onClick={() => navigate(previousPath)} className="order-swift-back-btn">
        <FiArrowLeft /> Back
      </div>

      <div className="order-swift-header-inputs">
        <input placeholder="Mobile #" />
        <input placeholder="Table #" />
        <input type="date" />
        <select>
          <option>Select Waiter</option>
        </select>
        <select>
          <option>Select Boy</option>
        </select>
        <input placeholder="Bill No." />
        <input placeholder="Guest Name" />
        <input placeholder="Address" />
      </div>

      <table className="order-swift-billing-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Qty</th>
            <th>Unit</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="order-swift-input-row">
            <td>#</td>
            <td>
              <input
                value={currentItem.code}
                onChange={handleCodeChange}
                onKeyDown={handleEnter}
              />
            </td>
            <td>{currentItem.name}</td>
            <td>{currentItem.qty}</td>
            <td>{currentItem.unit}</td>
            <td>{currentItem.rate}</td>
            <td>{currentItem.amount}</td>
          </tr>
          {items.map((item, idx) => (
            <tr key={idx}>
              <td>{idx + 1}</td>
              <td>{item.code}</td>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.unit}</td>
              <td>{item.rate}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="order-swift-summary">
        <input
          placeholder="SubTotal"
          value={totals.subtotal.toFixed(2)}
          readOnly
        />
        <input placeholder="Packing Charges" />
        <input placeholder="Total Tax" value={totals.tax} readOnly />
        <input placeholder="Discount" />
        <input placeholder="Tip" />
        <input placeholder="Amount Received" />
      </div>

      <div className="order-swift-total">
        <strong>
          Total: ₹{(totals.subtotal + parseFloat(totals.tax)).toFixed(2)}
        </strong>
        <span className="order-swift-refund">Refund to Customer ₹ 0.00</span>
      </div>

      <div className="order-swift-btns">
        <button onClick={() => setOpenPrintView(true)} className="order-swift-btn">Print</button>
        <button className="order-swift-btn">Pre Bill</button>
        <button className="order-swift-btn">Home Delivery</button>
      </div>
      {openPrintView && <PrintableBill
  restaurantName="Spicy Bite Restaurant"
  billNumber="SBR-20240503-01"
  date={new Date().toLocaleDateString()}
  discount={totals.discount}
  items={items.map((item) => ({
    name: item.name,
    code: item.code,
    quantity: item.qty,
    plates: 1,
    price: item.rate,
  }))}
/>}
    </div>
  );
};

export default OrderSwiftBilling;
