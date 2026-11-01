
import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  ClipboardList,
  CheckCircle2,
  Hourglass,
  XCircle,
  ArrowRight,
  Wrench,
} from "lucide-react";
import "./BookingHistory.css";

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("quickserve-token");

        const response = await fetch(
          "http://localhost:5000/api/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch bookings");
        }

        setBookings(result.bookings || []);
      } catch (err) {
        console.error("History error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const getStatus = (status) => {
    const value = (status || "Pending").toLowerCase();

    if (value === "completed") {
      return {
        className: "completed",
        icon: <CheckCircle2 size={15} />,
        label: "Completed",
      };
    }

    if (value === "confirmed") {
      return {
        className: "confirmed",
        icon: <CheckCircle2 size={15} />,
        label: "Confirmed",
      };
    }

    if (value === "cancelled") {
      return {
        className: "cancelled",
        icon: <XCircle size={15} />,
        label: "Cancelled",
      };
    }

    return {
      className: "pending",
      icon: <Hourglass size={15} />,
      label: "Pending",
    };
  };

  const formatDate = (date) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(
      String(date).slice(0, 10) + "T00:00:00"
    );

    if (Number.isNaN(parsedDate.getTime())) {
      return String(date);
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(
    (b) => (b.status || "Pending").toLowerCase() === "pending"
  ).length;
  const completedBookings = bookings.filter(
    (b) => (b.status || "").toLowerCase() === "completed"
  ).length;

  if (loading) {
    return (
      <div className="booking-history-page">
        <div className="history-loading">
          <div className="history-spinner"></div>
          <p>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="booking-history-page">
        <div className="history-message">
          <XCircle size={38} />
          <h2>Unable to load bookings</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-history-page">
      <div className="history-container">

        {/* PAGE HEADER */}
        <div className="history-header">
          <div>
            <span className="history-eyebrow">
              YOUR ACTIVITY
            </span>
            <h1>My Bookings</h1>
            <p>
              Keep track of your services and booking updates.
            </p>
          </div>

          <div className="history-header-icon">
            <ClipboardList size={30} />
          </div>
        </div>

        {/* STATISTICS */}
        <div className="history-stats">

          <div className="history-stat-card">
            <div className="stat-icon blue">
              <ClipboardList size={22} />
            </div>
            <div>
              <span>Total Bookings</span>
              <h2>{totalBookings}</h2>
            </div>
          </div>

          <div className="history-stat-card">
            <div className="stat-icon orange">
              <Hourglass size={22} />
            </div>
            <div>
              <span>Pending</span>
              <h2>{pendingBookings}</h2>
            </div>
          </div>

          <div className="history-stat-card">
            <div className="stat-icon green">
              <CheckCircle2 size={22} />
            </div>
            <div>
              <span>Completed</span>
              <h2>{completedBookings}</h2>
            </div>
          </div>

        </div>

        {/* BOOKING LIST */}
        <div className="history-section-heading">
          <div>
            <h2>Recent Bookings</h2>
            <p>Your service booking records</p>
          </div>

          <span className="booking-count">
            {totalBookings} {totalBookings === 1 ? "Booking" : "Bookings"}
          </span>
        </div>

        {bookings.length === 0 ? (
          <div className="history-empty">
            <div className="empty-icon">
              <Wrench size={35} />
            </div>
            <h2>No bookings yet</h2>
            <p>
              You haven't booked any services yet.
              Explore our services and book your first appointment!
            </p>
            <button onClick={() => window.location.href = "/services"}>
              Explore Services <ArrowRight size={17} />
            </button>
          </div>
        ) : (
          <div className="history-booking-list">
            {bookings.map((booking) => {
              const status = getStatus(booking.status);

              return (
                <div className="history-booking-card" key={booking.id}>

                  <div className="booking-card-top">
                    <div className="booking-service-info">
                      <div className="service-icon">
                        <Wrench size={23} />
                      </div>

                      <div>
                        <h3>{booking.service_name}</h3>
                        <span>Booking ID: #{booking.id}</span>
                      </div>
                    </div>

                    <span className={`booking-status ${status.className}`}>
                      {status.icon}
                      {status.label}
                    </span>
                  </div>

                  <div className="booking-card-details">

                    <div className="booking-detail">
                      <CalendarDays size={18} />
                      <div>
                        <span>Booking Date</span>
                        <p>{formatDate(booking.booking_date)}</p>
                      </div>
                    </div>

                    <div className="booking-detail">
                      <Clock3 size={18} />
                      <div>
                        <span>Booking Time</span>
                        <p>{booking.booking_time || "Not specified"}</p>
                      </div>
                    </div>

                    <div className="booking-detail">
                      <Phone size={18} />
                      <div>
                        <span>Contact Number</span>
                        <p>{booking.phone}</p>
                      </div>
                    </div>

                    <div className="booking-detail address-detail">
                      <MapPin size={18} />
                      <div>
                        <span>Service Address</span>
                        <p>{booking.address}</p>
                      </div>
                    </div>

                  </div>

                  <div className="booking-card-footer">
                    <span>
                      Customer: <strong>{booking.customer_name}</strong>
                    </span>
                    <span className="booking-reference">
                      QuickServe Booking
                    </span>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default BookingHistory;
