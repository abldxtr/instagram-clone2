import Link from "next/link";
import { Icons } from "../Icons";

const links = [
  { name: "Home", href: "/dashboard", icon: <Icons.home /> },
  {
    name: "Search",
    href: "/dashboard/search",
    icon: <Icons.search />,
  },

  { name: "Explore", href: "/dashboard/explore", icon: <Icons.explore /> },
  {
    name: "Reels",
    href: "/dashboard/reels",
    icon: <Icons.Reels />,
  },
  {
    name: "Messages",
    href: "/dashboard/messages",
    icon: <Icons.Direct />,
  },
  {
    name: "Notifications",
    href: "/dashboard/notifications",
    icon: <Icons.notifications />,
  },

  {
    name: "Create",
    href: "/dashboard/create",
    icon: <Icons.Newpost />,
  },
];

export default function NavLeft() {
  return (
    <div
      className="fixed left-0 isolate z-10 h-[100vh] border-r border-[rgba(219,219,219,0.27)] bg-black 
     md:w-[72px] lg:w-[244px] hidden md:block pt-[20px] pb-[8px] px-[12px] "
    >
      <div className="[&_div]:mob_nav_bottom flex h-full w-full flex-col items-start  text-white">
        {/* <!-- header logo --> */}
        <div className=" h-[92px] w-full  ">
          <Link
            href="/"
            className=" my-[4px] hover:bg-white/10 rounded-[8px] w-full lg:hidden block"
          >
            <div className=" p-[12px] flex items-center w-full h-full ">
              <Icons.Instagram />
            </div>
          </Link>
          <Link
            href="/"
            className=" my-[4px] hover:bg-white/10 rounded-[8px] w-full  lg:block hidden"
          >
            <div className=" p-[12px] flex items-center w-full h-full ">
              <Icons.InstaText />
            </div>
          </Link>

          {/* <div className=" my-[4px] hover:bg-white/10 rounded-[8px]  p-[12px] lg:block hidden "> */}
          {/* insta logo text */}
          {/* <Icons.InstaText /> */}
          {/* </div> */}
        </div>

        {/* <!-- 2 --> */}
        <div className=" w-full flex items-center flex-col  ">
          {links.map((item, index) => {
            return (
              <Link
                key={index}
                href={item?.href}
                className=" my-[4px] hover:bg-white/10 rounded-[8px] w-full"
              >
                <div className=" p-[12px] flex items-center w-full h-full ">
                  {item.icon}
                  <span className=" hidden lg:flex pl-[16px] ">
                    {item.name}
                  </span>
                </div>
              </Link>
            );
          })}

          {/* <!-- profile pic --> */}

          <Link
            href="/das"
            className=" my-[4px] hover:bg-white/10 rounded-[8px] w-full  "
          >
            <div className=" p-[12px] flex items-center w-full h-full relative">
              <img
                src="https://lh3.googleusercontent.com/a/ACg8ocKSPfkrn2FFG2J-mEF3K9Wp9_3GGDfsYuu_IqmgKTpc=s96-c"
                alt="profile img"
                className="  rounded-full size-[24px] shrink-0  "
              />

              <span className=" hidden lg:flex pl-[16px] ">Profile</span>
            </div>
          </Link>
        </div>

        {/* icone option dropdown */}

        <Link
          href="/"
          className=" my-[4px] hover:bg-white/10 rounded-[8px] w-full"
        >
          <div className=" p-[12px] flex items-center w-full h-full ">
            <Icons.Settings />

            <span className=" hidden lg:flex pl-[16px] ">More</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
