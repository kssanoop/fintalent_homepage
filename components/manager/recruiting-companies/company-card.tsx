import { modifyLink } from "@/components/modify-links/modify-links";
import { Card, CardTitle } from "@/components/ui/card";
import {
  CardIcon,
  CardIconFallback,
  CardIconImage,
} from "@/components/ui/cardslogo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAnalyticsOfCompany } from "@/features/recuitment-partners/admin/api/get-analytics-of-company,";
import { CompanyDataType } from "@/features/recuitment-partners/admin/type/company-list-data-type";
import LinkedinIcon from "@/public/svg/LinkedinIcon";
import { ChevronDown, Copy, Globe } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import AssignManager from "@/components/Admin/recruitment-partners/components/assign-manager/assign-manager";
import useGetManagersForAdmin from "@/features/admin/manager/api/get-managers-for-admin";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateViewCostOfCompanySchema } from "@/features/recuitment-partners/schema/updateViewCostOfCompanySchema";
import { useUpdateViewCostOfCompany } from "@/features/recuitment-partners/api/update-view-cost-of-company";

interface CompanyCardProps {
  companyData: CompanyDataType;
  isLoading: boolean;
}

const FilterData = [
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
];

const CompanyCard = ({ companyData, isLoading }: CompanyCardProps) => {
  const [selectedFilter, setSelectedFilter] = useState(FilterData[3].name);
  const [selectedFilterOption, setSelectedFilterOption] = useState(
    FilterData[3].label,
  );
  const [openManagerDialog, setOpenManagerDialog] = useState(false);
  const { data: companyAnalyticsData, isLoading: isAnalyticsLoading } =
    useGetAnalyticsOfCompany(companyData?._id, selectedFilterOption);

  const { mutate } = useUpdateViewCostOfCompany();

  const { register, handleSubmit, setValue } =
    useForm<UpdateViewCostOfCompanySchema>({
      defaultValues: {
        verifiedViewCost: companyData?.verifiedViewCost,
        unverifiedViewCost: companyData?.unverifiedViewCost,
      },
    });

  useEffect(() => {
    console.log(companyData?.verifiedViewCost);
    setValue("verifiedViewCost", companyData?.verifiedViewCost ?? 0);
    setValue("unverifiedViewCost", companyData?.unverifiedViewCost ?? 0);
  }, [companyData, setValue]);

  const { data, isLoading: isManagerListLoading } = useGetManagersForAdmin();
  // const currentManager = data?.find(
  //   (item) => item.managerId === companyData?.managerId,
  // );

  const companyId = companyData?._id;

  // console.log("analytics data:", companyAnalyticsData);
  const { totalBillAmount, totalJobPosted, totalProfileClicks } =
    companyAnalyticsData || {};

  const BillTitles = [
    {
      title: "for verified profile",
      name: "verifiedViewCost",
      value: totalJobPosted ?? "null",
    },
    {
      title: "for non - verified profile",
      name: "unverifiedViewCost",
      value: totalProfileClicks ?? "null",
    },
  ];

  const handleCopyToClipBoard = (copyText: string) => {
    navigator.clipboard.writeText(copyText);
    toast.message("Company Id Copied");
  };

  const handleFilterSelection = (Filter: any) => {
    setSelectedFilter(Filter?.name);
    setSelectedFilterOption(Filter?.label);
  };

  const handleEditCost: SubmitHandler<UpdateViewCostOfCompanySchema> = (
    value,
  ) => {
    console.log(value);
    mutate({ companyId, data: value });
  };

  return (
    <>
      <div className="flex gap-[9px]">
        {isLoading ? (
          <Card className="relative flex grow flex-col border-[#EFEFEF] pb-3.5 pl-5 pr-2.5 pt-6 shadow-lg">
            <div className="flex flex-col gap-3 lg:flex-row">
              <Skeleton className="h-[110px] w-[110px]" />
              <div className="flex w-full flex-col gap-1">
                <Skeleton className="h-6 w-28" />
                <div className="flex flex-col gap-2 md:gap-0 lg:flex-row lg:justify-between">
                  {/* social icons */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6" />
                      <Skeleton className="h-6 w-6" />
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-6" />
                    </div>
                    <Skeleton className="h-10 w-40 rounded-sm" />
                  </div>
                  {/* details */}
                  <div className="flex flex-col gap-3 lg:mr-8 lg:flex-row lg:gap-[24px]">
                    {[...Array(3)].map(() => {
                      return (
                        <div
                          className="flex flex-col gap-2"
                          key={crypto.randomUUID()}
                        >
                          <Skeleton className="h-4 w-28" />
                          <Skeleton className="h-8 w-20" />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="relative flex grow flex-col border-[#EFEFEF] pb-3.5 pl-5 pr-2.5 pt-6 shadow-lg">
            <DropdownMenu>
              <DropdownMenuTrigger className="absolute right-[18px] top-[20px]">
                <div className="gap-0,5 flex items-center">
                  <p className="text-base font-normal text-[#5E5E5E]">
                    {selectedFilter}
                  </p>
                  <ChevronDown className="text-black" size={20} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-0 md:w-[104px]">
                {FilterData?.map((Filter) => (
                  <DropdownMenuItem
                    onClick={() => {
                      handleFilterSelection(Filter);
                    }}
                    className="pl-[30px] text-sm font-medium leading-[16.5px] text-[#171717]"
                    key={crypto.randomUUID()}
                  >
                    {Filter.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex flex-col gap-3 lg:flex-row">
              <CardIcon className="h-[110px] w-[110px]">
                <CardIconImage
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${companyData?.companyLogo?.storageName}`}
                />
                <CardIconFallback>{companyData?.companyName}</CardIconFallback>
              </CardIcon>
              <div className="flex w-full flex-col gap-1">
                <CardTitle className="text-2xl font-bold leading-normal  text-[#171717]">
                  {companyData?.companyName}
                </CardTitle>
                <div className="flex flex-col gap-2 md:gap-[65px] lg:flex-row lg:justify-between">
                  {/* social icons */}
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2">
                      <Link
                        href={modifyLink(companyData?.companyLinkedIn)}
                        target="_blank"
                      >
                        <LinkedinIcon />
                      </Link>
                      <Link
                        href={modifyLink(companyData?.companyWebsite)}
                        target="_blank"
                      >
                        <Globe color="#0076B2" size={24} />
                      </Link>
                      <p className="pl-1 text-xl font-medium text-[#171717]">
                        {companyData?.companyNo}
                      </p>
                      <Copy
                        size={18}
                        color="#3790E3"
                        className="cursor-pointer"
                        onClick={() => {
                          handleCopyToClipBoard(companyData?.companyNo);
                        }}
                      />
                    </div>
                  </div>
                  {/* analytics */}
                  <div className="flex flex-col gap-3 lg:mr-8 lg:flex-row lg:gap-[42px]">
                    {/* jobs posted */}
                    <div className="flex flex-col gap-3">
                      <h5 className="text-sm font-normal text-[#5E5E5E] lg:whitespace-nowrap">
                        Total Jobs Posted
                      </h5>
                      {isAnalyticsLoading ? (
                        <Skeleton className="h-4 w-24" />
                      ) : (
                        <p className="text-xl font-bold text-[#171717]">
                          {totalJobPosted}
                        </p>
                      )}
                    </div>
                    {/* profile clicks */}
                    <div className="flex flex-col gap-3">
                      <h5 className="text-sm font-normal text-[#5E5E5E]">
                        Total Profile clicks
                      </h5>
                      <div className="flex flex-col gap-0.5">
                        {isAnalyticsLoading ? (
                          <Skeleton className="h-4 w-24" />
                        ) : (
                          <p className="text-xl font-bold text-[#171717]">
                            {totalProfileClicks}
                          </p>
                        )}

                        {isAnalyticsLoading ? (
                          <div className="flex items-center gap-[7px]">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-[7px]">
                            <p className="text-sm font-normal text-[#5E5E5E] lg:whitespace-nowrap">
                              {companyAnalyticsData.verifiedViews} veriified
                            </p>
                            <div className="h-1 w-1 rounded-full bg-[#5E5E5E]" />
                            <p className="whitespace-nowrap text-sm font-normal text-[#5E5E5E]">
                              {companyAnalyticsData.unverifiedViews} unverified
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* total bill */}
                    <div className="flex flex-col gap-1.5">
                      <h5 className="text-sm font-normal text-[#5E5E5E]">
                        Total Bill amount
                      </h5>
                      {isAnalyticsLoading ? (
                        <Skeleton className="h-4 w-24" />
                      ) : (
                        <p className="text-xl font-bold text-[#171717]">
                          <span className="mr-1 font-medium text-[#A9A9A9]">
                            ₹
                          </span>
                          {totalBillAmount}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
        <Card className="flex w-[241x] flex-col gap-[11px] border-[#EFEFEF] px-5 py-3 pb-[30px] shadow-lg">
          <h5 className="text-sm font-bold text-[#171717]">
            Billing amount per click
          </h5>
          <div className="flex flex-col gap-2">
            {BillTitles?.map((item) => (
              <div className="flex flex-col gap-0.5" key={crypto.randomUUID()}>
                <h6 className="text-sm font-normal text-[#171717]">
                  {item?.title}
                </h6>
                <div className="relative">
                  <Input
                    {...register(
                      item.name as "verifiedViewCost" | "unverifiedViewCost",
                      // eslint-disable-next-line @typescript-eslint/no-misused-promises
                      { onBlur: handleSubmit(handleEditCost) },
                    )}
                    type="number"
                    className="relative h-[27.2px] rounded-[2.563px] border-[#CDCDCD] pr-[18px] text-xl font-bold text-[#171717]"
                  />
                  <p className="absolute bottom-[3px] right-1.5 top-[3px] text-base font-medium text-[#A9A9A9]">
                    ₹
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <AssignManager
        open={openManagerDialog}
        setOpen={setOpenManagerDialog}
        companyName={companyData?.companyName}
        companyId={companyId}
        defaultManagerId={companyData?.managerId}
        isLoading={isManagerListLoading}
        data={data || []}
      />
    </>
  );
};

export default CompanyCard;
