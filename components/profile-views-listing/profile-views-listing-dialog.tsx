import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChildrenProp } from "@/types/common-types";
import { X } from "lucide-react";

type ProfileViewsListingDialogProps = ChildrenProp & {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ProfileViewsListingDialog = ({
  open,
  setOpen,
  children,
}: ProfileViewsListingDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent isDefaultCloseVisible={false} className="gap-8 px-6">
        {children}
      </DialogContent>
    </Dialog>
  );
};

const Title = ({ children }: ChildrenProp) => {
  return (
    <DialogHeader className="flex-row items-center justify-between">
      <DialogTitle className="text-base">{children}</DialogTitle>
      <DialogClose>
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </DialogClose>
    </DialogHeader>
  );
};

ProfileViewsListingDialog.Title = Title;

const ListingContainer = ({ children }: ChildrenProp) => {
  return (
    <div className="hide-scrollbar h-[314px] space-y-4 overflow-y-auto">
      {children}
    </div>
  );
};

ProfileViewsListingDialog.ListingContainer = ListingContainer;

export default ProfileViewsListingDialog;
