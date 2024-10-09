import { ReactElement, useState } from "react";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import PrimaryLayout from "@/components/layout/primary-layout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ManagerDashboardBody from "@/components/manager/dashboard/manager-dashboard-body";
import storage from "@/utils/storage";
import HeadBar from "@/components/layout/head-bar";
import { ChevronDown } from "lucide-react";
import { Filter } from "@/features/dashboard/api/get-revenue-number";

const FilterData: Array<{ id: number; name: string; label: Filter }> = [
  {
    id: 0,
    name: "Today",
    label: "today",
  },
  {
    id: 1,
    name: "Yesterday",
    label: "yesterday",
  },
  {
    id: 2,
    name: "Last Week",
    label: "lastWeek",
  },
  {
    id: 3,
    name: "Last Month",
    label: "lastMonth",
  },
  {
    id: 4,
    name: "Last year",
    label: "lastYear",
  },
  {
    id: 5,
    name: "All time",
    label: "allTime",
  },
];

const Manager = () => {
  const { userDetails } = storage.getDatafromCookie("user_data");

  const [selectedFilter, setSelectedFilter] = useState(FilterData[5]);

  return (
    <>
      <HeadBar heading="Dashboard" />

      <div className="flex grow flex-col p-5">
        <div className="mb-3 flex justify-between">
          <div className="font-bold">Hi, {userDetails.fullName}</div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="gap-0,5 flex items-center">
                <p className="text-base font-normal text-[#5E5E5E]">
                  {selectedFilter.name}
                </p>
                <ChevronDown className="text-black" size={20} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-0 md:w-[104px]">
              {FilterData?.map((filter) => (
                <DropdownMenuItem
                  onClick={() => {
                    setSelectedFilter(filter);
                  }}
                  className="pl-[30px] text-sm font-medium leading-[16.5px] text-[#171717]"
                  key={filter.id}
                >
                  {filter.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex w-full  flex-col gap-3">
          <ManagerDashboardBody selectedFilter={selectedFilter} />{" "}
        </div>
      </div>
    </>
  );
};

Manager.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.MANAGER} can view this.</div>}
      allowedRoles={[ROLES.MANAGER]}
    >
      <PrimaryLayout>
        <div className="flex h-screen grow flex-col overflow-y-auto bg-white">
          {page}
        </div>
      </PrimaryLayout>
    </Authorization>
  );
};

export default Manager;
