import { socket } from "@/lib/socket";
import { UserOnlineStatus } from "@/types/chat";
import { useEffect, useState } from "react";
import { useOnOnlineStatusChange } from "./useOnOnlineStatusChange";

const isUserOnlineStatus = (obj: any): obj is UserOnlineStatus => {
  return obj?.status && obj.userId;
};

export const useUsersOnline = () => {
  const [usersOnline, setUsersOnline] = useState<string[]>([""]);
  const [userOnlineStatus] = useOnOnlineStatusChange();

  //   set default online users on initial socket connection
  useEffect(() => {
    socket.on("usersOnline", (data) => {
      setUsersOnline(data);
    });
  }, []);

  useEffect(() => {
    if (isUserOnlineStatus(userOnlineStatus)) {
      if (userOnlineStatus.status === "online") {
        setUsersOnline((prev) => {
          return [...prev, userOnlineStatus.userId];
        });
      }
      if (userOnlineStatus.status === "offline") {
        setUsersOnline((prev) => {
          return prev.filter((id) => id !== userOnlineStatus.userId);
        });
      }
    }
  }, [userOnlineStatus]);

  console.log(usersOnline);
  return [usersOnline];
};
