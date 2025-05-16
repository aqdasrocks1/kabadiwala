import React, { useState } from 'react';
import { createScrapRequest } from '../api';
import { useNavigate } from 'react-router-dom';

export default function ScrapRequestForm() {
  const [scrapType, setScrapType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!scrapType || !quantity) {
      setError('Scrap type and quantity are required');
      return;
    }
    try {
      await createScrapRequest({ scrapType, quantity, location });
      setSuccess('Scrap request created successfully');
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError('Failed to create scrap request');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: 50 }}>
      <h2>Create Scrap Request</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Scrap Type" value={scrapType}
          onChange={e => setScrapType(e.target.value)} required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          type="number" placeholder="Quantity (kg)" value={quantity}
          onChange={e => setQuantity(e.target.value)} required min="1"
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          placeholder="Location" value={location}
          onChange={e => setLocation(e.target.value)}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <button type="submit" style={{ width: '100%', padding: 10 }}>Submit Request</button>
      </form>
    </div>
  );
}
