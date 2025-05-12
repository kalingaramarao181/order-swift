import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { FiArrowLeft } from "react-icons/fi";
import PrintableBill from "../../components/printBill";
import { useLocation, useNavigate } from "react-router-dom";
import { getBillMenuItems } from "../../api/menuItemApi";
import { getRestaurantDetails } from "../../api/restaurentApi";
import { toPng } from "html-to-image";
import download from "downloadjs";

const OrderSwiftBilling = () => {
  const [items, setItems] = useState([]);
  const [itemDatabase, setItemDatabase] = useState({});
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [tables, setTables] = useState([]);
  const [billingInfo, setBillingInfo] = useState({
    guestName: "",
    mobileNumber: "",
    waiterId: "",
    discount: "",
    discountCash: 0,
    tip: "",
    tableId: "",
  });

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
  const printableRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = location.state?.from || "/dashboard/billing";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBillMenuItems(3);
        const restarentData = await getRestaurantDetails(3);
        setTables(restarentData.tables);
        setRestaurantDetails(restarentData);
        setItemDatabase(response);
      } catch (error) {
        console.error("Error fetching item database:", error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setBillingInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCodeChange = (e) => {
    const code = e.target.value.trim();
    setCurrentItem((prev) => ({ ...prev, code }));

    if (itemDatabase.hasOwnProperty(code)) {
      const found = itemDatabase[code];
      const qty = parseInt(currentItem.qty) || 1;
      const amount = found.rate * qty;

      setCurrentItem((prev) => ({
        ...prev,
        name: found.name,
        unit: found.unit,
        rate: found.rate,
        amount,
      }));
    } else {
      setCurrentItem((prev) => ({
        ...prev,
        name: "",
        unit: "PLATE",
        rate: "",
        amount: "",
      }));
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (!currentItem.name) {
        alert("Invalid code. Please enter a valid item code.");
        return;
      }

      const newItem = { ...currentItem };
      const newItems = [...items, newItem];
      const newSubtotal = newItems.reduce((acc, i) => acc + i.amount, 0);
      const newTax = (newSubtotal * 0.05).toFixed(2);
      const discountPercentage = parseFloat(billingInfo.discount) || 0;
      const discountCash = ((newSubtotal + parseFloat(newTax)) * discountPercentage) / 100;

      setBillingInfo((prev) => ({
        ...prev,
        discountCash: discountCash.toFixed(2),
      }));

      setItems(newItems);
      setTotals({
        ...totals,
        subtotal: newSubtotal,
        tax: parseFloat(newTax),
      });

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
  const createBillNumber = (restaurant = {}, items = []) => {
    const date = new Date().toISOString().split("T")[0].replace(/-/g, "");
  
    const restaurantName = restaurant.name || "RST";
    const restaurantShortName = restaurantName
      .split(" ")
      .map((word) => word[0]?.toUpperCase() || "")
      .join("");
  
    const billId = items.length + 1;
    return `${restaurantShortName}-${date}-${billId}`;
  };

  const calculateTotal = () => {
    const subtotal = totals.subtotal;
    const tax = parseFloat(totals.tax) || 0;
    const discountCash = parseFloat(billingInfo.discountCash) || 0;
    const tip = parseFloat(billingInfo.tip) || 0;
    return (subtotal + tax + tip - discountCash).toFixed(2);
  };

  const onChangeDiscount = (e) => {
    const discount = e.target.value;
    const discountCash = (totals.subtotal * discount) / 100;
    setBillingInfo((prev) => ({
      ...prev,
      discountCash,
      discount,
    }));
  };

  const handlePrint = async () => {
    if (printableRef.current) {
      const dataUrl = await toPng(printableRef.current);
      download(dataUrl, "order-bill.png");
    }
  };

  return (
    <div className="order-swift-billing-container">
      <div onClick={() => navigate(previousPath)} className="order-swift-back-btn">
        <FiArrowLeft /> Back
      </div>

      <div className="order-swift-header-inputs">
        <input
          onChange={(e) => handleInputChange("guestName", e.target.value)}
          value={billingInfo.guestName}
          placeholder="Guest Name"
        />
        <input
          onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
          value={billingInfo.mobileNumber}
          placeholder="Mobile #"
        />
        <select onChange={(e) => handleInputChange("tableId", e.target.value)} value={billingInfo.tableId}>
          <option>Select Table</option>
          {tables.map((table) => (
            <option key={table.tableId} value={table.tableId}>
              T{table.tableId} ({table.seats} seats)
            </option>
          ))}
        </select>
        <select onChange={(e) => handleInputChange("waiterId", e.target.value)} value={billingInfo.waiterId}>
          <option>Select Waiter</option>
          <option value="Waiter 1">Waiter 1</option>
          <option value="Waiter 2">Waiter 2</option>
          <option value="Waiter 3">Waiter 3</option>
        </select>
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
        <input placeholder="SubTotal" value={totals.subtotal.toFixed(2)} readOnly />
        <input placeholder="Total Tax" value={totals.tax} readOnly />
        <input onChange={onChangeDiscount} value={billingInfo.discount} placeholder="Discount in %" />
        <input onChange={(e) => handleInputChange("tip", e.target.value)} value={billingInfo.tip} placeholder="Tip" />
      </div>

      <div className="order-swift-total">
        <strong>Total: ₹{calculateTotal()}</strong>
        <span className="order-swift-refund">You Save ₹{billingInfo.discountCash}</span>
      </div>

      <div className="order-swift-btns">
        <button className="order-swift-btn" onClick={handlePrint}>
          Print
        </button>
        <button onClick={() => setOpenPrintView(true)} className="order-swift-btn">
          Pre Bill
        </button>
      </div>

      <div style={{marginTop: "200px"}}>
        <div ref={printableRef}>
          <PrintableBill
            restaurantName={restaurantDetails.name || "Order Swift Restaurant"}
            billNumber={createBillNumber(restaurantDetails, items) || "123"}
            guestName={billingInfo.guestName || "Guest"}
            tip={billingInfo.tip || 0}
            totalBill={totals.subtotal.toFixed(2) || 0}
            tax={totals.tax || 0}
            mobileNumber={billingInfo.mobileNumber || ""}
            waiterId={billingInfo.waiterId || "Waiter 1"}
            tableId={billingInfo.tableId || "T1"}
            date={new Date().toLocaleDateString()}
            discount={billingInfo.discountCash || 0}
            items={items.map((item) => ({
              name: item.name,
              code: item.code,
              quantity: item.qty,
              plates: 1,
              price: item.rate,
            }))}
          />
        </div>
      </div>

      {openPrintView && (
        <div style={{ marginTop: "20px" }}>
          <PrintableBill
            restaurantName={restaurantDetails.name || "Order Swift Restaurant"}
            billNumber={createBillNumber(restaurantDetails) || "123"}
            guestName={billingInfo.guestName || "Guest"}
            tip={billingInfo.tip || 0}
            totalBill={totals.subtotal.toFixed(2) || 0}
            tax={totals.tax || 0}
            mobileNumber={billingInfo.mobileNumber || ""}
            waiterId={billingInfo.waiterId || "Waiter 1"}
            tableId={billingInfo.tableId || "T1"}
            date={new Date().toLocaleDateString()}
            discount={billingInfo.discountCash || 0}
            items={items.map((item) => ({
              name: item.name,
              code: item.code,
              quantity: item.qty,
              plates: 1,
              price: item.rate,
            }))}
          />
        </div>
      )}
    </div>
  );
};

export default OrderSwiftBilling;
