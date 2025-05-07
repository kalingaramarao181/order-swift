import React, { useState } from 'react';
import '../styles/BillingPage.css'
import { Link } from 'react-router-dom';

const initialBillingData = [
  { id: 'B001', customer: 'Alice', table: 'T1', date: '2025-05-01', amount: 42.5, status: 'Paid' },
  { id: 'B002', customer: 'Bob', table: 'T3', date: '2025-05-01', amount: 29.0, status: 'Unpaid' },
  { id: 'B003', customer: 'Charlie', table: 'T2', date: '2025-04-30', amount: 58.75, status: 'Refunded' },
  { id: 'B004', customer: 'David', table: 'T4', date: '2025-04-30', amount: 15.0, status: 'Paid' },
  { id: 'B005', customer: 'Eva', table: 'T1', date: '2025-04-29', amount: 37.2, status: 'Paid' },
];

const BillingPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filteredData = initialBillingData.filter(
    bill =>
      (bill.customer.toLowerCase().includes(search.toLowerCase()) ||
        bill.id.toLowerCase().includes(search.toLowerCase())) &&
      (statusFilter === '' || bill.status === statusFilter)
  );

  const totalRevenue = filteredData.reduce(
    (total, bill) => (bill.status === 'Paid' ? total + bill.amount : total),
    0
  );

  return (
    <div className="os-billing-container">
      <h2 className="os-page-name-title">Billing Records</h2>

      <div className="os-billing-controls">
        <input
          type="text"
          placeholder="Search by customer or ID"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="Paid">Paid</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Refunded">Refunded</option>
        </select>
        <Link className='os-billing-add-item-link' to="/billing"><button className='os-billing-add-item-btn'>Billing</button></Link>
      </div>

      <div className="os-billing-summary">
        <div>Total Bills: {filteredData.length}</div>
        <div>Total Revenue: ${totalRevenue.toFixed(2)}</div>
      </div>

      <table className="os-billing-table">
        <thead>
          <tr>
            <th>Bill ID</th>
            <th>Customer</th>
            <th>Table</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(bill => (
            <tr key={bill.id}>
              <td>{bill.id}</td>
              <td>{bill.customer}</td>
              <td>{bill.table}</td>
              <td>{bill.date}</td>
              <td>${bill.amount.toFixed(2)}</td>
              <td>
                <span className={`status-badge ${bill.status.toLowerCase()}`}>{bill.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillingPage;
