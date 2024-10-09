import { Dialog, DialogContent } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import TLForm from "./TL-form";
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";
interface TLDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  defaultTeamLead: string | undefined;
  candidateId: string;
  isLoading: boolean;
  data: TeamLeadInfo[] | undefined;
}

const TLDialog = ({
  open,
  setOpen,
  defaultTeamLead,
  candidateId,
  isLoading,
  data,
}: TLDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="flex flex-col gap-[14px] px-6 pb-6 pt-8">
          <div className="flex flex-col gap-3">
            <div className="text-base font-semibold text-[#171717]">
              Assign Team Leads
            </div>
            <TLForm
              setOpen={setOpen}
              candidateId={candidateId}
              defaultTeamLead={defaultTeamLead}
              isLoading={isLoading}
              data={data}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TLDialog;
