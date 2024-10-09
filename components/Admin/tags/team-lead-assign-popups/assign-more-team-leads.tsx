import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import AssignTeamLeadForm from "./assign-team-lead-form";
import { teamleads } from "@/features/tags/type/tags-info";
interface AssignMoreTeamLeadsPopupProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  teamleads: teamleads;
  tagId: string;
}

const AssignMoreTeamLeadsPopup = ({
  open,
  setOpen,
  teamleads,
  tagId,
}: AssignMoreTeamLeadsPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="p-0"
      >
        <div className="flex flex-col gap-[14px] px-6 pb-6 pt-8">
          <div className="flex flex-col gap-3">
            <div className="text-base font-semibold text-[#171717]">
              Assign Team Leads
            </div>
            <AssignTeamLeadForm
              setOpen={setOpen}
              teamLeadsdata={teamleads}
              tagId={tagId}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignMoreTeamLeadsPopup;
