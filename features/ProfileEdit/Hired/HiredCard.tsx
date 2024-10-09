import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Button } from "@/components/ui/button";
import { useReOpenRequest } from "../api/reopen-request";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
const HiredCard = () => {
  const queryClient = useQueryClient();

  // form success submit
  const formSubmissionhandleSuccess = (response: any) => {
    // setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["candidate"] });
    toast.success(response?.message);
  };

  // form error in  submission
  const formSubmissionhandleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };
  const { mutate, isLoading, isError } = useReOpenRequest(
    formSubmissionhandleSuccess,
    formSubmissionhandleError,
  );
  return (
    <Card>
      <CardHeader className="flex flex-col px-5 py-4">
        <CardTitle className="text-xs font-semibold tracking-[1.92px] text-[#171717]">
          AVAILABILITY
        </CardTitle>
        <p className="text-sm font-normal text-[#5E5E5E]">
          Your profile isn&apos;t available to recuiters since you are currently
          hired. To open your availability, send a request to our team lead.
          When confirmed, your profile will be open to recruiters.
        </p>
      </CardHeader>
      <CardContent>
        <Button
          className="border-border bg-[#F7F7F7] text-sm font-bold text-[#034A9A] hover:text-[#034A9A]"
          variant={"outline"}
          disabled={isLoading}
          onClick={() => {
            mutate();
          }}
        >
          {isLoading && !isError ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Send request"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default HiredCard;
