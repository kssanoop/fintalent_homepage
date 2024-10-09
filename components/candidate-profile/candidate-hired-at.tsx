import AvatarCompanyFallback from "../avatar-company-fallback";
import { CardIcon, CardIconImage } from "../ui/cardslogo";

type CandidateHiredAtProps = {
  companyName: string;
  companyLogoSrc: string;
};

const CandidateHiredAt = ({
  companyName,
  companyLogoSrc,
}: CandidateHiredAtProps) => {
  return (
    <div
      className="flex items-center justify-center gap-1.5 
        rounded-[12px] border border-solid border-[#EFEFEF] bg-[#F7F7F7] p-3"
    >
      <p className="text-sm font-medium leading-6 text-[#5E5E5E]">
        Hired at {companyName}
      </p>
      <CardIcon className="h-[43px] w-[43px] rounded-none">
        <CardIconImage src={companyLogoSrc} />
        <AvatarCompanyFallback />
      </CardIcon>
    </div>
  );
};

export default CandidateHiredAt;
