import { Card } from "@/components/ui/card";
import { ChildrenProp } from "@/types/common-types";
import { cn } from "@/utils/cnHelper";

export const RecruiterProfileInformationCard = ({
  children,
  className,
}: ChildrenProp & {
  className?: string;
}) => {
  return (
    <Card className={cn("flex flex-col gap-8 px-5 py-6", className)}>
      {children}
    </Card>
  );
};

const Heading = ({ children }: ChildrenProp) => {
  return <p className="font-extrabold text-brand-black">{children}</p>;
};

RecruiterProfileInformationCard.Heading = Heading;

export default RecruiterProfileInformationCard;
