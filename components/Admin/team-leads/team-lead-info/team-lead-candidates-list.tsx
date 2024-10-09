import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import TeamLeadCandidateCard from "./team-lead-candidate-card";
import { useRouter } from "next/router";
import { useGetInfoFromCookie } from "@/utils/hooks/useGetInfoFromCookie";

const TeamLeadCandidatesList = ({
  candidates,
}: {
  candidates: CandidateSchema[];
}) => {
  const router = useRouter();
  const { role } = useGetInfoFromCookie();
  const getCandidateStatus = (candidate: CandidateSchema) => {
    if (candidate.accountVerifiedStatus === "verified") return "all";
    if (candidate.accountVerifiedStatus === "pendingVerification")
      return "pending";
    if (candidate.reopenRequest) return "reopen";
  };
  return (
    <>
      {candidates.map((candidate) => (
        <div
          key={candidate._id}
          onClick={() => {
            router.push(
              `/${role}/candidates/${
                candidate.candidateId
              }?source=${getCandidateStatus(candidate)}`,
            );
          }}
          className="cursor-pointer"
        >
          <TeamLeadCandidateCard candidate={candidate} />
        </div>
      ))}
    </>
  );
};

export default TeamLeadCandidatesList;
