"use client";

import Image from "next/image";
import {
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { Check } from "lucide-react";

import type { Service, ServiceTheme } from "../../types/services";

type ThemeStyles = {
  border: string;
  panel: string;
  activeTab: string;
  check: string;
  focus: string;
};

const themes: Record<ServiceTheme, ThemeStyles> = {
  blue: {
    border: "service-border-blue",
    panel:
      "bg-[#e3edff] bg-[linear-gradient(110deg,#edf3ff_0%,#dce8fc_55%,#c7d9fa_100%)]",
    activeTab: "bg-[#dce8fc] text-[#284b80]",
    check: "bg-[#4775c9]",
    focus: "focus-visible:outline-[#4775c9]",
  },

  purple: {
    border: "service-border-purple",
    panel:
      "bg-[#f5e5fa] bg-[linear-gradient(110deg,#faf0fc_0%,#f1ddf7_55%,#e9c9f1_100%)]",
    activeTab: "bg-[#f1ddf7] text-[#743580]",
    check: "bg-[#a650b1]",
    focus: "focus-visible:outline-[#a650b1]",
  },

  orange: {
    border: "service-border-orange",
    panel:
      "bg-[#ffe5d6] bg-[linear-gradient(110deg,#fff0e7_0%,#ffe1cf_55%,#ffd2b8_100%)]",
    activeTab: "bg-[#ffd3ba] text-brand-dark",
    check: "bg-brand-dark",
    focus: "focus-visible:outline-brand-dark",
  },

  peach: {
    border: "service-border-peach",
    panel:
      "bg-[#ffded0] bg-[linear-gradient(110deg,#ffe8df_0%,#ffd3c2_55%,#ffc1aa_100%)]",
    activeTab: "bg-[#ffded0] text-brand-dark",
    check: "bg-[#c65b35]",
    focus: "focus-visible:outline-[#c65b35]",
  },

  rose: {
    border: "service-border-rose",
    panel:
      "bg-[#ffdde2] bg-[linear-gradient(110deg,#ffe5e8_0%,#ffd5dc_55%,#ffbdc8_100%)]",
    activeTab: "bg-[#ffdde2] text-[#963249]",
    check: "bg-[#bd3f59]",
    focus: "focus-visible:outline-[#bd3f59]",
  },
};

function getTheme(theme: unknown): ThemeStyles {
  if (
    typeof theme === "string" &&
    Object.prototype.hasOwnProperty.call(themes, theme)
  ) {
    return themes[theme as ServiceTheme];
  }

  return themes.orange;
}

export default function ServiceCard({
  id,
  title,
  description,
  theme = "orange",
  tabs = [],
}: Service) {
  const uniqueId = useId();

  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [selectedId, setSelectedId] = useState(tabs[0]?.id ?? "");

  const colors = getTheme(theme);

  const selectedTab =
    tabs.find((tab) => tab.id === selectedId) ?? tabs[0];

  if (!selectedTab) return null;

  function handleTabKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    let nextIndex: number;

    switch (event.key) {
      case "ArrowRight":
        nextIndex = (index + 1) % tabs.length;
        break;

      case "ArrowLeft":
        nextIndex = (index - 1 + tabs.length) % tabs.length;
        break;

      case "Home":
        nextIndex = 0;
        break;

      case "End":
        nextIndex = tabs.length - 1;
        break;

      default:
        return;
    }

    event.preventDefault();

    setSelectedId(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <article
      id={id}
      aria-labelledby={`${uniqueId}-heading`}
      className={`service-card-border ${colors.border}
                  scroll-mt-28 rounded-[28px] p-px
                  sm:rounded-[32px]`}
    >
      <div
        className="rounded-[27px] bg-[#fff5ef] p-4
                   sm:rounded-[31px] sm:p-5 lg:p-6"
      >
        {/* Main service heading */}
        <div className="max-w-[720px]">
          <h3
            id={`${uniqueId}-heading`}
            className="text-[32px] font-bold leading-[1.1]
                       tracking-[-0.035em] text-heading
                       sm:text-[42px] lg:text-[50px]"
          >
            {title}
          </h3>

          <p
            className="mt-3 text-base leading-[1.6]
                       text-black sm:text-lg"
          >
            {description}
          </p>
        </div>

        {/* Service tabs */}
        <div
          role="tablist"
          aria-label={`${title} features`}
          aria-orientation="horizontal"
          className="mb-4 mt-5 flex gap-1 overflow-x-auto
                     px-1 py-2 sm:gap-2"
        >
          {tabs.map((tab, index) => {
            const isSelected = selectedTab.id === tab.id;

            return (
              <button
                key={tab.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                id={`${uniqueId}-tab-${tab.id}`}
                type="button"
                role="tab"
                aria-selected={isSelected}
                aria-controls={`${uniqueId}-panel-${tab.id}`}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setSelectedId(tab.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`shrink-0 cursor-pointer whitespace-nowrap
                            rounded-full px-4 py-2.5
                            text-sm font-medium sm:text-base
                            transition-colors duration-200
                            focus-visible:outline-2
                            focus-visible:outline-offset-2
                            motion-reduce:transition-none
                            ${colors.focus}
                            ${
                              isSelected
                                ? colors.activeTab
                                : "text-brand-dark/75 hover:bg-[#f6d2c3]/50 hover:text-brand-dark"
                            }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Sub-service panels */}
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`${uniqueId}-panel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={`${uniqueId}-tab-${tab.id}`}
            hidden={selectedTab.id !== tab.id}
            tabIndex={0}
            className={`rounded-[22px]
                        focus-visible:outline-2
                        focus-visible:outline-offset-4
                        ${colors.focus} ${colors.panel}`}
          >
            <div
              className="grid min-w-0 items-start gap-6 p-4
                         sm:p-5
                         lg:grid-cols-[0.95fr_1.05fr]
                         lg:gap-7 lg:p-6"
            >
              {/* Left: top-aligned heading and content */}
              <div className="min-w-0">
                <h4
                  className="text-xl font-bold leading-tight
                             tracking-tight text-heading sm:text-2xl"
                >
                  {tab.label}
                </h4>

                <p
                  className="mt-3 text-base font-medium
                             leading-[1.6] text-black"
                >
                  {tab.introduction}
                </p>

                <ul className="mt-4 space-y-2.5">
                  {tab.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5
                                 text-base leading-[1.5] text-black"
                    >
                      <span
                        className={`mt-1 grid size-[18px] shrink-0
                                    place-items-center rounded-full
                                    text-white ${colors.check}`}
                      >
                        <Check
                          aria-hidden="true"
                          className="size-3"
                          strokeWidth={2.5}
                        />
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Optional testimonial */}
                {tab.testimonial && (
                  <figure
                    className="mt-5 rounded-2xl
                               border border-brand-dark/10
                               bg-[#fff5ef] p-4"
                  >
                    <blockquote className="text-sm leading-relaxed text-black">
                      <p>“{tab.testimonial.quote}”</p>
                    </blockquote>

                    <figcaption className="mt-4 flex items-center gap-3">
                      {tab.testimonial.avatar && (
                        <Image
                          src={tab.testimonial.avatar}
                          alt=""
                          width={40}
                          height={40}
                          className="size-10 shrink-0 rounded-full object-cover"
                        />
                      )}

                      <div className="min-w-0">
                        <p className="text-sm font-bold text-black">
                          {tab.testimonial.name}
                        </p>

                        <p
                          className="mt-0.5 text-xs
                                     leading-relaxed text-black"
                        >
                          {tab.testimonial.role}
                        </p>
                      </div>
                    </figcaption>
                  </figure>
                )}
              </div>

              {/* Right: image aligned with the heading */}
              <div className="min-w-0">
                <div
                  className="overflow-hidden rounded-xl
                             border border-brand-dark/10
                             bg-[#fff5ef]
                             shadow-[0_12px_30px_-20px_#ab421940]"
                >
                  <Image
                    src={tab.image.src}
                    alt={tab.image.alt}
                    width={1000}
                    height={800}
                    sizes="(min-width: 1024px) 480px,
                           (min-width: 640px) 80vw,
                           90vw"
                    className="block h-auto w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}