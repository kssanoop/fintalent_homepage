import { ReactNode } from "react";

const CandidateCardHeading = ({ children }: { children: ReactNode }) => {
  return <h4 className="text-xl font-bold capitalize">{children}</h4>;
};

export default CandidateCardHeading;
