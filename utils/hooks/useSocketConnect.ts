import { socket } from "@/lib/socket";
import { useEffect } from "react";

// initialise socket connection
export const useSocketConnect = () => {
  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);
};
