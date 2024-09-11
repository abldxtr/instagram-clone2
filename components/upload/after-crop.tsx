"use client";

import { Icons } from "../Icons";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { motion } from "framer-motion";
import { useGlobalstate } from "@/context/globalContext";

export default function AfterCrop() {
  const [text, setText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const maxChars = 2000;
  const { caption, setCaption } = useGlobalstate();

  const handleEmojiClick = (emoji: any) => {
    setText(text + emoji.native); // اضافه کردن ایموجی به کامنت
    setShowEmojiPicker(false); // بستن پنجره ایموجی بعد از انتخاب
  };
  //

  return (
    <div className="flex flex-1 shrink flex-col overflow-auto border border-[rgb(54,54,54)] text-white origin-left	 ">
      <div className="relative h-full w-full border-l border-[rgb(54,54,54)]">
        {/* <!-- profile name and pic --> */}
        <div className="mx-[20px] mb-[14px] mt-[18px] flex items-center gap-[12px]">
          <div className="relative size-[28px] overflow-hidden rounded-full border">
            <img
              src="https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-19/457668311_1966224583798580_2537510216727920967_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=3Zi3qG3N7y8Q7kNvgGJuzMG&_nc_gid=fb7e33df30d749ecbe74d14a51a7444a&edm=ADW0ovcBAAAA&ccb=7-5&oh=00_AYD5XiYR4owROgu5uYI-RStoUbTotinY4XVB6bygpXbCyg&oe=66DF829F&_nc_sid=db7772"
              alt="profile pic"
              className="absolute inset-0 object-cover"
            />
          </div>
          <div className="text-[14px] text-[rgb(245,245,245)]">
            classNameclassNameclassName
          </div>
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
              className="text-[rgb(168,168,168)] relative"
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
