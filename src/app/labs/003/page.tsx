import type { Metadata } from "next";
import { LABS, getAdjacentLabs } from "@/lib/labs";
import { LabCaseStudy } from "@/components/labs/lab-case-study";
import { LabPreview } from "@/components/labs/003/preview";

const lab = LABS.find((l) => l.slug === "003")!;

export const metadata: Metadata = {
  title: `Lab 003 — ${lab.client} — ALUMNA`,
};

export default function Lab003Page() {
  const { next } = getAdjacentLabs("003");
  return <LabCaseStudy lab={lab} next={next} Preview={LabPreview} />;
}
