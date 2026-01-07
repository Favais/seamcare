import { redirect } from "next/navigation";

export function redirectUserBasedOnSession(session) {
  if (!session) return;

  const role = session.user?.role;

  switch (role) {
    case "admin":
      redirect("/dashboard/admin");

    case "doctor":
      redirect("/doctor");

    case "patient":
      redirect("/patient");
    default:
      redirect("/");
  }
}
