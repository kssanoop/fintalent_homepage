import Verified from "@/components/verified";
import CandidateCardHeading from "./candidate-card-heading";
import CandidateCardDesignation from "./candidate-card-designation";
import CandidateCardExperience from "./candidate-card-experience";
import CandidateCardContact from "./candidate-card-contact";
import { contactList } from "../../recruiter/job/job-right/invited-candidate";
import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import { useGetInfoFromCookie } from "@/utils/hooks/useGetInfoFromCookie";

// TODO: remove undefined later from the props and the optional changing
const CandidateCardInfo = ({
  candidate,
}: {
  candidate?: CandidateSchema | undefined;
}) => {
  const { role } = useGetInfoFromCookie();
  const candidateContactList = contactList.map((contact) => {
    if (contact.label === "phoneNo")
      return { ...contact, value: candidate?.phoneNo || "" };
    if (contact.label === "Email")
      return { ...contact, value: candidate?.email || "" };
    if (contact.label === "Linkedin")
      return { ...contact, value: candidate?.linkedInProfile || "" };
    return contact;
  });
  console.log(":check:", candidate);
  return (
    <>
      <div className="flex items-center gap-1">
        <CandidateCardHeading>{candidate?.fullName}</CandidateCardHeading>
        <Verified isVerified={candidate?.profileVerified || false} />
      </div>
      <CandidateCardDesignation>{candidate?.jobTitle}</CandidateCardDesignation>
      <CandidateCardExperience>
        {candidate?.currentOrganization && (
          <>
            <p>{candidate?.currentOrganization}</p>
            <span>&nbsp;.&nbsp;</span>
          </>
        )}
        <div className="flex gap-1">
          <p>
            Exp - {candidate?.totalExperience.year} yrs{" "}
            {candidate?.totalExperience.month} months
          </p>
        </div>
      </CandidateCardExperience>
      <div
        className={`md:flex-no-wrap flex  flex-wrap items-center gap-[10.5px] py-1  ${
          candidate?.recuiterView !== undefined &&
          !candidate?.recuiterView &&
          role === "recruiter" &&
          "pointer-events-none blur-[2px]"
        }`}
      >
        {candidateContactList.map((contact) => (
          <CandidateCardContact key={crypto.randomUUID()} {...contact} />
        ))}
      </div>
    </>
  );
};

export default CandidateCardInfo;
