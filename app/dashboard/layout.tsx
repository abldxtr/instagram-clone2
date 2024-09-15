import { auth } from "@/auth";
import BottomNav from "@/components/header/nav-bottom";
import NavLeft from "@/components/header/nav-left";
import ProfileUiShow from "@/components/profile/profileUploader-pageshow";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/register");
  }
  const image = session?.user.image;

  return (
    <div className=" h-screen w-screen relative overflow-hidden bg-black">
      <BottomNav profile={session} />
      <NavLeft profile={session} />
      <ProfileUiShow profile={session} />

      <div className=" w-full h-full md:pl-[72px] lg:pl-[255px] overflow-y-auto ">
        {children}
      </div>
    </div>
  );
}
