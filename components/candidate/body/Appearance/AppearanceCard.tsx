import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetKeywordLists } from "@/features/profile/candidate/api/get-keyword-list";
import React from "react";

export type AppearanceDataType = {
  candidateId: string;
  count: number;
  keyword: string;
  __v: number;
  _id: string;
};

const AppearanceCard = () => {
  const {
    data: keywordListData,
    isLoading: iskeywordListDataLoading,
    // isError: iskeywordListDataError,
  } = useGetKeywordLists();

  return (
    <Card className="hide-scrollbar flex flex-col gap-5  rounded-lg p-5 lg:min-w-[47.5%] lg:max-w-[50%]">
      <div className="flex flex-col gap-2">
        <h2 className="text-base font-bold text-[#000000]">
          Keyword appearances
        </h2>
        <p className="text-base font-normal text-[#5E5E5E]">
          Your profile appeared when recruiters searched for these keywords
        </p>
      </div>
      {/* keywords */}
      {iskeywordListDataLoading
        ? [...Array(4)].map(() => {
            return (
              <div className="flex flex-col gap-1" key={crypto.randomUUID()}>
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-4 rounded-sm" />
                  <div className="flex gap-1">
                    <Skeleton className="h-3 w-4 rounded-sm" />
                    <Skeleton className="h-3 w-6 rounded-sm" />
                  </div>
                </div>
                <Skeleton className="h-6 w-full rounded-sm" />
              </div>
            );
          })
        : keywordListData?.slice(0, 4)?.map((keyword: AppearanceDataType) => {
            return (
              <div className="flex flex-col gap-1" key={crypto.randomUUID()}>
                <div className="flex justify-between">
                  <h2 className="text-base font-normal tracking-[-0.32px] text-[#000000]">
                    {keyword.keyword}
                  </h2>
                  <p className="text-sm font-bold tracking-[-0.28px] text-[#000000]">
                    {keyword?.count}{" "}
                    <span className="text-sm font-normal">times</span>
                  </p>
                </div>

                <Progress
                  value={keyword?.count}
                  className="h-[18px] rounded-none bg-[#EFEFEF]"
                  indicatorColor="bg-[#B21450]"
                />
              </div>
            );
          })}
      {keywordListData?.length === 0 && !iskeywordListDataLoading && (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-sm font-semibold text-[#034A9A]">
            No Data to show
          </p>
        </div>
      )}
    </Card>
  );
};

export default AppearanceCard;
