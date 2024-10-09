import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
// import Candidate from "../all-candidates-tab/candidate";
import useGetMyCandidates from "@/features/get-candidates/api/get-my-candidates";
import HiredCandidate from "../hired-candidates-tab/hired-candidate";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MyHiresTab = () => {
  const pathname = usePathname();
  const { data, isLoading, isError, error } = useGetMyCandidates();

  //   TODO: implement error boundary and avoid SearchBar UI from the error UI
  if (isError) {
    console.log(error);
    return <h1>Something went wrong.</h1>;
  }

  return (
    <div className="h-[calc(100%-8px)] ">
      {isLoading ? (
        <div className="space-y-1">
          {[...Array(3)].map(() => (
            <InfoCardSkeleton key={crypto.randomUUID()} />
          ))}
        </div>
      ) : !data || data?.length === 0 ? (
        <p className="text-center text-lg text-brand-blue">
          No candidates found
        </p>
      ) : (
        <>
          {data.map((candidate) => (
            <Link
              href={`${pathname}/${candidate?.candidateId}`}
              key={candidate.candidateId}
            >
              <HiredCandidate candidate={candidate} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default MyHiresTab;
