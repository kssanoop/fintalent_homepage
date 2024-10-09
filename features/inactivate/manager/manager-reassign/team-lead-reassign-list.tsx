import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReassignAccordion from "../../common/reassign-accordion";
import AvatarProfileFallback from "@/components/avatar-profile-fallback";
import { Dot, Loader2 } from "lucide-react";
import useGetManagersForAdmin from "@/features/admin/manager/api/get-managers-for-admin";
import { useBoundStore } from "@/store/useBoundStore";
import { useState } from "react";
import { ManagerInfoWithRole } from "@/features/admin/manager/type/manager-info";
import TeamLeadReassignDialog from "./team-lead-reassign-dialog";
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";

const AssignedTeamLead = ({
  managerId,
  assignedTeamLead,
}: {
  managerId: string;
  assignedTeamLead: TeamLeadInfo;
}) => {
  const removeTeamLead = useBoundStore((state) => state.removeTeamLead);
  return (
    <div
      onClick={() => {
        removeTeamLead({
          assignedManagerId: managerId,
          teamLeadToRemove: assignedTeamLead,
        });
      }}
      className="group flex justify-between border-b border-border px-6 py-4 hover:bg-[#03499a06]"
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${assignedTeamLead.profilePhoto.storageName}`}
            className=""
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-sm font-bold">{assignedTeamLead.name}</p>
      </div>
      <div className=" invisible flex w-9 items-center justify-center rounded-full bg-white group-hover:visible ">
        {" "}
        <div className="h-[3px] w-3 rounded-sm bg-red-600" />
      </div>
    </div>
  );
};

const TeamLeadReassignList = () => {
  const {
    data: unfilteredManagers,
    isLoading,
    isError,
  } = useGetManagersForAdmin();

  const inactivatingManager = useBoundStore(
    (state) => state.inactivatingManager,
  );
  const managers = unfilteredManagers?.filter(
    (manager) =>
      inactivatingManager &&
      manager.managerId !== inactivatingManager.managerId,
  );

  const [reassign, setReassign] = useState<{
    manager: ManagerInfoWithRole | undefined;
    isDialogOpen: boolean;
  }>({
    manager: undefined,
    isDialogOpen: false,
  });
  const teamLeadsReassigned = useBoundStore(
    (state) => state.teamLeadsReassigned,
  );
  if (isLoading || managers?.length === 0 || isError) {
    return (
      <div className="justify-center text-xl text-brand-blue">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : isError ? (
          "Somethng went wrong."
        ) : (
          managers?.length === 0 && "No managers exist to reassign"
        )}
      </div>
    );
  }

  const getReassignedCompanies = (managerId: string) => {
    return teamLeadsReassigned.find(
      (company) => company.managerId === managerId,
    );
  };
  console.log(teamLeadsReassigned);
  return (
    <>
      <ReassignAccordion>
        {managers?.map((manager) => (
          <ReassignAccordion.AccordionItem
            key={manager.managerId}
            value={manager.managerId}
          >
            <ReassignAccordion.AccordionTrigger>
              <div className="flex grow items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Avatar className="h-9 w-9 shadow">
                    <AvatarImage
                      src={`${process.env.NEXT_PUBLIC_IMG_URL}${manager.profilePhoto.storageName}`}
                      className=""
                    />
                    <AvatarProfileFallback />
                  </Avatar>
                  <div className="text-left">
                    <p className="font-bold">{manager.name}</p>
                    <div className="flex items-center text-xs text-brand-grey">
                      <p>Manager ID {manager.employeeId}</p>
                      <div className="flex items-center">
                        <Dot color="#5E5E5E" className="" />
                        <p>
                          {" "}
                          <span className="font-extrabold text-brand-black">
                            {getReassignedCompanies(manager.managerId)
                              ?.assignedTeamLeads.length || 0}
                          </span>
                          &nbsp;
                        </p>
                        TLs assigned
                      </div>
                    </div>
                  </div>
                </div>
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    setReassign({
                      manager,
                      isDialogOpen: true,
                    });
                  }}
                  className="cursor-pointer p-1.5 text-sm font-bold text-brand-blue"
                >
                  Assign +
                </p>
              </div>
            </ReassignAccordion.AccordionTrigger>
            <ReassignAccordion.AccordionContent>
              {getReassignedCompanies(manager.managerId)?.assignedTeamLeads.map(
                (assignedTeamLead) => (
                  <AssignedTeamLead
                    key={assignedTeamLead.teamLeadId}
                    assignedTeamLead={assignedTeamLead}
                    managerId={manager.managerId}
                  />
                ),
              )}
            </ReassignAccordion.AccordionContent>
          </ReassignAccordion.AccordionItem>
        ))}
      </ReassignAccordion>
      <TeamLeadReassignDialog
        reassigningManager={reassign.manager}
        open={reassign.isDialogOpen}
        handleOpen={(value) => {
          setReassign({
            ...reassign,
            isDialogOpen: value,
          });
        }}
      />
    </>
  );
};

export default TeamLeadReassignList;
