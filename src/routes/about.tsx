import { createFileRoute } from "@tanstack/react-router";
import { WhyUs } from "@/components/sections/WhyUs";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { useCMS } from "@/hooks/useCMS";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Brand Shoots" },
      { name: "description", content: "Meet Brand Shoots — a creative & performance studio building brands across India." },
      { property: "og:title", content: "About — Brand Shoots" },
      { property: "og:description", content: "A creative & performance studio building brands across India." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { data } = useCMS();
  const hero = data.pageHeroes.about;
  
  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        sub={hero.sub}
      />
      <WhyUs />
      <Process />
      <Testimonials />
      <ContactCTA />
    </>
  );
}
