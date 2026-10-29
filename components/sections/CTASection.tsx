import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  MessageCircle,
} from "lucide-react";

import Container from "../ui/Container";
import { ctaSection } from "../../config/site";

export default function CTASection() {
  const bookingHref = ctaSection.bookingHref.trim();
  const isExternalBooking = /^https?:\/\//i.test(bookingHref);

  return (
    <section
      id="contact"
      aria-labelledby="cta-heading"
      className="scroll-mt-28 bg-[#f6d2c3]
                 pb-12 pt-4 sm:pb-16 sm:pt-6 lg:pb-20"
    >
      <Container>
        <div
          className="relative isolate overflow-hidden
                     rounded-[28px] border border-[#ab4219]/25
                     bg-[#ab4219]
                     shadow-[0_24px_60px_-35px_#ab421980]
                     sm:rounded-[36px]"
        >
          {/* Animated brand gradient */}
          <div
            aria-hidden="true"
            className="cta-gradient pointer-events-none
                       absolute inset-0
                       bg-[linear-gradient(120deg,#ab4219_0%,#ff4c00_48%,#ab4219_100%)]
                       bg-[length:200%_200%]"
          />

          {/* Darkens the gradient for readable white text */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0
                       bg-[#ab4219]/60"
          />

          {/* Floating decorative shapes */}
          <div
            aria-hidden="true"
            className="cta-orbit pointer-events-none absolute
                       -right-24 -top-28 size-80
                       rounded-full border border-white/15
                       sm:-right-20 sm:size-[420px]"
          >
            <div
              className="absolute inset-9 rounded-full
                         border border-white/10"
            />
            <span
              className="absolute left-12 top-12 size-4
                         rounded-full bg-[#f6d2c3]/70"
            />
          </div>

          <div
            aria-hidden="true"
            className="cta-float pointer-events-none absolute
                       -bottom-32 -left-20 size-72
                       rounded-full border border-[#f6d2c3]/20
                       bg-[#ff4c00]/10"
          />

          {/* Content */}
          <div
            className="relative z-10 px-6 py-12
                       sm:px-10 sm:py-16 lg:px-14 lg:py-20"
          >
            <div className="mx-auto max-w-[850px] text-center">
              <div
                className="inline-flex items-center gap-2
                           rounded-full border border-white/20
                           bg-white/10 px-4 py-2 text-white"
              >
                <MessageCircle
                  aria-hidden="true"
                  strokeWidth={1.7}
                  className="size-4 shrink-0"
                />

                <p className="text-xs font-medium sm:text-sm">
                  {ctaSection.eyebrow}
                </p>
              </div>

              <h2
                id="cta-heading"
                className="mt-6 text-[34px] font-bold
                           leading-[1.08] tracking-[-0.035em]
                           sm:text-[46px] lg:text-[60px]"
              >
                <span className="block text-white">
                  {ctaSection.heading}
                </span>

                <span className="mt-2 block text-[#f6d2c3]">
                  {ctaSection.headingHighlight}
                </span>
              </h2>

              <p
                className="mx-auto mt-6 max-w-[600px]
                           text-base leading-[1.8] text-white
                           sm:text-lg"
              >
                {ctaSection.description}
              </p>

              <div
                className="mt-8 flex flex-col items-stretch
                           justify-center gap-3
                           sm:mt-10 sm:flex-row sm:items-center
                           sm:gap-4"
              >
                {/* Primary action: contact page */}
                <Link
                  href={ctaSection.contactHref}
                  className="group inline-flex min-h-14
                             items-center justify-center gap-3
                             rounded-full border border-[#fff8f3]
                             bg-[#fff8f3] px-7 py-4
                             text-sm font-bold text-[#ab4219]
                             transition-[background-color,transform]
                             duration-200
                             hover:bg-[#f6d2c3]
                             motion-safe:hover:-translate-y-0.5
                             focus-visible:outline-2
                             focus-visible:outline-offset-4
                             focus-visible:outline-white
                             sm:text-base
                             motion-reduce:transition-none"
                >
                  {ctaSection.contactLabel}

                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.8}
                    className="size-5 shrink-0
                               transition-transform duration-200
                               motion-safe:group-hover:-translate-y-0.5
                               motion-safe:group-hover:translate-x-0.5
                               motion-reduce:transition-none"
                  />
                </Link>

                {/* Optional action: booking link */}
                {bookingHref && (
                  <a
                    href={bookingHref}
                    target={isExternalBooking ? "_blank" : undefined}
                    rel={
                      isExternalBooking
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="inline-flex min-h-14
                               items-center justify-center gap-3
                               rounded-full border border-white/50
                               bg-[#ab4219]/20 px-7 py-4
                               text-sm font-semibold text-white
                               transition-colors duration-200
                               hover:border-white hover:bg-white/15
                               focus-visible:outline-2
                               focus-visible:outline-offset-4
                               focus-visible:outline-white
                               sm:text-base
                               motion-reduce:transition-none"
                  >
                    <CalendarDays
                      aria-hidden="true"
                      strokeWidth={1.7}
                      className="size-5 shrink-0"
                    />

                    {ctaSection.bookingLabel}

                    {isExternalBooking && (
                      <span className="sr-only">
                        (opens in a new tab)
                      </span>
                    )}
                  </a>
                )}
              </div>

              <p
                className="mt-6 text-sm leading-relaxed
                           text-white/90"
              >
                {ctaSection.note}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}