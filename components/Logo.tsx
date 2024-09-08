import { SwitchCamera } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import classNames from "classnames";
import { Icons } from "./Icons";
// import { calSans } from "@/app/fonts";

function Logo() {
  return (
    <Link href={"/dashboard"} className={classNames()}>
      <Icons.logo />
    </Link>
  );
}

export default Logo;
