"use client";

import { Icons } from "../Icons";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useGlobalstate } from "@/context/globalContext";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AfterCrop({ profile }: { profile: Session | null }) {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const maxChars = 2000;
  const { caption, setCaption } = useGlobalstate();

  const image = profile?.user.image;
  const username = profile?.user.username;

  const handleEmojiClick = (emoji: any) => {
    setCaption(caption + emoji.native);
    setShowEmojiPicker(false); // بستن پنجره ایموجی بعد از انتخاب
  };
  //

  return (
    <div className="flex flex-1 shrink flex-col overflow-auto border border-[rgb(54,54,54)] text-white origin-left	 ">
      <div className="relative h-full w-full border-l border-[rgb(54,54,54)]">
        {/* <!-- profile name and pic --> */}
        <div className="mx-[20px] mb-[14px] mt-[18px] flex items-center gap-[12px]">
          <div className="relative size-[28px] overflow-hidden rounded-full border">
            <Avatar className=" relative size-[28px] overflow-hidden rounded-full border ">
              <AvatarImage src={image!} alt="@shadcn" />
              <AvatarFallback className="text-black bg-blue-400">
                {username ?? ""}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="text-[14px] text-[rgb(245,245,245)]">{username}</div>
        </div>

        {/* <!-- input  --> */}
        <div>
          <div className="min-h-[168px] px-[16px] text-[16px] mb-2 ">
            <Textarea
              placeholder="Add a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              maxLength={maxChars}
              className="min-h-[168px] text-[16px] bg-[#262626] text-white border border-transparent "
            />
          </div>
        </div>
        <div className="absolute inset-x-0">
          <div className="flex w-full items-center justify-between px-[16px] text-white">
            {/* <!-- emoji icone --> */}
            <div
              className="text-[rgb(168,168,168)] relative cursor-pointer "
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              {/* emoji icon */}
              <Icons.emoji />
              {showEmojiPicker && (
                // <div className="absolute bottom-12 left-0 z-10 w-[220px] h-[200px] [&_div]:h-[220px] ">
                <div className="absolute bottom-12 left-0 z-10 w-full h-[200px] [&_div]:h-[220px] ">
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiClick}
                    emojiSize={18}
                    searchPosition="none"
                    onClickOutside={() => setShowEmojiPicker(false)}
                    maxFrequentRows={0}
                    // width={200}
                    // height={200}
                    perLine={6}
                    showPreview={false}
                    // style={{
                    //   innerWidth: {},
                    //   innerHeight: {},
                    // }}
                  />
                </div>
              )}
            </div>
            {/* <!-- text counter --> */}
            <div className="text-[#737373]">
              <p className="text-[12px]">
                {/* 0/2,000 */}
                {text.length}/{maxChars}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
