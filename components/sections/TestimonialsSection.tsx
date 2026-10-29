import Image from "next/image";
import { useId } from "react";
import { Quote } from "lucide-react";

import Container from "../ui/Container";
import SectionHeading from "../ui/SectionHeading";

import {
  testimonialsSection,
  type Testimonial,
} from "../../config/site";

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
}

function RatingStars({ rating }: { rating: number }) {
  const uniqueId = useId();
  const score = Math.max(0, Math.min(5, rating));

  const starPath =
    "M12 3 14.78 8.63 21 9.54 16.5 13.93 " +
    "17.56 20.13 12 17.2 6.44 20.13 7.5 13.93 " +
    "3 9.54 9.22 8.63 12 3Z";

  return (
    <div
      role="img"
      aria-label={`${score} out of 5 stars`}
      className="flex items-center justify-center gap-1"
    >
      {Array.from({ length: 5 }, (_, index) => {
        const fill = Math.max(0, Math.min(1, score - index));
        const clipId = `${uniqueId}-star-${index}`;

        return (
          <svg
            key={index}
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="size-7 shrink-0"
          >
            <defs>
              <clipPath id={clipId}>
                <rect
                  x="0"
                  y="0"
                  width={24 * fill}
                  height="24"
                />
              </clipPath>
            </defs>

            <path d={starPath} fill="#f6d2c3" />

            <path
              d={starPath}
              fill="#ff4c00"
              clipPath={`url(#${clipId})`}
            />
          </svg>
        );
      })}
    </div>
  );
}

export function TestimonialCard({
  quote,
  name,
  role,
  logo,
  avatar,
  rating,
}: Testimonial) {
  return (
    <figure
      className="flex h-full min-w-0 flex-col
                 rounded-[24px] border border-[#ab4219]/10
                 bg-[#fffaf7] px-6 py-8
                 transition-colors duration-200
                 hover:border-[#ab4219]/25
                 sm:px-8 sm:py-9 lg:px-9
                 motion-reduce:transition-none"
    >
      {/* Centered rating */}
      <div className="mb-5">
        {typeof rating === "number" && Number.isFinite(rating) ? (
          <RatingStars rating={rating} />
        ) : (
          <Quote
            aria-hidden="true"
            strokeWidth={1.5}
            className="mx-auto size-7 text-[#ab4219]"
          />
        )}
      </div>

      {/* Quote only: no separate card title */}
      <blockquote className="flex-1">
        <p
          className="whitespace-pre-line text-base
                     leading-[1.8] text-black
                     sm:text-[17px]"
        >
          {quote}
        </p>
      </blockquote>

      {/* Company logo and attribution */}
      <figcaption
        className="mt-6 flex flex-wrap items-center gap-4
                   border-t border-[#ab4219]/15 pt-6
                   sm:flex-nowrap sm:gap-5"
      >
        {logo ? (
          <div className="relative h-16 w-28 shrink-0 sm:w-32">
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              sizes="128px"
              className="object-contain object-left"
            />
          </div>
        ) : avatar ? (
          <Image
            src={avatar}
            alt=""
            width={56}
            height={56}
            className="size-14 shrink-0 rounded-full
                       border border-[#ab4219]/15 object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex size-14 shrink-0 items-center
                       justify-center rounded-full
                       border border-[#ab4219]/15
                       bg-[#f6d2c3]/60
                       text-base font-bold text-[#ab4219]"
          >
            {getInitials(name)}
          </div>
        )}

        <div className="min-w-0 flex-1 basis-40 sm:basis-auto">
          <p className="text-base font-bold leading-snug text-black">
            {name}
          </p>

          <p className="mt-1.5 text-sm leading-relaxed text-black/65">
            {role}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      id="reviews"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-28 bg-[#f6d2c3]
                 pb-16 pt-6 sm:pb-20 sm:pt-8 lg:pb-24"
    >
      <Container>
        <SectionHeading
          id="testimonials-heading"
          title={testimonialsSection.heading}
          description={testimonialsSection.description}
        />

        <div
          className="mt-9 grid grid-cols-1 items-stretch
                     gap-6 sm:mt-11 md:grid-cols-2
                     lg:mt-12 lg:gap-7"
        >
          {testimonialsSection.items.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              {...testimonial}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}