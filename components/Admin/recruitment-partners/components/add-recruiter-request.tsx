import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddRecuiterForm from "@/features/recuitment-partners/admin/add-recuiter-form";
import React, { Dispatch, SetStateAction } from "react";

interface AddRecruiterRequestProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  profilePhoto: { originalName: string; storageName: string };
  designation: string;
  fullName: string;
  email: string;
  phoneNo: string;
  location: string;
  linkedIn: string;
  recruiterId: string;
}

const AddRecruiterRequest = ({
  setOpen,
  open,
  profilePhoto,
  designation,
  fullName,
  email,
  phoneNo,
  location,
  linkedIn,
  recruiterId,
}: AddRecruiterRequestProps) => {
  console.log("add data received", profilePhoto, fullName);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="flex flex-col gap-[18px] px-7 py-6">
          <DialogHeader>
            <DialogTitle className="text-bold text-xl text-[#171717]">
              Company Join request
            </DialogTitle>
          </DialogHeader>
          {/* form */}
          <AddRecuiterForm
            setOpen={setOpen}
            type={"editRecruiter"}
            profilePhoto={profilePhoto}
            designation={designation}
            fullName={fullName}
            email={email}
            phoneNo={phoneNo}
            location={location}
            linkedIn={linkedIn}
            recruiterId={recruiterId}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddRecruiterRequest;
