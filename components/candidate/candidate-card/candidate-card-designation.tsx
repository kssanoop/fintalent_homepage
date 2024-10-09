import { ReactNode } from "react";

const CandidateCardDesignation = ({ children }: { children: ReactNode }) => {
  return <p className="text-sm font-medium capitalize">{children}</p>;
};

export default CandidateCardDesignation;
