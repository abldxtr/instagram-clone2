"use client";

// import { bookmarkPost } from "@/lib/actions";
import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { SavedPost } from "@prisma/client";
import { Bookmark } from "lucide-react";
import { useOptimistic } from "react";
import ActionIcon from "./action-icon";
import { bookmarkPost } from "@/lib/actions";

type Props = {
  post: PostWithExtras;
  userId?: string;
};

function BookmarkButton({ post, userId }: Props) {
  const predicate = (bookmark: SavedPost) =>
    bookmark.userId === userId && bookmark.postId === post.id;
  const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic<
    SavedPost[]
  >(
    post.savedBy,
    // @ts-ignore
    (state: SavedPost[], newBookmark: SavedPost) =>
      state.find(predicate)
        ? //   here we check if the bookmark already exists, if it does, we remove it, if it doesn't, we add it
          state.filter((bookmark) => bookmark.userId !== userId)
        : [...state, newBookmark]
  );

  return (
    <form
      action={async (formData: FormData) => {
        const postId = formData.get("postId");
        addOptimisticBookmark({ postId, userId });
        await bookmarkPost(postId);
      }}
      className="ml-auto"
    >
      <input type="hidden" name="postId" value={post.id} />

      <ActionIcon>
        <Bookmark
          className={cn("size-6 shrink-0 hover:text-[rgb(168,168,168)]", {
            "fill-white ": optimisticBookmarks.some(predicate),
          })}
        />
      </ActionIcon>
    </form>
  );
}

export default BookmarkButton;
