"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icons } from "../Icons";
import getCroppedImg from "@/utils/getImg";

import Cropper from "react-easy-crop";
import AfterCrop from "./after-crop";
import { useGlobalstate } from "@/context/globalContext";

export default function SelectBotton() {
  const inputImgRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [initialPicture, setInitialPicture] = useState<string | ArrayBuffer>(
    ""
  );
  const [coverPicture, setCoverPicture] = useState<string | ArrayBuffer>("");
  const [update, setUpdate] = useState(true);

  const [errorMsg, setErrorMsg] = useState("");
  const {
    cropState,
    setCropState,
    triggerUpdateCover,
    setTriggerUpdateCover,
    backState,
    setBackState,
    closeCrop,
    setCloseCrop,
  } = useGlobalstate();

  //   const img = getCroppedImg();

  const updateCover = async () => {
    if (croppedAreaPixels != null) {
      const img = await getCroppedImg(
        coverPicture as string,
        croppedAreaPixels
      );
      if (img) {
        let blob = await fetch(img).then((b) => b.blob());
        const blobUrl = URL.createObjectURL(blob);
        setCoverPicture(blobUrl);
        console.log(blobUrl);
      }
    }
    setUpdate(false);
  };

  const handleImage = (e) => {
    // setShowCoverMenu(false);
    const file = e.target.files[0];
    const type = file.type.split("/")[1];
    if (!["jpeg", "png", "webp"].includes(type)) {
      setErrorMsg(`${file.name} format is not supported`);
      setCoverPicture("");
      return;
    } else if (file.size > 1024 * 1024 * 2) {
      setErrorMsg(`${file.name} is to large max 2mp allowed`);
      setCoverPicture("");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
      if (e.target != null && e.target.result !== null) {
        setCoverPicture(e.target.result);
        setInitialPicture(e.target.result);
        setUpdate(true);
      }
    };
  };

  const onCropComplete = useCallback((_, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleBack = () => {
    setCoverPicture(initialPicture); // برگرداندن تصویر به حالت اولیه
    setCrop({ x: 0, y: 0 }); // ریست کردن وضعیت برش
    setZoom(1); // ریست کردن زوم
    setUpdate(true); // نشان دادن cropper
  };

  useEffect(() => {
    if (triggerUpdateCover) {
      updateCover();
      setTriggerUpdateCover(false); // بعد از فراخوانی، تریگر را دوباره false کنید
    }
  }, [triggerUpdateCover, setTriggerUpdateCover]);

  useEffect(() => {
    if (backState) {
      handleBack();
      setBackState(false);
    }
  }, [backState, setBackState]);

  useEffect(() => {
    if (closeCrop) {
      setCoverPicture("");
      setCloseCrop(false);
    }
  }, [closeCrop, setCloseCrop]);

  return (
    <>
      <div
        className=" absolute inset-0 pointer-events-none bg-transparent "
        ref={coverRef}
      />

      <div className="mt-[24px] p-[4px]">
        <input
          type="file"
          accept="image/jpeg, image/png, image/webp"
          onInput={handleImage}
          // onClick={(e) => (e.target.value = null)}
          ref={inputImgRef}
          hidden
        />

        {coverPicture && update && (
          <>
            <Cropper
              image={coverPicture as string}
              zoom={zoom}
              crop={crop}
              // minZoom={0.1}
              maxZoom={3}
              // zoomSpeed={0.2}
              // aspect={coverRef.current!.getBoundingClientRect().width / 384}
              onZoomChange={setZoom}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              // objectFit="horizontal-cover"
              objectFit="cover"
            />
            {/* <div className="absolute w-full bottom-0 bg-gray-800 bg-opacity-80 flex text-gray-200  px-6 py-3 justify-between items-center">
              <div className="flex items-center space-x-2"></div>
              <div className=" absolute bottom-5 ">
                <button
                  onClick={updateCover}
                  className="bg-blue-500 rounded-lg font-semibold py-2 px-6 hover:bg-blue-600 transition-colors cursor-pointer"
                ></button>
              </div>
            </div> */}
          </>
          //   <img
          //     src={coverPicture as string}
          //     className=" absolute inset-0 object-fill  "
          //   />
        )}

        {/* <AfterCrop /> */}
        <button
          className="rounded-[8px] bg-[rgb(0,149,246)] px-[16px] py-[7px] text-[14px] text-white hover:bg-[#1877F2]"
          onClick={() => {
            setUpdate(true);
            inputImgRef!.current!.click();
            setCropState(true);
          }}
        >
          Select from computer
        </button>
      </div>
      {coverPicture && !update && (
        <img
          src={coverPicture as string}
          alt="Cropped"
          className="absolute inset-0 object-fill h-full w-full  "
        />
      )}
      {/* {coverPicture && (
        <div
          className=" absolute top-3 right-3  cursor-pointer text-black hover:bg-gray-100/50 p-2 rounded-[12px] "
          onClick={() => setCoverPicture("")}
        >
          <Icons.close />
        </div>
      )} */}
    </>
  );
}
