import { socket } from "@/lib/socket";
import { UserOnlineStatus } from "@/types/chat";
import { useEffect, useState } from "react";

// handle the state when user online status changes (eg: when user went offline from online)
export const useOnOnlineStatusChange = () => {
  const [userOnlineStatus, setUserOnlineStatus] = useState<
    {} | UserOnlineStatus
  >({});

  useEffect(() => {
    socket.on("userStatusChange", (data: UserOnlineStatus) => {
      console.log(data);
      setUserOnlineStatus(data);
    });
  }, []);
  console.log("[USERONLINESTATUSCHANGE:]", userOnlineStatus);

  return [userOnlineStatus];
};
