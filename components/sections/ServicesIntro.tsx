import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import GradientLink from "../ui/GradientLink";

import { servicesIntro } from "../../config/site";

export default function ServicesIntro() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="scroll-mt-28 bg-[#f6d2c3]
                 pb-14 pt-16 sm:pb-16 sm:pt-20
                 lg:pb-20 lg:pt-24"
    >
      <Container>
        <SectionHeading
          id="services-heading"
          title={servicesIntro.heading.map((line, index) => (
            <span key={index} className="block">
              {line}
            </span>
          ))}
          description={servicesIntro.description}
        >
          <GradientLink href={servicesIntro.buttonHref}>
            {servicesIntro.buttonLabel}
          </GradientLink>
        </SectionHeading>
      </Container>
    </section>
  );
}