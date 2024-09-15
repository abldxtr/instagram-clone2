// import PostsGrid from "@/components/PostsGrid";
import { auth } from "@/auth";
import PostsGrid from "@/components/post/Posts-Grid";
import ProfileIndex from "@/components/profile/profile-page";
import { fetchPostsByUsername, fetchProfile } from "@/lib/data";
import { notFound } from "next/navigation";

async function ProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  const posts = await fetchPostsByUsername(username);
  const profile = await fetchProfile(username);
  const session = await auth();
  const isCurrentUser = session?.user.id === profile?.id;
  //   the followerId here is the id of the user who is following the profile
  const isFollowing = profile?.followedBy.some(
    (user) => user.followerId === session?.user.id
  );

  if (!profile) {
    notFound();
  }

  return (
    <div className="  mx-auto max-w-[935px] w-full ">
      <ProfileIndex
        profile={profile}
        isCurrentUser={isCurrentUser}
        session={session}
      />

      <PostsGrid posts={posts} />
    </div>
  );
}

export default ProfilePage;
