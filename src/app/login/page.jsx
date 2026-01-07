import LoginForm from "@/components/login/LoginForm";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  // Redirect authenticated users to their dashboard
  if (session?.user) {
    const role = session.user.role;

    switch (role) {
      case "admin":
        redirect("/admin");
      case "doctor":
        redirect("/doctor");
      case "patient":
        redirect("/patient");
      default:
        redirect("/");
    }
  }
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
