import { Card } from "@/components/ui/card";
import { TagsDataType } from "@/features/tags/recruiter/api/recruiter/type/tags-data-type";
import { ChevronRight } from "lucide-react";
import React from "react";
import TagsLoadingSkeleton from "./tags-loading-skeleton";
import Link from "next/link";
import useGetTagsByFilter from "@/features/tags/recruiter/api/recruiter/api/get-tags-recruiter";
import { usePathname } from "next/navigation";

export function formatPostedAt(updatedAt: string): string {
  const date = new Date(updatedAt);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  return `Posted on ${day} ${month}, ${year}`;
}
const TagsCardDashboard = () => {
  const { data, isLoading } = useGetTagsByFilter();
  const pathname = usePathname();

  return (
    <>
      {isLoading ? (
        <TagsLoadingSkeleton />
      ) : (
        <Card className="flex flex-col gap-4 p-5 lg:w-full">
          <h4 className="text-base font-bold text-black">Tags created</h4>
          <div className="flex flex-col gap-2">
            {!isLoading && data?.length === 0 ? (
              <div className="flex h-[180px] items-center justify-center">
                <p className="text-center text-base font-normal text-[#3790E3]">
                  No tags created yet
                </p>
              </div>
            ) : (
              data?.splice(0, 2)?.map((item: TagsDataType) => (
                <Link
                  href={`${pathname}/urgent-requirements/${item._id}`}
                  key={item._id}
                  className="rounded-[10px] transition-all hover:shadow"
                >
                  <Card className="flex flex-col gap-3 p-4">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-extrabold text-[#171717]">
                        {item?.jobTitle}
                      </h4>
                      <div className="flex items-center gap-1 text-sm font-normal leading-[21px] text-[#171717]">
                        <p>{item?.location}</p>
                        <div className="h-1 w-1 rounded-full bg-[#A9A9A9]" />
                        <p>{item?.experienceLevel}</p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <p className=" text-xs font-normal leading-[18px] text-[#5E5E5E]">
                        {formatPostedAt(item?.createdAt)}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-bold leading-[18px] text-[#00BA70]">
                          {item?.candidateIds?.length ?? 0} candidates added
                        </p>
                        <ChevronRight size={17} color="#00BA70" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            )}
            {(data ?? []).length > 0 && (
              <Link
                className="cursor-pointer text-center text-base font-normal text-[#3790E3]"
                href={"/recruiter/urgent-requirements"}
              >
                View all
              </Link>
            )}
          </div>
        </Card>
      )}
    </>
  );
};

export default TagsCardDashboard;
