import { createFileRoute } from "@tanstack/react-router";
import { Services } from "@/components/sections/Services";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { useCMS } from "@/hooks/useCMS";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Brand Shoots" },
      { name: "description", content: "Branding, content, photography, videography, performance marketing and web — full-service growth under one roof." },
      { property: "og:title", content: "Services — Brand Shoots" },
      { property: "og:description", content: "A complete creative & performance studio for growth-led brands." },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { data } = useCMS();
  const hero = data.pageHeroes.services;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        sub={hero.sub}
      />
      <Services />
      <ContactCTA />
    </>
  );
}
