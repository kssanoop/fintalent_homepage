import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
import ProfileRightAdmin from "../profile-left-admin/profile-right-admin";
import { ROLES } from "@/types/authorization";
import JobsAssignedCandidate from "../jobs-assigned/jobs-assigned-candidate";
import { personalDetails } from "@/features/ProfileEdit/UserDetails/Schema/profile-schema";
import { useState } from "react";
interface CandidatesProfileTabsAdmiprops {
  data: personalDetails;
}

const CandidatesProfileTabsAdmin = ({
  data,
}: CandidatesProfileTabsAdmiprops) => {
  console.log("profile data:", data);
  const [defaultTab, setSelectedTab] = useState("candidate-details");
  const TABS = [
    {
      label: `Candidate details`,
      slug: "candidate-details",
      content: (
        <ProfileRightAdmin
          Interface={ROLES.ADMIN}
          refetch={() => {}}
          data={data}
        />
      ),
    },
    {
      label: `Jobs Assigned`,
      slug: "jobs-assigned",
      content: <JobsAssignedCandidate />,
    },
  ];
  // const pathname = usePathname();
  // const searchParams = useSearchParams();
  // const defaultTab = searchParams.get("type") || TABS[0].slug;

  // console.log("pathname:", pathname)
  return (
    <>
      <Tabs value={defaultTab} className="h-[cal(100%-10px)] ">
        <TabsList className="mb-1 w-full justify-start gap-[15px] overflow-hidden overflow-x-auto rounded-none border-b border-[#E1E1E1] bg-inherit">
          {TABS.map(({ label, slug }) => (
            <TabsTrigger
              value={slug}
              key={crypto.randomUUID()}
              onClick={() => {
                setSelectedTab(slug);
              }}
              className="text-brand rounded-none px-0 pb-2 pt-2 text-left data-[state=active]:border-b-2 data-[state=active]:border-[#012A59] data-[state=active]:font-bold data-[state=active]:text-[#012A59] "
            >
              {label}
            </TabsTrigger>
          ))}
        </TabsList>
        {TABS.map(({ label, slug, content }) => (
          <TabsContent key={label} value={slug}>
            {content}
          </TabsContent>
        ))}
      </Tabs>
    </>
  );
};

export default CandidatesProfileTabsAdmin;
