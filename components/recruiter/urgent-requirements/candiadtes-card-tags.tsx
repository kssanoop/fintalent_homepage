import ScoreCardList from "@/components/candidate/body/score-card/score-card-list";
import SkillCardList from "@/components/candidate/body/skill/skill-card-list";
import CandidateCardAvatar from "@/components/candidate/candidate-card/candidate-card-avatar";
import CandidateCardInfo from "@/components/candidate/candidate-card/candidate-card-info";
import CandidateCardPreference from "@/components/candidate/candidate-card/candidate-card-preference";
import { Card } from "@/components/ui/card";
import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import { usePathname } from "next/navigation";
import {
  PREFERENCE_LIST,
  SCORE_INFO,
} from "../job/job-right/invited-candidate";
import InviteMultipleCandidatesSheet from "../candidates/all-candidates-tab/invite-multiple-candidates-sheet";
import { useRouter } from "next/router";
import { useUpdateView } from "@/features/tags/recruiter/api/recruiter/api/update-view";

const CandidatesTags = ({ candidate }: { candidate: CandidateSchema }) => {
  const pathName = usePathname();
  const router = useRouter();
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

  const { mutate } = useUpdateView();

  const handleRedirect = () => {
    if (pathName.includes("/recruiter/urgent-requirements")) {
      router.push(`${pathName}/candidate/${candidate?.candidateId}`);
      mutate(candidate?.candidateId);
    } else {
      console.log("LLLLLLLLLLLLLLLLLLLL");
      router.push(`${pathName}/candidate/${candidate?.candidateId}`);
    }
    // else if (pathName.includes("/admin/tags")) {
    //   router.push(`${pathName}/candidate/${candidate?.candidateId}`);
    // } else if (pathName.includes("/manager/tags")) {
    //   router.push(`${pathName}/candidate/${candidate?.candidateId}`);
    // }
  };
  return (
    <Card
      onClick={() => {
        handleRedirect();
      }}
      className="flex cursor-pointer  flex-col gap-[18px] p-5 md:flex-row"
    >
      <div className="flex flex-row items-center justify-between md:flex-col md:items-start md:justify-normal">
        <CandidateCardAvatar
          src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate.profilePhoto.storageName}`}
          className="h-[72px] w-[72px] md:h-[118px] md:w-[118px]"
        />
        <div className="flex cursor-pointer flex-row gap-1 md:flex-col">
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
          {pathName.includes("/recruiter/urgent-requirements") && (
            <div className="flex  items-center gap-[5px]">
              {!candidate.jobApplicationStatus && (
                <InviteMultipleCandidatesSheet
                  candidateId={candidate.candidateId}
                  isCandidatePage={true}
                />
              )}
            </div>
          )}
        </div>
        <div>
          <div
            className="mb-5 flex cursor-pointer flex-wrap  gap-[30px]"
            // onClick={() => {
            //   handleRedirect();
            // }}
          >
            {preferenceList.map((list) => (
              <div key={crypto.randomUUID()} className="space-y-1 font-medium">
                <CandidateCardPreference {...list} />
              </div>
            ))}
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              handleRedirect();
            }}
          >
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

export default CandidatesTags;
