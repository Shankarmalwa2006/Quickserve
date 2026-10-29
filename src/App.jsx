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

const categories = [
  { name: "All Services", icon: Sparkles },
  { name: "Plumbing", icon: Droplets },
  { name: "Electrical", icon: Zap },
  { name: "Cleaning", icon: Sparkles },
  { name: "AC Repair", icon: Wind },
  { name: "Carpentry", icon: Hammer },
  { name: "Painting", icon: Paintbrush },
];

const initialServices = [
  {
    id: 1,
    name: "Professional Plumbing",
    category: "Plumbing",
    description: "Leak repairs, tap installation and pipe maintenance.",
    price: 299,
    rating: 4.9,
    reviews: 128,
    duration: "30–60 min",
    icon: Droplets,
    color: "blue",
    popular: true,
    availableAreas: ["Andheri", "Bandra", "Borivali"],
  },
  {
    id: 2,
    name: "Electrical Repairs",
    category: "Electrical",
    description: "Safe electrical repairs, wiring and installations.",
    price: 349,
    rating: 4.8,
    reviews: 96,
    duration: "30–60 min",
    icon: Zap,
    color: "yellow",
    popular: true,
    availableAreas: ["Andheri", "Dadar", "Thane"],
  },
  {
    id: 3,
    name: "Home Deep Cleaning",
    category: "Cleaning",
    description: "Detailed cleaning for a fresh and spotless home.",
    price: 799,
    rating: 4.9,
    reviews: 214,
    duration: "2–3 hours",
    icon: Sparkles,
    color: "purple",
    popular: true,
    availableAreas:["Bandra", "Andheri", "Powai"]
  },
  {
    id: 4,
    name: "AC Repair & Service",
    category: "AC Repair",
    description: "AC servicing, troubleshooting and maintenance.",
    price: 499,
    rating: 4.7,
    reviews: 87,
    duration: "45–90 min",
    icon: Wind,
    color: "cyan",
    popular: false,
    availableAreas:["Thane", "Powai", "Andheri"]
  },
  {
    id: 5,
    name: "Carpentry Services",
    category: "Carpentry",
    description: "Furniture assembly, door repairs and fittings.",
    price: 399,
    rating: 4.8,
    reviews: 73,
    duration: "30–90 min",
    icon: Hammer,
    color: "orange",
    popular: false,
    availableAreas:["Borivali", "Dadar", "Bandra"]
  },
  {
    id: 6,
    name: "Home Painting",
    category: "Painting",
    description: "Professional painting and wall touch-ups.",
    price: 999,
    rating: 4.8,
    reviews: 64,
    duration: "Depends on work",
    icon: Paintbrush,
    color: "pink",
    popular: false,
    availableAreas:	["Powai", "Thane", "Bandra"]
  },
];

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
  
  // Authentication modal state
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authRole, setAuthRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    try {
      localStorage.setItem("quickserve-theme", theme);
    } catch {
      // Theme still works for the current session if storage is unavailable.
    }
  }, [theme]);

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

// Close authentication modal
const closeAuth = () => {
  setAuthOpen(false);
  setAuthMessage("");
  setShowPassword(false);
};

