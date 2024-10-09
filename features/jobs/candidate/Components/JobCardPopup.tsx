import React from "react";
import { DialogFooter } from "@/components/ui/dialog";
import JobCardBody from "./JobCardBody";
import JobCardFooter from "./JobCardFooter";
import Link from "next/link";
import LinkedinIcon from "@/public/svg/LinkedinIcon";
import { Globe } from "lucide-react";
import { modifyLink } from "@/components/modify-links/modify-links";

interface Props {
  section?: string;
  selectedTab?: string;
  data?: any;
}
const JobCardPopup = ({ selectedTab, section, data }: Props) => {
  console.log(data);
  console.log(selectedTab);
  return (
    <div className="flex max-h-[80vh] flex-col gap-4 overflow-auto p-6">
      <JobCardBody popup={true} data={data} />
      <div className="mt-3 space-y-2">
        <h6 className="text-xs font-bold text-brand-grey">COMPANY DETAILS</h6>
        <div className="flex items-center gap-2">
          <Link
            href={modifyLink(data?.companyId.companyLinkedIn)}
            target="_blank"
          >
            <LinkedinIcon color="#034A9A" />
          </Link>
          <Link
            href={modifyLink(data?.companyId.companyWebsite)}
            target="_blank"
          >
            <Globe color="#034A9A" size={24} />
          </Link>
        </div>
      </div>

      <DialogFooter>
        {section === "JobsTabs" &&
        selectedTab !== "Accepted" &&
        selectedTab !== "Interview" &&
        selectedTab !== "Hired" &&
        selectedTab !== "Rejected" ? (
          <JobCardFooter
            section="JobsTabs"
            selectedTab={selectedTab}
            data={data}
          />
        ) : (
          section !== "JobsTabs" && <JobCardFooter data={data} />
        )}
      </DialogFooter>
    </div>
  );
};

export default JobCardPopup;
