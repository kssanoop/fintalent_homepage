import AvatarProfileFallback from "../avatar-profile-fallback";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const CandidateProfileImage = ({ src }: { src: string }) => {
  return (
    <Avatar className="h-[82px] w-[82px] rounded-full">
      <AvatarImage width={82} height={82} className="rounded-full" src={src} />
      <AvatarFallback>
        <AvatarProfileFallback />
      </AvatarFallback>
    </Avatar>
  );
};

export default CandidateProfileImage;
