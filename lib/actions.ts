"use server";

import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
// import { actionClient } from "@/server/safe-action"
import z from "zod";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const formData = z.object({
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

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    console.log("bufferfff", buffer);

    return new Promise<UploadResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          // upload_preset: "restyled",
          use_filename: true,
          unique_filename: false,
          filename_override: file.name,
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
