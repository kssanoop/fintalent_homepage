import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Chat } from "../../schema/chat-schema";
import { User } from "lucide-react";
import { formatToTwelveHrs } from "@/utils/format-date";
import { ChatMessage } from "@/types/chat";
import { useEffect, useState } from "react";
import { useOnNewMessage } from "../../hooks/useOnNewMessage";

interface Props {
  user: Chat;
  isLastUser?: boolean;
  changeSelectedUser: (chatId: string) => void;
  selectedUser: string | null;
  isUserOnline: boolean;
  conversation: ChatMessage[] | [];
  setConversation: React.Dispatch<React.SetStateAction<[] | ChatMessage[]>>;
}

const UsersCard = ({
  user,
  isLastUser = false,
  changeSelectedUser,
  selectedUser,
  isUserOnline,
  conversation,
  setConversation,
}: Props) => {
  const [latestMessage, setLatestMessage] = useState(user.lastMessage?.message);
  const { arrivalMessage } = useOnNewMessage();
  console.log(user.lastMessage?.message, user._id);
  // const [newMessage, setNewMessage] = useState(user.lastMessage?.message);
  // const [active, setActive] = useState<string | null>(null);
  const handleClick = () => {
    // setActive(user._id);
    if (selectedUser !== user._id) setConversation([]); // resetting the state inorder to avoid flickering on chat change
    changeSelectedUser(user._id);
  };

  // set the message from the sender recieved from the socket
  // Note: the message send by the user itself won't be shown in this response
  useEffect(() => {
    if (user._id === arrivalMessage?.chatId)
      setLatestMessage(arrivalMessage?.text);
  }, [arrivalMessage, user._id]);

  // set the message send by the user itself to be the latest message
  useEffect(() => {
    if (
      conversation?.[0]?.chatId === user._id &&
      conversation?.[0]?.isMyMessage
    )
      setLatestMessage(conversation?.[0]?.text);
  }, [conversation, user._id]);

  console.log(selectedUser);
  console.log(conversation);
  console.log("[SELECTED]", selectedUser);
  console.log("USER", user._id, selectedUser === user._id);
  console.log(user);
  return (
    <div
      className={`flex cursor-pointer items-center justify-between border-b bg-white px-6 py-3 hover:bg-[rgba(178,83,222,0.1)]`}
      style={{
        backgroundColor: selectedUser === user._id ? "#B253DE1A" : "",
      }}
      onClick={handleClick}
    >
      <div className="flex gap-2">
        <Avatar>
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${user.icon}`}
            className=""
            // width={44}
            // height={44}
          />
          <AvatarFallback>
            <span className="sr-only">{user.name}</span>
            <User className="h-4 w-4" />
          </AvatarFallback>
          {isUserOnline && (
            <div className="absolute ml-[26px] mt-6 items-center rounded-full bg-[#00BA70] px-[2px] py-[2px]">
              <div className="h-[6px] w-[6px] rounded-full" />
            </div>
          )}
        </Avatar>
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-[#171717]">{user.name}</h3>
          <p className="line-clamp-1 break-all text-xs font-normal text-[#5E5E5E]">
            {/* {user.lastMessage?.message} */}
            {/* {user.lastMessage?.message} */}
            {/* {user._id === conversation?.[conversation.length - 1]?.chatId &&
              latestMessage} */}
            {latestMessage}
          </p>
        </div>
      </div>
      <div>
        <p className="whitespace-nowrap text-xs font-normal text-[#5E5E5E]">
          {user.lastMessageAt &&
            formatToTwelveHrs(new Date(user.lastMessageAt))}
        </p>
      </div>
    </div>
  );
};

export default UsersCard;
