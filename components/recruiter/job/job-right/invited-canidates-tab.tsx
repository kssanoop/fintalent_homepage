import useGetJobApplicationByRecruiter from "@/features/jobs/api/get-job-application-by-recruiter";
import { useRouter } from "next/router";
import InviteCandidatesSheet from "./invite-candidates-sheet";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import InvitedCandidate from "./invited-candidate";
// import { useInView } from "react-intersection-observer";
import { useFetchNextListOnView } from "@/utils/hooks/useFetchNextListOnView";
import { ResponseWithPagination } from "@/types/response-with-pagination";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import Link from "next/link";
import { useGetInfoFromCookie } from "@/utils/hooks/useGetInfoFromCookie";

const InvitedCandidatesTab = () => {
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
    stage: "all",
    jobId,
  });
  const { role } = useGetInfoFromCookie();
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
            <InfoCardSkeleton />{" "}
          </div>
        ))}
      </div>
    );

  if (isError) {
    console.log(error);
    return <h1>Something went wrong</h1>;
  }

  const candidates = data.pages.flatMap((pg) => pg.data);
  return (
    <>
      <div className="mb-2 flex justify-between">
        <p className="font-medium text-[#5E5E5E]">
          {data.pages[0].count === 0 ? (
            "No candidates invited"
          ) : (
            <>
              <span className="font-bold text-brand-black">
                {data.pages[0].count} &nbsp;
              </span>
              candidate{data.pages[0].count !== 1 && "s"} invited{" "}
            </>
          )}
        </p>

        <InviteCandidatesSheet />
      </div>
      <div className="scroll-container h-[calc(100vh-150px)] space-y-2 overflow-auto">
        {data && data.pages[0].count === 0 ? (
          <h1 className="mt-8 text-center text-xl text-brand-blue">
            No candidates to show
          </h1>
        ) : (
          candidates.map((candidate, i) => {
            if (candidates.length === i + 1) {
              return (
                <Link
                  href={`/${role}/candidates/${candidate.candidate.candidateId}`}
                  key={candidate.candidate.candidateId}
                >
                  <InvitedCandidate
                    ref={ref}
                    key={candidate._id}
                    candidate={candidate}
                  />
                </Link>
              );
            }
            return (
              <Link
                href={`/${role}/candidates/${candidate.candidate.candidateId}`}
                key={candidate.candidate.candidateId}
              >
                <InvitedCandidate key={candidate._id} candidate={candidate} />
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default InvitedCandidatesTab;
