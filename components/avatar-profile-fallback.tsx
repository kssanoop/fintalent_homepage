import { User } from "lucide-react";
import { AvatarFallback } from "./ui/avatar";

const AvatarProfileFallback = ({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) => {
  return (
    <AvatarFallback className={className}>
      <span className="sr-only">{name || "name"}</span>
      <User className="h-4 w-4" />
    </AvatarFallback>
  );
};

export default AvatarProfileFallback;
