import React from "react";
import { Card } from "../ui/card";
import CompanyDataTable from "./company-data-table";

const DashboardCompanyData = () => {
  const data = [
    {
      label: "Recruitment Companies",
      value: 4000,
    },
    {
      label: "Total Jobs posted",
      value: 4000,
    },
    {
      label: "Total revenue",
      value: `${500312} ₹`,
    },
  ];
  return (
    <Card>
      <Card className="mx-5 mb-5 mt-[15px] flex justify-around bg-[#F4F8FF] pb-4 pt-[15px]">
        {data?.map((item) => (
          <div
            className="flex flex-col items-center gap-[3px]"
            key={crypto.randomUUID()}
          >
            <h4 className="text-[32px] font-bold leading-normal text-black">
              {item?.value}
            </h4>
            <p className="text-base font-normal text-[#5E5E5E]">
              {item?.label}
            </p>
          </div>
        ))}
      </Card>
      <CompanyDataTable />
    </Card>
  );
};

export default DashboardCompanyData;
