import SearchBar from "@/components/search-bar/search-bar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";
import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import { useBoundStore } from "@/store/useBoundStore";
import { useState } from "react";
import CandidateReassignCard from "./candidate-reassign-card";
import { Button } from "@/components/ui/button";

const CandidateReassignSheet = ({
  open,
  handleOpen,
  reassigningTeamLead,
}: {
  open: boolean;
  handleOpen: (value: boolean) => void;
  reassigningTeamLead: TeamLeadInfo | undefined;
}) => {
  const [selectedCandidates, setSelectedCandidates] = useState<
    CandidateSchema[]
  >([]);
  console.log(selectedCandidates);
  const allCandidates = useBoundStore((state) => state.candidatesUnderTeamLead);

  const inactivatingTeamLead = useBoundStore(
    (state) => state.inactivatingTeamLead,
  );

  const candidatesReassigned = useBoundStore(
    (state) => state.candidatesReassigned,
  );

  const getUnassignedCandidates = () => {
    if (candidatesReassigned.length === 0) return allCandidates;
    const assignedCandidates = candidatesReassigned?.flatMap(
      (candidate) => candidate.assignedCandidates,
    );
    return allCandidates.filter((candidate) => {
      return !assignedCandidates.some((assignedCompany) => {
        return assignedCompany._id === candidate._id;
      });
    });
  };

  // const inactivatingManager = useBoundStore(
  //   (state) => state.inactivatingManager,
  // );

  const reassignCandidate = useBoundStore((state) => state.reAssignCandidate);

  const [searchQuery, setSearchQuery] = useState("");

  //   filtered candidates after search
  const filteredremainigCandidates = getUnassignedCandidates().filter(
    (candidate) =>
      candidate.fullName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const saveSelectedCandidates = () => {
    console.log(selectedCandidates.length);
    if (reassigningTeamLead) {
      reassignCandidate({
        teamLeadId: reassigningTeamLead.teamLeadId,
        assignedCandidates: selectedCandidates,
      });
    }
    setSelectedCandidates([]);
  };
  return (
    <Sheet
      open={open}
      onOpenChange={() => {
        handleOpen(false);
      }}
    >
      <SheetContent
        className="md:min-w-3/4 bg-white p-0 md:min-w-[850px]"
        side="right"
      >
        <div className="px-7 py-6">
          <h3 className="mb-2 text-xl font-bold text-brand-black">
            Assign Candidate
          </h3>
          <p className="text-[#5E5E5E]">
            Assign candidates under {inactivatingTeamLead?.name}{" "}
          </p>
        </div>
        <div className="px-7 pb-6">
          <div className="flex items-center gap-2 pb-6">
            <SearchBar
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              placeholder="Search candidate"
              isSearchIconVisible={false}
              className="h-10 rounded-[5px] border-border px-2 py-1 placeholder:text-[#A9A9A9]"
            />
          </div>
          <div className="h-[calc(100vh-264px)] space-y-2 overflow-auto">
            {filteredremainigCandidates.map((candidate) => (
              <CandidateReassignCard
                key={candidate._id}
                candidate={candidate}
                selectedCandidates={selectedCandidates}
                setSelectedCandidates={setSelectedCandidates}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3.5 px-7 pb-6">
          <Button
            onClick={() => {
              handleOpen(false);
              setSelectedCandidates([]);
            }}
            variant={"outline"}
            className=" rounded-lg border-0 px-4 py-2 text-xl font-bold text-brand-black"
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              saveSelectedCandidates();
              handleOpen(false);
            }}
            variant="gradient"
            className="  px-[18px] py-2 text-xl font-bold shadow-submit-btn"
          >
            Save
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CandidateReassignSheet;
