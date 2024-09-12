"use client";

import { CommentWithExtras } from "@/lib/definitions";
// import CommentOptions from "@/components/CommentOptions";
// import UserAvatar from "@/components/UserAvatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserAvatar from "../profile/UserAvatar";
import Timestamp from "../Timestamp";
// import Timestamp from "./Timestamp";

type Props = {
  comment: CommentWithExtras;
  inputRef?: React.RefObject<HTMLInputElement>;
};

function Comment({ comment, inputRef }: Props) {
  const { data: session } = useSession();
  const username = comment.user.username;
  const href = `/dashboard/${username}`;

  return (
    <div className="group p-3 px-3.5  flex items-start space-x-2.5">
      <Link href={href}>
        <UserAvatar user={comment.user} />
      </Link>
      <div className="space-y-1.5">
        <div className="flex items-center space-x-1.5 leading-none text-sm">
          <Link href={href} className="font-semibold text-[rgb(245,245,245)]">
            {username}
          </Link>
          <p className="font-medium text-[rgba(245,245,245,0.9)]">
            {comment.body}
          </p>
        </div>
        <div className="flex h-5 items-center space-x-2.5">
          <Timestamp createdAt={comment.createdAt} />
        </div>
      </div>
    </div>
  );
}

export default Comment;
