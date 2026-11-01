
import { Link } from "react-router-dom";
import {
  CalendarDays,
  ClipboardList,
  Search,
  ArrowRight,
} from "lucide-react";

function MyBookings() {
  return (
    <main className="my-bookings-page">
      <section className="my-bookings-header">
        <div>
          <span className="section-eyebrow">
            CUSTOMER DASHBOARD
          </span>

          <h1>My Bookings</h1>

          <p>
            Manage your service requests and keep track of your bookings.
          </p>
        </div>

        <Link to="/services" className="button button-primary">
          <Search size={18} />
          Explore Services
        </Link>
      </section>

      <section className="booking-summary">
        <div className="booking-summary-card">
          <CalendarDays size={23} />
          <div>
            <span>Total Bookings</span>
            <h2>0</h2>
          </div>
        </div>

        <div className="booking-summary-card">
          <ClipboardList size={23} />
          <div>
            <span>Active Bookings</span>
            <h2>0</h2>
          </div>
        </div>

        <div className="booking-summary-card">
          <CalendarDays size={23} />
          <div>
            <span>Completed</span>
            <h2>0</h2>
          </div>
        </div>
      </section>

      <section className="bookings-content">
        <div className="bookings-section-heading">
          <h2>Recent Bookings</h2>
          <span>All your service requests in one place</span>
        </div>

        <div className="bookings-empty-state">
          <div className="bookings-empty-icon">
            <CalendarDays size={38} />
          </div>

          <h2>No bookings yet</h2>

          <p>
            You haven't booked any services yet.
            Find a trusted professional and get started!
          </p>

          <Link to="/services" className="button button-primary">
            Explore Services
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}

export default MyBookings;
