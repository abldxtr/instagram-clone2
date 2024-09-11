"use client";

import classNames from "classnames";
import { Icons } from "../Icons";
import { useGlobalstate } from "@/context/globalContext";
import { useState } from "react";

import { UpdateProfilePic } from "@/lib/actions";
import ProfileSelectBotton from "./profilePic-uploader";
import { Session } from "next-auth";

export default function ProfileUploadImg({
  profile,
}: {
  profile: Session | null;
}) {
  const {
    openModal,
    setOpenModal,
    setCropState,
    setTriggerUpdateCover,
    setBackState,
    setCloseCrop,
    coverPicture,
    setCoverPicture,
    openUpload,
    setOpenUpload,
    caption,
    image,
    fileName,
    setCaption,
    changeProfileImg,
    setChangeProfileImg,
  } = useGlobalstate();
  const [sharebutton, setSharebutton] = useState(false);

  const [showBackButton, setShowBackButton] = useState(false);
  const [shareButton, setShareButton] = useState(false);

  const handleNext = () => {
    setCloseCrop(true);
    setOpenModal(true);
    setTriggerUpdateCover(true);
    setShareButton(true);
    setShowBackButton(true); // زمانی که کاربر به مرحله بعد می‌رود، آیکون Back نشان داده شود
  };

  const handleBack = () => {
    setOpenModal(false);
    setShareButton(false);
    setBackState(true);
    setCloseCrop(false);
    setShowBackButton(false); // بازگشت به مرحله قبل و نمایش دکمه Remove
  };

  return (
    <div className="fixed h-full w-full isolate z-[100] bg-[#000000a6]  ">
      <div
        className="cursor-pointer p-[8px]"
        onClick={() => {
          setChangeProfileImg(false);
          setCoverPicture("");
          setCloseCrop(false);
          setShowBackButton(false);
          setOpenModal(false);
        }}
      >
        <div className="fixed right-[10px] top-[10px] text-white">
          {/* close icone */}
          <Icons.close />
        </div>
      </div>

      <div className="flex grow flex-col items-stretch justify-center w-full h-full ">
        <div className="m-[20px] flex items-center justify-center w-full h-full ">
          <div className="max-h-[calc(100%_-_40px)] rounded-[12px] bg-[rgb(38,38,38)]">
            <div
              className={classNames(
                "relative  overflow-hidden h-[391px] flex w-[406px] max-h-[898px]  min-w-[348px] max-w-[855px] "

                // openModal
                //   ? "md:w-[746px] md:min-w-[688px]"
                //   : "w-[406px] max-h-[898px]  min-w-[348px] max-w-[855px]"
              )}
            >
              <div className=" flex w-full h-full flex-col grow ">
                {/* <!-- header --> */}
                <div className="h-[43px] border-b border-[rgb(54,54,54)] shrink-0 ">
                  {coverPicture ? (
                    <div className="flex h-full w-full items-center justify-between px-[12px] text-[rgb(245,245,245)]">
                      {showBackButton ? (
                        <div
                          onClick={handleBack} // آیکون Back برای بازگشت به مرحله قبل
                          className="cursor-pointer"
                        >
                          <Icons.back />
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setOpenModal(false);
                            setShareButton(false);
                            setBackState(true);
                            setCloseCrop(true);
                            setCropState(false);
                            setCaption("");
                          }}
                          className="cursor-pointer text-red-500 text-[14px] font-semibold"
                        >
                          Remove
                        </div>
                      )}
                      <div>Crop</div>
                      <div>
                        {shareButton ? (
                          <button
                            className="text-[14px] font-semibold text-[rgb(0,149,246)] hover:text-white"
                            onClick={() => {
                              console.log(
                                "boolean profile pic ",
                                fileName !== null
                              );
                              if (fileName !== null) {
                                UpdateProfilePic({
                                  fileUrl: fileName,
                                });
                              }
                            }}
                          >
                            Upload
                          </button>
                        ) : (
                          <button
                            className="text-[14px] font-semibold text-[rgb(0,149,246)] hover:text-white"
                            onClick={handleNext} // روی Next کلیک کنید تا به مرحله بعد بروید
                          >
                            Next
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="h-full w-full">
                      <div className="flex h-full w-full items-center justify-center text-[16px] text-[rgb(245,245,245)]">
                        Create profile pic
                      </div>
                    </div>
                  )}
                </div>
                {/* <!-- body --> */}
                <div className=" flex h-full w-full flex-col flex-1 relative ">
                  <div className=" flex w-full h-full ">
                    <div
                      className={classNames(
                        "flex flex-1 flex-col text-[rgb(245,245,245)] w-full h-full "
                        // openModal ? "w-1/2" : "w-full"
                      )}
                    >
                      {/* {!coverPicture && ( */}
                      {/* <div className="flex h-full w-full flex-1  flex-col items-center justify-center"> */}
                      <div className=" flex w-full h-full items-center justify-center flex-col ">
                        {!coverPicture && (
                          <>
                            <div>
                              <Icons.drag />
                            </div>
                            <div className="mt-[16px] text-[20px] leading-[25px]">
                              Drag photos and videos here
                            </div>
                          </>
                        )}
                        {/* must be change */}
                        <ProfileSelectBotton />
                      </div>
                      {/* )} */}
                    </div>
                    {/* {openModal && <AfterCrop />} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
