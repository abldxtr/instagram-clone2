import { PostWithExtras, UserWithExtras } from "@/lib/definitions";
import { Icons } from "../Icons";
import ProfileImg from "./profile-img";
import ProfileHeader from "./profile-header";
import Plus from "./plus";
import ProfileMenue from "./profile-menue";
// import NoPost from "./no-post";
import PostsGrid from "../post/Posts-Grid";
import { Session } from "next-auth";

function ProfileIndex({
  profile,
  isCurrentUser,
  session,
}: {
  profile: UserWithExtras;
  isCurrentUser: boolean;
  session: Session | null;
}) {
  return (
    <div className="h-full w-full text-white ">
      <section className=" flex h-full w-full ">
        <div className="mx-auto max-w-[935px] grow px-[20px] pt-[30px]">
          <header>
            <div className="flex items-center">
              <ProfileImg
                image={profile.image}
                isCurrentUser={isCurrentUser}
                username={profile.username}
              />
              <ProfileHeader
                profile={profile}
                isCurrentUser={isCurrentUser}
                session={session}
              />
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
