import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement } from "react";
import Layout from "@/components/layout/primary-layout";
import { ErrorBoundary } from "react-error-boundary";
import HeadBar from "@/components/layout/head-bar";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import useGetTeamLeadsForManager from "@/features/managers/api/get-team-leads-for-manager";
import TeamLeadsTabContentFilter from "@/components/Admin/managers/manager-info/team-leads-tab-content/team-leads-tab-content-filter";
import TeamLeadsTableContainer from "@/components/Admin/team-leads/team-leads-table-container";
import { TeamLeadFilter } from "@/features/admin/team-lead/type/team-lead-filter";
import { useForm } from "react-hook-form";
import AddTeamLead from "@/components/Admin/team-leads/add-edit-team-lead/add-team-lead";
import NotificationButton from "@/components/notification/notification-button";

const TeamLeads = () => {
  const form = useForm<TeamLeadFilter>({
    defaultValues: {
      name: "",
      employeeId: "",
      designation: "",
      role: "",
      phoneNo: "",
      email: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const dataResponse = useGetTeamLeadsForManager(form.getValues());

  const onFilterSubmit = () => {
    console.log("first");
  };

  return (
    <DynamicHeightContainer>
      <div className="flex gap-[17px]">
        <TeamLeadsTabContentFilter form={form} onSubmit={onFilterSubmit} />
        <DynamicHeightContainer>
          <TeamLeadsTableContainer dataResponse={dataResponse} />
        </DynamicHeightContainer>
      </div>
    </DynamicHeightContainer>
  );
};

TeamLeads.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.MANAGER} can view this.</div>}
      allowedRoles={[ROLES.MANAGER]}
    >
      <Layout>
        <div className="bg-default-gray flex h-screen w-full flex-col">
          <HeadBar
            heading="Team Lead"
            customRightSideComponent={
              <div className="flex items-center gap-[14px]">
                <NotificationButton />
                <AddTeamLead role="manager" />
              </div>
            }
          />{" "}
          <ErrorBoundary
            fallback={
              <div className="m-4 flex h-1/2 items-center justify-center rounded-2xl bg-white p-5 text-xl text-red-400 shadow-md">
                Something went wrong! Unable to fetch data.
              </div>
            }
            onError={(error: any, errorInfo) => {
              console.log("Error caught!", error);
            }}
          >
            <div className="scroll-container grow overflow-y-auto px-2 py-3 md:p-5 ">
              {page}
            </div>
          </ErrorBoundary>
        </div>
      </Layout>
    </Authorization>
  );
};

export default TeamLeads;
