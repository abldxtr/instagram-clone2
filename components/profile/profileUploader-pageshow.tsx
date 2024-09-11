"use client";

import { useGlobalstate } from "@/context/globalContext";
import ProfileUploadImg from "./profileUploader-ui";
import { Session } from "next-auth";

function ProfileUiShow({ profile }: { profile: Session | null }) {
  const { changeProfileImg, setChangeProfileImg } = useGlobalstate();

  return (
    <div>{changeProfileImg && <ProfileUploadImg profile={profile} />}</div>
  );
}

export default ProfileUiShow;
