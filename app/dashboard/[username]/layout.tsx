import { auth } from "@/auth";
import ProfileIndex from "@/components/profile/profile-page";
import ProfileUiShow from "@/components/profile/profileUploader-pageshow";
// import FollowButton from "@/components/FollowButton";
// import ProfileAvatar from "@/components/ProfileAvatar";
// import ProfileHeader from "@/components/ProfileHeader";
// import ProfileTabs from "@/components/ProfileTabs";
// import UserAvatar from "@/components/UserAvatar";
import { Button, buttonVariants } from "@/components/ui/button";
import { fetchProfile } from "@/lib/data";
import { MoreHorizontal, Settings } from "lucide-react";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    username: string;
  };
  children: React.ReactNode;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const username = params.username;

  //   const profile = await fetchProfile(username);
  const profile = await fetchProfile(username);

  return {
    title: `${profile?.name} (@${profile?.username})`,
  };
}

async function ProfileLayout({ children, params: { username } }: Props) {
  // const profile = await fetchProfile(username);
  // const session = await auth();
  // const isCurrentUser = session?.user.id === profile?.id;
  // //   the followerId here is the id of the user who is following the profile
  // const isFollowing = profile?.followedBy.some(
  //   (user) => user.followerId === session?.user.id
  // );

  // if (!profile) {
  //   notFound();
  // }
  return (
    <>
      <div className="bg-black w-full overflow-y-auto  ">
        {/* <ProfileIndex profile={profile} isCurrentUser={isCurrentUser} /> */}

        {children}
      </div>
    </>
  );
}

export default ProfileLayout;
