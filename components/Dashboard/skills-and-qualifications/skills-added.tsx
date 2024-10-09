import { useGetSkills } from "@/features/skills/api/get-skills";
import SkillsList from "./skills-list";

const SkillsAdded = () => {
  const { data: skills, isLoading } = useGetSkills();
  return (
    <div className="hide-scrollbar h-[238px] space-y-3 overflow-auto text-brand-black">
      <h6 className="text-brand-grey">Added skills</h6>
      {isLoading || !skills ? (
        <SkillsList.Skeleton />
      ) : (
        <SkillsList list={skills} />
      )}
    </div>
  );
};

export default SkillsAdded;
