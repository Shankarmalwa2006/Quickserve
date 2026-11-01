import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import {
  categories,
  initialServices
} from "../data/serviceData.js";
import ServiceCard from "../Components/ServiceCard.jsx";

function Services({ onBook }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("All Services");

  const filteredServices = useMemo(() => {
    return initialServices.filter((service) => {
      const matchesCategory =
        activeCategory === "All Services" ||
        service.category === activeCategory;

      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <main className="explore-page">

      <section className="explore-header">
        <span className="section-eyebrow">
          QUICKSERVE MARKETPLACE
        </span>

        <h1>Explore All Services</h1>

        <p>
          Find trusted professionals for all your home service needs.
        </p>

        <div className="explore-search">
          <Search size={20} />

          <input
            type="text"
            placeholder="Search plumbing, cleaning, electrical..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      <section className="explore-content">

        <div className="explore-categories">
          <SlidersHorizontal size={18} />

          {categories.map((category) => (
            <button
              key={category.name}
              className={
                activeCategory === category.name
                  ? "category-filter active"
                  : "category-filter"
              }
              onClick={() => setActiveCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="explore-results">
          <h2>Available Services</h2>
          <span>{filteredServices.length} services found</span>
        </div>

        <div className="explore-grid">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onBook={onBook}
              />
            ))
          ) : (
            <p>No services found. Try another search.</p>
          )}
        </div>

      </section>
    </main>
  );
}

export default Services;
