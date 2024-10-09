import { GetUnhiredCandidatesSchema } from "@/features/get-candidates/schema/get-unhired-candidates-schema";

import UnhiredCandidate from "./unhired-candidate";
import { useInView } from "react-intersection-observer";

export interface UnhiredCandidatesListProps {
  list: GetUnhiredCandidatesSchema["data"];
  fetchNextList: () => void;
}

const UnhiredCandidateList = ({
  list,
  fetchNextList,
}: UnhiredCandidatesListProps) => {
  const { ref, inView } = useInView();
  if (inView) fetchNextList();
  return (
    <>
      {list.map((candidate, i) => (
        <div ref={list.length === i + 1 ? ref : null} key={candidate._id}>
          <UnhiredCandidate candidate={candidate} />
        </div>
      ))}
    </>
  );
};

export default UnhiredCandidateList;
