import { SinglePostSkeleton } from "@/components/Skeletons";
import MorePosts from "@/components/post/MorePosts";
import SinglePost from "@/components/post/SinglePost";
import { Suspense } from "react";

function PostPage({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <Suspense fallback={<SinglePostSkeleton />}>
        <SinglePost id={id} />
      </Suspense>

      <div className="my-12 max-w-3xl lg:max-w-4xl mx-auto" />

      <Suspense>
        <MorePosts postId={id} />
      </Suspense>
    </div>
  );
}

export default PostPage;
