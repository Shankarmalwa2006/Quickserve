  import { useEffect, useMemo, useState } from "react";
  import {
    Search,
    Sun,
    Moon,
    MapPin,
    ArrowRight,
    ShieldCheck,
    Clock,
    Star,
    Wrench,
    Zap,
    Droplets,
    Wind,
    Sparkles,
    Hammer,
    Paintbrush,
    Sofa,
    Menu,
    X,
    CheckCircle2,
    Phone,
    CalendarCheck,
    ChevronRight,
    UserRound,
    Eye,
    EyeOff,
    Mail,
    LockKeyhole,
    BriefcaseBusiness,
  } from "lucide-react";

  import "./App.css";
  import Navbar from "./Components/Navbar.jsx";
  import Home from "./pages/Home.jsx";
  import Services from "./pages/Services.jsx";
  import { categories, initialServices } from "./data/serviceData.js";
  import MyBookings from "./pages/MyBookings.jsx";
  import BookingHistory from "./pages/BookingHistory.jsx";
   import { Routes, Route , Navigate} from "react-router-dom";
  import ProviderDashboard from "./pages/provider/ProviderDashboard.jsx";
    import { useNavigate } from "react-router-dom";
    import AddService from "./pages/provider/AddService";
    import MyServices from "./pages/provider/MyServices";


  
  
  function App() {
    const [theme, setTheme] = useState(() => {
      try {
        return localStorage.getItem("quickserve-theme") || "light";
      } catch {
        return "light";
      }
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All Services");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [location, setLocation] = useState("");
    const [selectedService, setSelectedService] = useState(null);
    const [bookingMessage, setBookingMessage] = useState("");
    
    
      // Provider details modal state
      const [selectedProvider, setSelectedProvider] = useState(null);

      const openProviderDetails = (service) => {
      setSelectedProvider(service);
      };

      const closeProviderDetails = () => {
      setSelectedProvider(null); 
      };

    // Authentication modal state
    const [authOpen, setAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState("login");
    const [authRole, setAuthRole] = useState("customer");
    const [showPassword, setShowPassword] = useState(false);
    const [authMessage, setAuthMessage] = useState("");

          const [user, setUser] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem("quickserve-user")) || null;
      } catch {
        return null;
      }
      });
  

    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);

      try {
        localStorage.setItem("quickserve-theme", theme);
      } catch {
        // Theme still works for the current session if storage is unavailable.
      }
    }, [theme]);

    const navigate = useNavigate();

    const toggleTheme = () => {
      setTheme((current) => (current === "light" ? "dark" : "light"));
    };



    // Open authentication modal
  const openAuth = (mode = "login", role = "customer") => {
    setAuthMode(mode);
    setAuthRole(role);
    setAuthMessage("");
    setShowPassword(false);
    setAuthOpen(true);
    setMobileMenuOpen(false);


  };


    const handleLogout = () => {
  localStorage.removeItem("quickserve-token");
  localStorage.removeItem("quickserve-user");
  setUser(null);
  navigate("/", { replace: true });
openAuth("login", "provider");
};
  // Close authentication modal
  const closeAuth = () => {
    setAuthOpen(false);
    setAuthMessage("");
    setShowPassword(false);
  };

  // Handle login/signup form submission
 const handleAuthSubmit = async (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const email = formData.get("email")?.trim();
  const password = formData.get("password");

  try {
    setAuthMessage("Please wait...");

    const isSignup = authMode === "signup";

    const endpoint = isSignup
      ? "http://localhost:5000/api/register"
      : "http://localhost:5000/api/login";

    const userData = isSignup
      ? {
          full_name: formData.get("fullName")?.trim(),
          email,
          phone: formData.get("phone")?.trim(),
          password,
          role: authRole,
        }
      : {
          email,
          password,
        };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Authentication failed.");
    }

    if (!isSignup) {
      localStorage.setItem("quickserve-token", result.token);
      localStorage.setItem(
        "quickserve-user",
        JSON.stringify(result.user)
      );

      setUser(result.user);
    }

    if (isSignup) {
  setAuthMessage(result.message);
  form.reset();
} else {
  setAuthOpen(false);
  setAuthMessage("");
  setShowPassword(false);
}

  } catch (error) {
    console.error("Authentication error:", error);
    setAuthMessage(error.message || "Something went wrong.");
  }
};
  const filteredServices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const currentLocation = location.trim().toLowerCase();

    return initialServices.filter((service) => {
      const matchesCategory =
        activeCategory === "All Services" ||
        service.category === activeCategory;

      const matchesSearch =
        !query ||
        service.name.toLowerCase().includes(query) ||
        service.category.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query);

      const serviceAreas = service.availableAreas || [];

      const matchesLocation =
        !currentLocation ||
        serviceAreas.some((area) =>
          currentLocation.includes(area.toLowerCase())
        );

      return matchesCategory && matchesSearch && matchesLocation;
    });
  }, [activeCategory, searchQuery, location]);

    const handleSearch = (event) => {
      event.preventDefault();
      document.getElementById("services")?.scrollIntoView({
        behavior: "smooth",
      });
    };

    const lp = (service) => {
      setSelectedService(service);
      setBookingMessage("");
    };

    const closeBooking = () => {
      setSelectedService(null);
      setBookingMessage("");
    };

    const submitBooking = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const bookingData = {
      customer_name: formData.get("customerName")?.trim(),
      phone: formData.get("phone")?.trim(),
      service_name: selectedService?.name,
      address: formData.get("address")?.trim(),
      booking_date: formData.get("preferredDate"),
      booking_time: null,
      provider_id: selectedProvider.id
    };

      try {
        setBookingMessage("Submitting your booking...");

        const response = await fetch("http://localhost:5000/api/bookings", {
          method: "POST",
            headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("quickserve-token")}`,
          },
          body: JSON.stringify(bookingData),
        });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Unable to submit booking.");
      }

      setBookingMessage(
        `Booking submitted successfully! Your booking ID is ${result.bookingId}.`
      );

      form.reset();
    } catch (error) {
      console.error("Booking submission failed:", error);

      setBookingMessage(
        error.message || "Unable to connect to the backend. Please try again."
      );
    }
  };
    const handleLocation = () => {
    if (!navigator.geolocation) {
      setLocation("Location is not supported by this browser.");
      return;
    }

    setLocation("Detecting your location...");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
          );

          if (!response.ok) {
            throw new Error("Unable to fetch address");
          }

          const data = await response.json();
          const address = data.address || {};

          const area =
            address.suburb ||
            address.neighbourhood ||
            address.residential ||
            address.city_district ||
            address.town ||
            address.village;

          const city =
            address.city ||
            address.town ||
            address.municipality ||
            address.village;

          const readableLocation = [area, city]
            .filter(Boolean)
            .filter((value, index, array) => array.indexOf(value) === index)
            .join(", ");

          setLocation(
            readableLocation ||
              data.display_name ||
              `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          );

          setActiveCategory("All Services");
          setSearchQuery("");

          setTimeout(() => {
            document.getElementById("services")?.scrollIntoView({
              behavior: "smooth",
            });
          }, 100);
        } catch (error) {
          console.error("Reverse geocoding failed:", error);

          setLocation(
            `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`
          );

          setActiveCategory("All Services");
          setSearchQuery("");
        }
      },
      () => {
        setLocation("Location unavailable. Please enter it manually.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  };

  
    return (
      <div className="app-shell">
        {/* NAVBAR */}
        {!window.location.pathname.startsWith("/provider") && (
          <Navbar
            theme={theme}
            toggleTheme={toggleTheme}
            mobileMenuOpen={mobileMenuOpen}
            setMobileMenuOpen={setMobileMenuOpen}
            openAuth={openAuth}
            user={user}
            handleLogout={handleLogout}
          />
        )}

                <Routes>
          <Route
            path="/"
            element={
              <Home
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                location={location}
                setLocation={setLocation}
                handleLocation={handleLocation}
                handleSearch={handleSearch}
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
                filteredServices={filteredServices}
                openProviderDetails={openProviderDetails}
                handleBooking={lp}
              />
            }
          />

              <Route
            path="/services"
            element={<Services onBook={lp} />}
            />

            <Route
            path="/my-bookings"
            element={<BookingHistory />}
            />

            <Route path="/history" element={<BookingHistory />} />

            console.log("CURRENT PATH:", window.location.pathname);

              <Route
                path="/provider/dashboard"
                element={<ProviderDashboard onLogout={handleLogout} />}
              />
<Route
  path="/provider/add-service"
  element={<AddService onLogout={handleLogout} />}
/>

              <Route
  path="/provider/my-services"
  element={<MyServices />}
/>

          </Routes>


        {/* PROVIDER DETAILS MODAL */}
          {selectedProvider && (
          <div
            className="modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeProviderDetails();
              }
            }}
          >
            <div
              className="provider-details-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="provider-details-title"
            >
              {/* HEADER */}
              <div className="provider-details-header">
                <div>
                  <span className="section-eyebrow">
                    QUICKSERVE PROFESSIONALS
                  </span>

                  <h2 id="provider-details-title">
                    Service Details
                  </h2>
                </div>

                <button
                  type="button"
                  className="modal-close"
                  onClick={closeProviderDetails}
                  aria-label="Close provider details"
                >
                  <X size={22} />
                </button>
              </div>

              {/* SERVICE ICON */}
              <div
                className={`provider-details-visual ${selectedProvider.color}`}
              >
                {(() => {
                  const Icon = selectedProvider.icon;

                  return <Icon size={58} strokeWidth={1.6} />;
                })()}

                {selectedProvider.popular && (
                  <span className="provider-popular-badge">
                    POPULAR SERVICE
                  </span>
                )}
              </div>

              {/* SERVICE INFORMATION */}
              <div className="provider-details-content">
                <span className="provider-category-label">
                  {selectedProvider.category}
                </span>

                <h3>{selectedProvider.name}</h3>

                <p className="provider-details-description">
                  {selectedProvider.description}
                </p>

                {/* RATINGS */}
                <div className="provider-details-rating">
                  <Star size={19} fill="currentColor" />

                  <strong>{selectedProvider.rating}/5</strong>

                  <span>
                    ({selectedProvider.reviews} customer reviews)
                  </span>
                </div>

                {/* INFORMATION CARDS */}
                <div className="provider-info-grid">
                  <div className="provider-info-card">
                    <Clock size={21} />

                    <div>
                      <span>Estimated duration</span>

                      <strong>{selectedProvider.duration}</strong>
                    </div>
                  </div>

                  <div className="provider-info-card">
                    <ShieldCheck size={21} />

                    <div>
                      <span>Starting price</span>

                      <strong>₹{selectedProvider.price}+</strong>
                    </div>
                  </div>
                </div>

              {/* PROVIDER PROFILE */}
              <div className="provider-profile">
              <div className="provider-profile-header">
                <div className="provider-avatar">
                  <UserRound size={28} />
                </div>

                <div>
                  <h3>{selectedProvider.provider?.name || "Service Professional"}</h3>
                  <p>{selectedProvider.provider?.businessName || selectedProvider.name}</p>
                </div>

                {selectedProvider.provider?.verified && (
                  <span className="provider-verified">
                    <ShieldCheck size={16} />
                    Demo Verified
                  </span>
                )}
              </div>

              <div className="provider-stats">
                <div>
                  <strong>{selectedProvider.provider?.experience || "Experience not listed"}</strong>
                  <span>Experience</span>
                </div>

                <div>
                  <strong>{selectedProvider.provider?.completedJobs ?? 0}+</strong>
                  <span>Completed Jobs</span>
                </div>
              </div>
              </div>

                {/* SERVICE AREAS */}
                <div className="provider-service-areas">
                  <h4>
                    <MapPin size={18} />
                    Service Areas
                  </h4>

                  <div className="provider-area-tags">
                    {(selectedProvider.availableAreas || []).map((area) => (
                      <span key={area}>{area}</span>
                    ))}
                  </div>
                </div>

                {/* SERVICE NOTE */}
                <div className="provider-details-note">
                  <ShieldCheck size={20} />

                  <p>
                    Review the service information and starting price before
                    submitting your booking request.
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="provider-details-actions">
                  <button
                    type="button"
                    className="button provider-secondary-btn"
                    onClick={closeProviderDetails}
                  >
                    Go Back
                  </button>

                  <button
                    type="button"
                    className="button button-primary provider-book-btn"
                    onClick={() => {
                      const service = selectedProvider;

                      closeProviderDetails();
                      handleBooking(service);
                    }}
                  >
                    Book This Service
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          )}
        
        {/* BOOKING MODAL */}
        {selectedService && (
          <div
            className="modal-backdrop"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeBooking();
              }
            }}
          >
            <div
              className="booking-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="booking-title"
            >
              <div className="modal-header">
                <div>
                  <span className="section-eyebrow">QUICKSERVE BOOKING</span>
                  <h2 id="booking-title">Book your service</h2>
                </div>

                <button
                  type="button"
                  className="modal-close"
                  onClick={closeBooking}
                  aria-label="Close booking form"
                >
                  <X size={22} />
                </button>
              </div>

              <div className="modal-service-summary">
                <div
                  className={`modal-service-icon ${selectedService.color}`}
                >
                  {(() => {
                    const Icon = selectedService.icon;
                    return <Icon size={28} />;
                  })()}
                </div>

                <div>
                  <h3>{selectedService.name}</h3>
                  <p>{selectedService.description}</p>
                  <strong>Starting from ₹{selectedService.price}+</strong>
                </div>
              </div>

              <form className="booking-form" onSubmit={submitBooking}>
                <label>
                  Your Name
                  <input
                    type="text"
                    name="customerName"
                    placeholder="Enter your full name"
                    required
                  />
                </label>

                <label>
                  Phone Number
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    pattern="[0-9]{10}"
                    title="Enter a 10-digit phone number"
                    required
                  />
                </label>

                <label>
                  Service Address
                  <textarea
                    name="address"
                    placeholder="Enter your complete address"
                    rows="3"
                    required
                  />
                </label>

                <label>
                  Preferred Date
                  <input
                    type="date"
                    name="preferredDate"
                    min={new Date().toLocaleDateString("en-CA")}
                    required
                  />
                </label>

                {bookingMessage && (
                  <div className="booking-message" role="status">
                    {bookingMessage}
                  </div>
                )}

                <button
                  type="submit"
                  className="button button-primary booking-submit"
                >
                  Submit Booking Request <ArrowRight size={18} />
                </button>

                <p className="booking-note">
                  This demo does not confirm a real appointment. Backend
                  integration is required to save bookings.
                </p>
              </form>
            </div>
          </div>
        )}
              {/* AUTHENTICATION MODAL */}
        {authOpen && (
          <div
            className="auth-backdrop"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeAuth();
              }
            }}
          >
            <section className="auth-modal" role="dialog" aria-modal="true">
              <button
                type="button"
                className="auth-close"
                onClick={closeAuth}
                aria-label="Close modal"
              >
                <X size={21} />
              </button>

              <div className="auth-brand-mark">
                <Wrench size={25} />
              </div>

              <span className="auth-eyebrow">WELCOME TO QUICKSERVE</span>

              <h2>
                {authMode === "login"
                  ? "Welcome back."
                  : "Let's get you started."}
              </h2>

              <p className="auth-subtitle">
                {authMode === "login"
                  ? "Sign in to continue your QuickServe journey."
                  : "Create your account and make life easier."}
              </p>

              <div className="auth-role-selector">
                <button
                  type="button"
                  className={
                    authRole === "customer"
                      ? "auth-role-option active"
                      : "auth-role-option"
                  }
                  onClick={() => {
                    setAuthRole("customer");
                    setAuthMessage("");
                  }}
                >
                  <UserRound size={18} />
                  Customer
                </button>

                <button
                  type="button"
                  className={
                    authRole === "provider"
                      ? "auth-role-option active"
                      : "auth-role-option"
                  }
                  onClick={() => {
                    setAuthRole("provider");
                    setAuthMessage("");
                  }}
                >
                  <BriefcaseBusiness size={18} />
                  Provider
                </button>
              </div>

              <form className="auth-form" onSubmit={handleAuthSubmit}>
                {authMode === "signup" && (
                  <label className="auth-field">
                    Full Name
                    <div className="auth-input-wrap">
                      <UserRound size={18} />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        autoComplete="name"
                        required
                      />
                    </div>
                  </label>
                )}

                {authMode === "signup" && authRole === "provider" && (
                  <label className="auth-field">
                    Business Name
                    <div className="auth-input-wrap">
                      <BriefcaseBusiness size={18} />
                      <input
                        type="text"
                        name="businessName"
                        placeholder="Enter your business name"
                        required
                      />
                    </div>
                  </label>
                )}

                <label className="auth-field">
                  Email Address
                  <div className="auth-input-wrap">
                    <Mail size={18} />
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </label>

                {authMode === "signup" && (
                  <label className="auth-field">
                    Phone Number
                    <div className="auth-input-wrap">
                      <Phone size={18} />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="10-digit mobile number"
                        pattern="[0-9]{10}"
                        title="Enter a 10-digit phone number"
                        autoComplete="tel"
                        required
                      />
                    </div>
                  </label>
                )}

                <label className="auth-field">
                  Password
                  <div className="auth-input-wrap">
                    <LockKeyhole size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      autoComplete={
                        authMode === "signup"
                          ? "new-password"
                          : "current-password"
                      }
                      minLength={8}
                      required
                    />

                    <button
                      type="button"
                      className="auth-password-toggle"
                      onClick={() =>
                        setShowPassword((visible) => !visible)
                      }
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </label>

                {authMessage && (
                  <div className="auth-message" role="status">
                    <CheckCircle2 size={18} />
                    <span>{authMessage}</span>
                  </div>
                )}

                <button type="submit" className="auth-submit-button">
                  {authMode === "login" ? "Sign In" : "Create Account"}
                  <ArrowRight size={18} />
                </button>

                <p className="auth-demo-note">
                  Demo interface · Backend authentication is not connected.
                </p>
              </form>

              <div className="auth-switch">
                {authMode === "login" ? (
                  <>
                    New to QuickServe?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("signup");
                        setAuthMessage("");
                      }}
                    >
                      Create an account
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("login");
                        setAuthMessage("");
                      }}
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    );
  }

  export default App;