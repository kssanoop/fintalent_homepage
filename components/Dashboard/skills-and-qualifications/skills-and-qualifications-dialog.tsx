import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChildrenProp } from "@/types/common-types";

type SkillsAndQualificationsDialogProps = ChildrenProp & {
  open: boolean;
  handleOpenChange: (value: boolean) => void;
};

const SkillsAndQualificationsDialog = ({
  open,
  handleOpenChange,
  children,
}: SkillsAndQualificationsDialogProps) => {
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        handleOpenChange(false);
      }}
    >
      <DialogContent className="max-w-lg gap-6 p-5 text-brand-black">
        {children}
      </DialogContent>
    </Dialog>
  );
};

const Header = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <DialogHeader className="space-y-1">
      <DialogTitle className="text-base font-semibold">{title}</DialogTitle>
      <p className="text-sm font-medium text-brand-grey">{description} </p>
    </DialogHeader>
  );
};

SkillsAndQualificationsDialog.Header = Header;

export default SkillsAndQualificationsDialog;
