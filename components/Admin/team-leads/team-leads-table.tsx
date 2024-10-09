import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardIcon, CardIconImage } from "@/components/ui/cardslogo";
import { useRouter } from "next/router";
import { TeamLeadInfo } from "@/features/admin/manager/type/team-lead-info";
import AvatarProfileFallback from "@/components/avatar-profile-fallback";
import _ from "lodash";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

const TableHeaderTitles = [
  {
    name: "Name & TL ID",
  },
  {
    name: "Designation",
  },
  {
    name: "Phone number",
  },
  {
    name: "Candidates assigned",
  },
];

const TeamLeadsTable = ({ teamLeads }: { teamLeads: TeamLeadInfo[] }) => {
  console.log(teamLeads);
  const router = useRouter();
  const pathName = usePathname();
  console.log(pathName);
  const getRedirectionUrl = (teamLeadId: string) => {
    if (pathName === "/admin/team-leads") {
      return `/admin/team-leads/${teamLeadId}`;
    }
    if (pathName.startsWith("/admin/managers")) {
      return `${pathName}/team-lead/${teamLeadId}`;
    }
    return `${pathName}/${teamLeadId}`;
  };

  return (
    <Table className=" shadow ">
      <TableHeader className="m-0 border border-border  p-0">
        <TableRow className="p-0">
          {TableHeaderTitles.map((title) => (
            <TableHead
              key={crypto.randomUUID()}
              className="w-[128px] whitespace-nowrap bg-[#EFEFEF] px-4 text-sm font-bold text-[#5E5E5E]"
            >
              {title.name}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className=" cursor-pointer rounded-b-[5px] border border-solid border-[#E1E1E1] bg-white [&_tr:last-child]:border-b">
        {teamLeads?.map((teamLead) => (
          <TableRow
            key={crypto.randomUUID()}
            onClick={() => {
              router.push(getRedirectionUrl(teamLead.teamLeadId));
            }}
            className=" border-border capitalize"
          >
            <TableCell>
              <div className="flex gap-2">
                <CardIcon className="h-9 w-9 rounded-full shadow">
                  <CardIconImage
                    src={`${process.env.NEXT_PUBLIC_IMG_URL}${teamLead.profilePhoto?.storageName}`}
                    className="rounded-full"
                  />
                  <AvatarProfileFallback />
                </CardIcon>
                <div className="">
                  <h3 className="line-clamp-1 text-sm font-bold text-[#171717]">
                    {teamLead.name}
                  </h3>
                  <p className="line-clamp-1 break-all text-xs font-medium text-brand-grey">
                    TLID {teamLead.employeeId}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="w-1/4 text-sm font-medium text-brand-grey">
              <p className="line-clamp-2"> {teamLead.designation}</p>
            </TableCell>
            <TableCell className="w-1/4 text-sm  font-medium text-brand-grey md:whitespace-nowrap">
              {teamLead.phoneNo}
            </TableCell>
            <TableCell className=" w-1/4 text-sm  font-bold  text-brand-black  ">
              <div className="flex justify-between">
                <p className="line-clamp-2">
                  {" "}
                  <span className="">
                    {teamLead.candidates.length === 0
                      ? "No candidates assigned"
                      : _.truncate(
                          teamLead.candidates
                            .map((candidate) => candidate.fullName)
                            .slice(0, 3)
                            .join(", "),
                        )}
                  </span>
                  {teamLead.candidates.length - 3 > 0 &&
                    teamLead.candidates.length !== 0 && (
                      <span>+{teamLead.candidates.length - 3}</span>
                    )}
                </p>
                <ChevronRight
                  size={12}
                  className="min-h-[12px] min-w-[12px] self-center"
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TeamLeadsTable;
