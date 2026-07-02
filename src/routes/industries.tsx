import { createFileRoute } from "@tanstack/react-router";
import { Industries } from "@/components/sections/Industries";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { PageHero } from "@/components/PageHero";
import { useCMS } from "@/hooks/useCMS";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Brand Shoots" },
      { name: "description", content: "We work across restaurants, real estate, hospitals, education, automobile, fashion, jewelry, fitness and more." },
      { property: "og:title", content: "Industries — Brand Shoots" },
      { property: "og:description", content: "18+ industries served across India." },
      { property: "og:url", content: "/industries" },
    ],
    links: [{ rel: "canonical", href: "/industries" }],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  const { data } = useCMS();
  const hero = data.pageHeroes.industries;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        sub={hero.sub}
      />
      <Industries />
      <ContactCTA />
    </>
  );
}
