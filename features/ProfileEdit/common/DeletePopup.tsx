import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useQueryClient } from "@tanstack/react-query";
import React, { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { useDeleteWorkHistory } from "../WorkHistory/api/delete-workHistory";
import { format } from "date-fns";

interface WorkHistoryDeleteProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  clickedDeleteIndex: number | undefined;
  data: any;
  section: string;
}

const DeletePopup = ({
  open,
  setOpen,
  clickedDeleteIndex,
  data,
  section,
}: WorkHistoryDeleteProps) => {
  const queryClient = useQueryClient();
  const handleSuccess = (data: any) => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["candidate"] });
    toast.success(data.message);
  };

  const handleError = (error: any) => {
    toast.error(error.response.data.message);
  };

  const {
    mutate,
    isLoading: isSubmitting,
    isError: isSubmitionError,
  } = useDeleteWorkHistory(handleSuccess, handleError);

  const handleDeleteRequest = () => {
    if (clickedDeleteIndex !== undefined) {
      const updatedData = [...data];
      updatedData.splice(clickedDeleteIndex, 1);
      if (section === "workHistory") {
        const formattedData = {
          employmentDetails: updatedData.map((item) => ({
            ...item,
            startDate: format(new Date(item.startDate), "yyyy-MM-dd"),
            ...(!item.currentlyWorkingHere && {
              endDate: format(new Date(item.endDate), "yyyy-MM-dd"),
            }),
          })),
        };
        mutate(formattedData);
      }
      if (section === "educationHistory") {
        const formattedData = {
          educationDetails: updatedData.map((item) => ({
            ...item,
            startDate: format(new Date(item.startDate), "yyyy-MM-dd"),
            ...(!item.currentlyStudyingHere && {
              endDate: format(new Date(item.endDate), "yyyy-MM-dd"),
            }),
          })),
        };
        mutate(formattedData);
      }
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="flex flex-col gap-8 px-8 py-6">
          <DialogHeader className="text-base font-medium text-[#171717]">
            {section === "educationHistory"
              ? "Are you sure want to delete this Qualification?"
              : "Are you sure want to delete this Work History?"}
          </DialogHeader>
          <div className="flex justify-end gap-[10px]">
            <Button
              variant={"outline"}
              className="border border-border bg-[#F2F2F2] text-base font-bold text-[#5E5E5E] hover:text-[#5E5E5E]"
              onClick={() => {
                setOpen(false);
              }}
            >
              No
            </Button>
            <Button
              className=" bg-[#E72F2F] text-base font-bold"
              variant={"secondary"}
              onClick={handleDeleteRequest}
            >
              {isSubmitting && !isSubmitionError
                ? "Deleting..."
                : " Yes, Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePopup;
