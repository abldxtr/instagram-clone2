"use client";

import React, {
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type Message = {
  id: number;
  text: string;
  timestamp: Date;
  images: string[];
};

type ContextType = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  cropState: boolean;
  setCropState: Dispatch<SetStateAction<boolean>>;
  triggerUpdateCover: boolean;
  setTriggerUpdateCover: Dispatch<SetStateAction<boolean>>;
  backState: boolean;
  setBackState: Dispatch<SetStateAction<boolean>>;
  closeCrop: boolean;
  setCloseCrop: Dispatch<SetStateAction<boolean>>;
  coverPicture: string | ArrayBuffer;
  setCoverPicture: Dispatch<React.SetStateAction<string | ArrayBuffer>>;
  openUpload: boolean;
  setOpenUpload: Dispatch<SetStateAction<boolean>>;
  caption: string;
  setCaption: Dispatch<SetStateAction<string>>;
  image: Blob | undefined;
  setImage: Dispatch<React.SetStateAction<Blob | undefined>>;
  fileName: File | null;
  setFileName: Dispatch<React.SetStateAction<File | null>>;
  changeProfileImg: boolean;
  setChangeProfileImg: Dispatch<SetStateAction<boolean>>;
};

const GlobalContext = React.createContext<ContextType | null>(null);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [openModal, setOpenModal] = useState(false);
  const [cropState, setCropState] = useState(false);
  const [triggerUpdateCover, setTriggerUpdateCover] = useState(false);
  const [backState, setBackState] = useState(false);
  const [closeCrop, setCloseCrop] = useState(false);
  const [coverPicture, setCoverPicture] = useState<string | ArrayBuffer>("");
  const [openUpload, setOpenUpload] = useState(false);
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<Blob>();
  const [fileName, setFileName] = useState<File | null>(null);
  const [changeProfileImg, setChangeProfileImg] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
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
        coverPicture,
        setCoverPicture,
        openUpload,
        setOpenUpload,
        caption,
        setCaption,
        image,
        setImage,
        fileName,
        setFileName,
        changeProfileImg,
        setChangeProfileImg,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalstate() {
  const State = React.useContext(GlobalContext);
  if (State === null) {
    throw new Error("useMessage must be used within a CounterProvider");
  }

  return State;
}
