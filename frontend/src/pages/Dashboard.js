import React, { useEffect, useState } from 'react';
import { getScrapRequests, clearToken } from '../api';
import { useNavigate, Link } from 'react-router-dom';

export default function Dashboard() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getScrapRequests();
        setRequests(res.data);
      } catch {
        setError('Failed to fetch scrap requests. Please login again.');
        clearToken();
        navigate('/');
      }
    }
    fetchData();
  }, [navigate]);

  return (
    <div style={{ maxWidth: 800, margin: 'auto', paddingTop: 20 }}>
      <h2>Scrap Requests</h2>
      <Link to="/request-scrap" style={{ marginBottom: 20, display: 'inline-block' }}>Create New Request</Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table border="1" cellPadding="8" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Scrap Type</th>
            <th>Quantity (kg)</th>
            <th>Location</th>
            <th>Status</th>
            <th>User</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(r => (
            <tr key={r._id}>
              <td>{r.scrapType}</td>
              <td>{r.quantity}</td>
              <td>{r.location}</td>
              <td>{r.status}</td>
              <td>{r.user?.name || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
