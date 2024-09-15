import { auth } from "@/auth";

import Image from "next/image";
import Link from "next/link";
import UserAvatar from "../profile/UserAvatar";
import Timestamp from "../Timestamp";
import PostOptions from "./PostOptions";
import { Card } from "../ui/card";
import PostActions from "./post-actions";
import { CommentWithExtras, LikeWithExtras } from "@/lib/definitions";
import { SavedPost, User } from "@prisma/client";
import Comments from "./Comments";

async function Post({ post }: { post: PostWithExtras }) {
  const session = await auth();
  const userId = session?.user?.id;
  const username = post.user.username;

  const userPath = username ? `/dashboard/${username}` : "/dashboard";

  if (!session?.user) return null;

  return (
    <div className="flex flex-col space-y-2.5">
      <div className="flex items-center justify-between px-3 sm:px-0">
        <Link href={userPath} className="flex space-x-3 items-center">
          <UserAvatar user={post.user} />
          <div className="text-sm">
            <p className="space-x-1">
              <span className="font-semibold text-[rgb(245,245,245)]">
                {username}
              </span>
              <span
                className="font-medium text-neutral-500 
                      text-xs
                    "
              >
                •
              </span>
              <Timestamp createdAt={post.createdAt} />
            </p>
          </div>
        </Link>

        <PostOptions post={post} userId={userId} />
      </div>

      <div className="relative h-[450px] w-full shrink-0 overflow-hidden rounded-none sm:rounded-md">
        <Image
          src={post.fileUrl}
          alt="Post Image"
          fill
          className="sm:rounded-md object-cover"
        />
      </div>

      <PostActions post={post} userId={userId} className="px-3 sm:px-0" />

      {post.caption && (
        <div className="text-sm leading-none flex items-center space-x-2 text-[rgb(245,245,245)] font-medium px-3 sm:px-0">
          <Link
            href={`/dashboard/${username}`}
            className="font-bold text-[rgb(245,245,245)]"
          >
            {username}
          </Link>
          <p className="text-[rgb(245,245,245)]">{post.caption}</p>
        </div>
      )}

      <Comments postId={post.id} comments={post.comments} user={session.user} />
    </div>
  );
}

export default Post;

type Post = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  caption: string | null;
  fileUrl: string;
  userId: string;
};

type PostWithExtras = Post & {
  comments: CommentWithExtras[];
  likes: LikeWithExtras[];
  savedBy: SavedPost[];
  user: User;
};
