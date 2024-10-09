import TeamLeadsTabContentFilter from "./team-leads-tab-content-filter";
import { TeamLeadFilter } from "@/features/admin/team-lead/type/team-lead-filter";
import { useForm } from "react-hook-form";
import TeamLeadsTableContainer from "@/components/Admin/team-leads/team-leads-table-container";
import useGetTeamLeadsForAdminUnderManager from "@/features/admin/manager/api/get-team-leads-for-admin-under-manager";
import { useRouter } from "next/router";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";

const TeamLeadsTabContent = () => {
  const router = useRouter();
  const managerId = router.query.managerId as string;
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
  const dataResponse = useGetTeamLeadsForAdminUnderManager(
    managerId,
    form.getValues(),
  );
  const onFilterSubmit = () => {
    console.log("first");
  };
  return (
    <DynamicHeightContainer>
      <div className="flex gap-[17px]">
        <TeamLeadsTabContentFilter form={form} onSubmit={onFilterSubmit} />
        <div className="grow overflow-auto">
          <TeamLeadsTableContainer dataResponse={dataResponse} />
        </div>
      </div>
    </DynamicHeightContainer>
  );
};

export default TeamLeadsTabContent;
