import { verifySession } from "./libs/session";

export default async function Home() {
  await verifySession();
  return <div>Hello To Home Page</div>;
}
