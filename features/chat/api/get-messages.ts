import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { MessagesSchema } from "../schema/messages-schema";

const token = storage.getToken("user_data");

const getMessages = async ({
  chatId,
  page = 1,
  limit = 10,
}: {
  chatId: string | null;
  page?: number;
  limit?: number;
}): Promise<MessagesSchema["data"]> => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const config = {
    headers,
  };
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_CHAT_URL}/message/${chatId}?page=${page}&limit=${limit}`,
    config,
  );

  return response.data.data;
};

function useGetMessages(query: {
  chatId: string | null;
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["messages", query],
    queryFn: async () => await getMessages(query),
    enabled: !!query.chatId,
  });
}

export default useGetMessages;
