"use server";

import { revalidatePath } from "next/cache";
import { getSiteContent, saveSiteContent, type SiteContent } from "@/lib/site-content";

export interface SaveState {
  saved?: boolean;
  error?: string;
}

/**
 * Generic "patch one top-level section, keep the rest" save used by every
 * admin content form. Re-reads current content first so two edits made in
 * different browser tabs don't clobber each other's other sections.
 */
async function patchAndSave<K extends keyof SiteContent>(
  key: K,
  value: SiteContent[K]
): Promise<SaveState> {
  try {
    const current = await getSiteContent();
    const next: SiteContent = { ...current, [key]: value };
    await saveSiteContent(next);
    revalidatePath("/", "layout");
    return { saved: true };
  } catch {
    return { error: "Não foi possível salvar. Tente novamente." };
  }
}

export async function saveBrandAndContact(
  brand: SiteContent["brand"],
  contact: SiteContent["contact"]
): Promise<SaveState> {
  try {
    const current = await getSiteContent();
    const next: SiteContent = { ...current, brand, contact };
    await saveSiteContent(next);
    revalidatePath("/", "layout");
    return { saved: true };
  } catch {
    return { error: "Não foi possível salvar. Tente novamente." };
  }
}

export async function saveTypography(
  typography: SiteContent["typography"]
): Promise<SaveState> {
  return patchAndSave("typography", typography);
}

export async function saveHero(hero: SiteContent["hero"]): Promise<SaveState> {
  return patchAndSave("hero", hero);
}

export async function saveLabsSection(
  labsSection: SiteContent["labsSection"]
): Promise<SaveState> {
  return patchAndSave("labsSection", labsSection);
}

export async function saveHowWeWork(
  howWeWork: SiteContent["howWeWork"]
): Promise<SaveState> {
  return patchAndSave("howWeWork", howWeWork);
}

export async function saveServicesSection(
  servicesSection: SiteContent["servicesSection"]
): Promise<SaveState> {
  return patchAndSave("servicesSection", servicesSection);
}

export async function saveStudio(studio: SiteContent["studio"]): Promise<SaveState> {
  return patchAndSave("studio", studio);
}

export async function saveFaq(faq: SiteContent["faq"]): Promise<SaveState> {
  return patchAndSave("faq", faq);
}

export async function saveFinalCta(
  finalCta: SiteContent["finalCta"]
): Promise<SaveState> {
  return patchAndSave("finalCta", finalCta);
}
