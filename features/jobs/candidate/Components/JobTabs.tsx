import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OfferIcon from "./svg/OfferIcon";
import HiredIcon from "./svg/HiredIcon";
import CalendarIconColor from "./svg/CalendarIconColor";
import RejectedIcon from "./svg/RejectedIcon";
import JobsCard from "./JobsCard";
import AcceptedIcon from "./svg/AcceptedIcon";
import { toast } from "sonner";
import {
  useGetAllDataJobByCandidate,
  useGetFilteredDataJobByCandidate,
} from "./api/useGetAllJobs";
import JobCardSkeleton from "@/components/skeleton/job-card-skeleton";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

interface JobsTabsProps {
  offerNumber: number;
}
const JobTabs = ({ offerNumber }: JobsTabsProps) => {
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get("type") || "inviteAccepted";

  // const [selectedTab, setSelectedTab] = useState("inviteAccepted");

  const handleTabClick = (value: string) => {
    // setSelectedTab(value);
    console.log("stage:", value);
  };

  function handleSuccess(data: any) {
    // toast.success(data?.message);
    console.log("success data:", data);
  }

  function handleError(error: any) {
    toast.error(error?.response?.data?.message);
  }
  const { isLoading, data } = useGetFilteredDataJobByCandidate(
    handleSuccess,
    handleError,
    selectedTab,
  );

  const { data: LengthData } = useGetAllDataJobByCandidate(
    handleSuccess,
    handleError,
  );

  const renderJobCards = () => {
    return data?.length > 0 ? (
      data?.map((job: any, index: number) => (
        <JobsCard
          key={crypto.randomUUID()}
          section={"JobsTabs"}
          selectedTab={selectedTab}
          data={job}
        />
      ))
    ) : (
      <div
        key={crypto.randomUUID()}
        className={`${
          offerNumber > 0 ? "mt-[calc(100%-88%)]" : "mt-[calc(100%-81%)]"
        } flex w-full items-center justify-center text-base text-[#5E5E5E]`}
      >
        No data found
      </div>
    );
  };

  // tabs reuse code
  const generateTabsTrigger = (value: string, icon: any, title: string) => (
    <Link href={`?type=${value}`}>
      <TabsTrigger
        value={value}
        onClick={() => {
          handleTabClick(value);
        }}
        className="p-0"
      >
        <div
          className={`flex items-center gap-1  py-2 ${
            selectedTab === value && "border-b-[5px] border-[#012A59]"
          }`}
        >
          <div className={`h-6 w-6 items-center justify-center rounded-[5px]`}>
            {icon && React.cloneElement(icon, { color: "#FFFFFF" })}
          </div>
          <h1 className="text-base text-[#171717]">{title}</h1>
        </div>
      </TabsTrigger>
    </Link>
  );

  return (
    <div className="pt-4">
      <Tabs value={selectedTab} className="w-full">
        <TabsList className="flex overflow-hidden overflow-x-auto bg-[#FFFFFF] p-0 md:bg-[#F7F7F7]">
          <div className={`flex w-full gap-6  `}>
            {generateTabsTrigger(
              "inviteAccepted",
              <AcceptedIcon />,
              `Accepted(${
                LengthData?.filter(
                  (job: any) => job.status === "inviteAccepted",
                ).length ?? "0"
              })`,
            )}
            {generateTabsTrigger(
              "interViewScheduled",
              <CalendarIconColor />,
              `Interview(${
                LengthData?.filter(
                  (job: any) =>
                    job.status === "interViewScheduled" ||
                    job.status === "shortlisted",
                ).length ?? "0"
              })`,
            )}
            {generateTabsTrigger(
              "offered",
              <OfferIcon />,
              `Offered(${
                LengthData?.filter((job: any) => job.status === "offered")
                  .length ?? "0"
              })`,
            )}
            {generateTabsTrigger(
              "hired",
              <HiredIcon />,
              `Hired(${
                LengthData?.filter((job: any) => job.status === "hired")
                  .length ?? "0"
              })`,
            )}
            {generateTabsTrigger(
              "rejected",
              <RejectedIcon />,
              `Rejected(${
                LengthData?.filter((job: any) => job.status === "rejected")
                  .length ?? "0"
              })`,
            )}
          </div>
        </TabsList>
        <div className="mt-3">
          {/* Render job cards based on filtered data */}
          <TabsContent value={selectedTab}>
            <div className="flex flex-col items-center justify-center gap-2">
              {isLoading
                ? [...Array(3)].map(() => {
                    return (
                      <div
                        key={crypto.randomUUID()}
                        className="dark:bg-dark w-full animate-pulse rounded-lg bg-gray-100"
                      >
                        <JobCardSkeleton />
                      </div>
                    );
                  })
                : renderJobCards()}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default JobTabs;
