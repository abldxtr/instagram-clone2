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
  //   messages: Message[];
  //   setMessages: Dispatch<SetStateAction<Message[]>>;
  //   imgtemp: string[];
  //   setImgTemp: Dispatch<SetStateAction<string[]>>;
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
};

const GlobalContext = React.createContext<ContextType | null>(null);

export function GlobalProvider({ children }: { children: ReactNode }) {
  //   const [messages, setMessages] = useState<Message[]>([]);
  //   const [imgtemp, setImgTemp] = useState<string[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [cropState, setCropState] = useState(false);
  const [triggerUpdateCover, setTriggerUpdateCover] = useState(false);
  const [backState, setBackState] = useState(false);
  const [closeCrop, setCloseCrop] = useState(false);
  const [coverPicture, setCoverPicture] = useState<string | ArrayBuffer>("");

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
