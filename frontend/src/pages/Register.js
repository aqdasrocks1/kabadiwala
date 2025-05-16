import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../api';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await register(formData);
      setSuccess('Registered successfully. You can login now.');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error occurred');
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', paddingTop: 50 }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="name" placeholder="Name" value={formData.name} onChange={handleChange} required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          name="email" placeholder="Email" value={formData.email} onChange={handleChange} required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange}
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <input
          type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required
          style={{ width: '100%', padding: 8, marginBottom: 10 }}
        />
        <select name="role" value={formData.role} onChange={handleChange} style={{ width: '100%', padding: 8, marginBottom: 10 }}>
          <option value="user">User</option>
          <option value="dealer">Dealer</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" style={{ width: '100%', padding: 10 }}>Register</button>
      </form>
      <p>Already have an account? <Link to="/">Login here</Link></p>
    </div>
  );
}
