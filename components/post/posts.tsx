import { fetchPosts } from "@/lib/data";
import Post from "./post";

async function Posts() {
  const posts = await fetchPosts();

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

export default Posts;
