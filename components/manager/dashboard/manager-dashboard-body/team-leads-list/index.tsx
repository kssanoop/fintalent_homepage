import AvatarProfileFallback from "@/components/avatar-profile-fallback";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetTeamLeadWins from "@/features/dashboard/api/get-team-lead-wins";
import { DayFilter } from "..";

const TeamLeadsList = ({ selectedFilter }: { selectedFilter: DayFilter }) => {
  const { data: teamLeadWins } = useGetTeamLeadWins({
    role: "manager",
    filter: selectedFilter.label,
  });
  return (
    <Card className="flex h-full basis-full flex-col  p-4">
      {!teamLeadWins?.summary ? (
        <h1>No data to show.</h1>
      ) : (
        <>
          {/* head */}
          <div className="flex gap-10 border-b border-border pb-4">
            <div className="w-3/5 space-y-2">
              <p className="text-xs text-brand-grey">Team Leads</p>
              <h4 className="text-xl font-bold">{teamLeadWins?.data.length}</h4>
            </div>
            <div className="w-1/5 space-y-2">
              <p className="text-xs text-brand-grey">Total Wins</p>
              <h4 className="text-xl font-bold">
                {teamLeadWins?.summary.count}
              </h4>
            </div>
            <div className="w-1/5 space-y-2">
              <p className="text-xs text-brand-grey">Total CTC</p>
              <h4 className="text-xl font-bold">
                {teamLeadWins?.summary.CTC}
                <span className="font-normal">LPA</span>
              </h4>
            </div>
          </div>
          {/* body */}
          <ScrollArea className="grow">
            <div className="space-y-6  pt-4">
              {teamLeadWins?.data.map((teamLead) => (
                <div
                  key={crypto.randomUUID()}
                  className="flex items-center gap-10"
                >
                  <div className="flex w-3/5 gap-1.5">
                    <Avatar className="h-[38px] w-[38px] border-2 shadow">
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_IMG_URL}${teamLead.profilePhoto.storageName}`}
                      />
                      <AvatarProfileFallback />
                    </Avatar>
                    <div>
                      <p className="font-bold">{teamLead.fullName}</p>
                      <p className="text-xs font-medium">
                        TL ID {teamLead.employeeId}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/5 font-bold">{teamLead.count}</div>
                  <div className="w-1/5">
                    <span className="font-bold">{teamLead.CTC}</span> LPA
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </Card>
  );
};

export default TeamLeadsList;
