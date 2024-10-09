import React from "react";
import { Card } from "../ui/card";
import { Input } from "../ui/input";

const ClickCostCard = () => {
  const data = [
    {
      userType: "for verified profile",
      userCost: 4,
    },
    {
      userType: "for unverified profile",
      userCost: 1,
    },
  ];
  return (
    <Card className="mt-[11px] flex w-full flex-col gap-[30px] px-6 pb-7 pt-[21px] lg:h-[167px]">
      <h3 className="text-base font-bold">Pricing per click</h3>
      <div className="flex gap-[102px]">
        {data?.map((item) => (
          <div className="flex flex-col gap-1" key={crypto.randomUUID()}>
            <p className="text-base font-normal text-[#5E5E5E]">
              {item?.userType}
            </p>
            <div className="relative">
              <Input
                defaultValue={item?.userCost}
                className="h-6 border-none border-[#E1E1E1] text-[32px] font-bold text-black outline-none focus:outline-none lg:w-[131px]"
              />
              <span className="absolute bottom-0">₹</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ClickCostCard;
