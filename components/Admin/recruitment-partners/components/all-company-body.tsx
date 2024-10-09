import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import AllComapyTableData from "./all-comapy-table-data";
import CompanyPendingRequest from "./company-pending-request";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";

const AllCompanyBody = () => {
  const [selectedTab, setSelectedTab] = useState("allcompanies");
  const handleTabClick = (value: string) => {
    setSelectedTab(value);
  };
  const tabsTriggerFunc = (value: string, title: string) => {
    return (
      <TabsTrigger
        value={value}
        onClick={() => {
          handleTabClick(value);
        }}
        className="p-0"
      >
        <div
          className={`flex items-center gap-1 py-2 ${
            selectedTab === value && "border-b-[3px] border-[#034A9A]"
          }`}
        >
          <h1
            className={`text-base text-[#171717] ${
              selectedTab === value ? " font-bold" : "font-normal"
            }`}
          >
            {title}
          </h1>
        </div>
      </TabsTrigger>
    );
  };
  return (
    <>
      <Tabs defaultValue="allcompanies" className="m-0 p-0">
        <div className="flex justify-between">
          <TabsList className="flex rounded-none bg-[#F7F7F7]">
            <div className="flex gap-3">
              {tabsTriggerFunc("allcompanies", "All Companies")}
              {tabsTriggerFunc("pending", "Pending Requests")}
            </div>
          </TabsList>
        </div>
        <TabsContent value="allcompanies">
          <div className="h-full w-full overflow-auto pt-1">
            <DynamicHeightContainer>
              <AllComapyTableData />
            </DynamicHeightContainer>
          </div>
        </TabsContent>
        <TabsContent value="pending">
          <div className="pt-2">
            <CompanyPendingRequest />
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default AllCompanyBody;
