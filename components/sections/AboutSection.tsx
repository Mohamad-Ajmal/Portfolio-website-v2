import Image from "next/image";
import {
  ArrowUpRight,
  Code2,
  Sparkles,
  Workflow,
} from "lucide-react";

import Container from "../ui/Container";
import GradientLink from "../ui/GradientLink";

import { aboutSection } from "../../config/site";

const highlightIcons = {
  development: Code2,
  automation: Workflow,
};

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative isolate scroll-mt-28
                 overflow-hidden bg-[#f6d2c3]
                 pb-16 pt-8 sm:pb-20 sm:pt-10
                 lg:pb-24 lg:pt-12"
    >
      <Container>
        <div
          className="grid items-center gap-10
                     lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]
                     lg:gap-10"
        >
          {/* Left: introduction */}
          <div className="relative z-10 min-w-0">
            <div className="flex items-center gap-2.5">
              <p
                className="text-sm font-bold uppercase
                           tracking-[0.14em] text-[#ab4219]"
              >
                {aboutSection.eyebrow}
              </p>
            </div>

            <h2
              id="about-heading"
              className="mt-6 text-[36px] font-bold
                         leading-[1.08] tracking-[-0.035em]
                         sm:text-[46px] lg:text-[52px]"
            >
              <span className="block text-black">
                {aboutSection.heading}
              </span>

              <span className="mt-1 block text-[#ff4c00]">
                {aboutSection.headingHighlight}
              </span>
            </h2>

            <div className="mt-7 space-y-5 sm:space-y-6">
              {aboutSection.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-[1.85]
                             text-black sm:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 sm:mt-9">
              <GradientLink
                href={aboutSection.buttonHref}
                className="max-w-full text-center"
              >
                {aboutSection.buttonLabel}

                <ArrowUpRight
                  aria-hidden="true"
                  className="size-5 shrink-0"
                />
              </GradientLink>
            </div>
          </div>

          {/* Right: portrait and floating cards */}
          <div className="relative mx-auto w-full max-w-[500px]">
            <div
              className="relative aspect-[4/5]
                         sm:aspect-[5/6] lg:aspect-[4/5]"
            >
              {/* Soft orange backdrop behind the portrait */}
              <div
                aria-hidden="true"
                className="absolute inset-x-[8%] bottom-[8%]
                           top-[16%] rounded-full
                           bg-[#ff4c00]/10 blur-3xl"
              />

              <Image
                src={aboutSection.image.src}
                alt={aboutSection.image.alt}
                fill
                sizes="(min-width: 1024px) 460px,
                       (min-width: 640px) 500px,
                       100vw"
                className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_0%,black_80%,transparent_100%)]"
              />
            </div>

            {/* Details below the portrait on small screens */}
            <div className="-mt-2 grid grid-cols-1 gap-3 sm:hidden">
              {/* {aboutSection.highlights.slice(0, 2).map((item) => {
                const Icon =
                  highlightIcons[
                    item.id as keyof typeof highlightIcons
                  ] ?? Sparkles;

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 rounded-2xl
                               border border-[#ab4219]/15
                               bg-[#fff8f3] p-4"
                  >
                    <span
                      className="flex size-10 shrink-0
                                 items-center justify-center
                                 rounded-xl bg-[#ab4219] text-white"
                    >
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.7}
                        className="size-5"
                      />
                    </span>

                    <div>
                      <p className="text-sm font-bold text-black">
                        {item.title}
                      </p>

                      <p className="mt-1 text-xs text-black/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}