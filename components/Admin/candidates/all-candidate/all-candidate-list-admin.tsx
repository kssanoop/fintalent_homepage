import { GetUnhiredCandidatesSchema } from "@/features/get-candidates/schema/get-unhired-candidates-schema";
import CandidateAdmin from "./candidate-card-admin";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const AllCandidateListAdmin = ({
  candidates,
}: {
  candidates: GetUnhiredCandidatesSchema["data"];
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <>
      {candidates.map((candidate) => (
        <div
          key={candidate._id}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`${pathname}/${candidate?.candidateId}`);
          }}
          className="cursor-pointer"
        >
          <CandidateAdmin candidate={candidate} />
        </div>
      ))}
    </>
  );
};

export default AllCandidateListAdmin;
