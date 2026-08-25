import type { Metadata } from "next";
import { LABS, getAdjacentLabs } from "@/lib/labs";
import { LabCaseStudy } from "@/components/labs/lab-case-study";
import { LabPreview } from "@/components/labs/001/preview";

const lab = LABS.find((l) => l.slug === "001")!;

export const metadata: Metadata = {
  title: `Lab 001 — ${lab.client} — ALUMNA`,
};

export default function Lab001Page() {
  const { next } = getAdjacentLabs("001");
  return <LabCaseStudy lab={lab} next={next} Preview={LabPreview} />;
}
