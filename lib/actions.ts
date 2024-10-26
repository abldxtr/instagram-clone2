"use server";

import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

import z from "zod";
import {
  BookmarkSchema,
  CreateComment,
  CreatePost,
  DeleteComment,
  DeletePost,
  FollowUser,
  LikeSchema,
  ProfilePicUpdateSchema,
} from "./schemas";
import db from "./prisma";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getUserId } from "./utils";
import { randomUUID, UUID } from "crypto";

export async function createPost(values: z.infer<typeof CreatePost>) {
  const { userId, username } = await getUserId();

  const validatedFields = CreatePost.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      // message: "Missing Fields. Failed to Create Post.",
    };
  }

  const { fileUrl, caption } = validatedFields.data;

  try {
    const result = await uploadImg({ image: fileUrl });
    if ("success" in result && result.success?.url) {
      await db.post.create({
        data: {
          caption,
          fileUrl: result.success.url,

          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }
    return {
      success: "the post is created",
      // message:""
    };
  } catch (error) {
    return {
      errors: "Database Error: Failed to Create Post.",
      // message: "Database Error: Failed to Create Post.",
    };
  }
  revalidateTag("fetchPosts");

  revalidateTag("fetchPostById");
  revalidateTag("fetchPostsByUsername");
  revalidatePath(`/dashboard/${username}`);
  redirect(`/dashboard/${username}`);
}

export async function UpdateProfilePic(
  values: z.infer<typeof ProfilePicUpdateSchema>
) {
  const { userId, username } = await getUserId();

  const validatedFields = ProfilePicUpdateSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      // errors: validatedFields.error.flatten().fieldErrors,
      error: "Missing Fields. Failed to Create Post.",
    };
  }

  const { fileUrl } = validatedFields.data;

  try {
    const result = await uploadImg({ image: fileUrl });
    if ("success" in result && result.success?.url) {
      if (username !== null && username !== undefined) {
        await db.user.update({
          where: {
            username,
          },
          data: { image: result.success.url },
        });
      }
    }
    return {
      success: "profile is changed",
    };
  } catch (error) {
    return {
      error: "Database Error: Failed to Create Post.",
    };
  }
  revalidateTag("fetchPosts");

  revalidateTag("fetchPostById");
  revalidateTag("fetchPostsByUsername");
  revalidatePath(`/dashboard/${username}`);
  redirect(`/dashboard/${username}`);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const formData = z.object({
  // image: z.instanceof(File),
  image: z.instanceof(File),
});

type UploadResult =
  | { success: UploadApiResponse; error?: never }
  | { error: string; success?: never };

export async function uploadImg(values: z.infer<typeof formData>) {
  console.log("server file", values);
  const validatedFields = formData.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Post.",
    };
  }

  const { image } = validatedFields.data;

  const file = image;
  const Name = image.name;
  const random = randomUUID().split("-")[0];
  const finalName = `${random}-${Name}`;

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // console.log("bufferfff", buffer);
    return new Promise<UploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          // upload_preset: "restyled",
          use_filename: true,
          unique_filename: false,
          filename_override: finalName,
        },
        (error, result) => {
          if (error || !result) {
            console.error("Upload failed:", error);
            reject({ error: "Upload failed" });
          } else {
            console.log("Upload successful:", result);
            resolve({ success: result });
          }
        }
      );
      uploadStream.end(buffer);
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return { error: "Error processing file" };
  }
}

export async function deletePost(formData: FormData) {
  const { userId } = await getUserId();

  const { id } = DeletePost.parse({
    id: formData.get("id"),
  });

  const post = await db.post.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  try {
    await db.post.delete({
      where: {
        id,
      },
    });
    revalidateTag("fetchPosts");

    revalidateTag("fetchPostById");
    revalidateTag("fetchPostsByUsername");
    revalidatePath("/dashboard");
    return { message: "Deleted Post." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Post." };
  }
}

export async function likePost(value: FormDataEntryValue | null) {
  const { userId } = await getUserId();

  const validatedFields = LikeSchema.safeParse({ postId: value });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Like Post.",
    };
  }

  const { postId } = validatedFields.data;

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  const like = await db.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });

  if (like) {
    try {
      await db.like.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });
      revalidateTag("fetchPosts");

      revalidateTag("fetchPostById");
      revalidateTag("fetchPostsByUsername");
      revalidatePath("/dashboard");
      return { message: "Unliked Post." };
    } catch (error) {
      return { message: "Database Error: Failed to Unlike Post." };
    }
  }

  try {
    await db.like.create({
      data: {
        postId,
        userId,
      },
    });
    revalidatePath("/dashboard");
    return { message: "Liked Post." };
  } catch (error) {
    return { message: "Database Error: Failed to Like Post." };
  }
}

