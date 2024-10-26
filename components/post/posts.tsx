// "use client";

// import { useQuery } from "@tanstack/react-query";

import { fetchPosts } from "@/lib/data";
import Post from "./post";

async function Posts() {
  // const fetchPosts = async () => {
  //   const response = await fetch("/api/posts");
  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }
  //   return response.json();
  // };
  // const {
  //   isPending,
  //   isError,
  //   data: posts,
  //   error,
  // } = useQuery({
  //   queryKey: ["posts"],
  //   queryFn: fetchPosts,
  // });
  // console.log("posts", posts);
  const posts = await fetchPosts();

  // if (isPending) {
  //   return <div className="text-white text-center">Loading...</div>;
  // }

  return (
    <>
      {posts.map((post: any) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

export default Posts;
