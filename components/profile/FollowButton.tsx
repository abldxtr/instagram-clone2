import { followUser } from "@/lib/actions";
// import SubmitButton from "./SubmitButton";
// import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";
import SubmitButton from "../post/SubmitButton";

function FollowButton({
  profileId,
  isFollowing,
  className,
  buttonClassName,
}: {
  profileId: string;
  isFollowing?: boolean;
  className?: string;
  buttonClassName?: string;
}) {
  return (
    <form action={followUser} className={className}>
      <input type="hidden" value={profileId} name="id" />
      <SubmitButton className="h-[32px] rounded-[8px] border border-black/[0.4] bg-[rgb(54,54,54)] px-[16px] text-[14px] font-bold leading-[18px] text-[#F5F5F5] hover:bg-[#262626]">
        {isFollowing ? "Unfollow" : "Follow"}
      </SubmitButton>
    </form>
  );
}

export default FollowButton;
