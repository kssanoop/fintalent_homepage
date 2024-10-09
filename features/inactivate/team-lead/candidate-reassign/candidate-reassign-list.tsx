import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ReassignAccordion from "../../common/reassign-accordion";
import AvatarProfileFallback from "@/components/avatar-profile-fallback";
import { Dot, Loader2 } from "lucide-react";
import { useBoundStore } from "@/store/useBoundStore";
import { useState } from "react";
import useGetTeamLeadsForAdmin from "@/features/admin/team-lead/api/get-team-leads-for-admin";
import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";
import CandidateReassignSheet from "./candidate-reassign-sheet";

const AssignedTeamLead = ({
  teamLeadId,
  assignedCandidate,
}: {
  teamLeadId: string;
  assignedCandidate: CandidateSchema;
}) => {
  console.log("cdcdcd", teamLeadId);
  const removeCandidate = useBoundStore((state) => state.removeCandidate);
  return (
    <div
      onClick={() => {
        removeCandidate({
          assignedTeamLeadId: teamLeadId,
          candidatetoRemove: assignedCandidate,
        });
      }}
      className="group flex justify-between border-b border-border px-6 py-4 hover:bg-[#03499a06]"
    >
      <div className="flex items-center gap-2">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${assignedCandidate.profilePhoto.storageName}`}
            className=""
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="text-sm font-bold">{assignedCandidate.fullName}</p>
      </div>
      <div className=" invisible flex w-9 items-center justify-center rounded-full bg-white group-hover:visible ">
        {" "}
        <div className="h-[3px] w-3 rounded-sm bg-red-600" />
      </div>
    </div>
  );
};

const CandidateReassignList = () => {
  const inactivatingTeamLead = useBoundStore(
    (state) => state.inactivatingTeamLead,
  );
  const {
    data: unfilteredTeamLeads,
    isLoading,
    isError,
  } = useGetTeamLeadsForAdmin();

  const teamLeads = unfilteredTeamLeads?.filter(
    (teamLead) =>
      inactivatingTeamLead &&
      teamLead.teamLeadId !== inactivatingTeamLead.teamLeadId,
  );
  const [reassign, setReassign] = useState<{
    teamLead: TeamLeadInfo | undefined;
    isDialogOpen: boolean;
  }>({
    teamLead: undefined,
    isDialogOpen: false,
  });
  const candidatesReassigned = useBoundStore(
    (state) => state.candidatesReassigned,
  );
  if (isLoading || teamLeads?.length === 0 || isError) {
    return (
      <div className="justify-center text-xl text-brand-blue">
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : isError ? (
          "Somethng went wrong."
        ) : (
          teamLeads?.length === 0 && "No team leads exist to reassign"
        )}
      </div>
    );
  }

  const getReassignedCandidates = (teamLeadId: string) => {
    console.log(teamLeadId);
    return candidatesReassigned.find(
      (candidate) => candidate.teamLeadId === teamLeadId,
    );
  };
  console.log(candidatesReassigned);
  return (
    <>
      <ReassignAccordion>
        {teamLeads?.map((teamLead) => (
          <ReassignAccordion.AccordionItem
            key={teamLead.teamLeadId}
            value={teamLead.teamLeadId}
          >
            <ReassignAccordion.AccordionTrigger>
              <div className="flex grow items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Avatar className="h-9 w-9 shadow">
                    <AvatarImage
                      src={`${process.env.NEXT_PUBLIC_IMG_URL}${teamLead.profilePhoto.storageName}`}
                      className=""
                    />
                    <AvatarProfileFallback />
                  </Avatar>
                  <div className="text-left">
                    <p className="font-bold">{teamLead.name}</p>
                    <div className="flex items-center text-xs text-brand-grey">
                      <p>Manager ID {teamLead.employeeId}</p>
                      <div className="flex items-center">
                        <Dot color="#5E5E5E" className="" />
                        <p>
                          {" "}
                          <span className="font-extrabold text-brand-black">
                            {getReassignedCandidates(teamLead.teamLeadId)
                              ?.assignedCandidates.length || 0}
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
                      teamLead,
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
              {getReassignedCandidates(
                teamLead.teamLeadId,
              )?.assignedCandidates.map((assignedCandidate) => (
                <AssignedTeamLead
                  key={assignedCandidate._id}
                  assignedCandidate={assignedCandidate}
                  teamLeadId={teamLead.teamLeadId}
                />
              ))}
            </ReassignAccordion.AccordionContent>
          </ReassignAccordion.AccordionItem>
        ))}
      </ReassignAccordion>
      <CandidateReassignSheet
        reassigningTeamLead={reassign.teamLead}
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

export default CandidateReassignList;
