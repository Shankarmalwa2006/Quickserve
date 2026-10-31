
import { Star, Clock, MapPin } from "lucide-react";

function ServiceCard({ service, onBook }) {
  const Icon = service.icon;

  return (
    <div className="service-card">
      <div className="service-card-icon">
        <Icon size={28} />
      </div>

      <div className="service-card-content">
        <span className="service-category">
          {service.category}
        </span>

        <h3>{service.name}</h3>

        <p>{service.description}</p>

        <div className="service-card-meta">
          <span>
            <Star size={15} /> {service.rating}
            ({service.reviews})
          </span>

          <span>
            <Clock size={15} /> {service.duration}
          </span>
        </div>

        <div className="service-card-bottom">
          <h3>₹{service.price}</h3>

          <button onClick={() => onBook(service)}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;
