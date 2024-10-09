import React, { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DropdownMenuDashboardProps {
  selectedJobTitle: string;
  setSelectedJobTitle: Dispatch<SetStateAction<string>>;
  jobTitles: Array<{
    _id: string;
    title: string;
  }>;
  setSelectedJob: Dispatch<SetStateAction<string>>;
}

const DropdownMenuDashboard = ({
  selectedJobTitle,
  setSelectedJobTitle,
  jobTitles,
  setSelectedJob,
}: DropdownMenuDashboardProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1">
          <p className="font-bold">{selectedJobTitle}</p>
          <ChevronDown size={24} color="#171717" />
        </div>
      </DropdownMenuTrigger>
      <ScrollArea>
        <DropdownMenuContent className="scroll-container max-h-[300px] overflow-auto">
          {jobTitles?.map((item) => (
            <DropdownMenuItem
              key={crypto.randomUUID()}
              onClick={() => {
                setSelectedJobTitle(item?.title);
                setSelectedJob(item?._id);
              }}
            >
              {item?.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </ScrollArea>
    </DropdownMenu>
  );
};

export default DropdownMenuDashboard;
