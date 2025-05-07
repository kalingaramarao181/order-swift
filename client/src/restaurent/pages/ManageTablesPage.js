import React, { useState } from "react";
import "../styles/TablesPage.css";

const TablesPage = () => {
  const [tables, setTables] = useState([
    { id: 1, name: "Table 1", seats: 4, isBooked: false },
    { id: 2, name: "Table 2", seats: 6, isBooked: true },
  ]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [newTableName, setNewTableName] = useState("");
  const [newSeats, setNewSeats] = useState(1);

  const addTable = () => {
    const newTable = {
      id: Date.now(),
      name: newTableName,
      seats: newSeats,
      isBooked: false,
    };
    setTables([...tables, newTable]);
    setNewTableName("");
    setNewSeats(1);
  };

  const bookTable = (id) => {
    setTables(tables.map(table =>
      table.id === id ? { ...table, isBooked: true } : table
    ));
  };

  return (
    <div className="order-swift-tables-container">
      <h2 className="order-swift-title">Manage Tables</h2>

      <div className="order-swift-add-table-form">
        <input
          type="text"
          placeholder="Table Name"
          value={newTableName}
          onChange={(e) => setNewTableName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Seats"
          value={newSeats}
          onChange={(e) => setNewSeats(Number(e.target.value))}
          min={1}
        />
        <button onClick={addTable}>Add Table</button>
      </div>

      <div className="order-swift-table-grid">
        {tables.map((table) => (
          <div
            key={table.id}
            className={`order-swift-table-card ${table.isBooked ? "booked" : ""}`}
            onClick={() => setSelectedTable(table)}
          >
            <h4>{table.name}</h4>
            <p>Seats: {table.seats}</p>
            <p>Status: {table.isBooked ? "Booked" : "Available"}</p>
            {!table.isBooked && (
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
