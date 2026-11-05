
import React, { useState } from "react";
import "./ProviderServices.css";
import ProviderLayout from "../../Components/provider/ProviderLayout";

const AddService = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    service_name: "",
    category: "",
    description: "",
    price: "",
    service_area: "",
    image: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("quickserve-token");

      const response = await fetch(
        "http://localhost:5000/api/provider/services",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to add service");
      }

      setMessage("Service added successfully!");

      setFormData({
        service_name: "",
        category: "",
        description: "",
        price: "",
        service_area: "",
        image: ""
      });

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
      <ProviderLayout onLogout={onLogout}>
    <div className="add-service-page">
      <h1>Add New Service</h1>
      <p>Showcase your services on QuickServe.</p>

      {message && <p>{message}</p>}

      <form className="add-service-form" onSubmit={handleSubmit}>
  <label>Service Name</label>
  <input
    name="service_name"
    placeholder="e.g. Professional Plumbing"
    value={formData.service_name}
    onChange={handleChange}
    required
  />

  <label>Category</label>
  <select
    name="category"
    value={formData.category}
    onChange={handleChange}
    required
  >
    <option value="">Select Category</option>
    <option value="Plumbing">Plumbing</option>
    <option value="Electrical">Electrical</option>
    <option value="Cleaning">Cleaning</option>
    <option value="AC Repair">AC Repair</option>
    <option value="Carpentry">Carpentry</option>
    <option value="Painting">Painting</option>
  </select>

  <label>Service Description</label>
  <textarea
    name="description"
    placeholder="Describe your service..."
    value={formData.description}
    onChange={handleChange}
    required
  />

  <label>Service Price (₹)</label>
  <input
    type="number"
    name="price"
    placeholder="Enter your price"
    min="0"
    step="0.01"
    value={formData.price}
    onChange={handleChange}
    required
  />

  <label>Available Area</label>
  <input
    name="service_area"
    placeholder="e.g. Andheri, Mumbai"
    value={formData.service_area}
    onChange={handleChange}
  />

  <label>Service Image URL (Optional)</label>
  <input
    name="image"
    placeholder="Paste image URL"
    value={formData.image}
    onChange={handleChange}
  />

  <button type="submit" disabled={loading}>
    {loading ? "Adding Service..." : "Add Service"}
  </button>
</form>
    </div>
    </ProviderLayout>
  );
};

export default AddService;