export async function bookmarkPost(value: FormDataEntryValue | null) {
  const { userId } = await getUserId();

  const validatedFields = BookmarkSchema.safeParse({ postId: value });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Bookmark Post.",
    };
  }

  const { postId } = validatedFields.data;

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found.");
  }

  const bookmark = await db.savedPost.findUnique({
    where: {
      postId_userId: {
        postId,
        userId,
      },
    },
  });

  if (bookmark) {
    try {
      await db.savedPost.delete({
        where: {
          postId_userId: {
            postId,
            userId,
          },
        },
      });
      revalidatePath("/dashboard");
      return { message: "Unbookmarked Post." };
    } catch (error) {
      return {
        message: "Database Error: Failed to Unbookmark Post.",
      };
    }
  }

  try {
    await db.savedPost.create({
      data: {
        postId,
        userId,
      },
    });
    revalidateTag("fetchPosts");

    revalidateTag("fetchPostById");
    revalidateTag("fetchPostsByUsername");
    revalidatePath("/dashboard");
    return { message: "Bookmarked Post." };
  } catch (error) {
    return {
      message: "Database Error: Failed to Bookmark Post.",
    };
  }
}

export async function createComment(values: z.infer<typeof CreateComment>) {
  const { userId } = await getUserId();

  const validatedFields = CreateComment.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Comment.",
    };
  }

  const { postId, body } = validatedFields.data;

  const post = await db.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Post not found");
  }

  try {
    await db.comment.create({
      data: {
        body,
        postId,
        userId,
      },
    });
    revalidateTag("fetchPosts");

    revalidateTag("fetchPostById");
    revalidateTag("fetchPostsByUsername");
    revalidatePath("/dashboard");
    return { message: "Created Comment." };
  } catch (error) {
    return { message: "Database Error: Failed to Create Comment." };
  }
}

export async function deleteComment(formData: FormData) {
  const { userId } = await getUserId();

  const { id } = DeleteComment.parse({
    id: formData.get("id"),
  });

  const comment = await db.comment.findUnique({
    where: {
      id,
      userId,
    },
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  try {
    await db.comment.delete({
      where: {
        id,
      },
    });
    revalidateTag("fetchPosts");

    revalidateTag("fetchPostById");
    revalidateTag("fetchPostsByUsername");
    revalidatePath("/dashboard");
    return { message: "Deleted Comment." };
  } catch (error) {
    return { message: "Database Error: Failed to Delete Comment." };
  }
}

export async function followUser(formData: FormData) {
  const { userId } = await getUserId();

  const { id } = FollowUser.parse({
    id: formData.get("id"),
  });

  const user = await db.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const follows = await db.follows.findUnique({
    where: {
      followerId_followingId: {
        // followerId is of the person who wants to follow
        followerId: userId,
        // followingId is of the person who is being followed
        followingId: id,
      },
    },
  });

  if (follows) {
    try {
      await db.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: id,
          },
        },
      });
      revalidateTag("fetchPosts");

      revalidateTag("fetchPostById");
      revalidateTag("fetchPostsByUsername");
      revalidatePath("/dashboard");
      return { message: "Unfollowed User." };
    } catch (error) {
      return {
        message: "Database Error: Failed to Unfollow User.",
      };
    }
  }

  try {
    await db.follows.create({
      data: {
        followerId: userId,
        followingId: id,
      },
    });
    revalidatePath("/dashboard");
    return { message: "Followed User." };
  } catch (error) {
    return {
      message: "Database Error: Failed to Follow User.",
    };
  }
}
