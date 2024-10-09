import { cn } from "@/utils/cnHelper";

const ABOVE_AVG_RATING = 6;

interface SkillCardProps {
  name: string;
  rating: number | string;
  totalRating: number;
  pending?: boolean;
  className?: string;
}

const SkillCard = ({
  name,
  rating,
  totalRating,
  pending,
  className,
  ...props
}: SkillCardProps) => {
  const style = {
    ratingColor:
      Number(rating) < ABOVE_AVG_RATING && !pending
        ? "#F1B237"
        : pending
          ? "#A9A9A9"
          : "#00BA70",
    ratingBg:
      Number(rating) < ABOVE_AVG_RATING && !pending
        ? "#F5EEE0"
        : pending
          ? "#E4FFF4"
          : "#E4FFF4",
  };

  return (
    <div
      className={cn(
        "flex items-center  rounded-3xl border border-[#E3E3E3]",
        className,
      )}
    >
      <p className="grow border-r p-2 font-semibold">{name}</p>
      <div
        style={{ color: style.ratingColor, backgroundColor: style.ratingBg }}
        className="rounded-r-3xl p-2  font-extrabold"
      >
        {rating}/{totalRating}
      </div>
    </div>
  );
};

export default SkillCard;
