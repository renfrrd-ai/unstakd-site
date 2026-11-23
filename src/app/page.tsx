import { Hero, StackStrip } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Architecture, Cli, Closing, Faq, Features, Footer, HowItWorks, Tour } from "@/components/sections";
import { GITHUB_URL } from "@/components/ui";

// Structured data so search engines know this page describes a piece of software.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Unstakd",
  url: "https://unstakd.com",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Linux",
  description: "A deploy platform you run on your own server: push to GitHub and get an HTTPS URL, with rollbacks and one-click Postgres and Redis.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  sameAs: [GITHUB_URL],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main>
        <Hero />
        <StackStrip />
        <Features />
        <Tour />
        <HowItWorks />
        <Cli />
        <Architecture />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
