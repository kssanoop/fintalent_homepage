import { useState } from "react";
import { RoleTypes } from "@/types/authorization";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useShortlistJobApplicationByRecruiter from "../api/shortlist-job-application-by-recruiter";

const ShortlistJobApplication = ({
  jobId,
  candidateName,
  role = "recruiter",
  disabled = false,
}: {
  jobId: string;
  candidateName: string;
  role?: RoleTypes;
  disabled?: boolean;
}) => {
  const [open, setOpen] = useState<boolean>(false);

  const confirmationMessage = `Do you want to shortlist ${candidateName}?`;

  const handleSuccess = (data: any) => {
    console.log("rejected", data);
  };

  const handleError = (err: any) => {
    toast.error(err?.response?.data?.message);
    console.log(err);
  };

  // NOTE: for now the api is for recruiter only ,should be modified ater
  const { mutate: shortlistJobApplication } =
    useShortlistJobApplicationByRecruiter(handleSuccess, handleError);
  const handleOpen = (value: boolean) => {
    setOpen(value);
  };
  return (
    <>
      <Button
        onClick={() => {
          handleOpen(true);
        }}
        variant="success"
        disabled={disabled}
        className="grow font-bold"
      >
        Shortlist
      </Button>
      <Dialog
        open={open}
        onOpenChange={() => {
          handleOpen(false);
        }}
      >
        <DialogContent className=" p-0">
          <div className="flex flex-col gap-[18px] px-7 py-6">
            <DialogHeader>
              <DialogTitle className="text-lg text-[#171717] md:text-xl">
                {confirmationMessage}
              </DialogTitle>
            </DialogHeader>
            <div className="flex justify-end gap-4">
              <Button
                onClick={() => {
                  handleOpen(false);
                }}
                variant={"outline"}
                className="border border-[#CDCDCD] bg-[#F2F2F2] text-base font-bold text-[#5E5E5E] hover:text-[#5E5E5E]"
              >
                No
              </Button>
              <Button
                onClick={() => {
                  console.log("first");
                  shortlistJobApplication({ jobApplicationId: jobId });
                  handleOpen(false);
                }}
                className="text-base font-semibold"
                variant={"success"}
              >
                Yes,shortlist
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShortlistJobApplication;
