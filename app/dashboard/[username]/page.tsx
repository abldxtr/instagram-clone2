// import PostsGrid from "@/components/PostsGrid";
import PostsGrid from "@/components/post/Posts-Grid";
import ProfileIndex from "@/components/profile/profile-page";
import { fetchPostsByUsername } from "@/lib/data";

async function ProfilePage({
  params: { username },
}: {
  params: { username: string };
}) {
  const posts = await fetchPostsByUsername(username);

  return <PostsGrid posts={posts} />;
}

export default ProfilePage;
