"use client";
import { useGlobalstate } from "@/context/globalContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileUploadImg from "./profileUploader-ui";

function ProfileImg() {
  const { changeProfileImg, setChangeProfileImg } = useGlobalstate();
  return (
    <div>
      <div className="mr-[20px]">
        <Avatar
          className=" relative size-[150px] overflow-hidden rounded-full border "
          onClick={() => setChangeProfileImg(true)}
        >
          <AvatarImage
            src="https://scontent-yyz1-1.cdninstagram.com/v/t51.2885-19/457668311_1966224583798580_2537510216727920967_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-yyz1-1.cdninstagram.com&_nc_cat=108&_nc_ohc=3Zi3qG3N7y8Q7kNvgGJuzMG&edm=APHcPcMBAAAA&ccb=7-5&oh=00_AYCnoPY-gopjTM9Wums3ypyi5fE_VhoyuuL4KFaw4A63Hg&oe=66DF121F&_nc_sid=bef7bc"
            alt="@shadcn"
          />
          <AvatarFallback className="text-black bg-blue-400">CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default ProfileImg;
