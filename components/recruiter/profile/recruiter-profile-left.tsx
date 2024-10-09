import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/router";
import { RecruiterProfile } from "@/features/profile/recruiter/type/recruiter-profile";
import RecruiterProfileDialog from "./recruiter-profile-dialog";
import { useState } from "react";

const RecruiterProfileLeft = ({
  recruiter,
}: {
  recruiter: RecruiterProfile;
}) => {
  const router = useRouter();
  const [editDialoOpen, setEditDialogOpen] = useState(false);
  return (
    <div className="h-full md:w-[24%] md:min-w-[340px]">
      <Card className="flex h-full flex-col gap-9 p-8">
        <div className="relative flex flex-col items-center gap-3">
          <Avatar className="h-[156px] w-[156px] rounded-full">
            <AvatarImage
              className="rounded-full"
              src={`  ${process.env.NEXT_PUBLIC_IMG_URL}${recruiter?.profilePhoto.storageName}
                `}
            />
            <AvatarFallback>{recruiter?.fullName}</AvatarFallback>
          </Avatar>
          <div>
            <p className="mb-1 text-2xl font-extrabold text-brand-black">
              {recruiter?.fullName}
            </p>
            <p className="text-center font-normal text-brand-grey">
              {recruiter?.designation}
            </p>
          </div>
          <div className=" absolute right-0 top-0">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className=" cursor-pointer "
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
                        setEditDialogOpen(true);
                      }}
                    >
                      Edit profile
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => {
                        router.push(`/recruiter/change-password`);
                      }}
                    >
                      Change password
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-brand-black">
          <div className="space-y-3">
            <p className="text-brand-grey ">
              Working at{" "}
              <span className="font-bold">
                {recruiter?.companyId.companyName}
              </span>
            </p>
            <Avatar className="h-[42px] w-[42px] rounded-[8px] shadow">
              <AvatarImage
                src={`  ${process.env.NEXT_PUBLIC_IMG_URL}${recruiter?.companyId.companyLogo.storageName}
                `}
              />
              <AvatarFallback>{recruiter?.fullName}</AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-3">
            <p className="text-brand-grey ">Copy company code</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-medium">
                {recruiter?.companyId.companyNo}
              </p>
              <Copy
                size={18}
                color="#3790E3"
                className="cursor-pointer"
                onClick={() => {
                  if (recruiter?.companyId?.companyNo) {
                    navigator.clipboard.writeText(
                      recruiter?.companyId?.companyNo,
                    );
                    toast.success("Company Code Copied Successfully");
                  }
                }}
              />
            </div>
          </div>
        </div>
      </Card>
      <RecruiterProfileDialog
        recruiter={recruiter}
        open={editDialoOpen}
        setOpen={setEditDialogOpen}
      />
    </div>
  );
};

export default RecruiterProfileLeft;
