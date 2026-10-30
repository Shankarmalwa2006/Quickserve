import {
  Search,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Clock,
  Star,
  Wrench,
  Sparkles,
  Sofa,
  CheckCircle2,
  CalendarCheck,
  ChevronRight,
  Phone,
} from "lucide-react";

function Home({
  searchQuery,
  setSearchQuery,
  location,
  setLocation,
  handleLocation,
  handleSearch,
  categories,
  activeCategory,
  setActiveCategory,
  filteredServices,
  openProviderDetails,
  handleBooking,
}) {
  return (
   <>
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

                      <div className="service-card-actions">
                        <button
                          type="button"
                          className="button provider-details-btn"
                          onClick={() => openProviderDetails(service)}
                        >
                          Details
                          <ChevronRight size={16} />
                        </button>

                        <button
                          type="button"
                          className="button button-primary service-book-btn"
                          onClick={() => handleBooking(service)}
                        >
                          Book Now
                          <ArrowRight size={16} />
                        </button>
                      </div>
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
  </>
  );
}

export default Home;