"use client";

import { deletePost } from "@/lib/actions";
import { PostWithExtras } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
// import SubmitButton from "@/components/SubmitButton";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";

type Props = {
  post: PostWithExtras;
  userId?: string;
  className?: string;
};

function PostOptions({ post, userId, className }: Props) {
  const isPostMine = post.userId === userId;
  const { toast } = useToast();
  const router = useRouter();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <MoreHorizontal
          className={cn(
            "h-5 w-5 cursor-pointer dark:text-neutral-400",
            className
          )}
        />
      </DialogTrigger>
      <DialogContent className="bg-neutral-800 !p-0 !gap-0 ">
        {isPostMine ? (
          <form
            action={async (formData) => {
              const { message } = await deletePost(formData);
              router.back();
              router.refresh();
              toast({
                description: message,
                variant: "default",
              });
            }}
            className="flex items-center justify-center dark:border-neutral-700 text-sm font-medium w-full"
          >
            <input type="hidden" name="id" value={post.id} />
            <SubmitButton className="text-red-500  font-bold disabled:cursor-not-allowed w-full p-3">
              Delete post
            </SubmitButton>
          </form>
        ) : (
          <form
            action={() => {}}
            className="flex items-center justify-center dark:border-neutral-700 text-sm font-medium w-full"
          >
            <input type="hidden" name="id" value={post.id} />
            <SubmitButton className="text-red-500  font-bold disabled:cursor-not-allowed w-full p-3">
              Report
            </SubmitButton>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PostOptions;
