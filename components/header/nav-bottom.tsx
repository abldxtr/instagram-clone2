import Link from "next/link";
import { Icons } from "../Icons";

const links = [
  { name: "Home", href: "/dashboard", icon: <Icons.home /> },

  { name: "Explore", href: "/dashboard/explore", icon: <Icons.explore /> },
  {
    name: "Reels",
    href: "/dashboard/reels",
    icon: <Icons.Reels />,
  },

  {
    name: "Create",
    href: "/dashboard/create",
    icon: <Icons.Newpost />,
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: <Icons.Direct />,
  },
];

export default function BottomNav({
  image,
}: {
  image: string | null | undefined;
}) {
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
          href="/das"
          className=" size-[24px] overflow-hidden rounded-full relative  "
        >
          {image ? (
            <img
              src={image}
              alt="profile img"
              className="  rounded-full size-[24px] shrink-0  "
            />
          ) : (
            <div className=" absolute inset-0 bg-blue-200/60 " />
          )}
        </Link>
      </div>
    </div>
  );
}
