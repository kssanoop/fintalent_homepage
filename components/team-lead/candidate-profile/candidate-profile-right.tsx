import SkillCard from "@/features/ProfileEdit/skills/components/Skill-Card";
import AnalyticsAndVideoCard from "@/components/candidate/profile/body/analytics-and-video/analytics-and-video-card";
import AvailabilityCard from "@/features/availability/components/availability-card";
import JobPreferenceCard from "@/features/ProfileEdit/JobPreference/components/JobPreferenceCard";
import WorkHistoryCard from "@/features/ProfileEdit/WorkHistory/components/WorkHistoryCard";
import EducationCard from "@/features/ProfileEdit/Educations/Components/EducationCard";
import LanguageCard from "@/features/ProfileEdit/LanguageKnown/Components/LanguageCard";
import PersonalDetailsCard from "@/features/ProfileEdit/PersonalDetails/Components/PersonalDetailsCard";
import { ROLES } from "@/types/authorization";
import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";

const CandidateProfileRight = ({ data }: { data: CandidateSchema }) => {
  return (
    <div className="flex flex-col gap-2">
      <AnalyticsAndVideoCard
        //  Temperoroy fix: ignoring the type warning
        candidateScore={data?.candidateScore as any}
        trustScore={data?.trustScore as any}
        resumeVideo={data?.resumeVideo}
        refetch={() => {}}
        Interface={ROLES.ADMIN}
      />
      <div>
        <SkillCard
          skills={data?.skills as any}
          pendingSkills={data?.skillsPending as any}
          pending={true}
          Interface={ROLES.ADMIN}
        />
      </div>
      <JobPreferenceCard
        jobPreference={data?.jobPreferences as any}
        Interface={ROLES.ADMIN}
      />
      {!data?.hired && (
        <AvailabilityCard
          availabilityDetails={data?.availability as any}
          Interface={ROLES.ADMIN}
        />
      )}
      <WorkHistoryCard
        employmentDetails={data?.employmentDetails}
        Interface={ROLES.ADMIN}
      />
      <EducationCard
        educationDetails={data?.educationDetails}
        Interface={ROLES.ADMIN}
      />
      <LanguageCard languages={data?.languages} Interface={ROLES.ADMIN} />{" "}
      <PersonalDetailsCard
        personalDetails={data?.personalDetails}
        Interface={ROLES.ADMIN}
      />
    </div>
  );
};

export default CandidateProfileRight;
