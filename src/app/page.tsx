import { redirect } from "next/navigation";
import { verifySession } from "./libs/session";

export default async function Home() {
  const session = await verifySession();
  if (!session?.userId) {
    redirect("/auth/login");
  }
  return <div>Hello To Home Page</div>;
}
