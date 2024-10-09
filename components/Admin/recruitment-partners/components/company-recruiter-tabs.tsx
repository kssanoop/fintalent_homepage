import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import AllRecruitersDataTable from "./all-recruiters-data-table";
import PendingRecruitersDataTable from "./pending-recruiter-data-table";
import ReceuiterAddDilaog from "./add-dilaog";
import { useGetCompaniesAllPendingRecruiter } from "@/features/recuitment-partners/admin/api/get-pending-recruiters-by-company";
import { useGetCompaniesAllActiveRecruiter } from "@/features/recuitment-partners/admin/api/get-active-recruiter-by-companyId";

const CompanyRecruiterTabs = (companyId: any) => {
  const [selectedTab, setSelectedTab] = useState("allRecruiter");
  const [openAddRecruiterDialog, setAddRecruiterDialog] = useState(false);
  const handleTabClick = (value: string) => {
    setSelectedTab(value);
  };

  const {
    data: companyReruiterData,
    isLoading: isCompanyReruiterData,
    isError: isCompanyReruiterDataError,
    error: companyReruiterDataError,
  } = useGetCompaniesAllActiveRecruiter(companyId);

  const {
    data: pendingRecruitersData,
    isLoading,
    isError,
    error,
  } = useGetCompaniesAllPendingRecruiter(companyId);

  // console.log("selected tab:", selectedTab);
  const tabsTriggerFunc = (value: string, title: string) => {
    return (
      <TabsTrigger
        value={value}
        onClick={() => {
          handleTabClick(value);
        }}
      >
        <div
          className={`flex items-center gap-1  px-2.5 py-1.5 ${
            selectedTab === value && "border-b-[3px] border-[#012A59]"
          }`}
        >
          <h1
            className={`text-base text-[#171717] ${
              selectedTab === value ? " font-bold" : "font-medium"
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
      <Tabs defaultValue="allRecruiter" className="m-0 p-0">
        <div className="flex justify-between">
          <TabsList className="flex gap-2 rounded-none bg-white px-2.5 py-1.5">
            <div className="flex gap-2">
              {tabsTriggerFunc("allRecruiter", "All Recruiters")}
              {tabsTriggerFunc("pending", "Pending")}
            </div>
          </TabsList>
          <Button
            className="px-3 py-1.5 text-base font-bold"
            variant="gradient"
            disabled={isLoading || isCompanyReruiterData}
            onClick={() => {
              setAddRecruiterDialog(true);
            }}
          >
            Add recuiter <Plus color="#fff" size={22} />
          </Button>
        </div>
        <TabsContent value="allRecruiter">
          <div className="pt-1">
            <AllRecruitersDataTable
              companyReruiterData={companyReruiterData}
              isLoading={isCompanyReruiterData}
              isError={isCompanyReruiterDataError}
              error={companyReruiterDataError}
            />
          </div>
        </TabsContent>
        <TabsContent value="pending">
          <div className="pt-1">
            <PendingRecruitersDataTable
              pendingRecruitersData={pendingRecruitersData}
              isError={isError}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </TabsContent>
      </Tabs>
      <ReceuiterAddDilaog
        open={openAddRecruiterDialog}
        setOpen={setAddRecruiterDialog}
        page={"Recruiter"}
        companyId={companyId}
      />
    </>
  );
};

export default CompanyRecruiterTabs;
