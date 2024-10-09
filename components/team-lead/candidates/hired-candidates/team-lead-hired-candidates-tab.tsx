import HiredCandidate from "@/components/recruiter/candidates/hired-candidates-tab/hired-candidate";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { useGetHiredCandidatesAdmin as useGetHiredCandidatesTeamLead } from "@/features/get-candidates/admin/api/get-hired-candidates";

const TeamLeadHiredCandidatesTabs = () => {
  const { data, isLoading, isError, error } = useGetHiredCandidatesTeamLead();
  console.log("hired Candidates:", data);
  if (isError) {
    return <div>{error as string}</div>;
  }

  return (
    <div className="flex w-full flex-grow pl-5">
      <DynamicHeightContainer>
        <div className="flex w-full flex-col gap-2">
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
            <div className="flex w-full flex-col gap-2">
              {data?.map((candidate: any) => (
                <div className="w-ful flex flex-grow" key={candidate._id}>
                  <HiredCandidate candidate={candidate} />
                </div>
              ))}
            </div>
          )}
        </div>
      </DynamicHeightContainer>
    </div>
  );
};

export default TeamLeadHiredCandidatesTabs;
