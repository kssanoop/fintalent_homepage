import { Card } from "@/components/ui/card";
import { ChildrenProp } from "@/types/common-types";
import { ChevronRight } from "lucide-react";

type SkillsAndQualificationsCardProps = ChildrenProp & {
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
};

const SkillsAndQualificationsCard = ({
  children,
  onClick,
}: SkillsAndQualificationsCardProps) => {
  return (
    <Card
      onClick={onClick}
      className="w-full cursor-pointer space-y-1 p-4 transition-all hover:shadow"
    >
      {children}
    </Card>
  );
};

const Heading = ({ children }: ChildrenProp) => {
  return (
    <div className="flex items-center justify-between text-brand-black">
      <h3 className="font-bold">{children}</h3>
      <ChevronRight size={14} />
    </div>
  );
};

SkillsAndQualificationsCard.Heading = Heading;

const Description = ({ children }: ChildrenProp) => {
  return <p className="text-sm font-medium text-brand-grey">{children}</p>;
};

SkillsAndQualificationsCard.Description = Description;

export default SkillsAndQualificationsCard;
