"use client";

import { useRouter } from "next/navigation";
import { NovaOnboardingScreen } from "@/components/labs/006/screens";

export default function ExperienciaOnboardingPage() {
  const router = useRouter();

  return (
    <NovaOnboardingScreen
      onFinish={() => router.push("/labs/006/experiencia/inicio")}
    />
  );
}
