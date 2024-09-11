"use server";

import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

import z from "zod";
import { CreatePost, ProfilePicUpdateSchema } from "./schemas";
import db from "./prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUserId } from "./utils";
import { randomUUID, UUID } from "crypto";

export async function createPost(values: z.infer<typeof CreatePost>) {
  const { userId, username } = await getUserId();

  const validatedFields = CreatePost.safeParse(values);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Post.",
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
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Post.",
    };
  }

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
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Post.",
    };
  }

  const { fileUrl } = validatedFields.data;

  try {
    const result = await uploadImg({ image: fileUrl });
    if ("success" in result && result.success?.url) {
      // await db.user.update({
      //   where:{
      //     username
      //   }
      // });
    }
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Post.",
    };
  }

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
    // const result = await new Promise<UploadApiResponse>((resolve, reject) => {
    //   const uploadStream = cloudinary.uploader.upload_stream(
    //     {
    //       use_filename: true,
    //       unique_filename: false,
    //       resource_type: "image",
    //     },
    //     (error, result) => {
    //       if (error || !result) {
    //         console.error("Upload failed:", error);
    //         reject({ error: "Upload failed" });
    //       } else {
    //         console.log("Upload successful:", result);
    //         resolve(result);
    //       }
    //     }
    //   );
    //   uploadStream.end(image); // ارسال Blob
    // });
    // return { success: result };

    // const result = await cloudinary.uploader.upload(image, {
    //   use_filename: true,
    //   unique_filename: false,
    //   resource_type: "image",
    // });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("bufferfff", buffer);
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
