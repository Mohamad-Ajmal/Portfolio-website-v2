import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";
import ProjectCard from "../ui/ProjectCard";

import { portfolioSection } from "../../config/site";

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="scroll-mt-28 bg-[#f6d2c3]
                 pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24"
    >
      <Container>
        <SectionHeading
          id="portfolio-heading"
          title={portfolioSection.heading}
          description={portfolioSection.description}
        />

        <div
          className="mt-9 grid grid-cols-1 items-stretch gap-6
                     sm:mt-11 sm:grid-cols-2
                     lg:mt-12 lg:grid-cols-3"
        >
          {portfolioSection.projects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </div>
      </Container>
    </section>
  );
}