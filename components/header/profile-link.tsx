// import { auth } from "@/auth";
import { Session } from "next-auth";
import Link from "next/link";

export default async function ServerItemProfileLink({
  user,
}: {
  user: Session | null;
}) {
  //   const user = await auth();
  const image = user?.user.image;
  const username = user?.user.username;
  const userPath = username ? `/dashboard/${username}` : "/dashboard";
  return (
    <>
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
    </>
  );
}
