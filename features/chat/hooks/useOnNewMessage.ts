import { socket } from "@/lib/socket";
import { NewMessage } from "@/types/chat";
import storage from "@/utils/storage";
import { useEffect, useState } from "react";

export const useOnNewMessage = () => {
  const [arrivalMessage, setArrivalMessage] = useState<null | {
    isMyMessage: boolean;
    text: string;
    time: string;
    chatId: string;
  }>(null);

  useEffect(() => {
    const onNewMessage = (newMessage: NewMessage) => {
      console.log("[NEWMESSAGE EVENT]:", newMessage);
      setArrivalMessage({
        isMyMessage: newMessage.sender === storage.getUser("user_data"),
        text: newMessage.message,
        time: newMessage.createdAt,
        chatId: newMessage.chatId,
      });
    };
    socket.on("newMessage", onNewMessage);
    return () => {
      socket.off("newMessage", onNewMessage);
    };
  }, []);
  return { arrivalMessage, setArrivalMessage };
};
