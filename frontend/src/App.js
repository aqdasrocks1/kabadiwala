import React, { useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function App() {
  const [form, setForm] = useState({
    name: "", address: "", contact: "", scrapType: "", quantity: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(API, form);
      alert("? Pickup request submitted!");
    } catch (err) {
      console.error(err);
      alert("? Submission failed.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Kabadiwala - Request Scrap Pickup</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required /><br/>
        <input name="address" placeholder="Address" onChange={handleChange} required /><br/>
        <input name="contact" placeholder="Contact Number" onChange={handleChange} required /><br/>
        <input name="scrapType" placeholder="Scrap Type" onChange={handleChange} required /><br/>
        <input name="quantity" placeholder="Quantity" onChange={handleChange} required /><br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
