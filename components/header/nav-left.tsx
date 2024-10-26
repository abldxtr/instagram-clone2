// "use client";

// import Link from "next/link";
import { Icons } from "../Icons";
import { Fragment } from "react";
// import UploadImg from "../upload/uploadImg";
// import { useGlobalstate } from "@/context/globalContext";
import { Session } from "next-auth";
import ServerItemProfileLink from "./profile-link";
import ServerItemLogOut from "./Nav-serverside";
import CreateItem, { NavUpload } from "./create-item";
import { auth } from "@/auth";
import { Link } from "../link";

const links = [
  { name: "Home", href: "/dashboard", icon: <Icons.home /> },
  {
    name: "Search",
    href: "/dashboard",
    icon: <Icons.searchNav />,
  },

  { name: "Explore", href: "/dashboard", icon: <Icons.explore /> },
  {
    name: "Reels",
    href: "/dashboard",
    icon: <Icons.Reels />,
  },
  {
    name: "Messages",
    href: "/dashboard",
    icon: <Icons.Direct />,
  },
  {
    name: "Notifications",
    href: "/dashboard",
    icon: <Icons.notifications />,
  },

  {
    name: "Create",
    href: "",
    icon: <Icons.Newpost />,
  },
];

export default function NavLeft({ profile }: { profile: Session | null }) {
  // const { openUpload, setOpenUpload } = useGlobalstate();
  const user = profile;

  return (
    <>
      <div
        className="fixed left-0 isolate z-10 h-[100vh] border-r border-[rgba(219,219,219,0.27)] bg-black 
     md:w-[72px] lg:w-[244px] hidden md:block pt-[20px] pb-[8px] px-[12px] "
      >
        <div className="[&_div]:mob_nav_bottom flex h-full w-full flex-col items-start justify-between  text-white">
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
          </div>

          {/* <!-- 2 --> */}
          <div className=" w-full flex items-center flex-col  ">
            {links.map((item, index) => {
              const link = item.href;
              return (
                <Fragment key={index}>
                  {!!link ? (
                    <Link
                      prefetch={true}
                      // key={index}
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
                  ) : (
                    <CreateItem item={item} />
                  )}
                </Fragment>
              );
            })}

            {/* <!-- profile pic --> */}

            <ServerItemProfileLink user={user} />
          </div>

          {/* icone option dropdown */}

          <ServerItemLogOut user={user} />
        </div>
      </div>
      <NavUpload profile={profile} />
      {/* {openUpload && <UploadImg profile={profile} />} */}
    </>
  );
}
