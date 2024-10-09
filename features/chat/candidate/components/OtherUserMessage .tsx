// import Image from "next/image";
import React from "react";
// import userProfile from "@/public/userProfile.png";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatToTwelveHrs } from "@/utils/format-date";

interface Props {
  text: string;
  time: string;
  profilePicture: string | undefined;
}

const OtherUserMessage = ({ text, time, profilePicture }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-4 md:ml-4 md:max-w-[452px] ">
        {/* {[...Array(8)].map((index) => {
          return ( */}
        <div className="flex items-center gap-2">
          <div className="mb-[30px] self-end">
            <Avatar>
              <AvatarImage
                src={`${process.env.NEXT_PUBLIC_IMG_URL}${profilePicture}`}
                className="h-[30px] w-[30px] rounded-full"
                width={30}
                height={30}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* <Image
              src={userProfile}
              alt="userProfile"
              width={30}
              height={30}
              className="rounded-full"
            /> */}
          </div>
          {/* chat */}
          <div
            className="message other-message custom-text break-all md:max-w-[352px]"
            style={{ wordWrap: "break-word" }}
          >
            {text}
          </div>
          <h6 className="mb-[30px] flex self-end whitespace-nowrap text-xs font-medium text-[#A9A9A9]">
            {time && formatToTwelveHrs(new Date(time))}
          </h6>
        </div>
        {/* );
        })} */}
      </div>
    </>
  );
};

export default OtherUserMessage;
