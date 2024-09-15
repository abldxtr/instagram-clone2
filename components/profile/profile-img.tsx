"use client";
import { useGlobalstate } from "@/context/globalContext";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProfileUploadImg from "./profileUploader-ui";
import { UserWithExtras } from "@/lib/definitions";
import classNames from "classnames";

function ProfileImg({
  image,
  isCurrentUser,
  username,
}: {
  image: string | null;
  isCurrentUser: boolean;
  username: string | null;
}) {
  const { changeProfileImg, setChangeProfileImg } = useGlobalstate();
  return (
    <div>
      <div className="mr-[20px]">
        <Avatar
          className={classNames(
            " relative size-[150px] overflow-hidden rounded-full border ",
            isCurrentUser && "cursor-pointer"
          )}
          onClick={() => isCurrentUser && setChangeProfileImg(true)}
        >
          <AvatarImage src={image!} alt="@shadcn" />
          <AvatarFallback className="text-black bg-blue-400">
            {username ?? ""}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}

export default ProfileImg;
