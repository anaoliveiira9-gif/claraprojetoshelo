import type { Metadata } from "next";
import { LABS, getAdjacentLabs } from "@/lib/labs";
import { LabCaseStudy } from "@/components/labs/lab-case-study";
import { LabPreview } from "@/components/labs/005/preview";

const lab = LABS.find((l) => l.slug === "005")!;

export const metadata: Metadata = {
  title: `Lab 005 — ${lab.client} — ALUMNA`,
};

export default function Lab005Page() {
  const { next } = getAdjacentLabs("005");
  return <LabCaseStudy lab={lab} next={next} Preview={LabPreview} />;
}
