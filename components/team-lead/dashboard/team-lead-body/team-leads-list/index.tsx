import { DayFilter } from "@/components/manager/dashboard/manager-dashboard-body";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useGetCandidateWins from "@/features/team-lead/api/candidates-wins-dashboard";
// import useGetCandidateWins from "@/features/team-lead/api/candidates-wins-dashboard";

export type CandidateInfoDashboard = {
  summary: {
    _id: null;
    count: number;
    CTC: number;
  };
  data: Array<{
    candidateId: string;
    fullName: string;
    email: string;
    profilePhoto: {
      originalName: string;
      storageName: string;
    };
    CTC: number;
  }>;
};

const TeamLeadsList = ({ selectedFilter }: { selectedFilter: DayFilter }) => {
  const { data: candidateWins } = useGetCandidateWins({
    role: "teamlead",
    filter: selectedFilter.label,
  });
  console.log("candidate wins:", candidateWins);
  return (
    <Card className="flex h-full basis-full flex-col  p-5">
      {/* head */}
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h3 className=" text-base font-normal">Total wins</h3>
          <p className="text-xl font-bold tracking-[-0.4px]">
            {candidateWins?.summary?.count}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className=" text-base font-normal">Total CTC</h3>
          <p className="text-xl font-bold tracking-[-0.4px]">
            {candidateWins?.summary?.CTC} {""}
            <span className="font-normal">LPA</span>
          </p>
        </div>
      </div>
      <div className="my-4 h-[1px] bg-[#E1E1E1]" />
      {/* body */}
      <ScrollArea>
        {candidateWins?.data?.length === 0 ? (
          <div className="text-center text-base text-brand-blue">
            No Candidates to show!
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {candidateWins?.data?.map((item) => (
              <div className="flex justify-between" key={crypto.randomUUID()}>
                <div className="flex items-center gap-1.5">
                  <Avatar>
                    <AvatarImage
                      src={`${process.env.NEXT_PUBLIC_IMG_URL}${item?.profilePhoto?.storageName}`}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-1">
                    <p className="text-base font-bold">{item?.fullName}</p>
                    <a
                      href={`mailto:${item?.email}`}
                      className="text-xs font-medium"
                    >
                      {item?.email}
                    </a>
                  </div>
                </div>
                {/* lpa */}
                <p className="text-base font-bold tracking-[-0.32px]">
                  {item?.CTC} {""}
                  <span className="font-normal">LPA</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
};

export default TeamLeadsList;
