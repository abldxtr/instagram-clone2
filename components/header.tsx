import MobNav from "./header/mobile-nav";
import BottomNav from "./header/nav-bottom";
import NavLeft from "./header/nav-left";

export default function Header() {
  return (
    <>
      <MobNav />
      <BottomNav />

      <NavLeft />
    </>
  );
}
