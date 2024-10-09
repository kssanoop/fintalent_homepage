import { Card } from "@/components/ui/card";
import CandidateCardAvatar from "../../../candidate/candidate-card/candidate-card-avatar";
import CandidateCardInfo from "../../../candidate/candidate-card/candidate-card-info";
import useGetJobApplicationByRecruiter from "@/features/jobs/api/get-job-application-by-recruiter";
import { useRouter } from "next/router";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import RejectJobApplication from "@/features/jobs/reject-job-application";
import OfferJob from "@/features/jobs/offer-job";
import { useFetchNextListOnView } from "@/utils/hooks/useFetchNextListOnView";
import { ResponseWithPagination } from "@/types/response-with-pagination";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";

const ShorlistedCandidatesTab = () => {
  const router = useRouter();
  const jobId = router.query.id as string;
  const {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetJobApplicationByRecruiter({
    stage: "shortlisted",
    jobId,
  });

  const { ref } = useFetchNextListOnView<
    ResponseWithPagination<JobApplicationSchema[]>
  >({
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  if (isLoading)
    return (
      <div className="scroll-container mt-6 h-[calc(100vh-150px)] overflow-auto">
        {[...Array(3)].map(() => (
          <div key={crypto.randomUUID()} className="mb-2">
            <InfoCardSkeleton />
          </div>
        ))}
        ;
      </div>
    );
  if (isError) {
    console.log(error);
    return <h1>error</h1>;
  }

  const shortlistedCandidates = data.pages.flatMap((pg) => pg.data);

  return (
    <div className="scroll-container h-[calc(100vh-118px)] space-y-2 overflow-auto">
      {shortlistedCandidates?.length === 0 ? (
        <h1 className="mt-8 text-center text-xl text-brand-blue">
          No candidates to show
        </h1>
      ) : (
        shortlistedCandidates?.map((candidate: JobApplicationSchema, i) => (
          <Card
            key={candidate._id}
            ref={shortlistedCandidates.length === i + 1 ? ref : null}
            className={`flex flex-col gap-[18px] p-4 md:flex-row ${candidate.candidate.hired && "bg-[#E1E1E1]"}`}
          >
            <CandidateCardAvatar
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate.candidate.profilePhoto.storageName}`}
              className="h-[97px] w-[97px]"
            />
            <div className="flex grow flex-col justify-between gap-[18px] md:flex-row">
              <div className="w-full">
                <CandidateCardInfo candidate={candidate.candidate} />
              </div>
              <div className="md:self-end">
                <div className="flex items-center gap-2">
                  <RejectJobApplication
                    jobId={candidate._id}
                    candidateName={candidate.candidate.fullName}
                    disabled={candidate.candidate.hired}
                    className="w-1/2"
                  />{" "}
                  <OfferJob
                    jobId={candidate._id}
                    candidateName={candidate.candidate.fullName}
                    disabled={candidate.candidate.hired}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default ShorlistedCandidatesTab;
