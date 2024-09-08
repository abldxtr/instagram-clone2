import Header from "@/components/header";
import Main from "@/components/main/main";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full bg-black ">
      <Header />
      <Main />
    </div>
  );
}
