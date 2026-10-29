import Hero from "../components/sections/Hero";
import QuoteSection from "../components/sections/QuoteSection";
import ServicesIntro from "../components/sections/ServicesIntro";
import ServiceCards from "../components/sections/ServiceCards";
import ToolsSection from "../components/sections/ToolsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import PortfolioSection from "../components/sections/PortfolioSection";
import AboutSection from "../components/sections/AboutSection";
import FAQSection from "../components/sections/FAQSection";
import CTASection from "../components/sections/CTASection";
export default function Home() {
  return (
    <>
      <Hero />
      <QuoteSection />
      <ServicesIntro />
      <ServiceCards />
      <ToolsSection />
      <AboutSection />
      <PortfolioSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  );
}