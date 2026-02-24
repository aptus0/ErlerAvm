import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const ADMIN_SESSION_COOKIE = "erkur_admin_session";
export const ADMIN_SESSION_VALUE = "authorized";

export function getSessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  };
}

export function validateAdminCredentials(username: string, password: string): boolean {
  const expectedUsername = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "admin123";

  return username === expectedUsername && password === expectedPassword;
}

export async function isAdminAuthenticatedFromCookieStore(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return token === ADMIN_SESSION_VALUE;
}

export function isAdminAuthenticatedFromRequest(request: NextRequest): boolean {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return token === ADMIN_SESSION_VALUE;
}
