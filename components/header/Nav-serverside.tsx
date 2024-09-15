"use client";

import { signOut } from "next-auth/react";
import { Icons } from "../Icons";
import { Session } from "next-auth";

export default async function ServerItemLogOut({
  user,
}: {
  user: Session | null;
}) {
  return (
    <>
      {user ? (
        <div
          className=" my-[4px] hover:bg-white/10 rounded-[8px] w-full"
          onClick={() => signOut()}
        >
          <div className=" p-[12px] flex items-center w-full h-full ">
            <Icons.Settings />

            <span className=" hidden lg:flex pl-[16px] ">Log out</span>
          </div>
        </div>
      ) : (
        <div className=" my-[4px] hover:bg-white/10 rounded-[8px] w-full">
          <div className=" p-[12px] flex items-center w-full h-full ">
            <Icons.Settings />

            <span className=" hidden lg:flex pl-[16px] ">More</span>
          </div>
        </div>
      )}
    </>
  );
}
