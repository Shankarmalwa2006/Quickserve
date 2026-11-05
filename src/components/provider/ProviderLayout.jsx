
import React from "react";
import { NavLink } from "react-router-dom";
import "./ProviderLayout.css";

import {
  LayoutDashboard,
  CalendarDays,
  UserRound,
  LogOut,
  Home,
  BriefcaseBusiness,
  PlusCircle
} from "lucide-react";

import "./ProviderLayout.css";

const ProviderLayout = ({ children, onLogout }) => {
  return (
    <div className="provider-layout">

      {/* SIDEBAR */}
      <aside className="provider-sidebar">

        <h2 className="provider-logo">
          QuickServe<span>.</span>
        </h2>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="provider-nav">

          <NavLink to="/provider/dashboard" end>
            <LayoutDashboard size={19} />
            Overview
          </NavLink>

          <NavLink to="/provider/my-services">
            <BriefcaseBusiness size={19} />
            My Services
          </NavLink>

          <NavLink to="/provider/add-service">
            <PlusCircle size={19} />
            Add Service
          </NavLink>

          <NavLink to="/" end>
            <Home size={19} />
            Home
          </NavLink>

          <NavLink to="/provider/bookings">
            <CalendarDays size={19} />
            My Bookings
          </NavLink>

          <NavLink to="/provider/profile">
            <UserRound size={19} />
            My Profile
          </NavLink>

        </nav>

        <button
          className="provider-logout"
          onClick={onLogout}
        >
          <LogOut size={19} />
          Logout
        </button>

      </aside>

      {/* PAGE CONTENT */}
      <main className="provider-main">
        {children}
      </main>

    </div>
  );
};

export default ProviderLayout;
