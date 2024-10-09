import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import useInviteToJob from "@/features/jobs/api/invite-to-job";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import ScoreCardList from "@/components/candidate/body/score-card/score-card-list";
import CandidateCardInfo from "../../../candidate/candidate-card/candidate-card-info";
import { Button } from "@/components/ui/button";
import CandidateCardAvatar from "../../../candidate/candidate-card/candidate-card-avatar";
import { Card } from "@/components/ui/card";
import CandidateCardPreference from "../../../candidate/candidate-card/candidate-card-preference";
import SkillCardList from "@/components/candidate/body/skill/skill-card-list";
import { PREFERENCE_LIST, SCORE_INFO } from "./invited-candidate";

const UnhiredCandidate = ({ candidate }: { candidate: CandidateSchema }) => {
  console.log(candidate, "candidate");
  const router = useRouter();
  const jobId = router.query.id as string;
  const queryClient = useQueryClient();
  const handleSuccess = (data: any) => {
    queryClient.invalidateQueries({ queryKey: ["unhired-candidates"] });
    queryClient.invalidateQueries({
      queryKey: ["job-application-by-recruiter"],
    });
    toast.success(data.message);
  };

  const handleError = (error: any) => {
    console.log("Error: ", error);
    toast.error(error.response.data.message);
  };
  const { mutate, isLoading, isError } = useInviteToJob(
    handleSuccess,
    handleError,
  );
  const handleInviteToJob = (candidateId: string) => {
    mutate({ candidateId, jobId });
  };

  const scoreList = SCORE_INFO.map((score) => ({
    ...score,
    score: candidate[score.name],
  }));

  // TODO: type defined isn't proper
  const preferenceList = PREFERENCE_LIST.map((preference) => ({
    ...preference,
    value: candidate.jobPreferences[preference.name as keyof typeof candidate.jobPreferences] as string | string[] | number | undefined,
    // value: candidate[preference.name as keyof CandidateSchema] as
    //   | string
    //   | string[]
    //   | number
    //   | undefined,
  }));
  console.log(preferenceList);
  return (
    <Card
      key={crypto.randomUUID()}
      className="flex flex-col gap-[18px] p-5 lg:flex-row"
    >
      <div className="flex justify-between lg:flex-col">
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
        <div className="mb-[26px] flex flex-col justify-between gap-4 lg:flex-row">
          <div className="text-brand-black lg:space-y-1">
            <CandidateCardInfo candidate={candidate} />
          </div>
          {!candidate.jobApplicationStatus && (
            <Button
              onClick={() => {
                handleInviteToJob(candidate.candidateId);
              }}
              disabled={isLoading}
              variant="gradient"
              className="rounded-lg border-border bg-white text-sm font-bold "
            >
              {isLoading && !isError ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inviting...
                </>
              ) : (
                "Invite to job"
              )}
            </Button>
          )}
        </div>
        <div>
          <div className="mb-5 flex flex-wrap gap-[30px]">
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

export default UnhiredCandidate;
