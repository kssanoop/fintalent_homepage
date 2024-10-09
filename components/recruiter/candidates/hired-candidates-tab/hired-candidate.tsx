import ScoreCardList from "@/components/candidate/body/score-card/score-card-list";
import SkillCardList from "@/components/candidate/body/skill/skill-card-list";
import CandidateCardAvatar from "@/components/candidate/candidate-card/candidate-card-avatar";
import { Card } from "@/components/ui/card";
import { SCORE_INFO } from "../../job/job-right/invited-candidate";
import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import CandidateCardHeading from "@/components/candidate/candidate-card/candidate-card-heading";
import Verified from "@/components/verified";
import CandidateCardDesignation from "@/components/candidate/candidate-card/candidate-card-designation";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import AvatarCompanyFallback from "@/components/avatar-company-fallback";

const HiredCandidate = ({
  candidate,
  isBlur = false,
}: {
  candidate: CandidateSchema;
  isBlur?: boolean;
}) => {
  const scoreList = SCORE_INFO.map((score) => ({
    ...score,
    score: candidate[score.name],
  }));

  return (
    <Card className="flex  flex-col items-start p-5 md:w-auto md:flex-row md:justify-between lg:w-4/5 lg:min-w-[825px]">
      <div className="flex flex-col gap-3 md:w-4/5">
        <div className="flex gap-4">
          <div className={`${isBlur && "blur-[5px] filter"}`}>
            <CandidateCardAvatar
              src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate?.profilePhoto?.storageName}`}
              className="h-[72px] w-[72px] md:h-[118px] md:w-[118px]"
            />
          </div>
          <div className="flex gap-20 md:grow">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <CandidateCardHeading>
                  <div className={`${isBlur && "blur-[5px] filter"}`}>
                    {candidate?.fullName}
                  </div>
                </CandidateCardHeading>
                <Verified isVerified={candidate?.profileVerified || false} />
              </div>{" "}
              <CandidateCardDesignation>
                {candidate?.jobTitle}
              </CandidateCardDesignation>
            </div>
            <div className="hidden items-start gap-1 md:flex ">
              <ScoreCardList
                scoreList={scoreList}
                scoreCardClassName="rounded-lg border-[#EFEFEF] w-[121px]"
                scoreCardHeadingClassName="text-xs font-semibold whitespace-nowrap	"
                scoreCardScoreClassName="text-lg"
              />
            </div>
          </div>
        </div>
        <div className="flex items-start gap-1 md:hidden ">
          <ScoreCardList
            scoreList={scoreList}
            scoreCardClassName="rounded-lg border-[#EFEFEF] w-[121px]"
            scoreCardHeadingClassName="text-xs font-semibold whitespace-nowrap	"
            scoreCardScoreClassName="text-lg"
          />
        </div>
        <div>
          <h6 className="mb-1.5 text-xs font-medium text-[#5E5E5E]">Skills</h6>
          <div className="flex flex-wrap gap-2">
            <SkillCardList
              skillList={candidate?.skills}
              totalRating={10}
              className="text-xs"
            />
          </div>
        </div>
      </div>
      <div className="mt-3 flex h-[173px] w-full flex-col items-center justify-center gap-y-1 rounded-[12px] border border-border-secondary bg-background py-4 md:mt-0 md:w-[135px] md:py-0">
        <p className="text-sm font-medium text-brand-grey">Hired at</p>

        <Avatar className="h-[79px] w-[79px] rounded-none shadow">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate.hiredCompany.companyLogo.storageName}`}
            className=""
          />
          <AvatarCompanyFallback />
        </Avatar>
      </div>
    </Card>
  );
};

export default HiredCandidate;
