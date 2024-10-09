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
import useOfferJob from "../api/offer-job";

const OfferJob = ({
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

  const confirmationMessage = `Do you want to hire ${candidateName}?`;

  const handleSuccess = (data: any) => {
    console.log("rejected", data);
  };

  const handleError = (err: any) => {
    toast.error(err?.response?.data?.message);
    console.log(err);
  };

  // NOTE: for now the api is for recruiter only ,should be modified ater
  const { mutate: offerJob } = useOfferJob(handleSuccess, handleError);
  const handleOpen = (value: boolean) => {
    setOpen(value);
  };
  return (
    <>
      <Button
        onClick={() => {
          handleOpen(true);
        }}
        disabled={disabled}
        variant="success"
        className="grow font-bold"
      >
        Hire
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
                  offerJob({ jobApplicationId: jobId });
                  handleOpen(false);
                }}
                className=" text-base font-semibold"
                variant={"success"}
              >
                Yes,hire
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OfferJob;
