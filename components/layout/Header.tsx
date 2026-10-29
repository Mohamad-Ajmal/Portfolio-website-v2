"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import Container from "../ui/Container";
import { Button, ButtonLink } from "../ui/Button";
import { navigation, siteConfig } from "../../config/site";
import ScrollProgress from "../ui/ScrollProgress";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRowRef = useRef<HTMLDivElement>(null);
  const navigationFrameRef = useRef<number | null>(null);

  // Clean up any pending navigation frame.
  useEffect(() => {
    return () => {
      if (navigationFrameRef.current !== null) {
        window.cancelAnimationFrame(navigationFrameRef.current);
      }
    };
  }, []);

  // Close the mobile menu with Escape and restore focus.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Close the mobile menu when switching to desktop.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");

    function handleBreakpointChange(event: MediaQueryListEvent) {
      if (event.matches) {
        setIsOpen(false);
      }
    }

    desktop.addEventListener("change", handleBreakpointChange);

    return () => {
      desktop.removeEventListener("change", handleBreakpointChange);
    };
  }, []);

  // Update the active navigation link while scrolling.
  useEffect(() => {
    let frameId: number | null = null;

    function updateActiveSection() {
      frameId = null;

      const sections = navigation.flatMap((item) => {
        const targetUrl = new URL(item.href, window.location.href);

        if (
          targetUrl.origin !== window.location.origin ||
          targetUrl.pathname !== window.location.pathname ||
          !targetUrl.hash
        ) {
          return [];
        }

        let id: string;

        try {
          id = decodeURIComponent(targetUrl.hash.slice(1));
        } catch {
          return [];
        }

        const element = document.getElementById(id);

        return element ? [{ id, element }] : [];
      });

      if (sections.length === 0) {
        setActiveSection("");
        return;
      }

      // Follow the actual section order on the page.
      sections.sort(
        (a, b) =>
          a.element.getBoundingClientRect().top -
          b.element.getBoundingClientRect().top,
      );

      const headerHeight = headerRowRef.current?.offsetHeight ?? 104;
      const activationOffset = headerHeight + 24;

      let currentSection = sections[0].id;

      for (const section of sections) {
        if (
          section.element.getBoundingClientRect().top <= activationOffset
        ) {
          currentSection = section.id;
        }
      }

      const pageHeight = document.documentElement.scrollHeight;
      const hasScrollableContent = pageHeight > window.innerHeight + 2;
      const isAtBottom =
        window.scrollY + window.innerHeight >= pageHeight - 2;

      if (hasScrollableContent && isAtBottom) {
        currentSection = sections[sections.length - 1].id;
      }

      setActiveSection(currentSection);
    }

    function scheduleUpdate() {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateActiveSection);
      }
    }

    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  function closeMenu() {
    setIsOpen(false);
  }

  // Scroll to sections on this page without changing the URL.
  function handleNavigation(
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    // Preserve normal new-tab and new-window behavior.
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

    // Let Next.js handle links to other pages normally.
    if (
      targetUrl.origin !== window.location.origin ||
      targetUrl.pathname !== window.location.pathname ||
      targetUrl.search !== window.location.search ||
      !targetUrl.hash
    ) {
      closeMenu();
      return;
    }

    let sectionId: string;

    try {
      sectionId = decodeURIComponent(targetUrl.hash.slice(1));
    } catch {
      closeMenu();
      return;
    }

    const section = document.getElementById(sectionId);

    if (!section) {
      closeMenu();
      return;
    }

    event.preventDefault();
    closeMenu();
    setActiveSection(sectionId);

    if (navigationFrameRef.current !== null) {
      window.cancelAnimationFrame(navigationFrameRef.current);
    }

    // Wait for the mobile menu to close before measuring the section.
    navigationFrameRef.current = window.requestAnimationFrame(() => {
      navigationFrameRef.current = null;

      const headerHeight = headerRowRef.current?.offsetHeight ?? 104;
      const top =
        window.scrollY +
        section.getBoundingClientRect().top -
        headerHeight -
        16;

      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      // Move keyboard focus along with the navigation.
      const previousTabIndex = section.getAttribute("tabindex");

      if (previousTabIndex === null) {
        section.setAttribute("tabindex", "-1");

        section.addEventListener(
          "blur",
          () => section.removeAttribute("tabindex"),
          { once: true },
        );
      }

      section.focus({ preventScroll: true });

      window.scrollTo({
        top: Math.max(0, top),
        behavior: reducedMotion ? "instant" : "smooth",
      });

      // Clear a hash left by an earlier direct section link.
      if (window.location.hash) {
        window.history.replaceState(
          window.history.state,
          "",
          window.location.pathname + window.location.search,
        );
      }
    });
  }

  function getLinkClasses(isActive: boolean, isMobile = false) {
    return [
      "rounded-xl text-base font-semibold",
      "transition-[color,background-color,box-shadow] duration-200",
      "motion-reduce:transition-none",
      "focus-visible:outline-2 focus-visible:outline-offset-4",
      "focus-visible:outline-brand-dark",
      isMobile
        ? "block px-5 py-3.5"
        : "inline-flex items-center justify-center px-4 py-3",
      isActive
        ? "bg-highlight text-brand-dark shadow-[0_4px_14px_#ab421926]"
        : "text-muted hover:bg-highlight hover:text-brand-dark hover:shadow-[0_4px_14px_#ab421926]",
    ].join(" ");
  }

  const linkedInClasses =
    "border-[#0A66C2]! bg-[#0A66C2]! bg-none! text-white! " +
    "hover:border-[#004182]! hover:bg-[#004182]! " +
    "focus-visible:outline-[#0A66C2]!";

  return (
    <>
        <header
        className="sticky top-0 z-50 isolate border-b
                    border-brand-dark/20 bg-white"
        >
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0
                    bg-[radial-gradient(ellipse_at_center,#ff4c001a_0%,#ff4c0021_55%,#ff4c0029_100%)]"
        />

        <Container className="relative z-10">
            <div
            ref={headerRowRef}
            className="flex min-h-24 items-center justify-between
                        gap-4 py-5 sm:min-h-[104px] sm:gap-5 sm:py-6"
            >
            {/* Profile and name */}
            <Link
                href="/#home"
                onClick={(event) => handleNavigation(event, "/#home")}
                aria-label={`${siteConfig.name} — Home`}
                className="flex min-w-0 items-center gap-3 rounded-xl
                        focus-visible:outline-2
                        focus-visible:outline-offset-4
                        focus-visible:outline-brand-dark"
            >
                <span
                className="flex size-12 shrink-0 items-center justify-center
                            overflow-hidden rounded-full
                            border border-brand-dark/30 bg-white/75
                            sm:size-14"
                >
                {siteConfig.avatar ? (
                    <Image
                    src={siteConfig.avatar}
                    alt=""
                    width={56}
                    height={56}
                    className="size-full object-cover"
                    />
                ) : (
                    <span
                    className="text-lg font-extrabold
                                text-brand-dark sm:text-xl"
                    >
                    {siteConfig.initials}
                    </span>
                )}
                </span>

                <span
                className="min-w-0 truncate font-serif text-xl
                            font-black leading-tight tracking-tight
                            text-heading sm:text-2xl"
                >
                {siteConfig.name}
                <span className="text-brand-dark">.</span>
                </span>
            </Link>

            {/* Desktop navigation */}
            <nav
                aria-label="Main navigation"
                className="hidden shrink-0 items-center gap-1 xl:flex"
            >
                {navigation.map((item) => {
                const sectionId = item.href.split("#")[1];
                const isActive =
                    Boolean(sectionId) && activeSection === sectionId;

                return (
                    <Link
                    key={item.href}
                    href={item.href}
                    onClick={(event) => handleNavigation(event, item.href)}
                    aria-current={isActive ? "location" : undefined}
                    className={getLinkClasses(isActive)}
                    >
                    {item.label}
                    </Link>
                );
                })}
            </nav>

            {/* LinkedIn and mobile menu toggle */}
            <div className="flex shrink-0 items-center gap-3">
                {siteConfig.linkedinUrl && (
                <ButtonLink
                    href={siteConfig.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit my LinkedIn profile (opens in a new tab)"
                    className={`hidden min-h-12 min-w-12 sm:inline-flex ${linkedInClasses}`}
                >
                    <svg
                    aria-hidden="true"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.555V9h3.564v11.452z" />
                    </svg>
                </ButtonLink>
                )}

                <Button
                ref={toggleRef}
                variant="outline"
                size="icon"
                className="min-h-12 min-w-12 xl:hidden"
                aria-label={isOpen ? "Close navigation" : "Open navigation"}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                onClick={() => setIsOpen((previous) => !previous)}
                >
                <svg
                    aria-hidden="true"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                >
                    {isOpen ? (
                    <path d="m6 6 12 12M18 6 6 18" />
                    ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
                </Button>
            </div>
            </div>

            {/* Mobile navigation */}
            <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            hidden={!isOpen}
            className="max-h-[calc(100dvh-104px)] overflow-y-auto
                        overscroll-contain border-t border-brand-dark/20
                        pb-6 pt-4 xl:hidden"
            >
            <div className="flex flex-col gap-2">
                {navigation.map((item) => {
                const sectionId = item.href.split("#")[1];
                const isActive =
                    Boolean(sectionId) && activeSection === sectionId;

                return (
                    <Link
                    key={item.href}
                    href={item.href}
                    onClick={(event) => handleNavigation(event, item.href)}
                    aria-current={isActive ? "location" : undefined}
                    className={getLinkClasses(isActive, true)}
                    >
                    {item.label}
                    </Link>
                );
                })}
            </div>

            {siteConfig.linkedinUrl && (
                <Link
                href={siteConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                aria-label="Visit my LinkedIn profile (opens in a new tab)"
                className={`mt-5 inline-flex min-h-12 w-full items-center
                            justify-center gap-2 rounded-xl px-5 py-3
                            text-base font-bold transition-colors
                            focus-visible:outline-2 focus-visible:outline-offset-4
                            motion-reduce:transition-none
                            ${linkedInClasses}`}
                >
                LinkedIn
                <span aria-hidden="true">↗</span>
                </Link>
            )}
            </nav>
        </Container>
        </header>
        <ScrollProgress />
    </>
  );
}