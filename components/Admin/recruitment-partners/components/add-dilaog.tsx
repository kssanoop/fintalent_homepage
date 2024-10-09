import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddCompanyForm from "@/features/recuitment-partners/admin/add-company-form";
import AddRecuiterForm from "@/features/recuitment-partners/admin/add-recuiter-form";

interface AddDilaogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  page: string;
  companyId?: any;
}
const AddDilaog = ({ open, setOpen, page, companyId }: AddDilaogProps) => {
  console.log("add dialog:", companyId);
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
      }}
    >
      <DialogContent className="min-w-[681px] p-0">
        <div className="flex flex-col gap-[18px] px-7 py-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold leading-normal text-[#171717]">
              {page === "companyPage" ? "Add new company" : "Add new recruiter"}
            </DialogTitle>
          </DialogHeader>

          {page === "companyPage" ? (
            <AddCompanyForm setOpen={setOpen} type={"AddCompany"} />
          ) : (
            <AddRecuiterForm
              setOpen={setOpen}
              type={"AddRecruiter"}
              companyId={companyId?.companyId}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddDilaog;
