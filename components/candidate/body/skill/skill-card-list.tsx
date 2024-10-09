import SkillCard from "./skill-card";

interface SkillCardListProps {
  skillList: Array<{
    name: string;
    level: number | string;
  }>;
  totalRating: number;
  pending?: boolean;
  className?: string;
}

// Note: this component is styled referencing the candidate dashboard design
const SkillCardList = ({
  skillList,
  totalRating,
  pending,
  className,
}: SkillCardListProps) => {
  return (
    <>
      {skillList?.map(({ name, level }) => (
        <SkillCard
          key={crypto.randomUUID()}
          name={name}
          rating={level}
          totalRating={totalRating}
          pending={pending}
          className={className}
        />
      ))}
    </>
  );
};

export default SkillCardList;
