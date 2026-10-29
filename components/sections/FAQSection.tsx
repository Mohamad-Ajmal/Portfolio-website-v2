import { Plus } from "lucide-react";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

import { faqSection } from "../../config/site";

export default function FAQSection() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-28 bg-[#f6d2c3]
                 pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24"
    >
      <Container>
        <SectionHeading
          id="faq-heading"
          title={faqSection.heading}
        />

        <div className="mx-auto mt-10 max-w-[900px] sm:mt-12 lg:mt-14">
          {faqSection.items.map((item) => (
            <details
              key={item.id}
              name="portfolio-faq"
              className="group border-b border-[#ab4219]/20"
            >
              <summary
                className="flex min-h-20 cursor-pointer
                           list-none items-center justify-between
                           gap-5 rounded-sm py-6
                           text-left text-lg font-semibold
                           leading-[1.4] text-black
                           transition-colors duration-200
                           hover:text-[#ab4219]
                           focus-visible:outline-2
                           focus-visible:outline-offset-4
                           focus-visible:outline-[#ab4219]
                           sm:gap-8 sm:py-7 sm:text-xl
                           motion-reduce:transition-none
                           [&::-webkit-details-marker]:hidden"
              >
                <span>{item.question}</span>

                <Plus
                  aria-hidden="true"
                  strokeWidth={1.7}
                  className="size-5 shrink-0 text-[#ab4219]
                             transition-transform duration-200
                             group-open:rotate-45
                             sm:size-6
                             motion-reduce:transition-none"
                />
              </summary>

              <div className="pb-6 pr-10 sm:pb-7 sm:pr-14">
                <p
                  className="max-w-[760px] text-base
                             leading-[1.85] text-black
                             sm:text-[17px]"
                >
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}