import { SocketInstance } from "@/types/chat";
import storage from "@/utils/storage";
import { io } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_SOCKET_URL as string;
const token = storage.getToken("user_data");

export const socket: SocketInstance = io(URL, {
  autoConnect: false,
  auth: {
    token,
  },
});
