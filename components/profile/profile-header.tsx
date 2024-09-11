import { UserWithExtras } from "@/lib/definitions";

function ProfileHeader({
  profile,
  isCurrentUser,
}: {
  profile: UserWithExtras;
  isCurrentUser: boolean;
}) {
  return (
    <div className="flex flex-col">
      {/* 1 */}
      <div className="mb-[20px] flex items-center">
        <div className="mr-[20px]">{profile.username}</div>
        {/* <!-- buttom --> */}
        <div className="flex items-center gap-[8px]">
          <div>
            <button className="h-[32px] rounded-[8px] border border-black/[0.4] bg-[rgb(54,54,54)] px-[16px] text-[14px] font-bold leading-[18px] text-[#F5F5F5] hover:bg-[#262626]">
              Edit profile
            </button>
          </div>
          <div>
            <button className="h-[32px] rounded-[8px] border border-black/[0.4] bg-[rgb(54,54,54)] px-[16px] text-[14px] font-bold leading-[18px] text-[#F5F5F5] hover:bg-[#262626]">
              View archive
            </button>
          </div>
        </div>
      </div>
      {/* 2 */}
      <div className="mb-[20px] flex items-center gap-8 text-[16px] font-normal text-[rgb(245,245,245)]">
        {/* <!-- post number --> */}
        <div className="[text-align:_-webkit-match-parent]">
          <span>{profile.posts.length}</span> posts
        </div>

        {/* <!-- followe number --> */}
        <div>
          <span>{profile.following.length}</span> follower
        </div>

        {/* <!-- following number --> */}
        <div>
          <span>{profile.followedBy.length}</span> following
        </div>
      </div>
      {/* 3 */}
      <div>
        <div className="text-[14px] font-bold text-[rgb(245,245,245)]">
          {profile.bio}
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
