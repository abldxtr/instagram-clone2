"use client";

import classNames from "classnames";
import { Icons } from "../Icons";
import AfterCrop from "./after-crop";
import SelectBotton from "./selectFile";
import { useGlobalstate } from "@/context/globalContext";
import { useState } from "react";

export default function UploadImg() {
  const {
    openModal,
    setOpenModal,
    cropState,
    setCropState,
    triggerUpdateCover,
    setTriggerUpdateCover,
    backState,
    setBackState,
    closeCrop,
    setCloseCrop,
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
    <div className="fixed h-screen w-full bg-[#000000a6]">
      <div className="cursor-pointer p-[8px]">
        <div className="fixed right-[10px] top-[10px] text-white">
          {/* close icone */}
          <Icons.close />
        </div>
      </div>

      <div className="flex grow flex-col items-stretch justify-center">
        <div className="m-[20px] flex items-center justify-center">
          <div className="max-h-[calc(100%_-_40px)] rounded-[12px] bg-[rgb(38,38,38)]">
            <div
              className={classNames(
                "relative  overflow-hidden min-h-[391px]",
                openModal
                  ? "md:w-[746px] md:min-w-[688px]"
                  : "w-[406px] max-h-[898px]  min-w-[348px] max-w-[855px]"
              )}
            >
              {/* <!-- header --> */}
              <div className="h-[43px] border-b border-[rgb(54,54,54)]">
                {cropState ? (
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
                            // عملکرد دکمه Share (در اینجا می‌توانید کد خود را اضافه کنید)
                          }}
                        >
                          Share
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
                      Create new post
                    </div>
                  </div>
                )}
              </div>
              {/* <!-- body --> */}

              <div
                className={classNames(
                  "absolute flex h-[calc(100%_-_44px)]  items-center justify-center text-[rgb(245,245,245)]",
                  openModal ? "w-1/2" : "w-full"
                )}
              >
                <div className="flex flex-col items-center">
                  <div>
                    <Icons.drag />
                  </div>
                  <div className="mt-[16px] text-[20px] leading-[25px]">
                    Drag photos and videos here
                  </div>
                  <SelectBotton />
                </div>
              </div>
              {openModal && <AfterCrop />}
              {/* <AfterCrop /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
