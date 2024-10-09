import React, { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Job } from "@/features/jobs/schema/all-jobs-schema";
interface DropdownMenuDashboardProps {
  selectedJobTitle: string | undefined;
  setSelectedJobTitle: Dispatch<SetStateAction<string | undefined>>;
  jobTitles: Job[] | undefined;
  setPostedOn: Dispatch<SetStateAction<string | undefined>>;
  setSelectedJob: Dispatch<SetStateAction<string | undefined>>;
  isLoading: boolean;
  fetchNextList: () => void;
}

const DropdownMenuJobTitle = ({
  selectedJobTitle,
  setSelectedJobTitle,
  jobTitles,
  setPostedOn,
  setSelectedJob,
  isLoading,
  fetchNextList,
}: DropdownMenuDashboardProps) => {
  const { ref, inView } = useInView();
  if (inView) fetchNextList();
  console.log(jobTitles);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1">
          <p className="font-bold">{selectedJobTitle}</p>
          <ChevronDown size={24} color="#171717" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="scroll-container max-h-[300px] overflow-y-auto">
        {isLoading ? (
          <div className="text-center">Loading..</div>
        ) : jobTitles?.length === 0 ? (
          <DropdownMenuItem className="text-center">
            No job found
          </DropdownMenuItem>
        ) : (
          jobTitles?.map((item, i: number) => {
            if (jobTitles.length === i + 1) {
              return (
                <DropdownMenuItem
                  ref={ref}
                  key={item._id}
                  onClick={() => {
                    setSelectedJobTitle(item?.jobTitle ?? "");
                    setPostedOn(item?.createdAt ?? "");
                    setSelectedJob(item?._id);
                  }}
                >
                  {item?.jobTitle}
                </DropdownMenuItem>
              );
            }
            return (
              <DropdownMenuItem
                key={item._id}
                onClick={() => {
                  setSelectedJobTitle(item?.jobTitle ?? "");
                  setPostedOn(item?.createdAt ?? "");
                  setSelectedJob(item?._id);
                }}
              >
                {item?.jobTitle}
              </DropdownMenuItem>
            );
          })
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuJobTitle;
