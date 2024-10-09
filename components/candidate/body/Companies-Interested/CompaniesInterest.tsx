import { Card } from "@/components/ui/card";
import {
  CardIcon,
  CardIconFallback,
  CardIconImage,
} from "@/components/ui/cardslogo";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCompanyLists } from "@/features/profile/candidate/api/get-company-logo-list";
import React from "react";

type CompaniesInterestedDataType = {
  companyLogo: {
    originalName: string;
    storageName: string;
  };
  _id: string;
  companyName: string;
};

export const CompaniesInterest = () => {
  const { data: companyListData, isLoading } = useGetCompanyLists();

  if (isLoading) {
    return (
      <Card className="flex flex-col overflow-hidden overflow-x-auto md:w-[888px]">
        <div className="flex flex-col gap-5 p-5">
          <Skeleton className="h-4 w-24 rounded-sm" />
          {/* companies Logo */}
          <div className="flex gap-4">
            {[...Array(4)].map(() => (
              <div key={crypto.randomUUID()}>
                <Skeleton className="h-16 w-16" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-full overflow-hidden overflow-x-auto">
      <div className="flex flex-col gap-5 p-5">
        <h2 className="text-base font-bold text-black">
          Companies interested in your profile
        </h2>
        {/* companies Logo */}
        <div className="scrolling-container">
          {companyListData?.map(
            (company: CompaniesInterestedDataType, index: number) => (
              <CardIcon
                className={`h-12 w-12 rounded ${
                  index === companyListData.length - 1 ? "mr-5" : "mr-5"
                }`}
                key={company?._id}
              >
                <CardIconImage
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${company?.companyLogo?.storageName}`}
                  width={47}
                  height={47}
                />
                <CardIconFallback>{company?.companyName}</CardIconFallback>
              </CardIcon>
            ),
          )}
        </div>
      </div>
    </Card>
  );
};
