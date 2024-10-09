import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import InviteCandidatesContainer from "./invite-candidates-container";
import { useRouter } from "next/router";
import { useGetJobById } from "@/features/jobs/api/get-job-by-id";

const InviteCandidatesSheet = () => {
  const router = useRouter();
  const jobId = router.query.id as string;
  const { data: jobDetail } = useGetJobById(jobId);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  console.log("job data:", jobDetail);
  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        setIsSheetOpen((prev) => !prev);
      }}
    >
      <SheetTrigger className="cursor-pointer font-medium text-brand-blue">
        Invite more <span className="ml-0.5">+</span>
      </SheetTrigger>
      <SheetContent
        className="md:min-w-3/4 w-full bg-white p-0 lg:min-w-[850px]"
        side="right"
      >
        <div className="px-7 py-6">
          <h3 className="mb-2 text-xl font-bold text-brand-black">
            Invite candidates
          </h3>
          <p className="text-[#5E5E5E]">
            Invite candidates for the role of {jobDetail?.jobTitle}
          </p>
        </div>
        <div className="px-7 pb-6">
          <InviteCandidatesContainer />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default InviteCandidatesSheet;
