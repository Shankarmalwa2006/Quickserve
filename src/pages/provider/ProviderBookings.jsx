
import React, { useEffect, useState } from "react";
import ProviderLayout from "../../Components/provider/ProviderLayout";
import "./ProviderBookings.css";

const ProviderBookings = ({ onLogout }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH PROVIDER BOOKINGS
  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("quickserve-token");

      const response = await fetch(
        "http://localhost:5000/api/provider/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch bookings");
      }

      setBookings(data.bookings || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // UPDATE BOOKING STATUS
  const updateBookingStatus = async (bookingId, status) => {
    try {
      const token = localStorage.getItem("quickserve-token");

      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      await fetchBookings();
    } catch (err) {
      alert(err.message);
    }
  };

  // LOAD BOOKINGS ON PAGE MOUNT
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <ProviderLayout onLogout={onLogout}>
      <div className="provider-bookings-page">

        <div className="bookings-header">
          <div>
            <h1>My Bookings</h1>
            <p>Manage and track your customer bookings.</p>
          </div>

          <div className="booking-count">
            {bookings.length} Total Bookings
          </div>
        </div>

        {loading && <p>Loading your bookings...</p>}

        {error && <p className="booking-error">{error}</p>}

        {!loading && !error && bookings.length === 0 && (
          <div className="empty-bookings">
            <div className="empty-booking-icon">📅</div>
            <h3>No Bookings Yet</h3>
            <p>
              You haven't received any bookings yet.
              Once customers book your services, they will
              appear here.
            </p>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="bookings-list">
            {bookings.map((booking) => (
              <div className="booking-card" key={booking.id}>
                <h3>{booking.service_name}</h3>

                <p><strong>Customer:</strong> {booking.customer_name}</p>
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p><strong>Date:</strong> {booking.booking_date}</p>
                <p><strong>Time:</strong> {booking.booking_time}</p>
                <p><strong>Status:</strong> {booking.status}</p>

                <div className="booking-actions">

                  {booking.status === "Pending" && (
                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "Confirmed")
                      }
                    >
                      Accept Booking
                    </button>
                  )}

                  {booking.status === "Confirmed" && (
                    <button
                      onClick={() =>
                        updateBookingStatus(booking.id, "Completed")
                      }
                    >
                      Mark as Completed
                    </button>
                  )}

                  {booking.status === "Completed" && (
                    <span className="status-completed">
                      Completed
                    </span>
                  )}

                  {booking.status === "Cancelled" && (
                    <span className="status-cancelled">
                      Cancelled
                    </span>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </ProviderLayout>
  );
};

export default ProviderBookings;
