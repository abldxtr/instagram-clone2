"use client";

import { useGlobalstate } from "@/context/globalContext";
import ProfileUploadImg from "./profileUploader-ui";

function ProfileUiShow() {
  const { changeProfileImg, setChangeProfileImg } = useGlobalstate();

  return <div>{changeProfileImg && <ProfileUploadImg />}</div>;
}

export default ProfileUiShow;
