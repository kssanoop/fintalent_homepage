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

const MyMessage = ({ text, time, profilePicture }: Props) => {
  return (
    <>
      <div className="flex w-full items-center justify-end gap-4 md:max-w-[452px] md:justify-center">
        <h6 className="mb-[30px] self-end whitespace-nowrap text-xs font-medium text-[#A9A9A9]">
          {formatToTwelveHrs(new Date(time))}
        </h6>
        <div
          className="message my-message custom-text max-w-none break-all leading-4 md:max-w-[352px]"
          style={{ wordWrap: "break-word" }}
        >
          {text}
        </div>

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
            className="h-[30px] w-[30px] rounded-full"
          /> */}
        </div>
      </div>
    </>
  );
};

export default MyMessage;
