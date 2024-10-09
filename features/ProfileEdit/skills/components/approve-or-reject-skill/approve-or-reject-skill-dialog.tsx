import { Dialog, DialogContent } from "@/components/ui/dialog";
import PendingSkillForm from "./pending-skill-form";

type ApproveOrRejectSkillDialogProps = {
  open: boolean;
  handleOpen: (value: boolean) => void;
  pendingSkills: Array<{ name: string; level: string }>;
};

const ApproveOrRejectSkillDialog = ({
  open,
  handleOpen,
  pendingSkills,
}: ApproveOrRejectSkillDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-w-[778px] gap-y-6 p-6 text-brand-black">
        <h6 className="text-xl font-semibold">Skills pending confirmation</h6>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-5 font-semibold">
            <p>Skill</p>
            <p>Rating</p>
          </div>
          <div className="scroll-container h-[130px] space-y-2 overflow-y-auto">
            {pendingSkills.length === 0 ? (
              <p className="mx-auto my-6 text-center text-xl text-brand-blue">
                No skills pending confirmation.
              </p>
            ) : (
              pendingSkills.map((pendingSkill) => (
                <PendingSkillForm
                  key={crypto.randomUUID()}
                  pendingSkill={pendingSkill}
                />
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApproveOrRejectSkillDialog;
