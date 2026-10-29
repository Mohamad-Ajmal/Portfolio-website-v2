"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { Check, ChevronDown, LoaderCircle, Send } from "lucide-react";

import { contactPage } from "../../config/site";

const fieldClasses = [
  "block min-h-11 w-full rounded-xl",
  "border border-[#ab4219]/15 bg-white",
  "px-3.5 py-2.5 text-base text-black",
  "placeholder:text-black/40",
  "transition-colors duration-200",
  "hover:border-[#ab4219]/35",
  "focus:border-[#ab4219] focus:outline-none",
  "focus:ring-2 focus:ring-[#ab4219]/10",
  "disabled:opacity-60",
  "motion-reduce:transition-none",
].join(" ");

const labelClasses = "mb-1.5 block text-sm font-medium text-black";

export default function ContactForm() {
  const formId = useId();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const submittingRef = useRef(false);

  const [subject, setSubject] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [subjectError, setSubjectError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const services = contactPage.services;

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !dropdownRef.current?.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [isOpen, activeIndex]);

  function openDropdown(index?: number) {
    if (!services.length || isSubmitting) return;

    const selectedIndex = services.indexOf(subject);

    setActiveIndex(
      index ?? (selectedIndex >= 0 ? selectedIndex : 0),
    );
    setIsOpen(true);
  }

  function selectSubject(value: string) {
    setSubject(value);
    setSubjectError("");
    setIsOpen(false);
    triggerRef.current?.focus();
  }

  function handleOptionKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActiveIndex((index + 1) % services.length);
        break;

      case "ArrowUp":
        event.preventDefault();
        setActiveIndex((index - 1 + services.length) % services.length);
        break;

      case "Home":
        event.preventDefault();
        setActiveIndex(0);
        break;

      case "End":
        event.preventDefault();
        setActiveIndex(services.length - 1);
        break;

      case "Escape":
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        break;

      default: {
        // Jump to an option by its first letter.
        if (
          event.key.length === 1 &&
          event.key !== " " &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey
        ) {
          const letter = event.key.toLowerCase();

          for (let offset = 1; offset <= services.length; offset++) {
            const next = (index + offset) % services.length;

            if (services[next].toLowerCase().startsWith(letter)) {
              event.preventDefault();
              setActiveIndex(next);
              break;
            }
          }
        }
      }
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (submittingRef.current) return;

    const form = event.currentTarget;
    setStatus("");

    if (!form.reportValidity()) return;

    if (!subject) {
      setSubjectError("Please choose a service.");
      triggerRef.current?.focus();
      return;
    }

    const data = new FormData(form);

    const payload = {
      fullName: String(data.get("fullName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      phone: String(data.get("phone") ?? "").trim(),
      subject,
      message: String(data.get("message") ?? "").trim(),
    };

    if (!payload.fullName || !payload.message) {
      setStatus("Please enter your full name and a message.");
      return;
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setIsOpen(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result: unknown = await response.json().catch(() => null);

      const responseMessage =
        result &&
        typeof result === "object" &&
        "message" in result &&
        typeof result.message === "string"
          ? result.message
          : "";

      if (!response.ok) {
        setStatus(
          responseMessage ||
            "Your message couldn’t be submitted. Please try again.",
        );
        return;
      }

      form.reset();
      setSubject("");
      setSubjectError("");

      setStatus(
        responseMessage ||
          "Thanks for getting in touch. Your message has been submitted.",
      );
    } catch {
      setStatus(
        "I couldn’t confirm your submission. Please check your connection or contact me directly.",
      );
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <div
      className="min-w-0 rounded-[24px]
                 border border-[#ab4219]/15 bg-[#fff8f3]
                 p-5 sm:p-7"
    >
      <h2 className="text-xl font-bold tracking-tight text-black">
        Send Me a Message
      </h2>

      <p className="mt-1.5 text-sm leading-relaxed text-black/60">
        Tell me a little about your project. Fields marked * are required.
      </p>

      <form onSubmit={handleSubmit} className="mt-5">
        <fieldset disabled={isSubmitting} className="min-w-0 space-y-4">
          <legend className="sr-only">Your project details</legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="min-w-0">
              <label htmlFor={`${formId}-name`} className={labelClasses}>
                Full name <span aria-hidden="true">*</span>
              </label>

              <input
                id={`${formId}-name`}
                name="fullName"
                type="text"
                autoComplete="name"
                required
                maxLength={100}
                placeholder="Your name"
                className={fieldClasses}
              />
            </div>

            <div className="min-w-0">
              <label htmlFor={`${formId}-email`} className={labelClasses}>
                Email <span aria-hidden="true">*</span>
              </label>

              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="you@example.com"
                className={fieldClasses}
              />
            </div>
          </div>

          <div>
            <label htmlFor={`${formId}-phone`} className={labelClasses}>
              Phone{" "}
              <span className="font-normal text-black/50">
                (optional)
              </span>
            </label>

            <input
              id={`${formId}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel"
              maxLength={40}
              placeholder="Include your country code"
              className={fieldClasses}
            />
          </div>

          <div>
            <label
              id={`${formId}-subject-label`}
              htmlFor={`${formId}-subject`}
              className={labelClasses}
            >
              Subject <span aria-hidden="true">*</span>
            </label>

            <div
              ref={dropdownRef}
              className="relative"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setIsOpen(false);
                }
              }}
            >
              <input type="hidden" name="subject" value={subject} />

              <button
                ref={triggerRef}
                id={`${formId}-subject`}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={isOpen ? `${formId}-options` : undefined}
                aria-labelledby={`${formId}-subject-label ${formId}-subject-value`}
                aria-invalid={Boolean(subjectError)}
                aria-describedby={
                  subjectError ? `${formId}-subject-error` : undefined
                }
                onClick={() => {
                  if (isOpen) setIsOpen(false);
                  else openDropdown();
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    openDropdown();
                  } else if (event.key === "ArrowUp") {
                    event.preventDefault();
                    openDropdown(services.length - 1);
                  }
                }}
                className={`${fieldClasses} flex items-center
                            justify-between gap-3 text-left`}
              >
                <span
                  id={`${formId}-subject-value`}
                  className={subject ? "text-black" : "text-black/40"}
                >
                  {subject || "Choose a service"}
                </span>

                <ChevronDown
                  aria-hidden="true"
                  className={`size-4 shrink-0 text-[#ab4219]
                              transition-transform duration-200
                              motion-reduce:transition-none
                              ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isOpen && (
                <div
                  id={`${formId}-options`}
                  role="listbox"
                  aria-labelledby={`${formId}-subject-label`}
                  className="absolute inset-x-0 top-full z-30 mt-2
                             max-h-60 overflow-y-auto rounded-xl
                             border border-[#ab4219]/20
                             bg-[#fff8f3] p-1.5
                             shadow-[0_12px_30px_-15px_#ab421950]"
                >
                  {services.map((service, index) => {
                    const selected = subject === service;

                    return (
                      <button
                        key={service}
                        ref={(element) => {
                          optionRefs.current[index] = element;
                        }}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        tabIndex={activeIndex === index ? 0 : -1}
                        onFocus={() => setActiveIndex(index)}
                        onClick={() => selectSubject(service)}
                        onKeyDown={(event) =>
                          handleOptionKeyDown(event, index)
                        }
                        className={`flex min-h-11 w-full items-center
                                    justify-between gap-3 rounded-lg
                                    px-3 py-2.5 text-left text-sm
                                    hover:bg-[#f6d2c3]/65
                                    focus:bg-[#f6d2c3]/65
                                    focus:outline-none
                                    ${
                                      selected
                                        ? "bg-[#f6d2c3]/45 font-semibold text-[#ab4219]"
                                        : "text-black"
                                    }`}
                      >
                        <span>{service}</span>

                        {selected && (
                          <Check
                            aria-hidden="true"
                            className="size-4 shrink-0"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {subjectError && (
              <p
                id={`${formId}-subject-error`}
                className="mt-1.5 text-xs text-[#ab4219]"
              >
                {subjectError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={`${formId}-message`} className={labelClasses}>
              Message <span aria-hidden="true">*</span>
            </label>

            <textarea
              id={`${formId}-message`}
              name="message"
              required
              rows={4}
              maxLength={3000}
              placeholder="What would you like to build or improve?"
              className={`${fieldClasses} min-h-28 resize-y leading-relaxed`}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-h-12 w-full
                       items-center justify-center gap-2
                       rounded-xl bg-[#ab4219]
                       px-5 py-3 text-sm font-semibold text-white
                       transition-colors duration-200
                       enabled:hover:bg-[#923815]
                       disabled:cursor-wait disabled:opacity-70
                       focus-visible:outline-2
                       focus-visible:outline-offset-4
                       focus-visible:outline-[#ab4219]
                       motion-reduce:transition-none"
          >
            {isSubmitting ? (
              <LoaderCircle
                aria-hidden="true"
                className="size-4 animate-spin motion-reduce:animate-none"
              />
            ) : (
              <Send aria-hidden="true" className="size-4" />
            )}

            {isSubmitting ? "Sending…" : "Send message"}
          </button>
        </fieldset>

        <div role="status" aria-live="polite" aria-atomic="true">
          {status && (
            <p
              className="mt-4 rounded-xl
                         border border-[#ab4219]/15
                         bg-[#f6d2c3]/35 p-3
                         text-sm leading-relaxed text-[#ab4219]"
            >
              {status}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}