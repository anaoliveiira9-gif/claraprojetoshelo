import type { Metadata } from "next";
import { LABS, getAdjacentLabs } from "@/lib/labs";
import { LabCaseStudy } from "@/components/labs/lab-case-study";
import { LabPreview } from "@/components/labs/004/preview";

const lab = LABS.find((l) => l.slug === "004")!;

export const metadata: Metadata = {
  title: `Lab 004 — ${lab.client} — ALUMNA`,
};

export default function Lab004Page() {
  const { next } = getAdjacentLabs("004");
  return <LabCaseStudy lab={lab} next={next} Preview={LabPreview} />;
}
