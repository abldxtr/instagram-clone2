"use client";

import Link from "next/link";
import { Icons } from "../Icons";
import { Fragment } from "react";
import UploadImg from "../upload/uploadImg";
import { useGlobalstate } from "@/context/globalContext";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";

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
  const { openUpload, setOpenUpload } = useGlobalstate();
  const { data } = useSession();
  // const image = profile?.user.image;
  const image = data?.user.image;
  const username = data?.user.username;
  const userPath = username ? `/dashboard/${username}` : "/dashboard";

  return (
    <>
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
          </div>

          {/* <!-- 2 --> */}
          <div className=" w-full flex items-center flex-col  ">
            {links.map((item, index) => {
              const link = item.href;
              return (
                <Fragment key={index}>
                  {!!link ? (
                    <Link
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
                    <div
                      className=" my-[4px] hover:bg-white/10 rounded-[8px] w-full"
                      onClick={() => setOpenUpload(true)}
                    >
                      <div className=" p-[12px] flex items-center w-full h-full ">
                        {item.icon}
                        <span className=" hidden lg:flex pl-[16px] ">
                          {item.name}
                        </span>
                      </div>
                    </div>
                  )}
                </Fragment>
              );
            })}

            {/* <!-- profile pic --> */}

            <Link
              href={`${userPath}`}
              className=" my-[4px] hover:bg-white/10 rounded-[8px] w-full  "
            >
              <div className=" p-[12px] flex items-center w-full h-full relative ">
                {image ? (
                  <img
                    src={image}
                    alt="profile img"
                    className="  rounded-full size-[24px] shrink-0  "
                  />
                ) : (
                  <div className=" rounded-full size-[24px] shrink-0  bg-blue-200/60 " />
                )}

                <span className=" hidden lg:flex pl-[16px] ">Profile</span>
              </div>
            </Link>
          </div>

          {/* icone option dropdown */}

          <div
            className=" my-[4px] hover:bg-white/10 rounded-[8px] w-full"
            onClick={() => signOut()}
          >
            <div className=" p-[12px] flex items-center w-full h-full ">
              <Icons.Settings />

              <span className=" hidden lg:flex pl-[16px] ">Log out</span>
            </div>
          </div>
        </div>
      </div>
      {openUpload && <UploadImg profile={profile} />}
    </>
  );
}
