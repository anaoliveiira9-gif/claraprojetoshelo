import type { Metadata } from "next";
import { LABS, getAdjacentLabs } from "@/lib/labs";
import { LabCaseStudy } from "@/components/labs/lab-case-study";
import { LabPreview } from "@/components/labs/002/preview";

const lab = LABS.find((l) => l.slug === "002")!;

export const metadata: Metadata = {
  title: `Lab 002 — ${lab.client} — ALUMNA`,
};

export default function Lab002Page() {
  const { next } = getAdjacentLabs("002");
  return <LabCaseStudy lab={lab} next={next} Preview={LabPreview} />;
}
