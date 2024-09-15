import { auth } from "@/auth";
import MobNav from "./header/mobile-nav";
import BottomNav from "./header/nav-bottom";
import NavLeft from "./header/nav-left";

export default async function Header() {
  const session = await auth();
  const img = session?.user.image;
  return (
    <>
      <MobNav />
      <BottomNav profile={session} />

      <NavLeft profile={session} />
    </>
  );
}
