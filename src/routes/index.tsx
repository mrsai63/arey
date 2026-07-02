import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Industries } from "@/components/sections/Industries";
import { WhyUs } from "@/components/sections/WhyUs";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { FAQ } from "@/components/sections/FAQ";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Brand Shoots — Premium Digital Marketing & Creative Studio" },
      { name: "description", content: "We build brands and grow businesses. Branding, content, photography, videography and performance marketing — Rajahmundry, Vijayawada, across India." },
      { property: "og:title", content: "Brand Shoots — Create · Shoot · Grow" },
      { property: "og:description", content: "Premium digital marketing & creative studio. Strategy, content, performance — under one roof." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <ClientLogos />
      <Services />
      <Industries />
      <WhyUs />
      <Portfolio />
      <Process />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  );
}
