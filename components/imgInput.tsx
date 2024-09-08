"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import z from "zod";
import { uploadImg } from "@/lib/actions";

const formDataSchema = z.object({
  image: z.any().refine((files) => files.length === 1, "فقط یک فایل مجاز است."),
});

type FormData = z.infer<typeof formDataSchema>;

export default function UploadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
  });

  const [uploadResult, setUploadResult] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    const file = data.image[0];
    console.log("client file", file);
    const result = await uploadImg({ image: file });
    if ("success" in result) {
      console.log(result.success?.url);
    }

    if ("success" in result) {
      setUploadResult("آپلود موفق بود.");
    } else {
      setUploadResult("getting error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="image">انتخاب عکس:</label>
        <input type="file" id="image" {...register("image")} />
        {errors.image && <p>{`a`}</p>}
      </div>

      <button type="submit">آپلود</button>

      {uploadResult && <p>{uploadResult}</p>}
    </form>
  );
}
