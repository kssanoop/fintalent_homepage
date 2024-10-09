import CandidateCardAvatar from "../../../candidate/candidate-card/candidate-card-avatar";
import CandidateCardPreference from "../../../candidate/candidate-card/candidate-card-preference";
import ScoreCardList from "@/components/candidate/body/score-card/score-card-list";
import { Card } from "@/components/ui/card";
import SkillCardList from "@/components/candidate/body/skill/skill-card-list";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import { Linkedin, Mail, Phone } from "lucide-react";
import CandidateCardInfo from "../../../candidate/candidate-card/candidate-card-info";
import WatchVideoResume from "@/components/candidate/watch-video-resume/watch-video-resume";
// import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import { forwardRef } from "react";
// import { useRouter } from "next/router";
// import { usePathname } from "next/navigation";

// mockvalues
export const SCORE_INFO: Array<{
  name: "candidateScore" | "trustScore";
  heading: string;
  score: number;
}> = [
  {
    name: "candidateScore",
    heading: "Candidate Score",
    score: 45,
  },
  {
    name: "trustScore",
    heading: "Trust Score",
    score: 15,
  },
];

export const contactList: Array<{
  label: "phoneNo" | "Email" | "Linkedin";
  value: string;
  icon: JSX.Element;
}> = [
  {
    label: "phoneNo",
    value: "",
    icon: <Phone size={15} color="#012A59" strokeWidth={1} />,
  },
  {
    label: "Email",
    value: "",
    icon: <Mail size={15} color="#012A59" strokeWidth={1} />,
  },
  {
    label: "Linkedin",
    value: "",
    icon: <Linkedin size={15} color="#012A59" strokeWidth={1} />,
  },
];

export const PREFERENCE_LIST = [
  {
    name: "location",
    label: "Preferred Location",
    value: [] as string[] | undefined,
  },
  {
    name: "employmentType",
    label: "Desired Employment",
    value: [] as string[] | undefined,
  },
  {
    name: "expectedCTC",
    label: "Expected CTC",
    value: "" as string | undefined,
  },
  { name: "employmentMode", label: "Type", value: "" as string | undefined },
  {
    name: "qualification",
    label: "Qualification",
    value: "" as string | undefined,
  },
];

const SKILLS_INFO = {
  skills: [
    { name: "Management", level: 1 },
    { name: "Communication", level: 2 },
    { name: "Accounting", level: 4 },
    { name: "Accounting", level: 0 },

    { name: "Accounting", level: 5 },

    { name: "Accounting", level: 0 },

    { name: "Accounting", level: 8 },
  ],
  totalRating: 10,
};

const InvitedCandidate = forwardRef(
  (
    {
      candidate,
      Interface,
    }: {
      candidate: JobApplicationSchema;
      Interface?: string;
    },
    ref: any,
  ) => {
    const scoreList = SCORE_INFO.map((score) => ({
      ...score,
      score: candidate.candidate[score.name],
    }));

    // TODO: type defined isn't proper
    const preferenceList = PREFERENCE_LIST.map((preference) => ({
      ...preference,
      // value: candidate.candidate[preference.name as keyof CandidateSchema] as
      //   | string
      //   | string[]
      //   | number
      //   | undefined,
      value: candidate.candidate.jobPreferences[
        preference.name as keyof typeof candidate.candidate.jobPreferences
      ] as string | string[] | number | undefined,
    }));

    const isHired = candidate.candidate.hired;
    return (
      <Card
        ref={ref}
        className={`flex flex-col gap-[18px] p-5 md:flex-row ${isHired && "bg-[#E1E1E1]"}`}
      >
        <div className="flex flex-row justify-between gap-[27px] md:flex-col md:justify-start md:gap-0">
          <CandidateCardAvatar
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${candidate.candidate.profilePhoto.storageName}`}
            className="mb-0 h-[72px] w-[72px] md:h-[118px] md:w-[118px]"
          />
          <div className="flex grow flex-row gap-1 md:grow-0 md:flex-col">
            <ScoreCardList
              scoreList={scoreList}
              scoreCardClassName="rounded-lg border-[#EFEFEF] gap-1 w-[111px] md:w-auto"
              scoreCardHeadingClassName="text-xs font-semibold"
              scoreCardScoreClassName="text-lg"
            />
          </div>
        </div>
        <div className="grow">
          <div className="mb-[26px] flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="space-y-1 text-brand-black">
              <CandidateCardInfo candidate={candidate.candidate} />
            </div>
            {candidate.candidate.resumeVideo.storageName && (
              <WatchVideoResume
                src={candidate.candidate.resumeVideo.storageName}
                buttonClassName="text-[#012A59]"
              />
            )}
          </div>
          <div>
            <div className="mb-5 grid grid-cols-6 gap-[30px] md:flex ">
              {preferenceList.map((list, index) => (
                <div
                  key={crypto.randomUUID()}
                  className={`space-y-1 font-medium ${index < 2 ? "col-span-3" : "col-span-2"}`}
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
                  skillList={candidate?.candidate?.skills || []}
                  totalRating={SKILLS_INFO.totalRating}
                  className="text-xs font-semibold text-brand-black"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  },
);

InvitedCandidate.displayName = "InvitedCandidate";

export default InvitedCandidate;
