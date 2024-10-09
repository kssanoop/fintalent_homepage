import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronDown, IndianRupee } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import useGetRevenueWithQuery from "@/features/billings/api/get-revenue-with-query";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ViewCost,
  useGetViewCost,
} from "@/features/view-cost/api/get-view-cost";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateViewCost } from "@/features/view-cost/api/update-view-cost";

const FilterData = [
  {
    id: 0,
    name: "Today",
    value: "today",
  },
  {
    id: 1,
    name: "Yesterday",
    value: "yesterday",
  },
  {
    id: 2,
    name: "Last Week",
    value: "lastWeek",
  },
  {
    id: 3,
    name: "Last Month",
    value: "lastMonth",
  },
  {
    id: 4,
    name: "Last year",
    value: "lastYear",
  },
  {
    id: 5,
    name: "All time",
    value: "allTime",
  },
];

const BillingInfo = ({ isEditable }: { isEditable: boolean }) => {
  const [selectedFilter, setSelectedFilter] = useState<
    (typeof FilterData)[number]
  >(FilterData[5]);

  const { data, isLoading } = useGetRevenueWithQuery({
    range: selectedFilter.value as any,
  });

  const { data: viewCost } = useGetViewCost();
  const { mutate: updateViewCost } = useUpdateViewCost();

  const form = useForm<ViewCost>({ defaultValues: {} });
  useEffect(() => {
    if (viewCost) {
      form.setValue("unverifiedViewCost", viewCost.unverifiedViewCost);
      form.setValue("verifiedViewCost", viewCost.verifiedViewCost);
    }
  }, [form, viewCost]);

  const revenue = data?.toLocaleString("hi-IN", {
    style: "currency",
    currency: "INR",
  });

  const handleUpdateCost: SubmitHandler<ViewCost> = (values) => {
    updateViewCost(values);
  };

  return (
    <Card className="flex justify-between px-[19px] py-5">
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-[#DEAC2B29] p-1.5">
          <IndianRupee size={67} color="#DEAC2B" />
        </div>
        <div className="space-y-1">
          <p className="text-sm text-brand-grey">Revenue Generated</p>
          {isLoading ? (
            <Skeleton className="h-[60px] w-[160px]" />
          ) : (
            <p className="text-[40px] font-bold">{revenue}</p>
          )}
        </div>
      </div>

      {isEditable && (
        <div className="space-y-2">
          <h5 className="text-xs font-semibold">Pricing per click</h5>
          <div className="flex gap-5">
            <div className="max-w-min space-y-1.5">
              <Label className="whitespace-nowrap text-xs font-normal text-brand-grey">
                for verified profile
              </Label>
              <div className="relative w-full">
                <Input
                  {...form.register(
                    "verifiedViewCost",
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    { onBlur: form.handleSubmit(handleUpdateCost) },
                  )}
                  type="number"
                  className=" h-[35px] rounded-[2.56px] bg-inherit px-[6.15px] py-[2.56px] pr-7 text-xl font-bold text-brand-black placeholder:text-[#A9A9A9]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-medium text-[#A9A9A9]">
                  ₹
                </span>
              </div>
            </div>
            <div className="max-w-min space-y-1.5">
              <Label className="whitespace-nowrap text-xs font-normal text-brand-grey">
                for unverified profile
              </Label>
              <div className="relative w-full">
                <Input
                  {...form.register(
                    "unverifiedViewCost",
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    { onBlur: form.handleSubmit(handleUpdateCost) },
                  )}
                  type="number"
                  className=" h-[35px] rounded-[2.56px] bg-inherit px-[6.15px] py-[2.56px] pr-7 text-xl font-bold text-brand-black placeholder:text-[#A9A9A9]"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 font-medium text-[#A9A9A9]">
                  ₹
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger className="self-start">
          <div className="flex items-center gap-0.5">
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
    </Card>
  );
};

export default BillingInfo;
