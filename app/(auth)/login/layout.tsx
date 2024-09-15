import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();

  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className=" h-screen relative overflow-hidden bg-[#000000a6] ">
      {children}
    </div>
  );
}
