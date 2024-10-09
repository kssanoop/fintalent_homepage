import { HTMLProps } from "react";
import ScoreCard from "./score-card";

interface ScoreCardListProps {
  scoreList: Array<{
    name: "candidateScore" | "trustScore";
    heading: string;
    score: number;
  }>;
  scoreCardClassName?: HTMLProps<HTMLElement>["className"];
  scoreCardHeadingClassName?: HTMLProps<HTMLElement>["className"];
  scoreCardScoreClassName?: HTMLProps<HTMLElement>["className"];
}

const ScoreCardList = ({
  scoreList,
  scoreCardClassName,
  scoreCardHeadingClassName,
  scoreCardScoreClassName,
}: ScoreCardListProps) => {
  return (
    <>
      {scoreList.map(({ heading, score }) => (
        <ScoreCard
          key={crypto.randomUUID()}
          heading={heading}
          score={score}
          className={scoreCardClassName}
          headingClassName={scoreCardHeadingClassName}
          scoreClassName={scoreCardScoreClassName}
        />
      ))}
    </>
  );
};

export default ScoreCardList;
