import { Button } from "@/components/ui/button";
import useInviteToJob from "@/features/jobs/api/invite-to-job";
import { cn } from "@/utils/cnHelper";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "sonner";

interface InviteToJobButtonProps {
  candidateId: string;
  className?: string;
}

const InviteToJobButton = ({
  candidateId,
  className,
}: InviteToJobButtonProps) => {
  const router = useRouter();
  const { TagId } = router?.query;
  const queryClient = useQueryClient();
  const handleSuccess = (data: any) => {
    queryClient.invalidateQueries({
      queryKey: ["get-candidates-by-recruiter"],
    });
    queryClient.invalidateQueries({
      queryKey: ["get-tags-by recruiter"],
    });
    toast.success(data?.message);
  };

  // error in  submission
  const handleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };
  const { mutate: inviteCandidate, isLoading } = useInviteToJob(
    handleSuccess,
    handleError,
  );
  const handleInvite = () => {
    inviteCandidate({ jobId: TagId?.toLocaleString() || "", candidateId });
  };
  return (
    <Button
      variant="gradient"
      className={cn(
        "w-full px-3 py-1.5 text-sm font-bold lg:min-w-[172px]",
        className,
      )}
      onClick={handleInvite}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Inviting..
        </>
      ) : (
        "Invite to job"
      )}
    </Button>
  );
};

export default InviteToJobButton;
