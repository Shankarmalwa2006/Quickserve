
import React, { useEffect, useState } from "react";

import ProviderLayout from "../../Components/provider/ProviderLayout";

import "./ProviderServices.css";

const AddService = ({ onLogout }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("quickserve-token");

        const response = await fetch(
          "http://localhost:5000/api/provider/services",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Failed to fetch services");
        }

        setServices(result.services);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (serviceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) return;

    try {
      setDeletingId(serviceId);

      const token = localStorage.getItem("quickserve-token");

      const response = await fetch(
        `http://localhost:5000/api/provider/services/${serviceId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to delete service");
      }

      setServices((prev) =>
        prev.filter((service) => service.id !== serviceId)
      );

      alert("Service deleted successfully!");

    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <ProviderLayout onLogout={onLogout}>
      <div className="my-services-page">

        <h1>My Services</h1>

        <p>Manage all the services you provide on QuickServe.</p>

        {loading ? (
          <h2>Loading your services...</h2>
        ) : error ? (
          <p>{error}</p>
        ) : services.length === 0 ? (
          <p>You haven't added any services yet.</p>
        ) : (

          <div className="services-grid">

            {services.map((service) => (
              <div className="service-card" key={service.id}>

                <h3>{service.service_name}</h3>

                <p>{service.description}</p>

                <p>Category: {service.category}</p>

                <h4>₹{service.price}</h4>

                <p>Area: {service.service_area}</p>

                <p>Status: {service.status}</p>

                <button
                  onClick={() => handleDelete(service.id)}
                  disabled={deletingId === service.id}
                >
                  {deletingId === service.id
                    ? "Deleting..."
                    : "Delete Service"}
                </button>

              </div>
            ))}

          </div>
        )}

      </div>

    </ProviderLayout>
  );
};

export default AddService;
