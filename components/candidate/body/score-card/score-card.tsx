import { cn } from "@/utils/cnHelper";
import { HTMLProps } from "react";

interface ScoreCardProps {
  heading: string;
  score: number;
  className?: HTMLProps<HTMLElement>["className"];
  headingClassName?: HTMLProps<HTMLElement>["className"];
  scoreClassName?: HTMLProps<HTMLElement>["className"];
}

const ABOVE_AVG_SCORE = 50;

const ScoreCard = ({
  heading,
  score,
  className,
  headingClassName,
  scoreClassName,
}: ScoreCardProps) => {
  const textColor =
    score < ABOVE_AVG_SCORE
      ? "#E72F2F"
      : score === ABOVE_AVG_SCORE
      ? "#F1B237"
      : "#00BA70";
  return (
    <div
      className={cn(
        "flex w-full flex-col gap-2  border border-background p-3 text-[#171717]",
        className,
      )}
    >
      <h5 className={cn("whitespace-nowrap font-bold", headingClassName)}>
        {heading}
      </h5>
      <p
        style={{ color: textColor }}
        className={cn("font-extrabold", scoreClassName)}
      >
        {score}%
      </p>
    </div>
  );
};

export default ScoreCard;
