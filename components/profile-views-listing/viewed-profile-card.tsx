import { ChildrenProp } from "@/types/common-types";
import { Avatar, AvatarImage } from "../ui/avatar";
import AvatarProfileFallback from "../avatar-profile-fallback";
import Verified from "../verified";

const ViewedProfileCard = ({ children }: ChildrenProp) => {
  return <div className="flex items-center gap-1.5">{children}</div>;
};

const ProfileAvatarImg = ({ src }: { src: string }) => {
  return (
    <Avatar className="h-[50px] w-[50px] rounded-full">
      <AvatarImage src={src} />
      <AvatarProfileFallback className="rounded-full" />
    </Avatar>
  );
};

ViewedProfileCard.Image = ProfileAvatarImg;

const Name = ({
  children,
  isVerified,
}: ChildrenProp & { isVerified: boolean }) => {
  return (
    <div className="flex items-center gap-1">
      <p className="font-bold text-brand-black">{children}</p>
      <Verified isVerified={isVerified} />
    </div>
  );
};

ViewedProfileCard.Name = Name;

const Designation = ({ children }: ChildrenProp) => {
  return <p className="text-xs font-medium text-brand-black">{children}</p>;
};

ViewedProfileCard.Designation = Designation;

export default ViewedProfileCard;
