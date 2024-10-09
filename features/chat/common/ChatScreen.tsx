import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dispatch,
  LegacyRef,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  // useState,
} from "react";

import { ArrowLeft, Loader2, User } from "lucide-react";
// import InsertEmojiIcon from "../candidate/components/InsertEmojiIcon";
// import { EmojiClickData } from "emoji-picker-react";
// import { Textarea } from "@/components/ui/textarea";
import useGetMessages from "../api/get-messages";
import storage from "@/utils/storage";
import { socket } from "@/lib/socket";
import useGetChats from "../api/get-chats";
import { ChatMessage } from "@/types/chat";
import OtherUserMessage from "../candidate/components/OtherUserMessage ";
import MyMessage from "../candidate/components/MyMessage";
import ChatInput from "./ChatInput";
import useGetUserChatProfile from "../api/get-user-chat-profile";
import NoChatSelected from "@/public/svg/NoChatSelected";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

interface Props {
  chatId: string | null;
  setSelectedChat?: Dispatch<SetStateAction<string | null>>;
  conversation: ChatMessage[];
  selectedChatId?: string;
  setConversation: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  usersOnline: string[];
}
const ChatScreen = ({
  chatId,
  setSelectedChat,
  conversation,
  setConversation,
  usersOnline,
}: Props) => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatIdFromQuery = searchParams.get("_id") || null;
  console.log(chatIdFromQuery);
  const { data, isLoading } = useGetMessages({
    chatId,
  });
  const messageContainerRef: MutableRefObject<HTMLInputElement | null> =
    useRef(null);
  const scrollRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);
  const { data: userData } = useGetUserChatProfile();
  const { data: chats } = useGetChats();
  const selectedUserData = chats?.find((chat) => chat._id === chatId);
  console.log("SELCTED:", selectedUserData);
  console.log(selectedUserData?.users[0].profileId.profilePicture);
  const isSelectedUserOnline = usersOnline.find(
    (userOnline) => userOnline === selectedUserData?.users[0].userId,
  );
  useEffect(() => {
    if (data) {
      const formattedData = data.map((message) => ({
        text: message.message,
        isMyMessage: message.sender === storage.getUser("user_data"),
        time: message.createdAt,
        chatId: message.chatId,
      }));
      setConversation(formattedData);
    }
    // TODO: remove eslint disable command and fix deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSendMessage = (message: string) => {
    const currentTime = new Date().toISOString();

    setConversation([
      {
        text: message,
        isMyMessage: true,
        time: currentTime,
        chatId: chatId as string,
      },
      ...conversation,
    ]);

    socket.emit("createMessage", {
      chatId: chatId as string,
      message,
      messageType: "text",
    });
    // }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  if (!chatId)
    return (
      <div className="flex h-full w-full items-center justify-center">
        <NoChatSelected />
      </div>
    );
  console.log("[CONVERSATION", conversation);
  return (
    <>
      {/* header */}
      {isLoading ? (
        <Loader2 className="mx-auto mt-4 animate-spin" />
      ) : (
        <div className="relative flex h-full w-full  flex-col">
          <div className="flex h-[74px] items-center gap-2 border-b border-border  py-[10px]">
            <div
              className="flex cursor-pointer pl-5 md:hidden"
              onClick={() => {
                if (setSelectedChat != null) {
                  setSelectedChat(null);
                  console.log(chatIdFromQuery);
                  if (chatIdFromQuery) {
                    router.push(pathName);
                  }
                }
              }}
            >
              <ArrowLeft size={24} strokeWidth={1} />
            </div>

            <div className="p-[5px]">
              <Avatar>
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${selectedUserData?.users[0].profileId.profilePicture}`}
                  className="h-[50px] w-[50px]"
                  height={50}
                  width={50}
                />
                <AvatarFallback>
                  <span className="sr-only">{}</span>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              {isSelectedUserOnline && (
                <div className="absolute z-30 -mt-3.5 ml-7 items-center rounded-full bg-[#00BA70] px-[2px] py-[2px]">
                  <div className="h-[6px] w-[6px] rounded-full" />
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-[#171717]">
                {selectedUserData?.users[0].profileId.name}
              </h3>
              {isSelectedUserOnline && (
                <p className="text-sm font-normal text-[#5E5E5E]">active now</p>
              )}
            </div>
          </div>
          {/* <DynamicHeightContainer> */}
          <div
            ref={messageContainerRef}
            className="scroll-container relative flex grow flex-col gap-4 overflow-y-auto 
        border-b border-[#CDCDCD]  pt-5 md:pl-5 md:pr-8 "
          >
            {/* TODO: chat date */}
            {/* <div className="flex items-center gap-3">
              <div className="flex-1 border-b border-[#EFEFEF]"></div>
              <p className="self-center py-6 text-xs font-medium text-[#A9A9A9]">
                Yesterday
              </p>
              <div className="flex-1 border-b  border-[#EFEFEF]"></div>
            </div> */}
            {/* need to use reverse() inorder to avoid modifying the original array by the reverse() */}
            {conversation
              ?.slice()
              .reverse()
              .map((message, index) =>
                message.isMyMessage ? (
                  <div
                    key={index}
                    ref={scrollRef}
                    className="w-full self-end pl-10 pr-5 md:w-auto"
                  >
                    <MyMessage
                      text={message.text}
                      time={message.time}
                      profilePicture={userData?.profilePicture}
                    />
                  </div>
                ) : (
                  <div
                    key={index}
                    ref={scrollRef}
                    className="w-full self-start break-all pl-5 pr-10 md:w-auto"
                  >
                    <OtherUserMessage
                      text={message.text}
                      time={message.time}
                      profilePicture={
                        selectedUserData?.users[0].profileId.profilePicture
                      }
                    />
                  </div>
                ),
              )}
          </div>
          {/* </DynamicHeightContainer> */}
          <div className="mb-2 mt-3 flex w-full items-center gap-3 px-5">
            {/* test */}
            {/* {Boolean(showEmoji) && <InsertEmojiIcon pickEmoji={pickEmoji} />}
            <div onClick={handleShowEmoji}>
              {showEmoji ? (
                <Smile
                  size={25}
                  color="#00A9FF"
                  strokeWidth={1.5}
                  className="cursor-pointer"
                />
              ) : (
                <Smile
                  size={25}
                  color="#5E5E5E"
                  strokeWidth={1.5}
                  className="cursor-pointer"
                />
              )}
            </div> */}

            <ChatInput handleSendMessage={handleSendMessage} />

            {/* test */}
            {/* <Textarea
              ref={inputRef}
              placeholder="Type message here..."
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              style={{ wordWrap: "break-word" }}
              rows={4}
              className="custom-text bottom-0 flex max-h-[42px]
             min-h-[20px] resize-none
              items-center justify-center
               rounded border border-border"
            /> */}
            {/* <div onClick={handleSendMessage}>
              <SendHorizontal
                size={32}
                className="cursor-pointer text-[#5E5E5E] hover:text-[#00A9FF]"
              />
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatScreen;
