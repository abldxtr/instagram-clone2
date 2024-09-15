import Link from "next/link";
import { Icons } from "../Icons";
import { auth } from "@/auth";
import { Session } from "next-auth";

const links = [
  { name: "Home", href: "/dashboard", icon: <Icons.home /> },

  { name: "Explore", href: "/dashboard", icon: <Icons.explore /> },
  {
    name: "Reels",
    href: "/dashboard",
    icon: <Icons.Reels />,
  },

  {
    name: "Create",
    href: "/dashboard",
    icon: <Icons.Newpost />,
  },
  {
    name: "Messages",
    href: "/dashboard",
    icon: <Icons.Direct />,
  },
];

export default function BottomNav({ profile }: { profile: Session | null }) {
  const user = profile;
  const image = user?.user.image;
  const username = user?.user.username;
  const userPath = username ? `/dashboard/${username}` : "/dashboard";
  return (
    <div className="fixed bottom-0 isolate z-10 h-[50px] w-full border-t border-[rgba(219,219,219,0.27)] bg-black md:hidden">
      <div className="[&_a]:mob_nav_bottom flex h-full w-full items-center justify-around text-white">
        {links.map((item, index) => {
          return (
            <Link href={item.href} key={index}>
              {item.icon}
            </Link>
          );
        })}

        {/* profile pic */}

        <Link
          href={`${userPath}`}
          className=" size-[24px] overflow-hidden rounded-full relative "
        >
          {image ? (
            <img
              src={image}
              alt="profile img"
              className="  rounded-full size-[24px] shrink-0  "
            />
          ) : (
            <div className=" rounded-full size-[24px] shrink-0  bg-blue-200/60 " />
          )}
        </Link>
      </div>
    </div>
  );
}
