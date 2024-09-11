"use client";

// import Error from "@/components/Error";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import useMount from "@/hooks/useMount";
// import { createPost } from "@/lib/actions";
// import { CreatePost } from "@/lib/schemas";
// import { UploadButton } from "@/lib/uploadthing";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import { z } from "zod";

export const MAX_FILE_SIZE = 1024 * 1024 * 5;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const newProductSchema = z.object({
  caption: z.string().min(2, "Minimum 2 chars.").max(15, "Maximum 15 chars."),
  image:
    typeof window === "undefined"
      ? z.any()
      : z
          .instanceof(FileList)
          .transform((fileList) => fileList[0])
          .refine(
            (file) => !file || file.size !== 0 || file.size <= MAX_FILE_SIZE,
            `Max image size is ${MAX_FILE_SIZE}MB`
          )
          .refine(
            (file) =>
              !file ||
              file.type === "" ||
              ACCEPTED_IMAGE_TYPES.includes(file.type),
            "Only .jpg, .jpeg, and .png formats are supported"
          ),
  // image: z
  //     .any()
  //     .refine((files) => files?.length == 1, "Image is required.")
  //     .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  //     .refine(
  //         (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
  //         ".jpg, .jpeg, .png and .webp files are accepted."
  //     ),
});

// const fileSchema = z
//     .object({
//         name: z.string(),
//         size: z.number().max(MAX_FILE_SIZE, `Max image size is ${MAX_FILE_SIZE / (1024 * 1024)} MB`),
//         type: z.string().refine((type) => ACCEPTED_IMAGE_TYPES.includes(type), "Only .jpg, .jpeg, .png, and .webp formats are supported"),
//     });

// const newProductSchema = z.object({
//     caption: z.string().min(2, 'Minimum 2 chars.').max(15, 'Maximum 15 chars.'),
//     image: fileSchema.optional(),
// });

function CreatePage() {
  const pathname = usePathname();
  const isCreatePage = pathname === "/create";
  const router = useRouter();
  //   const mount = useMount();

  const onFileChange = (event: any) => {
    const file = event.target.files[0];
    form.setValue(
      "image",
      file ? { size: file.size, type: file.type, name: file.name } : undefined
    );
    form.trigger("image"); // برای اجرای اعتبارسنجی فوری
  };

  const form = useForm<z.infer<typeof newProductSchema>>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      caption: "",
      image: undefined,
    },
  });

  const fileRef = form.register("image", { required: true });

  //   const fileUrl = form.watch("fileUrl");

  //   if (!mount) return null;

  return (
    <div>
      {/* <Dialog
                open={isCreatePage}
                onOpenChange={(open) => open}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create new post</DialogTitle>
                    </DialogHeader> */}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values) => {
            console.log(values);
            // const res = await createPost(values);
            // if (res) {
            //     return toast.error(<Error res={res} />);
            // }
          })}
          className="space-y-4"
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Picture</FormLabel>
                <FormControl>
                  <Input
                    accept="image/png, image/jpeg, image/jpg"
                    type="file"
                    placeholder="profile image"
                    // {...fileRef}
                    // onChange={(event) => console.log(event.target.files && event.target.files[0])}
                    onChange={onFileChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="caption">Caption</FormLabel>
                <FormControl>
                  <Input
                    type="caption"
                    id="caption"
                    placeholder="Write a caption..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={form.formState.isSubmitting}>
            Create Post
          </Button>
        </form>
      </Form>
      {/* </DialogContent> */}
      {/* </Dialog> */}
    </div>
  );
}

export default CreatePage;
