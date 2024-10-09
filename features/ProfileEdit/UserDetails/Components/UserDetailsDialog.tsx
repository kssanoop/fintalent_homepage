import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
// import UserDetailsForm from "./UserDetailsForm";
import { personalDetails } from "../Schema/profile-schema";
const UserDetailsForm = React.lazy(
  async () => await import("./UserDetailsForm"),
);

interface UserDetailsDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  data: personalDetails;
  imageLinks: string;
}

const UserDetailsDialog = ({
  open,
  setOpen,
  data,
  imageLinks,
}: UserDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="flex flex-col gap-6 p-6">
          <DialogHeader className="text-xl font-semibold text-[#171717]">
            Edit profile
          </DialogHeader>
          {/* form */}
          {/* <UserDetailsForm data={data} setOpen={setOpen} /> */}
          <React.Suspense fallback={<div>Loading...</div>}>
            <UserDetailsForm
              data={data}
              setOpen={setOpen}
              imageLinks={imageLinks}
            />
          </React.Suspense>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailsDialog;
