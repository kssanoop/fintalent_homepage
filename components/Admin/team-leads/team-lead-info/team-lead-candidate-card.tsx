import ScoreCardList from "@/components/candidate/body/score-card/score-card-list";
import SkillCardList from "@/components/candidate/body/skill/skill-card-list";
import CandidateCardAvatar from "@/components/candidate/candidate-card/candidate-card-avatar";
import CandidateCardInfo from "@/components/candidate/candidate-card/candidate-card-info";
import CandidateCardPreference from "@/components/candidate/candidate-card/candidate-card-preference";
import WatchVideoResume from "@/components/candidate/watch-video-resume/watch-video-resume";
import {
  PREFERENCE_LIST,
  SCORE_INFO,
} from "@/components/recruiter/job/job-right/invited-candidate";
import { Card } from "@/components/ui/card";
import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";

const TeamLeadCandidateCard = ({
  candidate,
}: {
  candidate: CandidateSchema;
}) => {
  const scoreList = SCORE_INFO.map((score) => ({
    ...score,
    score: candidate[score.name],
  }));

  // TODO: type defined isn't proper
  const preferenceList = PREFERENCE_LIST.map((preference) => ({
    ...preference,
    value: candidate.jobPreferences[
      preference.name as keyof CandidateSchema["jobPreferences"]
    ] as string | string[] | number | undefined,
  }));
  console.log(candidate);
  console.log(preferenceList);
  return (
    <Card
      key={candidate._id}
      className="flex flex-col gap-[18px] p-5 md:flex-row"
    >
      <div className="flex flex-row justify-between md:flex-col md:justify-start">
        <CandidateCardAvatar
          src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate.profilePhoto.storageName}`}
          className="h-[72px] w-[72px] md:h-[118px] md:w-[118px]"
        />
        <div className="flex flex-row gap-1 md:flex-col ">
          <ScoreCardList
            scoreList={scoreList}
            scoreCardClassName="rounded-lg border-[#EFEFEF]"
            scoreCardHeadingClassName="text-xs font-semibold"
            scoreCardScoreClassName="text-lg"
          />
        </div>
      </div>
      <div className="grow">
        <div className="mb-[26px] flex flex-col md:flex-row md:justify-between">
          <div className="space-y-1 text-brand-black">
            <CandidateCardInfo candidate={candidate} />
          </div>
          {candidate.resumeVideo.storageName && (
            <WatchVideoResume src={candidate.resumeVideo.storageName} />
          )}
        </div>
        <div>
          <div className="mb-5 flex flex-wrap gap-[30px] md:flex-nowrap">
            {preferenceList.map((list) => (
              <div key={crypto.randomUUID()} className="space-y-1 font-medium">
                <CandidateCardPreference {...list} />
              </div>
            ))}
          </div>
          <div>
            <h6 className="mb-1.5 text-xs font-medium text-[#5E5E5E]">
              Skills
            </h6>
            <div className="flex w-full flex-wrap gap-2">
              <SkillCardList
                skillList={candidate.skills}
                totalRating={10}
                className="text-xs font-semibold text-brand-black"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TeamLeadCandidateCard;
