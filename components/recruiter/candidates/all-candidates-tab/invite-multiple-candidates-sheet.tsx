import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { useRouter } from "next/router";
// import { useGetJobById } from "@/features/jobs/hooks/useGetJobById";
import { Button } from "@/components/ui/button";
import InviteMultipleCandidatesContainer from "./invite-multiple-candidates-container";
import { cn } from "@/utils/cnHelper";

const InviteMultipleCandidatesSheet = ({
  type = "multiple",
  candidateId,
  isCandidatePage,
  searchQuery,
  buttonClassName,
}: {
  type?: "multiple" | "all";
  candidateId: string;
  isCandidatePage: boolean;
  searchQuery?: string;
  buttonClassName?: string;
}) => {
  // const router = useRouter();
  // const jobId = router.query.id as string;
  // const { data: jobDetail } = useGetJobById(jobId);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  // console.log("job data:", jobDetail);
  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        setIsSheetOpen((prev) => !prev);
      }}
    >
      <SheetTrigger
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Button
          // onClick={(e) => {
          //   e.stopPropagation();
          // }}
          variant="gradient"
          className={cn(
            ` w-[172px] rounded-lg border-border bg-white text-sm font-bold `,
            buttonClassName,
          )}
        >
          {type === "multiple" ? "Invite to job" : "Invite all"}
        </Button>{" "}
      </SheetTrigger>
      <SheetContent
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="md:min-w-3/4 flex h-screen w-full flex-col bg-white p-0 md:min-w-[850px]"
        side="right"
      >
        <div className="px-7 py-6">
          <h3 className="mb-2 text-xl font-bold text-brand-black">
            Invite to job{" "}
          </h3>
          <p className="text-[#5E5E5E]">
            Select the job role to which you want to invite this candidate{" "}
          </p>
        </div>
        <div className="flex grow flex-col overflow-y-auto px-7 pb-4">
          <InviteMultipleCandidatesContainer
            setIsSheetOpen={setIsSheetOpen}
            candidateId={candidateId}
            isCandidatePage={isCandidatePage}
            type={type}
            candidateSearchQuery={searchQuery}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InviteMultipleCandidatesSheet;
