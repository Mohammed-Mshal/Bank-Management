import { redirect } from "next/navigation";
import { getSession } from "./lib/getSession";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  if (!user) {
    redirect("/auth/login");
  }
  return <div></div>;
}
