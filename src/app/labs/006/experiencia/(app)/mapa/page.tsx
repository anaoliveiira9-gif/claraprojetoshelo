"use client";

import { useRouter } from "next/navigation";
import { NovaMapScreen } from "@/components/labs/006/screens";

export default function MapaPage() {
  const router = useRouter();

  return (
    <NovaMapScreen
      onSelect={(slug) => router.push(`/labs/006/experiencia/${slug}`)}
    />
  );
}
