import { Sheet, SheetContent } from "@/components/ui/sheet";
import InactivateSheetHeader from "../../common/inactivate-sheet-header";
import { Button } from "@/components/ui/button";
import { useBoundStore } from "@/store/useBoundStore";
// import { Loader2 } from "lucide-react";
import InactivateSheetTabHeading from "../../common/inactivate-sheet-tabs-heading";
import CandidateReassignList from "../candidate-reassign/candidate-reassign-list";
import { useInactivateTeamLead } from "../../api/inactivate-team-lead";
import { Loader2 } from "lucide-react";

const TeamLeadInactivateSheet = ({
  isSheetOpen,
  setIsSheetOpen,
}: {
  isSheetOpen: boolean;
  setIsSheetOpen: (value: boolean) => void;
}) => {
  const totalCandidates = useBoundStore(
    (state) => state.candidatesUnderTeamLead,
  );

  // const noOfReassignedCompanies = useBoundStore(
  //   (state) => state.candidatesReassigned.length,
  // );

  const candidatesReassigned = useBoundStore(
    (state) => state.candidatesReassigned,
  );

  const teamLeadsReassigned = useBoundStore(
    (state) => state.teamLeadsReassigned,
  );

  const inactivatingTeamLead = useBoundStore(
    (state) => state.inactivatingTeamLead,
  );

  const noOfReassignedCondidates = () => {
    return candidatesReassigned?.flatMap(
      (candidate) => candidate.assignedCandidates,
    );
  };

  // const noOfReassignedTeamLeads = () => {
  //   return teamLeadsReassigned?.flatMap(
  //     (teamLead) => teamLead.assignedTeamLeads,
  //   );
  // };

  const handleSuccess = () => {
    setIsSheetOpen(false);
    reset();
  };

  const { mutate: inactivateTeamLead, isLoading: isSubmitting } =
    useInactivateTeamLead(handleSuccess, "admin");

  const isReassignComplete =
    noOfReassignedCondidates().length === totalCandidates.length;

  const reset = useBoundStore((state) => state.resetManagerReassign);

  const submit = () => {
    console.log("hiiiii>>", teamLeadsReassigned, candidatesReassigned);
    const data = {
      candidates: candidatesReassigned.map((candidate) => ({
        teamLeadId: candidate.teamLeadId,
        assignedCandidates: candidate.assignedCandidates.map(
          (candidate) => candidate.candidateId,
        ),
      })),
    };
    if (inactivatingTeamLead) {
      inactivateTeamLead({ teamLeadId: inactivatingTeamLead.teamLeadId, data });
    }
    console.log("DATA???", data);
  };
  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        setIsSheetOpen(!isSheetOpen);
      }}
    >
      <SheetContent
        isDefaultCloseVisible={false}
        className="flex min-w-[100vw] flex-col gap-0 bg-white p-0 text-brand-black"
        side="right"
      >
        <InactivateSheetHeader>
          <InactivateSheetHeader.Heading>
            Deactivate {inactivatingTeamLead?.name} TL account{" "}
          </InactivateSheetHeader.Heading>
          <InactivateSheetHeader.SubHeading>
            Assign candidates under {inactivatingTeamLead?.name}{" "}
          </InactivateSheetHeader.SubHeading>
        </InactivateSheetHeader>
        <div className="flex grow flex-col gap-4 overflow-auto px-8">
          <div className="flex-col items-start pb-2 font-medium text-brand-black">
            <InactivateSheetTabHeading
              count={`${noOfReassignedCondidates().length}/${
                totalCandidates.length
              }`}
              label="Candidates reassigned"
              isReassignComplete={isReassignComplete}
            />
          </div>
          <div className="m-0 grow overflow-y-auto">
            <CandidateReassignList />
          </div>
        </div>
        <div
          style={{ boxShadow: "0px -1px 9.9px 0px rgba(0, 0, 0, 0.12)" }}
          className="flex justify-end gap-[14px] px-[18px] py-5  font-bold"
        >
          <Button
            onClick={() => {
              reset();
              setIsSheetOpen(false);
            }}
            variant={"outline"}
            className="h-[38px] rounded-lg border-0 px-4 py-2 text-brand-black"
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              submit();
            }}
            disabled={!isReassignComplete || isSubmitting}
            // style={{ backgroundColor: !isReassignComplete && "#A9A9A9" }}
            className={`h-[38px] px-4 py-2 shadow-submit-btn ${
              !isReassignComplete ? "bg-[#A9A9A9]" : "custom-gradient"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Confirm"
            )}{" "}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TeamLeadInactivateSheet;
