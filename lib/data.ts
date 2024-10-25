import { unstable_noStore as noStore } from "next/cache";
import prisma from "./prisma";
import { unstable_cache } from "./unstable-cache";

// export async function fetchPosts() {
//   // equivalent to doing fetch, cache: no-store
//   noStore();

//   try {
//     const data = await prisma.post.findMany({
//       include: {
//         comments: {
//           include: {
//             user: true,
//           },
//           orderBy: {
//             createdAt: "desc",
//           },
//         },
//         likes: {
//           include: {
//             user: true,
//           },
//         },
//         savedBy: true,
//         user: true,
//       },
//       orderBy: {
//         createdAt: "desc",
//       },
//     });

//     return data;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch posts");
//   }
// }
export const fetchPosts = unstable_cache(
  () => {
    // try {
    const data = prisma.post.findMany({
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
    // } catch (error) {
    //   console.error("Database Error:", error);
    //   throw new Error("Failed to fetch profile");
    // }
  },
  ["fetchPosts"],
  {
    revalidate: 60 * 60 * 2, // two hours,
  }
);

// export async function fetchPostById(id: string) {
//   noStore();

//   try {
//     const data = await prisma.post.findUnique({
//       where: {
//         id,
//       },
//       include: {
//         comments: {
//           include: {
//             user: true,
//           },
//           orderBy: {
//             createdAt: "desc",
//           },
//         },
//         likes: {
//           include: {
//             user: true,
//           },
//         },
//         savedBy: true,
//         user: true,
//       },
//     });

//     return data;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch post");
//   }
// }

export const fetchPostById = unstable_cache(
  (id: string) => {
    const data = prisma.post.findUnique({
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
  {
    revalidate: 60 * 60 * 2, // two hours,
  }
);

export async function fetchPostsByUsername(username: string, postId?: string) {
  noStore();

  try {
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
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch posts");
  }
}

// export async function fetchProfile(username: string) {
//   noStore();

//   try {
//     const data = await prisma.user.findUnique({
//       where: {
//         username,
//       },
//       include: {
//         posts: {
//           orderBy: {
//             createdAt: "desc",
//           },
//         },
//         saved: {
//           orderBy: {
//             createdAt: "desc",
//           },
//         },
//         followedBy: {
//           include: {
//             follower: {
//               include: {
//                 following: true,
//                 followedBy: true,
//               },
//             },
//           },
//         },
//         following: {
//           include: {
//             following: {
//               include: {
//                 following: true,
//                 followedBy: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     return data;
//   } catch (error) {
//     console.error("Database Error:", error);
//     throw new Error("Failed to fetch profile");
//   }
// }

export const fetchProfile = unstable_cache(
  (username: string) => {
    // try {
    const data = prisma.user.findUnique({
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
  {
    revalidate: 60 * 60 * 2, // two hours,
  }
);

export async function fetchProfileByEmail(email: string) {
  noStore();

  try {
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
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch profile");
  }
}

export async function fetchSavedPostsByUsername(username: string) {
  noStore();

  try {
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
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch saved posts");
  }
}
