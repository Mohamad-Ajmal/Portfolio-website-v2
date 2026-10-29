import Container from "../ui/Container";
import ServiceCard from "../ui/ServiceCard";
import { serviceCards } from "../../config/site";

export default function ServiceCards() {
  return (
    <section
      aria-label="Explore my services"
      className="bg-[#f6d2c3] pb-6 sm:pb-8"
    >
      <Container>
        <div className="space-y-8 sm:space-y-10 lg:space-y-12">
          {serviceCards.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}