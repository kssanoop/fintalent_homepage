import { Card, CardHeader } from "@/components/ui/card";
import VerifyToggler from "@/components/Admin/candidates/verify-toggler";
import AccountStatusToggler from "@/components/Admin/candidates/account-status-toggler";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import CandidateProfileImage from "@/components/candidate-profile/candidate-profile-image";
import CandidateProfileIntroduction from "@/components/candidate-profile/candidate-profile-introduction";
import CandidateHiredAt from "@/components/candidate-profile/candidate-hired-at";
import CandidateProfileAssignedTo from "@/components/candidate-profile/candidate-profile-assigned-to";
import ContactAndAbout from "@/components/candidate-profile/candidate-profile-contact-and-about";

interface ProfileLeftProps {
  data: CandidateSchema & {
    teamLead: string;
  };
  Interface?: string;
  handleAccept?: () => void;
  handleReject?: () => void;
  showToggleSwitch?: boolean;
  isLoading?: boolean;
}

const CandidateProfileLeft = ({
  data,
  Interface,
  handleAccept,
  handleReject,
  showToggleSwitch,
  isLoading,
}: ProfileLeftProps) => {
  return (
    <>
      <Card className="flex h-full flex-col gap-4 overflow-auto p-5">
        <CardHeader className="relative flex-col items-center gap-2 p-0">
          <CandidateProfileImage
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${data?.profilePhoto?.storageName}`}
          />

          <CandidateProfileIntroduction
            fullName={data.fullName}
            isProfileVerified={data.profileVerified}
            jobTitle={data.jobTitle}
            currentOrganization={data.currentOrganization}
            totalExperience={data.totalExperience}
          />

          <div className="flex w-full flex-col gap-3">
            {data?.profileVerified !== undefined && (
              <VerifyToggler verificationStatus={data.profileVerified} />
            )}
            {data?.docStatus && (
              <AccountStatusToggler accountStatus={data?.docStatus} />
            )}
            {data?.hired && (
              <CandidateHiredAt
                companyName={data.hiredCompany.companyName}
                companyLogoSrc={`${process.env.NEXT_PUBLIC_IMG_URL}${data.hiredCompany.companyLogo.storageName}`}
              />
            )}
            {data.teamLead && (
              <CandidateProfileAssignedTo assignedToName={data.teamLead} />
            )}
          </div>
        </CardHeader>
        <ScrollArea className="grow  overflow-auto p-0">
          <ContactAndAbout data={data} />
        </ScrollArea>
      </Card>
    </>
  );
};

export default CandidateProfileLeft;
