import { redirect } from "next/navigation";

import { LoginForm } from "@/components/auth/LoginForm";
import { isAdminAuthenticatedFromCookieStore } from "@/lib/auth";

export default async function LoginPage() {
  const isAuthenticated = await isAdminAuthenticatedFromCookieStore();

  if (isAuthenticated) {
    redirect("/admin");
  }

  return (
    <main className="container grid min-h-screen place-items-center py-10">
      <LoginForm />
    </main>
  );
}
