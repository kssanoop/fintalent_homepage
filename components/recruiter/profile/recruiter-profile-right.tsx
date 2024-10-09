import { RecruiterProfile } from "@/features/profile/recruiter/type/recruiter-profile";
import RecruiterProfileInformationCard from "./recruiter-profile-information-card";
import RecruiterProfileInfo from "./recruiter-profile-info";
import _ from "lodash";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const RecruiterProfileRight = ({
  recruiter,
}: {
  recruiter: RecruiterProfile;
}) => {
  console.log(recruiter.linkedIn);
  return (
    <div className="flex flex-col gap-3">
      <RecruiterProfileInformationCard>
        <RecruiterProfileInformationCard.Heading>
          Personal Information{" "}
        </RecruiterProfileInformationCard.Heading>
        <div className="grid gap-8 md:grid-cols-2">
          <RecruiterProfileInfo>
            <RecruiterProfileInfo.Label>Phone</RecruiterProfileInfo.Label>
            <RecruiterProfileInfo.Value>
              {recruiter.phoneNo}
            </RecruiterProfileInfo.Value>
          </RecruiterProfileInfo>

          <RecruiterProfileInfo>
            <RecruiterProfileInfo.Label>Email ID</RecruiterProfileInfo.Label>
            <RecruiterProfileInfo.Value>
              {recruiter.email}
            </RecruiterProfileInfo.Value>
          </RecruiterProfileInfo>

          <RecruiterProfileInfo>
            <RecruiterProfileInfo.Label>Designation</RecruiterProfileInfo.Label>
            <RecruiterProfileInfo.Value>
              {recruiter.designation}
            </RecruiterProfileInfo.Value>
          </RecruiterProfileInfo>

          <RecruiterProfileInfo>
            <RecruiterProfileInfo.Label>
              Linkedin URL
            </RecruiterProfileInfo.Label>
            <RecruiterProfileInfo.Value isLink href={recruiter.linkedIn}>
              Linkedin link
            </RecruiterProfileInfo.Value>
          </RecruiterProfileInfo>
        </div>
      </RecruiterProfileInformationCard>

      <RecruiterProfileInformationCard>
        <RecruiterProfileInformationCard.Heading>
          Company Information{" "}
        </RecruiterProfileInformationCard.Heading>
        <div className="grid gap-8 md:grid-cols-2">
          {/* <RecruiterProfileInfo>
            <RecruiterProfileInfo.Label>
              Company Contact number{" "}
            </RecruiterProfileInfo.Label>
            <RecruiterProfileInfo.Value>
              {recruiter.companyId.companyPhoneNo}{" "}
            </RecruiterProfileInfo.Value>
          </RecruiterProfileInfo> */}

          <RecruiterProfileInfo>
            <RecruiterProfileInfo.Label>Location </RecruiterProfileInfo.Label>
            <RecruiterProfileInfo.Value>
              {_.upperFirst(recruiter.companyId.locations.join(","))}{" "}
            </RecruiterProfileInfo.Value>
          </RecruiterProfileInfo>

          <RecruiterProfileInfo>
            <RecruiterProfileInfo.Label>
              Linkedin URL
            </RecruiterProfileInfo.Label>
            <RecruiterProfileInfo.Value
              isLink
              href={recruiter.companyId.companyLinkedIn}
            >
              Linkedin link
            </RecruiterProfileInfo.Value>
          </RecruiterProfileInfo>

          <RecruiterProfileInfo>
            <RecruiterProfileInfo.Label>Website </RecruiterProfileInfo.Label>
            <RecruiterProfileInfo.Value
              isLink
              href={recruiter.companyId.companyWebsite}
            >
              websitelink{" "}
            </RecruiterProfileInfo.Value>
          </RecruiterProfileInfo>

          <RecruiterProfileInfo>
            <RecruiterProfileInfo.Label>
              Company code{" "}
            </RecruiterProfileInfo.Label>
            <RecruiterProfileInfo.Value className="flex gap-2">
              <p>{recruiter.companyId.companyNo}</p>
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
              />{" "}
            </RecruiterProfileInfo.Value>
          </RecruiterProfileInfo>
        </div>
      </RecruiterProfileInformationCard>
    </div>
  );
};

export default RecruiterProfileRight;
