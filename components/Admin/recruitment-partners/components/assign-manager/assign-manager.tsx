import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ManagerInfo } from "@/features/admin/manager/type/manager-info";
import React, { Dispatch, SetStateAction } from "react";
import AssignManagerForm from "./assign-manager-form";
interface AssignManagerProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  companyName: string;
  defaultManagerId: string;
  isLoading: boolean;
  data: ManagerInfo[];
  companyId: string;
}

const AssignManager = ({
  open,
  setOpen,
  companyName,
  defaultManagerId,
  data,
  isLoading,
  companyId,
}: AssignManagerProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="flex flex-col gap-6 px-[30px] py-5">
          <div className="flex flex-col gap-4">
            <DialogHeader className="flex flex-col pt-4">
              <DialogTitle className=" text-base font-bold text-[#171717]">
                Assign Manager
              </DialogTitle>
              <DialogDescription>
                Please select a Manager for the {companyName}
              </DialogDescription>
            </DialogHeader>
            <AssignManagerForm
              companyId={companyId}
              defaultManagerId={defaultManagerId}
              setOpen={setOpen}
              data={data}
              isLoading={isLoading}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignManager;
