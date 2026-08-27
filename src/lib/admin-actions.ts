"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_TTL_SECONDS,
  createSessionToken,
  isAdminConfigured,
  timingSafeEqual,
} from "@/lib/admin-auth";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  _prev: LoginState | undefined,
  formData: FormData
): Promise<LoginState> {
  if (!isAdminConfigured()) {
    return {
      error:
        "Painel ainda não configurado. Defina ADMIN_PASSWORD e ADMIN_SESSION_SECRET no ambiente.",
    };
  }

  const password = String(formData.get("password") ?? "");
  const expected = process.env.ADMIN_PASSWORD as string;
  if (!password || !timingSafeEqual(password, expected)) {
    return { error: "Senha incorreta." };
  }

  const token = await createSessionToken();
  const store = await cookies();
  store.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/admin",
    maxAge: ADMIN_SESSION_TTL_SECONDS,
  });

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  // Must match the `path` used when the cookie was set — cookies().delete()
  // defaults to path "/" and silently no-ops if that doesn't match, which
  // would leave the session cookie (and the logged-in state) in place.
  store.delete({ name: ADMIN_SESSION_COOKIE, path: "/admin" });
  redirect("/admin/login");
}
