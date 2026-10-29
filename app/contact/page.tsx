import type { Metadata } from "next";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";

import Container from "../../components/ui/Container";
import ContactForm from "../../components/sections/ContactForm";
import { contactPage } from "../../config/site";

export const metadata: Metadata = {
  title: "Contact Ajmal Ibrahimkhail",
  description:
    "Let’s discuss your website, mobile app, automation, or custom software project.",
};

export default function ContactPage() {
  const email = contactPage.email.trim();
  const phone = contactPage.phone.trim();
  const whatsapp = contactPage.whatsappNumber.replace(/\D/g, "");
  const telegram = contactPage.telegramUsername.replace(/^@/, "").trim();

  const contactDetails = [
    {
      label: "Email",
      value: email,
      href: email ? `mailto:${email}` : "",
      icon: Mail,
      external: false,
    },
    {
      label: whatsapp ? "WhatsApp" : "Phone",
      value: whatsapp ? `+${whatsapp}` : phone,
      href: whatsapp
        ? `https://wa.me/${whatsapp}`
        : phone
          ? `tel:${phone.replace(/[^\d+]/g, "")}`
          : "",
      icon: Phone,
      external: Boolean(whatsapp),
    },
    {
      label: "Location",
      value: contactPage.location.trim(),
      href: "",
      icon: MapPin,
      external: false,
    },
    {
      label: "Telegram",
      value: telegram ? `@${telegram}` : "",
      href: telegram ? `https://t.me/${telegram}` : "",
      icon: Send,
      external: true,
    },
  ].filter((item) => item.value);

  const socialLinks = [
    {
      label: "LinkedIn",
      href: contactPage.socialLinks.linkedin.trim(),
      icon: FaLinkedinIn,
    },
    {
      label: "GitHub",
      href: contactPage.socialLinks.github.trim(),
      icon: SiGithub,
    },
    {
      label: "Instagram",
      href: contactPage.socialLinks.instagram.trim(),
      icon: SiInstagram,
    },
  ].filter((item) => item.href);

  return (
    <section
      aria-labelledby="contact-heading"
      className="flex min-h-[calc(100svh-6rem)] items-center
                 bg-[#f6d2c3] py-14 sm:py-20 lg:py-24"
    >
      <Container className="w-full">
        <div
          className="mx-auto grid w-full max-w-[1100px]
                     items-stretch gap-6
                     lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]
                     lg:gap-7"
        >
          {/* Contact information */}
          <div
            className="flex min-w-0 flex-col rounded-[24px]
                       border border-[#ab4219]/15
                       bg-[#fff8f3] p-5 sm:p-7"
          >
            <h1
              id="contact-heading"
              className="max-w-md text-[28px] font-bold
                         leading-[1.15] tracking-tight
                         text-[#ff4c00] sm:text-[32px]"
            >
              {contactPage.heading}
            </h1>

            <p
              className="mt-3 text-[15px]
                         leading-[1.75] text-black/75"
            >
              {contactPage.description}
            </p>

            <div className="mt-6 space-y-4">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3"
                  >
                    <span
                      className="flex size-10 shrink-0
                                 items-center justify-center
                                 rounded-xl
                                 border border-[#ab4219]/10
                                 bg-[#f6d2c3]/40 text-[#ab4219]"
                    >
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.7}
                        className="size-[18px]"
                      />
                    </span>

                    <div className="min-w-0">
                      <p className="text-xs font-medium text-black/60">
                        {item.label}
                      </p>

                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.external ? "_blank" : undefined}
                          rel={
                            item.external
                              ? "noopener noreferrer"
                              : undefined
                          }
                          className="mt-1 inline-block break-all
                                     rounded-sm text-sm font-semibold
                                     text-[#ab4219]
                                     hover:underline
                                     hover:underline-offset-4
                                     focus-visible:outline-2
                                     focus-visible:outline-offset-4
                                     focus-visible:outline-[#ab4219]"
                        >
                          {item.value}

                          {item.external && (
                            <span className="sr-only">
                              {" "}(opens in a new tab)
                            </span>
                          )}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-medium text-black">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social profiles */}
            {socialLinks.length > 0 && (
              <div className="mt-auto pt-7">
                <nav
                  aria-label="Social profiles"
                  className="flex flex-wrap gap-2.5
                             border-t border-[#ab4219]/15 pt-5"
                >
                  {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${item.label} (opens in a new tab)`}
                        className="flex size-11 items-center
                                   justify-center rounded-xl
                                   border border-[#ab4219]/10
                                   bg-[#f6d2c3]/40 text-[#ab4219]
                                   transition-colors duration-200
                                   hover:bg-[#ab4219] hover:text-white
                                   focus-visible:outline-2
                                   focus-visible:outline-offset-4
                                   focus-visible:outline-[#ab4219]
                                   motion-reduce:transition-none"
                      >
                        <Icon
                          aria-hidden="true"
                          className="size-[18px]"
                        />
                      </a>
                    );
                  })}
                </nav>
              </div>
            )}
          </div>

          {/* Enquiry form */}
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}