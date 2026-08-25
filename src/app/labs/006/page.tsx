import type { Metadata } from "next";
import { LABS, getAdjacentLabs } from "@/lib/labs";
import { LabCaseStudy } from "@/components/labs/lab-case-study";
import { LabPreview } from "@/components/labs/006/preview";

const lab = LABS.find((l) => l.slug === "006")!;

export const metadata: Metadata = {
  title: `Lab 006 — ${lab.client} — ALUMNA`,
};

export default function Lab006Page() {
  const { next } = getAdjacentLabs("006");
  return <LabCaseStudy lab={lab} next={next} Preview={LabPreview} />;
}
