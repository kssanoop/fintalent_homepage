import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import ScoreCardList from "@/components/candidate/body/score-card/score-card-list";
import CandidateCardInfo from "@/components/candidate/candidate-card/candidate-card-info";
import CandidateCardAvatar from "@/components/candidate/candidate-card/candidate-card-avatar";
import { Card } from "@/components/ui/card";
import CandidateCardPreference from "@/components/candidate/candidate-card/candidate-card-preference";
import SkillCardList from "@/components/candidate/body/skill/skill-card-list";
import {
  PREFERENCE_LIST,
  SCORE_INFO,
} from "@/components/recruiter/job/job-right/invited-candidate";
import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction } from "react";

const CandidateReassignCard = ({
  candidate,
  selectedCandidates,
  setSelectedCandidates,
}: {
  candidate: CandidateSchema;
  selectedCandidates: CandidateSchema[];
  setSelectedCandidates: Dispatch<SetStateAction<CandidateSchema[]>>;
}) => {
  console.log(candidate);

  const scoreList = SCORE_INFO.map((score) => ({
    ...score,
    score: candidate[score.name],
  }));

  // TODO: type defined isn't proper
  const preferenceList = PREFERENCE_LIST.map((preference) => ({
    ...preference,
    value: candidate[preference.name as keyof CandidateSchema] as
      | string
      | string[]
      | number
      | undefined,
  }));
  console.log(preferenceList);
  return (
    <Card className="flex gap-3 py-5 pl-2 pr-5">
      <Checkbox
        checked={selectedCandidates
          .map((candidate) => candidate._id)
          ?.includes(candidate._id)}
        onCheckedChange={(checked) => {
          checked
            ? setSelectedCandidates((prev) => [...prev, candidate])
            : setSelectedCandidates(
                selectedCandidates?.filter(
                  (value) => value._id !== candidate._id,
                ),
              );
        }}
        className="h-4 w-4"
      />
      <div className="flex gap-[18px]">
        <div className="">
          <CandidateCardAvatar
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate.profilePhoto.storageName}`}
          />
          <div className="space-y-1">
            <ScoreCardList
              scoreList={scoreList}
              scoreCardClassName="rounded-lg border-[#EFEFEF]"
              scoreCardHeadingClassName="text-xs font-semibold"
              scoreCardScoreClassName="text-lg"
            />
          </div>
        </div>
        <div className="grow">
          <div className="mb-[26px] flex justify-between gap-4">
            <div className="space-y-1 text-brand-black">
              <CandidateCardInfo candidate={candidate} />
            </div>
          </div>
          <div>
            <div className="mb-5 flex gap-[30px]">
              {preferenceList.map((list) => (
                <div
                  key={crypto.randomUUID()}
                  className="space-y-1 font-medium"
                >
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
      </div>
    </Card>
  );
};

export default CandidateReassignCard;
