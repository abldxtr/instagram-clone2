// "use client";

import { PostWithExtras } from "@/lib/definitions";
import { HeartIcon, MessageCircle } from "lucide-react";
import Image from "next/image";
// import Link from "next/link";
import NoPost from "./no-post";
import { Link } from "../link";
// import useScrollRestoration from "@/hooks/use-ScrollRestoration";

function PostsGrid({ posts }: { posts: PostWithExtras[] | undefined }) {
  // useScrollRestoration();
  if (posts?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center space-y-3 max-w-3xl lg:max-w-4xl mx-auto pb-20">
        <NoPost />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-0.5 w-full px-[20px] mb-[80px] mx-auto max-w-[935px] grow relative z-10 ">
      {posts?.map((post) => (
        <Link
          href={`/dashboard/p/${post.id}`}
          scroll={false}
          key={post.id}
          prefetch={true}
          className="relative flex items-center justify-center h-44 md:h-64 lg:h-80 group col-span-1"
        >
          <Image
            src={post.fileUrl}
            fill
            alt="Post preview"
            className="object-cover -z-10 transition group-hover:filter group-hover:blur-[2px] group-hover:brightness-90"
          />
          <div className="opacity-0 group-hover:opacity-100 flex transition items-center justify-center space-x-6">
            {post.likes.length > 0 && (
              <div className="flex items-center font-bold space-x-1">
                <HeartIcon className="text-white fill-white" />
                <p className="text-white">{post.likes.length}</p>
              </div>
            )}

            {post.comments.length > 0 && (
              <div className="flex items-center font-bold space-x-1">
                <MessageCircle className="text-white fill-white" />
                <p className="text-white">{post.comments.length}</p>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export default PostsGrid;
