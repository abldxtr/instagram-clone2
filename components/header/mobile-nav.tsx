import { Icons } from "../Icons";
import Link from "next/link";

export default function MobNav() {
  return (
    <header className="fixed top-0 isolate z-10 h-[60px] w-full border-b border-[rgba(219,219,219,0.27)] bg-black md:hidden">
      <div className="flex h-full w-full items-center justify-between px-[16px]">
        {/* <!-- left --> */}
        {/* <div className="mt-[2px] cursor-pointer text-white hover:text-white/90"> */}
        <Link
          href={"/dashboard"}
          className="mt-[2px] cursor-pointer text-white hover:text-white/90"
        >
          {/* insta logo mob */}

          <Icons.mobileLogo />
        </Link>
        {/* </div> */}

        {/* <!-- right --> */}

        <div className="flex items-center">
          {/* <!-- search bar --> */}
          <div className="relative mr-[12px] h-[36px] pr-[8px] peer ">
            <input
              type="text"
              className="h-full rounded-[8px] bg-[rgb(54,54,54)] px-[16px] py-[3px] text-[16px] text-[rgb(245,245,245)] placeholder:text-[16px] placeholder:text-[rgb(168,168,168)] focus-within:outline-0"
            />
            <div className="pointer-events-none absolute inset-0 h-full w-full">
              <div className="flex h-full items-center px-[16px]">
                <div className="mr-[12px] text-[rgb(142,142,142)]">
                  {/* search icone */}
                  <Icons.search />
                </div>
                <span className="text-[16px] text-[rgb(168,168,168)]">
                  {" "}
                  Search{" "}
                </span>
              </div>
            </div>
          </div>

          {/* <!-- notif --> */}
          <div className="cursor-pointer text-white hover:scale-105">
            {/* notif icon */}
            <Icons.notifications />
          </div>
        </div>
      </div>
    </header>
  );
}
