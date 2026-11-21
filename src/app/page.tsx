import { Hero, StackStrip } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Architecture, Cli, Closing, Faq, Features, Footer, HowItWorks, Tour } from "@/components/sections";

export default function Home() {
  return (
    <>
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
