import SideNav from "@/components/SideNav";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" h-screen relative overflow-hidden bg-[#000000a6] ">
      {children}
    </div>
  );
}