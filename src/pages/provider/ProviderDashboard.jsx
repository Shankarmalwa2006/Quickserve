
import React from "react";
import {
  LayoutDashboard,
  CalendarDays,
  UserRound,
  LogOut,
  ClipboardList,
  Clock,
  CheckCircle,
  IndianRupee,
  ArrowUpRight,
  Home
} from "lucide-react";

import "./ProviderDashboard.css";
import "./ProviderServices.css";

const ProviderDashboard = ({ onLogout }) => {
  const stats = [
    {
      title: "Total Bookings",
      value: "24",
      icon: ClipboardList
    },
    {
      title: "Pending Requests",
      value: "08",
      icon: Clock
    },
    {
      title: "Completed Jobs",
      value: "16",
      icon: CheckCircle
    },
    {
      title: "Total Earnings",
      value: "₹12,500",
      icon: IndianRupee
    }
  ];

  return (
    <div className="provider-layout">

      {/* SIDEBAR */}
      <aside className="provider-sidebar">
        <h2 className="provider-logo">QuickServe<span>.</span></h2>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="provider-nav">
          <a href="/provider/dashboard" className="active">
            <LayoutDashboard size={19} />
            Overview
          </a>

          <a href="/provider/my-services">
  My Services
</a>

            <a href="/provider/add-service">
            Add Service
            </a>

          <a href="/">
          <Home size={19} />
          Home
          </a>

          <a href="/provider/bookings">
            <CalendarDays size={19} />
            My Bookings
          </a>

          <a href="/provider/profile">
            <UserRound size={19} />
            My Profile
          </a>
        </nav>
    

        <button
          className="provider-logout"
          onClick={onLogout}
          >
          <LogOut size={19} />
          Logout
          </button>



      </aside>

      {/* MAIN CONTENT */}
      <main className="provider-main">

        <header className="provider-header">
          <div>
            <p className="dashboard-greeting">PROVIDER PANEL</p>
            <h1>Dashboard Overview</h1>
            <p className="dashboard-subtitle">
              Manage your services and bookings in one place.
            </p>
          </div>

          <div className="provider-avatar">P</div>
        </header>

        {/* WELCOME */}
        <section className="provider-welcome">
          <div>
            <p>Welcome back 👋</p>
            <h2>Ready for a productive day?</h2>
            <span>Here's what's happening with your business today.</span>
          </div>
        </section>

        {/* STATISTICS */}
        <section className="provider-stats">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <div className="provider-stat-card" key={index}>
                <div className="stat-top">
                  <span>{item.title}</span>
                  <div className="stat-icon">
                    <Icon size={20} />
                  </div>
                </div>

                <h2>{item.value}</h2>
                <p>QuickServe overview</p>
              </div>
            );
          })}
        </section>

        {/* RECENT BOOKINGS */}
        <section className="provider-bookings-section">
          <div className="section-heading">
            <div>
              <h2>Recent Bookings</h2>
              <p>Keep track of your latest service requests.</p>
            </div>

            <a href="/provider/bookings">
              View All <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="provider-empty-state">
            <CalendarDays size={35} />
            <h3>Booking activity will appear here</h3>
            <p>Your recent customer bookings will be displayed here.</p>
          </div>
        </section>

      </main>
    </div>
  );
};

export default ProviderDashboard;
  