import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/sections/Portfolio";
import { ClientLogos } from "@/components/sections/ClientLogos";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { useCMS } from "@/hooks/useCMS";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — Brand Shoots" },
      { name: "description", content: "Selected work across branding, photography, videography and performance marketing." },
      { property: "og:title", content: "Portfolio — Brand Shoots" },
      { property: "og:description", content: "Crafted, shot & scaled — selected client work." },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  const { data } = useCMS();
  const hero = data.pageHeroes.portfolio;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        sub={hero.sub}
      />
      <Portfolio />
      <ClientLogos />
      <ContactCTA />
    </>
  );
}