// Handle login/signup form submission
const handleAuthSubmit = (event) => {
  event.preventDefault();

  setAuthMessage(
    authMode === "signup"
      ? "Your form is valid! Connect the backend to create your account."
      : "Form submitted! Connect the backend to verify your login."
  );
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

  const handleBooking = (service) => {
    setSelectedService(service);
    setBookingMessage("");
  };

  const closeBooking = () => {
    setSelectedService(null);
    setBookingMessage("");
  };

  const submitBooking = (event) => {
    event.preventDefault();

    setBookingMessage(
      "Booking form submitted locally! Connect your backend to save and confirm real bookings."
    );
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
      <header className="navbar">
        <a href="#home" className="brand" aria-label="QuickServe home">
          <span className="brand-icon">
            <Wrench size={23} strokeWidth={2.5} />
          </span>

          <span className="brand-name">
            Quick<span>Serve</span>
          </span>
        </a>

        <nav className={`nav-links ${mobileMenuOpen ? "nav-open" : ""}`}>
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>
            Home
          </a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>
            Services
          </a>
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>
            How It Works
          </a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>
            About
          </a>
        </nav>

        <div className="nav-actions">
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Moon size={19} />
            ) : (
              <Sun size={19} />
            )}
            <span>{theme === "light" ? "Dark" : "Light"}</span>
          </button>

          <a href="#services" className="button button-primary nav-book">
            Book a Service
          </a>
                    {/* AUTH BUTTONS */}
          <div className="auth-nav-actions">
            <button
              type="button"
              className="auth-nav-login"
              onClick={() => openAuth("login", "customer")}
            >
              Login
            </button>

            <button
              type="button"
              className="auth-nav-signup"
              onClick={() => openAuth("signup", "customer")}
            >
              Sign Up
            </button>

            <button
              type="button"
              className="auth-provider-link"
              onClick={() => openAuth("signup", "provider")}
            >
              <BriefcaseBusiness size={16} />
              <span>Become a Provider</span>
            </button>
          </div>

          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="hero-section" id="home">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={15} />
              <span>Your home, our responsibility</span>
            </div>

            <h1>
              Your Everyday
              <br />
              Problems, <span>Solved.</span>
            </h1>

            <p className="hero-description">
              Find trusted professionals for all your home service needs.
              Quality work, transparent pricing and convenience at your
              fingertips.
            </p>

            <form className="search-panel" onSubmit={handleSearch}>
              <div className="search-field">
                <Search size={21} />

                <input
                  type="search"
                  placeholder="What service do you need?"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  aria-label="Search services"
                />
              </div>

              <div className="search-divider" />

              <div className="location-field">
                <MapPin size={20} />

                <input
                  type="text"
                  placeholder="Your location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  aria-label="Your location"
                />

                <button
                  type="button"
                  className="location-detect"
                  onClick={handleLocation}
                  title="Detect my location"
                  aria-label="Detect my location"
                >
                  <MapPin size={16} />
                </button>
              </div>

              <button type="submit" className="button button-primary search-btn">
                Find Services <ArrowRight size={18} />
              </button>
            </form>

            <div className="hero-trust">
              <div className="trust-avatars" aria-hidden="true">
                <span>R</span>
                <span>A</span>
                <span>S</span>
                <span>+</span>
              </div>

              <div>
                <div className="trust-stars">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                </div>

                <p>
                  Trusted by <strong>1,000+</strong> happy customers
                </p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-illustration">
              <div className="illustration-glow" />

              <div className="floating-card floating-card-top">
                <span className="floating-icon green-icon">
                  <CheckCircle2 size={21} />
                </span>
                <div>
                  <strong>Verified Experts</strong>
                  <small>Trusted professionals</small>
                </div>
              </div>

              <div className="house-illustration">
                <div className="house-roof" />

                <div className="house-body">
                  <div className="house-window window-left">
                    <span />
                  </div>

                  <div className="house-door" />

                  <div className="house-window window-right">
                    <span />
                  </div>
                </div>

                <div className="house-ground" />
                <div className="plant plant-left" />
                <div className="plant plant-right" />
              </div>

              <div className="floating-card floating-card-bottom">
                <span className="floating-icon purple-icon">
                  <CalendarCheck size={21} />
                </span>
                <div>
                  <strong>Easy Booking</strong>
                  <small>Services at your door</small>
                </div>
              </div>

              <div className="floating-spark spark-one">
                <Sparkles size={25} />
              </div>

              <div className="floating-spark spark-two">
                <Sparkles size={17} />
              </div>
            </div>
          </div>
        </section>

        {/* TRUST STATS */}
        <section className="stats-section" aria-label="QuickServe statistics">
          <div className="stat-item">
            <div className="stat-number">1,000+</div>
            <div className="stat-label">Happy Customers</div>
          </div>

          <div className="stat-separator" />

          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Verified Providers</div>
          </div>

          <div className="stat-separator" />

          <div className="stat-item">
            <div className="stat-number">4.8/5</div>
            <div className="stat-label">Customer Rating</div>
          </div>

          <div className="stat-separator" />

          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Booking Access</div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="categories-section section-container">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">EXPLORE SERVICES</span>
              <h2>What do you need help with?</h2>
              <p>Everything your home needs, all in one place.</p>
            </div>

            <a href="#services" className="text-link">
              View all services <ArrowRight size={17} />
            </a>
          </div>

          <div className="category-grid">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.name;

              return (
                <button
                  type="button"
                  key={category.name}
                  className={`category-card ${isActive ? "category-active" : ""}`}
                  onClick={() => {
                    setActiveCategory(category.name);
                    document.getElementById("services")?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  aria-pressed={isActive}
                >
                  <span className="category-icon">
                    <Icon size={24} />
                  </span>

                  <span className="category-name">{category.name}</span>

                  <ChevronRight size={17} className="category-arrow" />
                </button>
              );
            })}
          </div>
        </section>

        {/* SERVICES */}
        <section className="services-section section-container" id="services">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">OUR PROFESSIONALS</span>
              <h2>
                {activeCategory === "All Services"
                  ? "Popular Services"
                  : activeCategory}
              </h2>
              <p>
                Reliable experts who get the job done right, every time.
              </p>
            </div>

            <div className="service-results">
              {filteredServices.length}{" "}
              {filteredServices.length === 1 ? "service" : "services"} found
            </div>
          </div>

          <div className="service-filters">
            {categories.map((category) => (
              <button
                type="button"
                key={category.name}
                className={`filter-chip ${
                  activeCategory === category.name ? "filter-active" : ""
                }`}
                onClick={() => setActiveCategory(category.name)}
              >
                {category.name}
              </button>
            ))}
          </div>
            
                <div className="service-results-heading">
          <div>
          <h3>
          {location.trim()
            ? `Services available in ${location}`
            : "Explore Our Services"}
          </h3>

          <p>
          {filteredServices.length} services found
          {location.trim() ? ` in ${location}` : ""}
          </p>
          </div>
          </div>

          {filteredServices.length > 0 ? (
            <div className="service-grid">
              {filteredServices.map((service) => {
                const Icon = service.icon;

                return (
                  <article className="service-card" key={service.id}>
                    <div className={`service-image ${service.color}`}>
                      {service.popular && (
                        <span className="popular-badge">POPULAR</span>
                      )}

                      <div className="service-main-icon">
                        <Icon size={43} strokeWidth={1.8} />
                      </div>

                      <span className="service-category-tag">
                        {service.category}
                      </span>
                    </div>

                    <div className="service-card-body">
                      <div className="service-rating">
                        <Star size={15} fill="currentColor" />
                        <strong>{service.rating}</strong>
                        <span>({service.reviews} reviews)</span>
                      </div>

                      <h3>{service.name}</h3>

                      <p className="service-description">
                        {service.description}
                      </p>

                      <div className="service-duration">
                        <Clock size={15} />
                        <span>{service.duration}</span>
                      </div>

                      <div className="service-card-bottom">
                        <div className="service-price">
                          <small>Starting from</small>
                          <strong>
                            ₹{service.price}
                            <span>+</span>
                          </strong>
                        </div>

                        <button
                          type="button"
                          className="button button-primary service-book-btn"
                          onClick={() => handleBooking(service)}
                        >
                          Book Now <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <Search size={35} />
              <h3>No services found</h3>
              <p>
                Try another search term or select a different category.
              </p>

              <button
                type="button"
                className="button button-primary"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All Services");
                }}
              >
                Show All Services
              </button>
            </div>
          )}
        </section>

        {/* HOW IT WORKS */}
        <section className="how-section" id="how-it-works">
          <div className="section-container">
            <div className="center-heading">
              <span className="section-eyebrow">SIMPLE & CONVENIENT</span>
              <h2>Get things done in 3 easy steps</h2>
              <p>
                Quality home services are just a few clicks away.
              </p>
            </div>

            <div className="steps-grid">
              <article className="step-card">
                <div className="step-number">01</div>
                <div className="step-icon">
                  <Search size={28} />
                </div>
                <h3>Choose a Service</h3>
                <p>
                  Browse our services and find the right professional for
                  your needs.
                </p>
              </article>

              <article className="step-card">
                <div className="step-number">02</div>
                <div className="step-icon">
                  <CalendarCheck size={28} />
                </div>
                <h3>Book Your Slot</h3>
                <p>
                  Choose a convenient time and submit your booking request.
                </p>
              </article>

              <article className="step-card">
                <div className="step-number">03</div>
                <div className="step-icon">
                  <CheckCircle2 size={28} />
                </div>
                <h3>Relax & Enjoy</h3>
                <p>
                  Get your service done by a professional at your doorstep.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* WHY QUICKSERVE */}
        <section className="why-section section-container" id="about">
          <div className="why-visual">
            <div className="why-decoration decoration-one" />
            <div className="why-decoration decoration-two" />

            <div className="why-house-card">
              <div className="why-house-icon">
                <Sofa size={70} strokeWidth={1.3} />
              </div>

              <div className="why-check">
                <CheckCircle2 size={22} />
              </div>
            </div>

            <div className="why-caption">
              <ShieldCheck size={22} />
              <div>
                <strong>Your home is in safe hands</strong>
                <span>Professional service, every time.</span>
              </div>
            </div>
          </div>

          <div className="why-content">
            <span className="section-eyebrow">WHY QUICKSERVE?</span>
            <h2>
              A better way to
              <br />
              <span>care for your home.</span>
            </h2>

            <p className="why-description">
              We make finding reliable home service professionals easier,
              safer and more convenient.
            </p>

            <div className="benefit-list">
              <div className="benefit-item">
                <span className="benefit-icon">
                  <ShieldCheck size={21} />
                </span>
                <div>
                  <h3>Trusted Professionals</h3>
                  <p>Find providers with profiles and customer reviews.</p>
                </div>
              </div>

              <div className="benefit-item">
                <span className="benefit-icon">
                  <Clock size={21} />
                </span>
                <div>
                  <h3>Convenient Booking</h3>
                  <p>Request the service you need at a suitable time.</p>
                </div>
              </div>

              <div className="benefit-item">
                <span className="benefit-icon">
                  <CheckCircle2 size={21} />
                </span>
                <div>
                  <h3>Transparent Pricing</h3>
                  <p>See starting prices before requesting a service.</p>
                </div>
              </div>
            </div>

            <a href="#services" className="button button-primary why-button">
              Explore Our Services <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section section-container">
          <div className="cta-content">
            <span className="cta-eyebrow">LET'S GET IT DONE</span>
            <h2>Your home deserves the best care.</h2>
            <p>
              Stop searching endlessly. Find a service professional with
              QuickServe.
            </p>

            <a href="#services" className="button cta-button">
              Find Your Professional <ArrowRight size={18} />
            </a>
          </div>

          <div className="cta-decoration">
            <Wrench size={105} strokeWidth={1.1} />
            <Sparkles size={28} className="cta-sparkle" />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-main section-container">
          <div className="footer-brand">
            <a href="#home" className="brand">
              <span className="brand-icon">
                <Wrench size={22} strokeWidth={2.5} />
              </span>

              <span className="brand-name">
                Quick<span>Serve</span>
              </span>
            </a>

            <p>
              Making everyday home services simpler, safer and more
              accessible for everyone.
            </p>
          </div>

          <div className="footer-column">
            <h3>Quick Links</h3>
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About Us</a>
          </div>

          <div className="footer-column">
            <h3>Our Services</h3>
            <a href="#services">Plumbing</a>
            <a href="#services">Electrical</a>
            <a href="#services">Cleaning</a>
            <a href="#services">AC Repair</a>
          </div>

          <div className="footer-column">
            <h3>Contact</h3>
            <p className="footer-contact">
              <Phone size={16} /> Contact details coming soon
            </p>
            <p className="footer-contact">
              <MapPin size={16} /> Serving your local community
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} QuickServe. All rights reserved.
          </p>
          <p>Made with care for your home.</p>
        </div>
      </footer>

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