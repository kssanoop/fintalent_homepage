import ContactList from "@/components/candidate/profile/body/contact/contact-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Verified from "@/components/verified";
import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import { Contact } from "@/components/candidate/profile/body/profile-left";
import { Linkedin, Mail, Phone } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import InviteMultipleCanidatesContainer from "../candidates/all-candidates-tab/invite-multiple-candidates-container";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetInfoFromCookie } from "@/utils/hooks/useGetInfoFromCookie";

const InviteToJobSheet = ({
  candidateId,
  isSheetOpen,
  setIsSheetOpen,
}: {
  candidateId: string;
  isSheetOpen: boolean;
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        setIsSheetOpen((prev) => !prev);
      }}
    >
      <SheetContent
        className="md:min-w-3/4 flex h-screen w-full flex-col bg-white p-0 md:min-w-[850px]"
        side="right"
      >
        <div className="px-7 py-6">
          <h3 className="mb-2 text-xl font-bold text-brand-black">
            Invite to job{" "}
          </h3>
          <p className="text-[#5E5E5E]">
            Select the job role to which you want to invite this candidate{" "}
          </p>
        </div>
        <div className="flex grow flex-col overflow-y-auto px-7 pb-4">
          <InviteMultipleCanidatesContainer
            isCandidatePage={false}
            setIsSheetOpen={setIsSheetOpen}
            candidateId={candidateId}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const CandidateProfileLeft = ({ data }: { data: CandidateSchema }) => {
  const { role } = useGetInfoFromCookie();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

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
      value: data?.linkedInProfile,
      icon: <Linkedin size={16} color="#012A59" />,
    },
  ];

  const imageLinks =
    process.env.NEXT_PUBLIC_IMG_URL + data.profilePhoto?.storageName;
  return (
    <>
      <Card className="flex h-[calc(100%-20px)] flex-col gap-4 overflow-auto p-5">
        <CardHeader className="relative flex-col items-center gap-2 p-0">
          <Avatar className="h-[82px] w-[82px] rounded-full">
            <AvatarImage
              width={82}
              height={82}
              className="rounded-full"
              src={`${imageLinks}`}
            />
            <AvatarFallback>{data?.fullName}</AvatarFallback>
          </Avatar>

          <div className="break-all text-center">
            {/* name */}
            <div className="flex items-center justify-center gap-1">
              <h3 className="mb-1 text-xl font-extrabold capitalize ">
                {data.fullName}
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
                <p> Exp - {data.totalExperience?.year} yrs</p>
              </div>
            </div>
          </div>

          {!data.jobApplicationStatus && (
            <Button
              onClick={() => {
                setIsSheetOpen(true);
              }}
              variant="gradient"
              className=" w-full rounded-lg border-border bg-white text-sm font-bold shadow-submit-btn"
            >
              Invite to job
            </Button>
          )}
        </CardHeader>
        <CardContent className="flex flex-col gap-4 overflow-auto p-0">
          <div className="flex flex-col gap-[13.5px] border-y border-border py-4 pr-5">
            <ContactList
              contactList={contactList}
              isBlur={!data?.recuiterView && role === "recruiter"}
            />
          </div>
          <ScrollArea className="overflow-auto">
            <h3 className="mb-2 text-sm font-normal text-[#5E5E5E]">About</h3>
            <div className={`hide-scrollbar `}>
              <p className="text-base font-normal text-black">
                {data?.summary}
              </p>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <InviteToJobSheet
        candidateId={data.candidateId}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
      />
    </>
  );
};

export default CandidateProfileLeft;
