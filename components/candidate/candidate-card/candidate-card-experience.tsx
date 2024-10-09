import { ReactNode } from "react";

const CandidateCardExperience = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-wrap items-center text-sm font-medium text-[#5E5E5E]">
      {children}
    </div>
  );
};

export default CandidateCardExperience;
