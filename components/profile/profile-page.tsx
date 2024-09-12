import { PostWithExtras, UserWithExtras } from "@/lib/definitions";
import { Icons } from "../Icons";
import ProfileImg from "./profile-img";
import ProfileHeader from "./profile-header";
import Plus from "./plus";
import ProfileMenue from "./profile-menue";
// import NoPost from "./no-post";
import PostsGrid from "../post/Posts-Grid";

function ProfileIndex({
  profile,
  isCurrentUser,
}: {
  profile: UserWithExtras;
  isCurrentUser: boolean;
}) {
  return (
    <div className="h-full  text-white ">
      <section>
        <div className="mx-auto max-w-[935px] grow px-[20px] pt-[30px]">
          <header>
            <div className="flex items-center">
              <ProfileImg
                image={profile.image}
                isCurrentUser={isCurrentUser}
                username={profile.username}
              />
              <ProfileHeader profile={profile} isCurrentUser={isCurrentUser} />
            </div>
          </header>
          <Plus />
          <ProfileMenue />
        </div>
      </section>
    </div>
  );
}

export default ProfileIndex;
