import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import clsx from "clsx";
import { User } from "lucide-react";

export interface CandidateCardAvatarProps {
  src: string;
  fallback?: string;
  className?: string;
}
const CandidateCardAvatar = ({
  src,
  fallback,
  className,
}: CandidateCardAvatarProps) => {
  return (
    <Avatar
      className={clsx(
        "mb-1.5 h-[118px] w-[118px] rounded-lg shadow-sm",
        className,
      )}
    >
      <AvatarImage src={src} />
      <AvatarFallback className="rounded-lg">
        {fallback || <User className="h-4 w-4" />}
      </AvatarFallback>
    </Avatar>
  );
};

export default CandidateCardAvatar;
