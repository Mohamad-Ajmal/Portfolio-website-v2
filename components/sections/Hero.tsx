import Image from "next/image";
import {
  BadgeCheck,
  BriefcaseBusiness,
  CalendarDays,
  Check,
  UsersRound,
  type LucideIcon,
} from "lucide-react";

import Container from "../ui/Container";
import GradientLink from "../ui/GradientLink";

import {
  clientLogos,
  heroContent,
  heroStatistics,
  type ClientLogo,
  type HeroStatistic,
  type StatisticIcon,
} from "../../config/site";

const statisticIcons: Record<StatisticIcon, LucideIcon> = {
  calendar: CalendarDays,
  projects: BriefcaseBusiness,
  clients: UsersRound,
  success: BadgeCheck,
};

function LogoRow({
  items,
  reverse = false,
}: {
  items: ClientLogo[];
  reverse?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <div
      className="group overflow-hidden
                 [mask-image:linear-gradient(to_right,transparent,black_7%,black_93%,transparent)]
                 motion-reduce:overflow-visible
                 motion-reduce:[mask-image:none]"
    >
      <div
        className={`flex w-max animate-logo-scroll
                    group-hover:[animation-play-state:paused]
                    motion-reduce:w-full motion-reduce:animate-none
                    ${reverse ? "[animation-direction:reverse]" : ""}`}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1 ? true : undefined}
            className={`flex min-w-[960px] shrink-0
                        items-center justify-around
                        motion-reduce:min-w-0 motion-reduce:w-full
                        motion-reduce:flex-wrap motion-reduce:justify-center
                        ${copy === 1 ? "motion-reduce:hidden" : ""}`}
          >
            {items.map((client) => (
              <div
                key={client.id}
                className="flex h-20 w-40 shrink-0 items-center
                           justify-center px-5 sm:h-24 sm:w-44"
              >
                <Image
                  src={client.src}
                  alt={copy === 1 ? "" : client.name}
                  width={160}
                  height={64}
                  className="h-14 w-full object-contain
                             transition-transform duration-300
                             hover:-translate-y-1 hover:scale-105
                             motion-reduce:transform-none
                             motion-reduce:transition-none"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingButton() {
  return (
    <div className="mt-12 sm:mt-14">
      <GradientLink
        href={heroContent.bookingHref}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
      >
        <span
          aria-hidden="true"
          className="relative -mb-1 -mt-7 flex size-16 shrink-0
                     items-center justify-center
                     sm:-mt-9 sm:size-20"
        >
          <span
            className="flex size-full animate-float-soft
                       items-center justify-center
                       motion-reduce:animate-none"
          >
            <span
              className="grid size-full -rotate-12 place-items-center
                         rounded-2xl border-2 border-brand-dark/20
                         bg-white text-brand-dark
                         shadow-[0_8px_18px_#ab42192b]
                         transition-transform duration-300
                         group-hover:-rotate-6
                         motion-reduce:transition-none"
            >
              <CalendarDays
                className="size-10 sm:size-12"
                strokeWidth={1.7}
              />
            </span>
          </span>
        </span>

        <span className="whitespace-nowrap text-lg font-bold sm:text-xl">
          {heroContent.bookingLabel}
        </span>
      </GradientLink>
    </div>
  );
}

function SuccessBadge({ statistic }: { statistic: HeroStatistic }) {
  const hasPercent = statistic.value.endsWith("%");

  const displayValue = hasPercent
    ? statistic.value.slice(0, -1)
    : statistic.value;

  return (
    <div
      className="relative mx-auto mt-10 w-fit
                 lg:absolute lg:right-0 lg:top-24 lg:mt-0"
    >
      <div
        role="img"
        aria-label={`${statistic.value} ${statistic.label}`}
        className="relative grid size-32 rotate-12
                   place-items-center rounded-full
                   bg-[conic-gradient(from_30deg,#ff4c00,#ab4219,#ff4c00,#ab4219,#ff4c00)]
                   p-2.5 shadow-[0_12px_30px_#ab421926]
                   transition-transform duration-300
                   hover:rotate-6 lg:size-[152px]
                   motion-reduce:transition-none"
      >
        <span
          aria-hidden="true"
          className="absolute -top-1.5 left-1/2 grid size-7
                     -translate-x-1/2 place-items-center
                     rounded-full border-2 border-white
                     bg-brand-dark text-white shadow-sm"
        >
          <Check className="size-4" strokeWidth={3} />
        </span>

        <div
          aria-hidden="true"
          className="flex size-full flex-col items-center
                     justify-center rounded-full
                     border border-white/60 bg-brand-dark text-white
                     ring-1 ring-white/25 ring-offset-2
                     ring-offset-brand-dark"
        >
          <span
            className="whitespace-nowrap font-serif
                       text-[42px] font-bold leading-none
                       lg:text-[50px]"
          >
            {displayValue}

            {hasPercent && (
              <span className="text-lg lg:text-xl">%</span>
            )}
          </span>

          <span
            className="mt-2 max-w-24 text-center text-[9px]
                       font-bold uppercase leading-tight
                       tracking-[0.06em] lg:text-[10px]"
          >
            {statistic.label}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const midpoint = Math.ceil(clientLogos.length / 2);
  const firstRow = clientLogos.slice(0, midpoint);
  const secondRow = clientLogos.slice(midpoint);

  const successStatistic = heroStatistics.find(
    (statistic) => statistic.icon === "success",
  );

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden
                 bg-[#f6d2c3]
                 bg-[linear-gradient(180deg,#e8b7a2_0%,#f6d2c3_60%,#f6d2c3_100%)]
                 pb-12 pt-12 sm:pb-14 sm:pt-16 lg:pb-16 lg:pt-20"
    >
      <Container wide className="relative z-10">
        {/* Intro and booking button */}
        <div className="relative">
          <div className="flex flex-col items-center text-center">
            <div
              className="inline-flex max-w-full items-center
                         justify-center gap-3 rounded-full
                         border border-brand-dark/15
                         bg-white px-5 py-3.5
                         shadow-[0_2px_8px_#ab421908]
                         sm:px-7 sm:py-4"
            >
              <span
                aria-hidden="true"
                className="size-2 shrink-0 rounded-full
                           bg-brand-light ring-4 ring-brand-light/10"
              />

              <h1
                id="hero-title"
                className="text-xs font-bold uppercase
                           leading-relaxed tracking-[0.12em]
                           text-brand-dark sm:text-sm lg:text-base"
              >
                {heroContent.heading}
              </h1>
            </div>

            <BookingButton />
          </div>

          {successStatistic && (
            <SuccessBadge statistic={successStatistic} />
          )}
        </div>

        {/* Client logos */}
        {clientLogos.length > 0 && (
          <div className="mx-auto mt-10 max-w-[960px] sm:mt-12">
            <p
              className="text-center text-xs font-semibold
                         uppercase tracking-wide text-brand-dark
                         sm:text-sm"
            >
              {heroContent.clientsHeading}
            </p>

            <div className="mt-7 space-y-4 sm:mt-8 sm:space-y-5">
              <LogoRow items={firstRow} />
              <LogoRow items={secondRow} reverse />
            </div>
          </div>
        )}

        {/* Statistics */}
        {heroStatistics.length > 0 && (
          <dl
            className="mx-auto mt-14 grid w-full max-w-[1240px]
                       grid-cols-2 gap-y-9
                       sm:mt-16 lg:mt-24 lg:grid-cols-4"
          >
            {heroStatistics.map((statistic, index) => {
              const StatIcon = statisticIcons[statistic.icon];

              return (
                <div
                  key={statistic.icon}
                  className={`flex min-w-0 flex-col items-center
                              px-2 sm:px-5
                              ${
                                index % 2 === 1
                                  ? "border-l border-brand-dark/25"
                                  : ""
                              }
                              ${
                                index % 4 === 0
                                  ? "lg:border-l-0"
                                  : "lg:border-l lg:border-brand-dark/25"
                              }`}
                >
                  <dt
                    className="order-2 mt-3 text-center
                               text-xs font-semibold text-body
                               sm:text-sm lg:text-[15px]"
                  >
                    {statistic.label}
                  </dt>

                  <dd className="order-1 flex items-center gap-2 sm:gap-3">
                    <span
                      className="grid size-9 shrink-0 place-items-center
                                 rounded-full bg-brand-dark
                                 text-white sm:size-12"
                    >
                      <StatIcon
                        aria-hidden="true"
                        className="size-5 sm:size-6"
                        strokeWidth={1.6}
                      />
                    </span>

                    <span
                      className="whitespace-nowrap font-serif
                                 text-3xl font-bold leading-none
                                 tracking-tight text-brand-light
                                 sm:text-5xl lg:text-[52px]"
                    >
                      {statistic.value}
                    </span>
                  </dd>
                </div>
              );
            })}
          </dl>
        )}
      </Container>
    </section>
  );
}