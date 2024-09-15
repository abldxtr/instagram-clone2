"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icons } from "../Icons";
import getCroppedImg from "@/utils/getImg";

import Cropper from "react-easy-crop";
// import AfterCrop from "./after-crop";
import { useGlobalstate } from "@/context/globalContext";
import classNames from "classnames";

export default function ProfileSelectBotton() {
  const inputImgRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement | null>(null);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [initialPicture, setInitialPicture] = useState<string | ArrayBuffer>(
    ""
  );
  const [update, setUpdate] = useState(true);
  const [file, setFile] = useState<File | null>(null);

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
    coverPicture,
    setCoverPicture,
    image,
    setImage,
    caption,
    setCaption,
    setFileName,
  } = useGlobalstate();

  const updateCover = async () => {
    if (croppedAreaPixels != null) {
      const img = await getCroppedImg(
        coverPicture as string,
        croppedAreaPixels
      );
      if (img) {
        let blob = await fetch(img).then((b) => b.blob());
        const fileWithName = new File([blob], file!.name, {
          type: blob.type,
        });
        setFileName(fileWithName);

        setImage(fileWithName);
        const blobUrl = URL.createObjectURL(blob);
        setCoverPicture(blobUrl);
      }
    }
    setUpdate(false);
  };

  const handleImage = (e: any) => {
    const file = e.target.files[0];
    const type = file.type.split("/")[1];
    if (!["jpeg", "png", "webp"].includes(type)) {
      setErrorMsg(`${file.name} format is not supported`);
      setCoverPicture("");
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setErrorMsg(`${file.name} is to large max 5mp allowed`);
      setCoverPicture("");
      return;
    }
    console.log("file", file);
    setFile(file);
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

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
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

      <div className={classNames("", !coverPicture && "mt-[24px] p-[4px]")}>
        {/* <div className=""> */}
        <input
          type="file"
          accept="image/jpeg, image/png, image/webp"
          onChange={handleImage}
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
              minZoom={0.8}
              maxZoom={3}
              // zoomSpeed={0.2}
              aspect={1 / 1}
              onZoomChange={setZoom}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              cropShape="round"
              // objectFit="horizontal-cover"
              objectFit="cover"
            />
          </>
        )}

        {/* <AfterCrop /> */}
        {!coverPicture && (
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
        )}
      </div>
      {coverPicture && !update && (
        <img
          src={coverPicture as string}
          alt="Cropped"
          className="object-fill size-[150px] rounded-full  "
        />
      )}
    </>
  );
}
