import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import useGetHiredCandidates from "@/features/get-candidates/api/get-hired-candidate";
import HiredCandidate from "./hired-candidate";

const HiredCandidatesTab = () => {
  const { data, isLoading, isError, error } = useGetHiredCandidates();
  console.log(data);

  //   TODO: implement error boundary and avoid SearchBar UI from the error UI
  if (isError) {
    console.log(error);
    return <h1>Something went wrong.</h1>;
  }
  console.log(error);
  return (
    <div className="scroll-container mt-4  h-[calc(100%-8px)] space-y-2 overflow-y-auto">
      {isLoading ? (
        <>
          {[...Array(3)].map(() => (
            <InfoCardSkeleton key={crypto.randomUUID()} />
          ))}
        </>
      ) : !data || data?.length === 0 ? (
        <p className="text-center text-lg text-brand-blue">
          No candidates found
        </p>
      ) : (
        <>
          {data.map((candidate) => (
            <HiredCandidate
              key={candidate._id}
              candidate={candidate}
              isBlur={true}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default HiredCandidatesTab;
