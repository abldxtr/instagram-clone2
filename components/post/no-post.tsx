"use client";

import { useGlobalstate } from "@/context/globalContext";
import { Icons } from "../Icons";

function NoPost() {
  const { setOpenUpload } = useGlobalstate();
  return (
    <div className="flex items-center justify-center">
      <div className="mx-[44px] my-[60px] flex max-w-[350px] items-center justify-center">
        <div className="flex w-full flex-col items-center justify-center text-white">
          {/* <!-- 1 --> */}
          <div className=" cursor-pointer" onClick={() => setOpenUpload(true)}>
            <Icons.camera />
          </div>

          {/* <!-- 2 --> */}
          <div className=" my-[24px] ">
            <span className="text-[30px] font-semibold  ">Share Photos</span>
          </div>

          {/* <!-- 3 --> */}
          <div className=" mb-[24px] ">
            <span className=" text-[14px] text-[rgb(245,245,245)] ">
              {" "}
              When you share photos, they will appear on your profile.{" "}
            </span>
          </div>

          {/* <!-- 4 --> */}
          <div className=" text-[14px] text-[rgb(0,149,246)] font-bold hover:text-white cursor-pointer  ">
            Share your first photo
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoPost;
