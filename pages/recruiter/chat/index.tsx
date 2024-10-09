import PrimaryLayout from "@/components/layout/primary-layout";
import NotificationButton from "@/components/notification/notification-button";
import MobileSidebar from "@/components/sidebar/mobile-sidebar";
import ChatScreen from "@/features/chat/common/ChatScreen";
import ChatSidebar from "@/features/chat/common/ChatSidebar";
import { useOnNewMessage } from "@/features/chat/hooks/useOnNewMessage";
import { useUsersOnline } from "@/features/chat/hooks/useUsersOnlineStatus";
import { socket } from "@/lib/socket";
import { ChatMessage } from "@/types/chat";
import { useSocketConnect } from "@/utils/hooks/useSocketConnect";
import React, {
  useState,
  type ReactElement,
  useEffect,
  useCallback,
} from "react";

const RecruiterChat = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [conversation, setConversation] = useState<ChatMessage[] | []>([]);

  useSocketConnect();
  const [usersOnline] = useUsersOnline();
  const { arrivalMessage } = useOnNewMessage();

  useEffect(() => {
    function onConnect() {
      console.log("[SOCKET CONNECTED]");
    }

    function onDisconnect() {
      console.log("[SOCKET DISCONNECTED]");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  useEffect(() => {
    arrivalMessage &&
      setConversation((prev) => {
        if (prev) return [arrivalMessage, ...prev];
        return [arrivalMessage];
      });
  }, [arrivalMessage]);

  // Function to handle user card click and set the selected chat
  const handleUserCardClick = useCallback((chatId: string) => {
    setSelectedChatId(chatId);
  }, []);

  return (
    <div className="flex w-full flex-col bg-white">
      <div
        className={`h-16 flex-row items-center justify-between border-b  px-5 py-[17.5px] ${
          selectedChatId ? "hidden md:flex" : "flex"
        }`}
      >
        <div className="flex items-center gap-2 text-xl font-bold text-[#171717] lg:hidden">
          <MobileSidebar />
          <h1>Chats</h1>
        </div>
        <h1 className="hidden items-center gap-2 text-xl font-bold text-[#171717] lg:flex">
          Chats
        </h1>

        <NotificationButton />
      </div>
      <div className="mx-5 my-2 hidden grow overflow-y-auto rounded-md md:flex md:border md:border-solid md:border-[#CDCDCD]">
        <div className="relative h-full border-r ">
          <ChatSidebar
            usersOnline={usersOnline}
            handleSelectedUser={handleUserCardClick}
            selectedChatId={selectedChatId}
            conversation={conversation}
            setConversation={setConversation}
          />
        </div>
        {/* <div> */}
        <ChatScreen
          key={selectedChatId}
          chatId={selectedChatId}
          conversation={conversation}
          setConversation={setConversation}
          usersOnline={usersOnline}
        />
        {/* </div> */}
      </div>
      {/* <div className="hh"> */}
      {/* on mobile */}
      <div className="flex w-full grow overflow-y-auto rounded-md md:hidden md:border md:border-solid md:border-[#CDCDCD]">
        {selectedChatId ? (
          <ChatScreen
            key={selectedChatId}
            chatId={selectedChatId}
            setSelectedChat={setSelectedChatId}
            conversation={conversation}
            setConversation={setConversation}
            usersOnline={usersOnline}
          />
        ) : (
          <div className="relative h-full w-full">
            <ChatSidebar
              usersOnline={usersOnline}
              handleSelectedUser={handleUserCardClick}
              selectedChatId={selectedChatId}
              conversation={conversation}
              setConversation={setConversation}
            />
          </div>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

RecruiterChat.getLayout = function getLayout(page: ReactElement) {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};

export default RecruiterChat;
