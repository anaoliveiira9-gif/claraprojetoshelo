import type { ComponentType } from "react";
import { LabPreview as Preview001 } from "@/components/labs/001/preview";
import { LabPreview as Preview002 } from "@/components/labs/002/preview";
import { LabPreview as Preview003 } from "@/components/labs/003/preview";
import { LabPreview as Preview004 } from "@/components/labs/004/preview";
import { LabPreview as Preview005 } from "@/components/labs/005/preview";
import { LabPreview as Preview006 } from "@/components/labs/006/preview";

export const LAB_PREVIEWS: Record<string, ComponentType> = {
  "001": Preview001,
  "002": Preview002,
  "003": Preview003,
  "004": Preview004,
  "005": Preview005,
  "006": Preview006,
};
