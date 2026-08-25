import { Hero } from "@/components/sections/hero";
import { LabsGrid } from "@/components/sections/labs-grid";
import { HowWeWork } from "@/components/sections/how-we-work";
import { Services } from "@/components/sections/services";
import { Studio } from "@/components/sections/studio";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <>
      <Hero />
      <LabsGrid />
      <HowWeWork />
      <Services />
      <Studio />
      <FinalCta />
    </>
  );
}
