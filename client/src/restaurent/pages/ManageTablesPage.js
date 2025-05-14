import React, { useState, useEffect } from "react";
import "../styles/TablesPage.css";
import { createTable, getTablesByRestaurantId } from "../../api/tablesApi";

const TablesPage = () => {
  const [tables, setTables] = useState([]);
  const [tableData, setTableData] = useState({
    table_number: "",
    seats: 0,
    is_available: "",
    restaurant_id: 3
  });

  const [selectedTable, setSelectedTable] = useState(null);

  useEffect(() => {
    const fetchTables = async () => {
      const response = await getTablesByRestaurantId(3);
      setTables(response);

      console.log(response);
    };
    fetchTables();
  }, []);


  const addTable = async (e) => {
    e.preventDefault();
    try {
    const response = await createTable(tableData);
    setTables([...tables, response])  
    } 
    catch (error) {
      console.error("Error creating table:", error);
    }
    
  };

  const bookTable = (id) => {
    setTables(tables.map(table =>
      table.id === id ? { ...table, isBooked: true } : table
    ));
  };

  return (
    <div className="order-swift-tables-container">
      <h2 className="order-swift-title">Manage Tables</h2>

      <form onSubmit={addTable} className="order-swift-add-table-form">
        <input
          type="text"
          placeholder="Table Name"
          value={tableData.table_number}
          onChange={(e) => setTableData({ ...tableData, table_number: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Seats"
          value={tableData.seats}
          onChange={(e) => setTableData({ ...tableData, seats: e.target.value })}
          min={1}
          required
        />
        <button>Add Table</button>
      </form>

      <div className="order-swift-table-grid">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`order-swift-table-card ${table.is_available ? "booked" : ""}`}
            onClick={() => setSelectedTable(table)}
          >
            <h4>Tabele {table.table_number}</h4>
            <p>Seats: {table.seats}</p>
            <p>Status: {table.is_available ? "Booked" : "Available"}</p>
            {!table.is_available && (
              <button onClick={() => bookTable(table.id)}>Book Now</button>
            )}
          </div>
        ))}
      </div>

      {selectedTable && (
        <div className="order-swift-selected-table">
          <h3>{selectedTable.name} - Details</h3>
          <p>Seats: {selectedTable.seats}</p>
          <p>Status: {selectedTable.isBooked ? "Booked" : "Available"}</p>
        </div>
      )}
    </div>
  );
};

export default TablesPage;
