"use client";

import {
  startTransition,
  useEffect,
  useState,
  type MouseEvent,
} from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { FaLinkedinIn } from "react-icons/fa";
import { SiGithub, SiInstagram } from "react-icons/si";

import Container from "../ui/Container";
import {
  contactPage,
  navigation,
  serviceCards,
  siteConfig,
} from "../../config/site";

const focusClasses =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ab4219]";

const linkClasses = `
  inline-flex min-h-11 items-center rounded-md
  py-2 text-sm leading-relaxed text-black/75
  underline-offset-4
  hover:text-[#ab4219] hover:underline
  motion-safe:transition-colors motion-safe:duration-200
  ${focusClasses}
`;

function getNavigationHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

function clearUrlHash() {
  if (!window.location.hash) return;

  window.history.replaceState(
    window.history.state,
    "",
    window.location.pathname + window.location.search,
  );
}

function getScrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "instant"
    : "smooth";
}

export default function Footer() {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    startTransition(() => {
      setYear(new Date().getFullYear());
    });
  }, []);

  const socialLinks = [
    {
      label: "LinkedIn",
      href:
        contactPage.socialLinks.linkedin || siteConfig.linkedinUrl,
      icon: FaLinkedinIn,
    },
    {
      label: "GitHub",
      href: contactPage.socialLinks.github,
      icon: SiGithub,
    },
    {
      label: "Instagram",
      href: contactPage.socialLinks.instagram,
      icon: SiInstagram,
    },
  ].filter((item) => Boolean(item.href));

  function handleSectionNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    // Preserve opening links in a new tab or window.
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const targetUrl = new URL(href, window.location.href);

    // Let Next.js handle navigation to other pages.
    if (
      targetUrl.origin !== window.location.origin ||
      targetUrl.pathname !== window.location.pathname ||
      targetUrl.search !== window.location.search ||
      !targetUrl.hash
    ) {
      return;
    }

    let sectionId: string;

    try {
      sectionId = decodeURIComponent(targetUrl.hash.slice(1));
    } catch {
      return;
    }

    const section = document.getElementById(sectionId);

    if (!section) return;

    event.preventDefault();

    const header = document.querySelector<HTMLElement>("header");
    const headerHeight = header?.getBoundingClientRect().height ?? 104;

    const targetTop =
      window.scrollY +
      section.getBoundingClientRect().top -
      headerHeight -
      16;

    // Move keyboard focus to the destination without jumping.
    if (!section.hasAttribute("tabindex")) {
      section.setAttribute("tabindex", "-1");

      section.addEventListener(
        "blur",
        () => section.removeAttribute("tabindex"),
        { once: true },
      );
    }

    section.focus({ preventScroll: true });

    clearUrlHash();

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: getScrollBehavior(),
    });
  }

  function scrollToTop() {
    clearUrlHash();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: getScrollBehavior(),
    });
  }

  return (
    <footer
      aria-label="Website footer"
      className="border-t border-[#ab4219]/15 bg-[#f6d2c3] text-black"
    >
      <Container>
        <div
          className="grid gap-8 py-9
                     sm:grid-cols-2 sm:gap-x-10 sm:py-10
                     lg:grid-cols-[1.2fr_0.65fr_1fr]
                     lg:gap-12"
        >
          {/* Name, description, and social profiles */}
          <div className="min-w-0 sm:col-span-2 lg:col-span-1">
            <Link
              href="/#home"
              onClick={(event) =>
                handleSectionNavigation(event, "/#home")
              }
              className={`inline-block max-w-full rounded-md
                          text-[23px] font-extrabold
                          leading-tight tracking-tight
                          text-[#ff4c00] sm:text-[26px]
                          ${focusClasses}`}
            >
              {siteConfig.name}
              <span className="text-[#ab4219]">.</span>
            </Link>

            <p
              className="mt-4 max-w-[340px]
                         text-sm leading-[1.85] text-black/75"
            >
              Thoughtful websites, useful apps, and automation
              that gives you more time for your business.
            </p>

            {socialLinks.length > 0 && (
              <nav aria-label="Social profiles" className="mt-5">
                <ul className="flex flex-wrap items-center gap-2">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${label} (opens in a new tab)`}
                        className={`flex size-11 items-center
                                    justify-center rounded-full
                                    border border-[#ab4219]/20
                                    text-[#ab4219]
                                    hover:border-[#ab4219]
                                    hover:bg-[#ab4219]
                                    hover:text-white
                                    motion-safe:transition-[background-color,color,border-color,transform]
                                    motion-safe:duration-200
                                    motion-safe:hover:-translate-y-0.5
                                    ${focusClasses}`}
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-[18px]"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {/* Navigation links */}
          <nav aria-labelledby="footer-explore-heading">
            <h2
              id="footer-explore-heading"
              className="text-base font-bold text-[#ab4219]"
            >
              Explore
            </h2>

            <ul className="mt-3 grid grid-cols-2 gap-x-5">
              {navigation.map((item) => {
                const href = getNavigationHref(item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={href}
                      onClick={(event) =>
                        handleSectionNavigation(event, href)
                      }
                      className={linkClasses}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Service links */}
          <nav aria-labelledby="footer-services-heading">
            <h2
              id="footer-services-heading"
              className="text-base font-bold text-[#ab4219]"
            >
              Services
            </h2>

            <ul className="mt-3">
              {serviceCards.map((service) => {
                const href = `/#${service.id}`;

                return (
                  <li key={service.id}>
                    <Link
                      href={href}
                      onClick={(event) =>
                        handleSectionNavigation(event, href)
                      }
                      className={linkClasses}
                    >
                      {service.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Copyright and back to top */}
        <div
          className="flex flex-col-reverse items-start gap-2
                     border-t border-[#ab4219]/15 py-3
                     sm:flex-row sm:items-center sm:justify-between
                     sm:gap-5"
        >
          <p className="text-xs leading-relaxed text-black/60">
            ©{" "}
            <span className="inline-block min-w-[4ch] tabular-nums">
              {year ?? "\u00A0"}
            </span>{" "}
            {siteConfig.name}. All rights reserved.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className={`group inline-flex min-h-11
                        cursor-pointer items-center gap-2
                        rounded-md py-2 text-sm
                        font-medium text-[#ab4219]
                        hover:underline hover:underline-offset-4
                        ${focusClasses}`}
          >
            Back to top

            <ArrowUp
              aria-hidden="true"
              className="size-4
                         motion-safe:transition-transform
                         motion-safe:duration-200
                         motion-safe:group-hover:-translate-y-1
                         motion-safe:group-focus-visible:-translate-y-1"
            />
          </button>
        </div>
      </Container>
    </footer>
  );
}