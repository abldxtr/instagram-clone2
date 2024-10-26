// import { unstable_noStore as noStore } from "next/cache";
import prisma from "./prisma";
import { unstable_cache } from "./unstable-cache";

export const fetchPosts = unstable_cache(
  async () => {
    const data = await prisma.post.findMany({
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  },
  ["fetchPosts"],
  { tags: ["fetchPosts"] }
);

export const fetchPostById = unstable_cache(
  async (id: string) => {
    const data = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
      },
    });

    return data;
  },
  ["fetchPostById"],
  { tags: ["fetchPostById"] }
);

export const fetchPostsByUsername = unstable_cache(
  async (username: string, postId?: string) => {
    const data = await prisma.post.findMany({
      where: {
        user: {
          username,
        },
        NOT: {
          id: postId,
        },
      },
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  },
  ["fetchPostsByUsername"],
  { tags: ["fetchPostsByUsername"] }
);

export const fetchProfile = unstable_cache(
  async (username: string) => {
    // try {
    const data = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
        },
        saved: {
          orderBy: {
            createdAt: "desc",
          },
        },
        followedBy: {
          include: {
            follower: {
              include: {
                following: true,
                followedBy: true,
              },
            },
          },
        },
        following: {
          include: {
            following: {
              include: {
                following: true,
                followedBy: true,
              },
            },
          },
        },
      },
    });

    return data;
    // } catch (error) {
    //   console.error("Database Error:", error);
    //   throw new Error("Failed to fetch profile");
    // }
  },
  ["fetchProfile"],
  { tags: ["fetchProfile"] }
);

export const fetchProfileByEmail = unstable_cache(
  async (email: string) => {
    // try {
    const data = await prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: "desc",
          },
        },
        saved: {
          orderBy: {
            createdAt: "desc",
          },
        },
        followedBy: {
          include: {
            follower: {
              include: {
                following: true,
                followedBy: true,
              },
            },
          },
        },
        following: {
          include: {
            following: {
              include: {
                following: true,
                followedBy: true,
              },
            },
          },
        },
      },
    });

    return data;
    // } catch (error) {
    //   console.error("Database Error:", error);
    //   throw new Error("Failed to fetch profile");
    // }
  },
  ["fetchProfileByEmail"],
  { tags: ["fetchProfileByEmail"] }
);

export const fetchSavedPostsByUsername = unstable_cache(
  async (username: string) => {
    // try {
    const data = await prisma.savedPost.findMany({
      where: {
        user: {
          username,
        },
      },
      include: {
        post: {
          include: {
            comments: {
              include: {
                user: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
            likes: {
              include: {
                user: true,
              },
            },
            savedBy: true,
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
    // } catch (error) {
    //   console.error("Database Error:", error);
    //   throw new Error("Failed to fetch profile");
    // }
  },
  ["fetchSavedPostsByUsername"],
  { tags: ["fetchSavedPostsByUsername"] }
);
