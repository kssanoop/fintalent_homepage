import React, { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface DropdownMenuDashboardProps {
  selectedCompany: string | undefined;
  setSelectedCompany: Dispatch<SetStateAction<string | undefined>>;
  CompanyList:
    | Array<{
        companyName: string;
        companyId: string;
      }>
    | undefined;
  setSelectedCompanyId: Dispatch<SetStateAction<string | undefined>>;
  isLoading: boolean;
  fetchNextCompanyData: () => void;
}

const DropdownMenuCompanyName = ({
  selectedCompany,
  setSelectedCompany,
  CompanyList,
  setSelectedCompanyId,
  isLoading,
  fetchNextCompanyData,
}: DropdownMenuDashboardProps) => {
  const { ref, inView } = useInView();
  if (inView) {
    fetchNextCompanyData();
  }
  // console.log("company names:", CompanyNames);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center gap-1">
          <p className="font-bold">{selectedCompany}</p>
          <ChevronDown size={24} color="#171717" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="scroll-container max-h-[300px] overflow-y-auto">
        {isLoading ? (
          <div className="text-center">Loading..</div>
        ) : CompanyList?.length === 0 ? (
          <DropdownMenuItem className="text-center">
            No companies found!
          </DropdownMenuItem>
        ) : (
          CompanyList?.map(
            (item: { companyName: string; companyId: string }, i) => {
              if (CompanyList.length === i + 1) {
                return (
                  <DropdownMenuItem
                    key={item.companyId}
                    onClick={() => {
                      setSelectedCompany(item?.companyName);
                      setSelectedCompanyId(item?.companyId);
                    }}
                    ref={ref}
                  >
                    {item?.companyName}
                  </DropdownMenuItem>
                );
              }
              return (
                <DropdownMenuItem
                  key={item.companyId}
                  onClick={() => {
                    setSelectedCompany(item?.companyName);
                    setSelectedCompanyId(item?.companyId);
                  }}
                >
                  {item?.companyName}
                </DropdownMenuItem>
              );
            },
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuCompanyName;
