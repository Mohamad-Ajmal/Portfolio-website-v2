import { Great_Vibes } from "next/font/google";

import Container from "../ui/Container";
import { designQuote } from "../../config/site";

const signatureFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

function AuthorStroke({ flipped = false }: { flipped?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 12"
      fill="currentColor"
      className={`h-3 w-8 shrink-0 text-black sm:w-12 ${
        flipped ? "rotate-180" : ""
      }`}
    >
      <path d="M2 4C12 4 29 5 46 3C35 7 18 9 4 8C1 8 0 5 2 4Z" />
    </svg>
  );
}

export default function QuoteSection() {
  return (
    <section
      aria-label="Design philosophy"
      className="bg-[#f6d2c3] py-14 sm:py-16 lg:py-20"
    >
      <Container>
        <figure
          className="relative mx-auto max-w-[860px]
                     rounded-[26px] border border-brand-dark/20
                     bg-white px-6 py-10
                     shadow-[0_18px_55px_-20px_#ab42194d]
                     sm:rounded-[30px] sm:px-12 sm:py-12
                     lg:px-16 lg:py-14"
        >
          {/* Top accent */}
          <span
            aria-hidden="true"
            className="absolute -top-px left-1/2 h-1 w-20
                       -translate-x-1/2 rounded-full bg-brand-light"
          />

          {/* Decorative quotation mark */}
          <svg
            aria-hidden="true"
            viewBox="0 0 48 40"
            fill="currentColor"
            className="mx-auto mb-8 h-11 w-14 text-brand-light
                       sm:mb-10 sm:h-12 sm:w-16"
          >
            <path d="M20 4C9 8 4 16 4 25c0 7 4 11 9 11 5 0 8-3 8-8s-3-8-8-8h-1c1-6 4-10 9-13L20 4Zm23 0C32 8 27 16 27 25c0 7 4 11 9 11 5 0 8-3 8-8s-3-8-8-8h-1c1-6 4-10 9-13l-1-3Z" />
          </svg>

          {/* Quote */}
          <blockquote
            className="mx-auto max-w-[650px] space-y-7
                       text-center text-[24px] font-normal
                       leading-[1.6] text-black
                       sm:space-y-8 sm:text-[30px]
                       lg:text-[34px]"
          >
            {designQuote.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>
                {paragraph.map((part, partIndex) =>
                  "bold" in part && part.bold ? (
                    <strong
                      key={partIndex}
                      className="font-bold uppercase"
                    >
                      {part.text}
                    </strong>
                  ) : (
                    <span key={partIndex}>{part.text}</span>
                  ),
                )}
              </p>
            ))}
          </blockquote>

          {/* Author signature */}
          <figcaption
            className="mt-10 flex items-center justify-center
                       gap-3 sm:mt-12 sm:gap-5"
          >
            <AuthorStroke />

            <cite
              className={`${signatureFont.className}
                          min-w-0 text-center text-[36px]
                          leading-[1.3] font-normal not-italic
                          text-black sm:text-[46px] lg:text-[52px]`}
            >
              {designQuote.author}
            </cite>

            <AuthorStroke flipped />
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}