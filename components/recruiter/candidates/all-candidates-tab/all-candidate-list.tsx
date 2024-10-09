import { GetUnhiredCandidatesSchema } from "@/features/get-candidates/schema/get-unhired-candidates-schema";
import Candidate from "./candidate";
// import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import useRegisterView from "@/features/view-register/api/register-view";
import { useInView } from "react-intersection-observer";

const AllCandidateList = ({
  candidates,
  fetchNextList,
}: {
  candidates: GetUnhiredCandidatesSchema["data"];
  fetchNextList: () => void;
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const { mutate: registerView } = useRegisterView();

  const { ref, inView } = useInView({
    threshold: 0,
  }) as any;

  if (inView) fetchNextList();

  return (
    <>
      {candidates.map((candidate, i) => (
        <div
          ref={candidates.length === i + 1 ? ref : null}
          onClick={(e) => {
            e.stopPropagation();
            router.push(`${pathName}/${candidate?.candidateId}`);
            registerView({ candidateId: candidate.candidateId });
          }}
          key={candidate?._id}
          className="cursor-pointer"
        >
          <Candidate candidate={candidate} />
        </div>
      ))}
    </>
  );
};

export default AllCandidateList;
