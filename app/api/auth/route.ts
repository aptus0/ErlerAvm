import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_VALUE,
  getSessionCookieOptions,
  isAdminAuthenticatedFromCookieStore,
  validateAdminCredentials,
} from "@/lib/auth";

export async function GET() {
  const authenticated = await isAdminAuthenticatedFromCookieStore();

  return NextResponse.json({
    authenticated,
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        username?: string;
        password?: string;
      }
    | null;

  const username = body?.username?.trim() ?? "";
  const password = body?.password?.trim() ?? "";

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.json(
      {
        message: "Gecersiz kullanici adi veya sifre.",
      },
      {
        status: 401,
      },
    );
  }

  const response = NextResponse.json({
    message: "Giris basarili.",
  });

  response.cookies.set(ADMIN_SESSION_COOKIE, ADMIN_SESSION_VALUE, getSessionCookieOptions());

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({
    message: "Oturum kapatildi.",
  });

  response.cookies.delete(ADMIN_SESSION_COOKIE);

  return response;
}
