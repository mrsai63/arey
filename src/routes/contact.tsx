import { createFileRoute } from "@tanstack/react-router";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FAQ } from "@/components/sections/FAQ";
import { PageHero } from "@/components/PageHero";
import { useCMS } from "@/hooks/useCMS";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Brand Shoots" },
      { name: "description", content: "Start your project with Brand Shoots — we reply within one working day." },
      { property: "og:title", content: "Contact — Brand Shoots" },
      { property: "og:description", content: "Let's build a brand people remember." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { data } = useCMS();
  const hero = data.pageHeroes.contact;

  return (
    <>
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        sub={hero.sub}
      />
      <ContactCTA />
      <FAQ />
    </>
  );
}
