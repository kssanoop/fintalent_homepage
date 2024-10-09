import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface DropDownRecruitersProps {
  selectedRecruiterName: string | undefined;
  setSelectedRecruiterName: Dispatch<SetStateAction<string | undefined>>;
  RecruiterList:
    | Array<{
        recruiterId: string;
        recruiterName: string;
      }>
    | undefined;
  setSelectedRecruiterId: Dispatch<SetStateAction<string | undefined>>;
  selectedRecruiterId: string;
  isRecruiterLoading: boolean;
}

const DropDownRecruiters = ({
  selectedRecruiterName,
  setSelectedRecruiterName,
  RecruiterList,
  setSelectedRecruiterId,
  isRecruiterLoading,
}: DropDownRecruitersProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1">
          <p className="font-bold">{selectedRecruiterName}</p>
          <ChevronDown size={24} color="#171717" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="scroll-container max-h-[300px] overflow-y-auto">
        {isRecruiterLoading ? (
          <div className="text-center">Loading..</div>
        ) : RecruiterList?.length === 0 ? (
          <DropdownMenuItem className="text-center">
            No Recruiter found
          </DropdownMenuItem>
        ) : (
          RecruiterList?.map(
            (item: { recruiterName: string; recruiterId: string }) => (
              <DropdownMenuItem
                key={crypto.randomUUID()}
                onClick={() => {
                  setSelectedRecruiterName(item.recruiterName);
                  setSelectedRecruiterId(item?.recruiterId);
                }}
              >
                {item?.recruiterName}
              </DropdownMenuItem>
            ),
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownRecruiters;
