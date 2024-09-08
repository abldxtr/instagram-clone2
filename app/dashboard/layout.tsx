import SideNav from "@/components/SideNav";
import BottomNav from "@/components/header/nav-bottom";
import NavLeft from "@/components/header/nav-left";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen relative flex-col md:flex-row md:overflow-hidden">
      <BottomNav />
      <NavLeft />
      <div className="w-20 flex-none lg:w-64 md:border-r">
        {/* <SideNav /> */}
      </div>
      <div className="flex-grow mt-12 md:mt-0 flex-1 w-full md:overflow-y-auto sm:p-6 md:p-12 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
