import ScoreCardList from "@/components/candidate/body/score-card/score-card-list";
import SkillCardList from "@/components/candidate/body/skill/skill-card-list";
import CandidateCardAvatar from "@/components/candidate/candidate-card/candidate-card-avatar";
import CandidateCardInfo from "@/components/candidate/candidate-card/candidate-card-info";
import CandidateCardPreference from "@/components/candidate/candidate-card/candidate-card-preference";
import { Card } from "@/components/ui/card";
import {
  PREFERENCE_LIST,
  SCORE_INFO,
} from "../../job/job-right/invited-candidate";
import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import InviteMultipleCandidatesSheet from "./invite-multiple-candidates-sheet";
import WatchVideoResume from "@/components/candidate/watch-video-resume/watch-video-resume";
import { usePathname } from "next/navigation";
import InviteToJobButton from "../../urgent-requirements/invite-to-job-button";
import useRegisterView from "@/features/view-register/api/register-view";

const Candidate = ({ candidate }: { candidate: CandidateSchema }) => {
  const pathName = usePathname();

  const { mutate: registerView } = useRegisterView();

  const scoreList = SCORE_INFO.map((score) => ({
    ...score,
    score: candidate[score.name],
  }));

  const preferenceList = PREFERENCE_LIST.map((preference) => ({
    ...preference,
    value:
      candidate.jobPreferences[
        preference.name as keyof typeof candidate.jobPreferences
      ],
  }));
  return (
    <Card
      key={candidate._id}
      className="flex flex-col gap-[18px] p-5 md:flex-row"
    >
      <div className="flex flex-row items-center justify-between md:flex-col md:items-start md:justify-normal">
        <CandidateCardAvatar
          src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate.profilePhoto.storageName}`}
          className="h-[72px] w-[72px] md:h-[118px] md:w-[118px]"
        />
        <div className="flex flex-row gap-1 md:flex-col">
          <ScoreCardList
            scoreList={scoreList}
            scoreCardClassName="rounded-lg border-[#EFEFEF]"
            scoreCardHeadingClassName="text-xs font-semibold "
            scoreCardScoreClassName="text-lg"
          />
        </div>
      </div>
      <div className="grow">
        <div className="mb-[26px] flex flex-col items-start justify-between gap-4 md:flex-row">
          <div className="space-y-1 text-brand-black">
            <CandidateCardInfo candidate={candidate} />
          </div>
          <div className="flex w-full items-center gap-[8px] sm:gap-[5px] md:w-auto">
            {!pathName.includes("/recruiter/urgent-requirements") && (
              <div className="grow sm:grow-0">
                {candidate.resumeVideo.storageName && (
                  <WatchVideoResume
                    src={candidate.resumeVideo.storageName}
                    handleClick={() => {
                      registerView({ candidateId: candidate.candidateId });
                    }}
                    buttonClassName="mt-0"
                  />
                )}
              </div>
            )}
            {!candidate.jobApplicationStatus && (
              <InviteMultipleCandidatesSheet
                candidateId={candidate.candidateId}
                isCandidatePage={true}
                buttonClassName=" w-auto md:w-[172px]"
              />
            )}

            {pathName.includes("/recruiter/urgent-requirements") && (
              <InviteToJobButton candidateId={candidate.candidateId} />
            )}
          </div>
        </div>
        <div>
          <div className="mb-5 flex flex-wrap gap-[30px] ">
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
                className="text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Candidate;
