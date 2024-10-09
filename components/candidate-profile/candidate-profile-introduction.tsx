import Verified from "../verified";

type CandidateProfileIntroductionProps = {
  fullName: string;
  isProfileVerified: boolean;
  jobTitle: string;
  currentOrganization: string;
  totalExperience: {
    year: number;
    month: number;
  };
};

const CandidateProfileIntroduction = ({
  fullName,
  isProfileVerified,
  jobTitle,
  currentOrganization,
  totalExperience,
}: CandidateProfileIntroductionProps) => {
  return (
    <div className="break-all text-center">
      <div className="flex items-center justify-center gap-1">
        <h3 className="mb-1 text-xl font-extrabold capitalize ">{fullName}</h3>
        <Verified isVerified={isProfileVerified || false} />
      </div>

      <div className="flex flex-col gap-1 text-sm font-medium">
        <p className="text-[#171717]">
          {jobTitle?.replace(/^\w/, (c: any) => c.toUpperCase())}
        </p>
        <p className="text-[#5E5E5E]">
          Currently at{" "}
          {currentOrganization?.replace(/^\w/, (c: any) => c.toUpperCase())} .
          Exp - {totalExperience?.year} yrs
        </p>
      </div>
    </div>
  );
};

export default CandidateProfileIntroduction;
