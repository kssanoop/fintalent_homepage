import { Card } from "@/components/ui/card";
import useGetCurrentBill from "@/features/billings/api/get-current-bill";
import React from "react";

const HeaderCardBilling = () => {
  const { data, isSuccess, isError } = useGetCurrentBill({ role: "recruiter" });

  if (isError) return <div>Something went wrong</div>;

  return (
    <Card className="flex flex-col justify-between gap-3 bg-[#012A59] p-6 text-[#F7F7F7] md:flex-row md:gap-0 lg:pr-[200px]">
      <div className="text-xl font-extrabold">Billing ID {data?.billId}</div>
      <div className="flex flex-col md:gap-2">
        <p>
          {" "}
          <span className="text-3xl font-extrabold">
            {(isSuccess &&
              data?.profileViews?.unverified + data?.profileViews?.verified) ||
              0}
          </span>{" "}
          profile clicks
        </p>
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-normal">
            {data?.profileViews.verified ?? 0} veriified
          </p>
          <div className="h-1 w-1 rounded-full bg-[#FFFFFF]" />
          <p className="text-sm font-normal">
            {data?.profileViews.unverified ?? 0} unveriified
          </p>
        </div>
      </div>
      <div className="flex flex-col md:gap-2">
        <p className="text-3xl font-extrabold">₹{data?.finalAmount ?? 0}</p>
        <p>Total bill amount this month</p>
      </div>
    </Card>
  );
};

export default HeaderCardBilling;
