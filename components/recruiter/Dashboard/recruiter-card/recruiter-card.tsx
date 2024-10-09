import { Card } from "@/components/ui/card";
import { CardIcon, CardIconImage } from "@/components/ui/cardslogo";
import React from "react";
import storage from "@/utils/storage";
import { useGetRecruiterProfile } from "@/features/profile/recruiter/api/get-profile-recruiter";
import { Skeleton } from "@/components/ui/skeleton";
const RecruiterCard = () => {
  const { userDetails } = storage.getDatafromCookie("user_data");
  const { data, isLoading } = useGetRecruiterProfile();
  return (
    <Card className="flex items-center gap-3 rounded-[8px] p-5 lg:h-[122px] lg:w-[437px]">
      <CardIcon className="h-[82px] w-[82px] rounded-full">
        <CardIconImage
          src={`${process.env.NEXT_PUBLIC_IMG_URL}${userDetails.profilePhoto.storageName}`}
        />
      </CardIcon>
      <div className="flex flex-col">
        {isLoading ? (
          <Skeleton className="h-5 w-32" />
        ) : (
          <h5 className=" text-xl font-extrabold tracking-[-0.4px]  text-[#171717]">
            Hi, {data?.fullName}
          </h5>
        )}
        {isLoading ? (
          <Skeleton className="mt-1 h-5 w-40" />
        ) : (
          <p className="text-base font-medium tracking-[-0.32px] text-[#171717]">
            {data?.designation} at {data?.companyId?.companyName}
          </p>
        )}
      </div>
    </Card>
  );
};

export default RecruiterCard;
