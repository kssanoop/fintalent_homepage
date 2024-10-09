import storage from "@/utils/storage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Profile } from "@/types/chat";

const token = storage.getToken("user_data");

const getUserChatProfile = async (): Promise<Profile> => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const config = {
    headers,
  };
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_CHAT_URL}/me`,
    config,
  );

  return response.data.data;
};

function useGetUserChatProfile() {
  return useQuery({
    queryKey: ["user-chat-profile"],
    queryFn: getUserChatProfile,
  });
}

export default useGetUserChatProfile;
