import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Verified from "@/components/verified";
import {
  Linkedin,
  Mail,
  Phone,
  Pencil as EditIcon,
  Check,
  Loader2,
  X,
} from "lucide-react";
import ContactList from "./contact/contact-list";
import { ReactElement, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserDetailsDialog from "@/features/ProfileEdit/UserDetails/Components/UserDetailsDialog";
import { personalDetails } from "@/features/ProfileEdit/UserDetails/Schema/profile-schema";
import { useRouter } from "next/router";
import { ROLES } from "@/types/authorization";
import TLNotAssigned from "@/components/Admin/candidates/TL-card/TL-not-assigned";
import VerifyToggler from "@/components/Admin/candidates/verify-toggler";
import AccountStatusToggler from "@/components/Admin/candidates/account-status-toggler";
import { CardIcon, CardIconImage } from "@/components/ui/cardslogo";
import { usePathname } from "next/navigation";
import InviteMultipleCandidatesSheet from "@/components/recruiter/candidates/all-candidates-tab/invite-multiple-candidates-sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePendingCandidatesAction } from "@/features/admin/candidate/api/approve-reject-pending-candidates";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import AvatarProfileFallback from "@/components/avatar-profile-fallback";
import AvatarCompanyFallback from "@/components/avatar-company-fallback";
export interface Contact {
  label: "Phone" | "Email" | "Linkedin";
  value: string;
  icon: ReactElement;
}

const ABOUT_INFO = {
  heading: "About",
};

interface ProfileLeftProps {
  data: personalDetails & {
    hiredCompany?: any;
  };
  Interface?: string;
  showToggleSwitch?: boolean;
  isLoading?: boolean;
}

const ROLES_ALLOWED_TO_EDIT = ["admin", "manager", "teamlead"];

const ProfileLeft = ({
  data,
  Interface,
  showToggleSwitch,
  isLoading,
}: ProfileLeftProps) => {
  const [showhandleProfileDialoge, sethandleProfileDialoge] = useState(false);
  const [clickedButton, setClickedButton] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();
  const { source, candidateId } = router.query;
  const contactList: Contact[] = [
    {
      label: "Phone",
      value: data?.phoneNo,
      icon: <Phone size={16} color="#012A59" />,
    },
    {
      label: "Email",
      value: data?.email,
      icon: <Mail size={16} color="#012A59" />,
    },
    {
      label: "Linkedin",
      value: data?.linkedInProfile ?? "",
      icon: <Linkedin size={16} color="#012A59" />,
    },
  ];
  const imageLinks =
    process.env.NEXT_PUBLIC_IMG_URL + data?.profilePhoto?.storageName;

  const pathName = usePathname();

  const handleSuccess = (data: any) => {
    queryClient.invalidateQueries(["get-candidate-by-id"]);
    toast.success(data?.message);
  };

  const handleError = (err: any) => {
    toast.error(err?.response?.data?.message);
  };

  const {
    mutate: actionCandidate,
    isLoading: isActionLoading,
    isError: isActionError,
  } = usePendingCandidatesAction(handleSuccess, handleError);

  // accept pending request
  function handleAccept(id: string): void {
    actionCandidate({ candidateId: id, action: "approve" });
  }

  // reject pending request
  function handleReject(id: string): void {
    // console.log("selected Id", id);
    actionCandidate({ candidateId: id, action: "reject" });
  }
  return (
    <>
      <Card className="flex h-full flex-col gap-4 p-5">
        <CardHeader className="relative flex-col items-center gap-1 space-y-0 p-0">
          <Avatar className="h-[120px] w-[120px] rounded-full">
            <AvatarImage
              width={120}
              height={120}
              className="rounded-full"
              src={`${imageLinks}`}
            />
            <AvatarProfileFallback />
          </Avatar>

          {/* admin design logic */}
          {Interface === ROLES.CANDIDATE && (
            <div className=" absolute right-0 top-0">
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="hidden cursor-pointer md:block"
                    >
                      <path
                        d="M19.4997 12C19.4997 11.77 19.4897 11.55 19.4697 11.32L21.3297 9.91C21.7297 9.61 21.8397 9.05 21.5897 8.61L19.7197 5.38C19.5998 5.16818 19.4058 5.00814 19.1751 4.93062C18.9444 4.8531 18.6931 4.86356 18.4697 4.96L16.3197 5.87C15.9497 5.61 15.5597 5.38 15.1497 5.19L14.8597 2.88C14.7997 2.38 14.3697 2 13.8697 2H10.1397C9.62967 2 9.19967 2.38 9.13967 2.88L8.84967 5.19C8.43967 5.38 8.04966 5.61 7.67967 5.87L5.52967 4.96C5.06967 4.76 4.52967 4.94 4.27967 5.38L2.40967 8.62C2.15967 9.06 2.26967 9.61 2.66967 9.92L4.52967 11.33C4.48821 11.779 4.48821 12.231 4.52967 12.68L2.66967 14.09C2.26967 14.39 2.15967 14.95 2.40967 15.39L4.27967 18.62C4.52967 19.06 5.06967 19.24 5.52967 19.04L7.67967 18.13C8.04966 18.39 8.43967 18.62 8.84967 18.81L9.13967 21.12C9.19967 21.62 9.62967 22 10.1297 22H13.8597C14.3597 22 14.7897 21.62 14.8497 21.12L15.1397 18.81C15.5497 18.62 15.9397 18.39 16.3097 18.13L18.4597 19.04C18.9197 19.24 19.4597 19.06 19.7097 18.62L21.5797 15.39C21.8297 14.95 21.7197 14.4 21.3197 14.09L19.4597 12.68C19.4897 12.45 19.4997 12.23 19.4997 12ZM12.0397 15.5C10.1097 15.5 8.53967 13.93 8.53967 12C8.53967 10.07 10.1097 8.5 12.0397 8.5C13.9697 8.5 15.5397 10.07 15.5397 12C15.5397 13.93 13.9697 15.5 12.0397 15.5Z"
                        fill="#A9A9A9"
                      />
                    </svg>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="rounded-[5px] p-1 md:ml-[180px] md:w-52">
                    <DropdownMenuGroup className="text-base font-medium text-[#171717]">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                          sethandleProfileDialoge(true);
                        }}
                      >
                        Edit profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                          router.push(`/candidate/change-password`);
                        }}
                      >
                        Change password
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <EditIcon
                fill="#A9A9A9"
                color="white"
                size={16}
                className="block cursor-pointer md:hidden"
                onClick={() => {
                  sethandleProfileDialoge(true);
                }}
              />
            </div>
          )}
          <div className="break-all text-center">
            {/* name */}
            <div className="flex items-center justify-center gap-1">
              <h3 className="mb-1 text-xl font-extrabold capitalize ">
                {data?.fullName}
              </h3>
              <Verified
                isVerified={
                  data?.profileVerified ? data?.profileVerified : false
                }
              />
            </div>
            {/* description */}
            <div className="flex flex-col gap-1 text-sm font-medium">
              <p className="text-[#171717]">
                {data?.jobTitle?.replace(/^\w/, (c: any) => c.toUpperCase())}
              </p>
              <div className="text-[#5E5E5E]">
                <p className="line-clamp-1">
                  Currently at{" "}
                  {data?.currentOrganization?.replace(/^\w/, (c: any) =>
                    c.toUpperCase(),
                  )}{" "}
                </p>
                <p>
                  Exp - {data?.totalExperience?.year} yr
                  {data?.totalExperience?.year !== "1" && "s"}{" "}
                  {data?.totalExperience?.month} month
                  {data?.totalExperience?.month !== "1" && "s"}
                </p>
              </div>
            </div>
          </div>
          {Interface &&
            ROLES_ALLOWED_TO_EDIT.includes(Interface) &&
            source === "pending" &&
            data?.accountVerifiedStatus === "pendingVerification" && (
              <div className="flex items-center justify-center gap-4 py-3">
                {isActionLoading &&
                !isActionError &&
                clickedButton === "accept" ? (
                  <Button
                    variant={"success"}
                    className="flex items-center gap-2.5 bg-[#5ED678] text-sm font-bold"
                    disabled
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Approving..
                  </Button>
                ) : (
                  <Button
                    variant={"success"}
                    className="flex items-center gap-2.5 bg-[#5ED678] text-sm font-bold"
                    onClick={() => {
                      setClickedButton("accept");
                      handleAccept(candidateId?.toLocaleString() ?? "");
                    }}
                  >
                    <div>Approve</div>
                    <Check color="#FFF" width={18} height={18} />
                  </Button>
                )}

                {isActionLoading &&
                !isActionError &&
                clickedButton === "reject" ? (
                  <Button
                    variant={"secondary"}
                    className="flex items-center gap-2.5 bg-[#ED6464] text-sm font-bold"
                    disabled
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Rejecting..
                  </Button>
                ) : (
                  <Button
                    variant={"secondary"}
                    className="flex items-center gap-2.5 bg-[#ED6464] text-sm font-bold"
                    onClick={() => {
                      setClickedButton("reject");
                      handleReject(candidateId?.toLocaleString() ?? "");
                    }}
                  >
                    <div>Reject</div>
                    <X color="#FFF" width={18} height={18} />
                  </Button>
                )}
              </div>
            )}
          {Interface &&
            ROLES_ALLOWED_TO_EDIT.includes(Interface) &&
            data?.accountVerifiedStatus === "verified" && (
              <div className="flex w-full flex-col gap-3">
                {/* Verify Toggler  */}
                {data?.profileVerified !== undefined && (
                  <VerifyToggler verificationStatus={data.profileVerified} />
                )}
                {/* account-status */}
                {data?.docStatus && (
                  <AccountStatusToggler accountStatus={data?.docStatus} />
                )}
                {/* hired */}
                {source === "reopen" && (
                  <div
                    className="flex items-center justify-center gap-1.5 
                rounded-[12px] border border-solid border-[#EFEFEF] bg-[#F7F7F7] p-3"
                  >
                    <p className="text-sm font-medium leading-6 text-[#5E5E5E]">
                      Hired at {data.hiredCompany.companyName}
                    </p>
                    <CardIcon className="h-[43px] w-[43px] rounded-none">
                      <CardIconImage
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}${data.hiredCompany.companyLogo.storageName}`}
                      />
                      <AvatarCompanyFallback />
                    </CardIcon>
                  </div>
                )}
                {/* TL assign  */}
                {(Interface === "admin" || Interface === "manager") && (
                  <TLNotAssigned
                    candidateId={candidateId?.toLocaleString() ?? ""}
                    defaultTeamLead={
                      data?.teamLead?._id || (data?.teamLead as any)
                    }
                  />
                )}
              </div>
            )}
          {pathName?.includes("/recruiter/urgent-requirements") && (
            <div className="flex">
              <InviteMultipleCandidatesSheet
                // searchQuery=
                candidateId={candidateId?.toLocaleString() ?? ""}
                isCandidatePage={true}
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="flex grow flex-col gap-4 overflow-auto p-0">
          <div className="flex flex-col gap-[13.5px] border-y border-border py-4 pr-5">
            <ContactList contactList={contactList} />
          </div>
          <ScrollArea className="overflow-auto">
            <h3 className="mb-2 text-sm font-normal text-[#5E5E5E]">
              {ABOUT_INFO.heading}
            </h3>
            <div
              className={`hide-scrollbar
         
              `}
            >
              <p className="text-base font-normal text-black">
                {data?.summary}
              </p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <UserDetailsDialog
        open={showhandleProfileDialoge}
        setOpen={sethandleProfileDialoge}
        data={data}
        imageLinks={imageLinks}
      />
    </>
  );
};

export default ProfileLeft;
