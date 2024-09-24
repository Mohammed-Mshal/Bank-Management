import { verifySession } from "./libs/session";
import { redirect } from "next/navigation";

export default async function rootPage() {
  const session = await verifySession();
  if (session?.userId) {
    redirect("/dashboard");
  } else {
    redirect("/auth/login");
  }
}
