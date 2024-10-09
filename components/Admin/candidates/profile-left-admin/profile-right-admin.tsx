import SkillCard from "@/features/ProfileEdit/skills/components/Skill-Card";
import AvailabilityCard from "@/features/availability/components/availability-card";
import JobPreferenceCard from "@/features/ProfileEdit/JobPreference/components/JobPreferenceCard";
import WorkHistoryCard from "@/features/ProfileEdit/WorkHistory/components/WorkHistoryCard";
import EducationCard from "@/features/ProfileEdit/Educations/Components/EducationCard";
import LanguageCard from "@/features/ProfileEdit/LanguageKnown/Components/LanguageCard";
import PersonalDetailsCard from "@/features/ProfileEdit/PersonalDetails/Components/PersonalDetailsCard";
import HiredCard from "@/features/ProfileEdit/Hired/HiredCard";
import { ROLES } from "@/types/authorization";
import AnalyticsAndVideoCard from "@/components/candidate/profile/body/analytics-and-video/analytics-and-video-card";
interface ProfileRightProps {
  data: any;
  refetch: () => void;
  Interface: string;
}

const ProfileRightAdmin = ({ data, refetch, Interface }: ProfileRightProps) => {
  // console.log("profile right data", data);
  return (
    <div className="flex flex-col gap-2">
      <AnalyticsAndVideoCard
        candidateScore={data?.candidateScore}
        trustScore={data?.trustScore}
        resumeVideo={data?.resumeVideo}
        refetch={refetch}
        Interface={Interface}
      />
      {/* hired */}
      {data?.hired && Interface !== ROLES.ADMIN && (
        <div className={`${data?.hired && "mt-1"}`}>
          <HiredCard />
        </div>
      )}
      {/* skills */}
      <div className={`${!data?.hired && "md:mt-1"}`}>
        <SkillCard
          skills={data?.skills}
          pendingSkills={data?.skillsPending}
          pending={true}
          Interface={Interface}
        />
      </div>
      {/* job preferences */}
      <JobPreferenceCard
        jobPreference={data?.jobPreferences}
        Interface={Interface}
      />
      {/* availability */}
      {!data?.hired && (
        <AvailabilityCard
          availabilityDetails={data?.availability}
          Interface={Interface}
        />
      )}
      {/* work history */}
      <WorkHistoryCard
        employmentDetails={data?.employmentDetails}
        Interface={Interface}
      />
      {/* educational qualification */}
      <EducationCard
        educationDetails={data?.educationDetails}
        Interface={Interface}
      />
      {/* languages know */}
      <LanguageCard languages={data?.languages} Interface={Interface} />
      {/* personal details */}
      <PersonalDetailsCard
        personalDetails={data?.personalDetails}
        Interface={Interface}
      />
    </div>
  );
};

export default ProfileRightAdmin;
