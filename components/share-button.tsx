"use client";

// import { Link, Send } from "lucide-react";
import ActionIcon from "./action-icon";
import { Icons } from "./Icons";

function ShareButton({ postId }: { postId: string }) {
  return (
    <ActionIcon
    // onClick={() => {
    //   navigator.clipboard.writeText(
    //     `${window.location.origin}/dashboard/p/${postId}`
    //   );
    //   toast("Link copied to clipboard", {
    //     icon: <Link className={"h-5 w-5"} />,
    //   });
    // }}
    >
      {/* <Send className={"h-6 w-6"} /> */}
      <Icons.SharePost className="size-6 shrink-0 hover:scale-105" />
    </ActionIcon>
  );
}

export default ShareButton;
