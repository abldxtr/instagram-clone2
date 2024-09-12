import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
// import ActionIcon from "@/components/ActionIcon";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import LikeButton from "../Like";
import BookmarkButton from "../Bookmark";
import ShareButton from "../share-button";
import ActionIcon from "../action-icon";
import { Icons } from "../Icons";

type Props = {
  post: PostWithExtras;
  userId?: string;
  className?: string;
};

function PostActions({ post, userId, className }: Props) {
  return (
    <div
      className={cn(
        "relative flex items-start h-full w-full gap-x-2",
        className
      )}
    >
      <LikeButton post={post} userId={userId} />
      {/* <Link href={`/dashboard/p/${post.id}`}> */}
      {/* <ActionIcon> */}
      <ActionIcon>
        {/* <MessageCircle
          className={"size-6 shrink-0 hover:text-[rgb(168,168,168)]"}
        /> */}
        <Icons.Comment className=" hover:scale-105 " />
      </ActionIcon>

      {/* </ActionIcon> */}
      {/* </Link> */}
      <ShareButton postId={post.id} />
      <BookmarkButton post={post} userId={userId} />
    </div>
  );
}

export default PostActions;
