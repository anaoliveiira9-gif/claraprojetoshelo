import { Hero } from "@/components/sections/hero";
import { LabsGrid } from "@/components/sections/labs-grid";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Services } from "@/components/sections/services";
import { Faq } from "@/components/sections/faq";
import { Studio } from "@/components/sections/studio";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <HowWeWork />
      <LabsGrid />
      <Services />
      <Studio />
      <Faq />
      <FinalCta />
    </>
  );
}
