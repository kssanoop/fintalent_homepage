import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import ScoreCardList from "@/components/candidate/body/score-card/score-card-list";
import { Button } from "@/components/ui/button";
import CandidateCardAvatar from "@/components/candidate/candidate-card/candidate-card-avatar";
import { Card } from "@/components/ui/card";
import CandidateCardPreference from "@/components/candidate/candidate-card/candidate-card-preference";
import SkillCardList from "@/components/candidate/body/skill/skill-card-list";
import {
  PREFERENCE_LIST,
  SCORE_INFO,
} from "@/components/recruiter/job/job-right/invited-candidate";
import CandidateCardInfo from "@/components/candidate/candidate-card/candidate-card-info";
import useAssignCandidateToTag from "@/features/tags/api/assign-candidates-to-tag";

const AssignCandidate = ({ candidate }: { candidate: CandidateSchema }) => {
  const router = useRouter();
  const tagId = router.query.TagId as string;
  const { mutate, isLoading, isError } = useAssignCandidateToTag();
  const handleAssign = (candidateId: string) => {
    mutate({ tagId, candidateIds: [candidateId] });
  };

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

  return (
    <Card key={candidate._id} className="flex gap-[18px] p-5">
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
          {!candidate.jobApplicationStatus && (
            <Button
              onClick={() => {
                handleAssign(candidate.candidateId);
              }}
              disabled={isLoading}
              variant="gradient"
              className="rounded-lg border-border bg-white text-sm font-bold"
            >
              {isLoading && !isError ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Assigning...
                </>
              ) : (
                "Assign"
              )}
            </Button>
          )}
        </div>
        <div>
          <div className="mb-5 flex gap-[30px]">
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

export default AssignCandidate;
