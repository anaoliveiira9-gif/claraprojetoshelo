"use client";

import { useRouter } from "next/navigation";
import { NovaOnboardingScreen } from "@/components/labs/002/screens";

export default function ExperienciaOnboardingPage() {
  const router = useRouter();

  return (
    <NovaOnboardingScreen
      onFinish={() => router.push("/labs/002/experiencia/inicio")}
    />
  );
}
