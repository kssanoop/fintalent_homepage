import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChatsSchema } from "../schema/chat-schema";

const token = storage.getToken("user_data");

const getChats = async (): Promise<ChatsSchema> => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const config = {
    headers,
  };
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_CHAT_URL}/chat`,
    config,
  );

  return response.data.data;
};

function useGetChats() {
  return useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });
}

export default useGetChats;
