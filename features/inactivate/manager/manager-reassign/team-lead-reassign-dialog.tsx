import AvatarProfileFallback from "@/components/avatar-profile-fallback";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ManagerInfoWithRole } from "@/features/admin/manager/type/manager-info";
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";
import { useBoundStore } from "@/store/useBoundStore";
import { useState } from "react";

const TeamLeadReassignDialog = ({
  open,
  handleOpen,
  reassigningManager,
}: {
  open: boolean;
  handleOpen: (value: boolean) => void;
  reassigningManager: ManagerInfoWithRole | undefined;
}) => {
  const [selectedTeamLeads, setSelectedTeamLeads] = useState<TeamLeadInfo[]>(
    [],
  );
  console.log(selectedTeamLeads.length);
  const allTeamLeads = useBoundStore((state) => state.teamLeadsUnderManager);

  const teamLeadsReassigned = useBoundStore(
    (state) => state.teamLeadsReassigned,
  );

  const getUnassignedTeamLeads = () => {
    if (teamLeadsReassigned.length === 0) return allTeamLeads;
    const assignedTeamLeads = teamLeadsReassigned?.flatMap(
      (company) => company.assignedTeamLeads,
    );
    return allTeamLeads.filter((teamLead) => {
      return !assignedTeamLeads.some((assignedTeamLead) => {
        return assignedTeamLead.teamLeadId === teamLead.teamLeadId;
      });
    });
  };

  // const inactivatingManager = useBoundStore(
  //   (state) => state.inactivatingManager,
  // );

  const reasignTeamLeads = useBoundStore((state) => state.reAssignTeamLead);

  const [searchQuery, setSearchQuery] = useState("");

  //   filtered companies after search
  const filteredremainigTeamLeads = getUnassignedTeamLeads().filter(
    (teamLead) =>
      teamLead.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const saveSelectedCompanies = () => {
    console.log(selectedTeamLeads.length);
    if (reassigningManager) {
      reasignTeamLeads({
        managerId: reassigningManager.managerId,
        assignedTeamLeads: selectedTeamLeads,
      });
    }
    setSelectedTeamLeads([]);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        handleOpen(false);
        // setSelectedTeamLeads([]);
      }}
    >
      <DialogContent className="max-w-2xl p-0 text-brand-black">
        <div className="flex flex-col gap-6 px-7 py-6">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl font-bold leading-normal">
              Assign Company
            </DialogTitle>
            <p className="text-brand-grey">
              Assign Companies under {reassigningManager?.name}
            </p>
          </DialogHeader>

          <div className="space-y-6">
            <Input
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
              }}
              placeholder="Search Company"
              className="h-10 px-2 placeholder:font-normal placeholder:text-[#A9A9A9]"
            />

            <div>
              <div className="mb-1 flex items-center gap-1">
                <Checkbox
                  checked={filteredremainigTeamLeads.every((teamLead) =>
                    selectedTeamLeads.some(
                      (selectedTeamLead) =>
                        selectedTeamLead.teamLeadId === teamLead.teamLeadId,
                    ),
                  )}
                  onCheckedChange={(checked) => {
                    checked
                      ? setSelectedTeamLeads(
                          filteredremainigTeamLeads.map((company) => company),
                        )
                      : setSelectedTeamLeads([]);
                  }}
                  className="h-4 w-4"
                />
                <p className="font-medium">
                  {filteredremainigTeamLeads.length} results
                </p>
              </div>
              <ScrollArea className="h-[30vh]">
                {filteredremainigTeamLeads.map((teamLead) => (
                  <div
                    key={teamLead.teamLeadId}
                    className="flex items-center gap-2 border-b border-border py-4"
                  >
                    <Checkbox
                      checked={selectedTeamLeads
                        .map((teamLead) => teamLead.teamLeadId)
                        ?.includes(teamLead.teamLeadId)}
                      onCheckedChange={(checked) => {
                        checked
                          ? setSelectedTeamLeads((prev) => [...prev, teamLead])
                          : setSelectedTeamLeads(
                              selectedTeamLeads?.filter(
                                (value) =>
                                  value.teamLeadId !== teamLead.teamLeadId,
                              ),
                            );
                      }}
                      className="h-4 w-4"
                    />
                    <Avatar className="h-9 w-9 shadow">
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}${teamLead.profilePhoto.storageName}`}
                        className=""
                      />
                      <AvatarProfileFallback />
                    </Avatar>
                    <p className="text-sm font-bold">{teamLead.name}</p>
                  </div>
                ))}
              </ScrollArea>
            </div>

            <div className="flex justify-end gap-3.5">
              <Button
                onClick={() => {
                  handleOpen(false);
                  setSelectedTeamLeads([]);
                }}
                variant={"outline"}
                className=" rounded-lg border-0 px-4 py-2 text-xl font-bold text-brand-black"
              >
                Cancel
              </Button>

              <Button
                onClick={() => {
                  saveSelectedCompanies();
                  handleOpen(false);
                }}
                variant="gradient"
                className="  px-[18px] py-2 text-xl font-bold shadow-submit-btn"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamLeadReassignDialog;
