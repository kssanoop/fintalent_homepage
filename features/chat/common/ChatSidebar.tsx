import React, { useState } from "react";
import SearchBar from "../../../components/search-bar/search-bar";
import UsersCard from "../candidate/components/UsersCard";
import DynamicHeightContainer from "./DynamicHeightContainer";
import useGetChats from "../api/get-chats";
// import { useErrorBoundary } from "react-error-boundary";
import { Loader2 } from "lucide-react";
import { ChatMessage } from "@/types/chat";

interface Props {
  handleSelectedUser: (chatId: string) => void;
  selectedChatId: string | null;
  usersOnline: string[];
  conversation: ChatMessage[] | [];
  setConversation: React.Dispatch<React.SetStateAction<[] | ChatMessage[]>>;
}

const ChatSidebar = ({
  handleSelectedUser,
  selectedChatId,
  usersOnline,
  conversation,
  setConversation,
}: Props) => {
  const { data, isLoading } = useGetChats();
  const [search, setSearch] = useState("");
  console.log(data);
  console.log(selectedChatId);
  // TODO: set error boundary
  // const { showBoundary } = useErrorBoundary();

  // if (isError) {
  //   showBoundary(error);
  //   return null;
  // }

  const filteredData = data?.filter((user) => {
    if (search && data)
      return user.users[0].profileId.name
        .toLowerCase()
        .includes(search.toLocaleLowerCase());
    else return user;
  });
  console.log(filteredData);

  return (
    // <div className="h-[calc(100%-300px)] w-full">
    <div className="flex h-full max-w-full flex-col border-solid  border-[#CDCDCD] md:w-[373px]">
      <div className="flex h-[74px] items-center border-b p-5">
        <SearchBar
          placeholder="Search in chat"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {isLoading ? (
        <Loader2 className="mx-auto mt-4 animate-spin" />
      ) : (
        <DynamicHeightContainer>
          <div className="relative flex flex-col overflow-hidden ">
            {filteredData?.length === 0 ? (
              <p className="mt-4 text-center text-brand-grey">No chats</p>
            ) : (
              filteredData?.map((user, index) => {
                return (
                  <UsersCard
                    key={user._id}
                    isUserOnline={
                      !!usersOnline.find(
                        (userInTheList) =>
                          userInTheList === user.users[0].userId,
                      )
                    }
                    user={user}
                    isLastUser={filteredData.length - 1 === index}
                    changeSelectedUser={handleSelectedUser}
                    selectedUser={selectedChatId}
                    conversation={conversation}
                    setConversation={setConversation}
                  />
                );
              })
            )}
          </div>
        </DynamicHeightContainer>
      )}
    </div>
    // </div>
  );
};

export default ChatSidebar;
