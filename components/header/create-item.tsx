"use client";

import { useGlobalstate } from "@/context/globalContext";
import UploadImg from "../upload/uploadImg";
import { useSession } from "next-auth/react";

export default function CreateItem({
  item,
}: {
  item: {
    name: string;
    href: string;
    icon: JSX.Element;
  };
}) {
  const { openUpload, setOpenUpload } = useGlobalstate();
  const user = useSession();
  const profile = user.data;

  return (
      <div
        className=" my-[4px] hover:bg-white/10 rounded-[8px] w-full"
        onClick={() => setOpenUpload(true)}
      >
        <div className=" p-[12px] flex items-center w-full h-full ">
          {item.icon}
          <span className=" hidden lg:flex pl-[16px] ">{item.name}</span>
        </div>
      </div>
  );
}

export function NavUpload() {
  const { openUpload } = useGlobalstate();
  const user = useSession();
  const profile = user.data;

  return <>{openUpload && <UploadImg profile={profile} />}</>;
}
