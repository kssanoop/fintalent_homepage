import { HeartHandshakeIcon, IndianRupee } from "lucide-react";
import { StaticsCard } from "./statics-card";
import useGetRevenueNumber from "@/features/dashboard/api/get-revenue-number";
import { Skeleton } from "@/components/ui/skeleton";
import useGetTeamLeadsForManager from "@/features/managers/api/get-team-leads-for-manager";
import useGetDashboardCandidateInfo from "@/features/dashboard/api/get-dashboard-candidate-info";
import { DayFilter } from "..";

const LoadingSkeleton = () => <Skeleton className="h-6 w-10" />;

const GeneralStatics = ({ selectedFilter }: { selectedFilter: DayFilter }) => {
  const { data: revenue, isLoading: isRevenueLoading } = useGetRevenueNumber({
    role: "manager",
    filter: selectedFilter.label,
  });

  const { data: candidateInfo, isLoading: isCandidateInfoLoading } =
    useGetDashboardCandidateInfo({
      role: "manager",
    });

  console.log(candidateInfo?.totalRecruiters);

  const { data: teamLeads, isLoading: isTeamLeadLoading } =
    useGetTeamLeadsForManager();
  return (
    <div className="flex gap-5">
      <StaticsCard>
        <div className="rounded-[2.571px] bg-[#E27F3729] p-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 11.1C13.1935 11.1 14.3381 11.5741 15.182 12.418C16.0259 13.2619 16.5 14.4065 16.5 15.6V21H14.7V15.6C14.7 14.9113 14.4369 14.2486 13.9644 13.7476C13.492 13.2465 12.8459 12.9449 12.1584 12.9045L12 12.9C11.3113 12.9 10.6486 13.1631 10.1476 13.6356C9.64649 14.108 9.3449 14.7541 9.3045 15.4416L9.3 15.6V21H7.5V15.6C7.5 14.4065 7.97411 13.2619 8.81802 12.418C9.66193 11.5741 10.8065 11.1 12 11.1ZM6.15 13.8C6.4011 13.8 6.645 13.8297 6.879 13.8846C6.72513 14.3427 6.634 14.8195 6.6081 15.3021L6.6 15.6V15.6774C6.49655 15.6404 6.38894 15.6162 6.2796 15.6054L6.15 15.6C5.81455 15.6 5.49111 15.7249 5.2427 15.9503C4.9943 16.1758 4.83873 16.4856 4.8063 16.8195L4.8 16.95V21H3V16.95C3 16.1146 3.33187 15.3134 3.92261 14.7226C4.51335 14.1319 5.31457 13.8 6.15 13.8ZM17.85 13.8C18.6854 13.8 19.4866 14.1319 20.0774 14.7226C20.6681 15.3134 21 16.1146 21 16.95V21H19.2V16.95C19.2 16.6145 19.0751 16.2911 18.8497 16.0427C18.6242 15.7943 18.3144 15.6387 17.9805 15.6063L17.85 15.6C17.6925 15.6 17.5413 15.627 17.4 15.6765V15.6C17.4 15.0006 17.3028 14.4246 17.1228 13.8864C17.355 13.8297 17.5998 13.8 17.85 13.8ZM6.15 8.4C6.74674 8.4 7.31903 8.63705 7.74099 9.05901C8.16295 9.48097 8.4 10.0533 8.4 10.65C8.4 11.2467 8.16295 11.819 7.74099 12.241C7.31903 12.6629 6.74674 12.9 6.15 12.9C5.55326 12.9 4.98097 12.6629 4.55901 12.241C4.13705 11.819 3.9 11.2467 3.9 10.65C3.9 10.0533 4.13705 9.48097 4.55901 9.05901C4.98097 8.63705 5.55326 8.4 6.15 8.4ZM17.85 8.4C18.4467 8.4 19.019 8.63705 19.441 9.05901C19.8629 9.48097 20.1 10.0533 20.1 10.65C20.1 11.2467 19.8629 11.819 19.441 12.241C19.019 12.6629 18.4467 12.9 17.85 12.9C17.2533 12.9 16.681 12.6629 16.259 12.241C15.8371 11.819 15.6 11.2467 15.6 10.65C15.6 10.0533 15.8371 9.48097 16.259 9.05901C16.681 8.63705 17.2533 8.4 17.85 8.4ZM6.15 10.2C6.03065 10.2 5.91619 10.2474 5.8318 10.3318C5.74741 10.4162 5.7 10.5307 5.7 10.65C5.7 10.7693 5.74741 10.8838 5.8318 10.9682C5.91619 11.0526 6.03065 11.1 6.15 11.1C6.26935 11.1 6.38381 11.0526 6.4682 10.9682C6.55259 10.8838 6.6 10.7693 6.6 10.65C6.6 10.5307 6.55259 10.4162 6.4682 10.3318C6.38381 10.2474 6.26935 10.2 6.15 10.2ZM17.85 10.2C17.7307 10.2 17.6162 10.2474 17.5318 10.3318C17.4474 10.4162 17.4 10.5307 17.4 10.65C17.4 10.7693 17.4474 10.8838 17.5318 10.9682C17.6162 11.0526 17.7307 11.1 17.85 11.1C17.9693 11.1 18.0838 11.0526 18.1682 10.9682C18.2526 10.8838 18.3 10.7693 18.3 10.65C18.3 10.5307 18.2526 10.4162 18.1682 10.3318C18.0838 10.2474 17.9693 10.2 17.85 10.2ZM12 3C12.9548 3 13.8705 3.37928 14.5456 4.05442C15.2207 4.72955 15.6 5.64522 15.6 6.6C15.6 7.55478 15.2207 8.47045 14.5456 9.14558C13.8705 9.82072 12.9548 10.2 12 10.2C11.0452 10.2 10.1295 9.82072 9.45442 9.14558C8.77928 8.47045 8.4 7.55478 8.4 6.6C8.4 5.64522 8.77928 4.72955 9.45442 4.05442C10.1295 3.37928 11.0452 3 12 3ZM12 4.8C11.5226 4.8 11.0648 4.98964 10.7272 5.32721C10.3896 5.66477 10.2 6.12261 10.2 6.6C10.2 7.07739 10.3896 7.53523 10.7272 7.87279C11.0648 8.21036 11.5226 8.4 12 8.4C12.4774 8.4 12.9352 8.21036 13.2728 7.87279C13.6104 7.53523 13.8 7.07739 13.8 6.6C13.8 6.12261 13.6104 5.66477 13.2728 5.32721C12.9352 4.98964 12.4774 4.8 12 4.8Z"
              fill="#E27F37"
            />
          </svg>
        </div>

        <div>
          <StaticsCard.Value>
            {isTeamLeadLoading ? <LoadingSkeleton /> : teamLeads?.length || 0}
          </StaticsCard.Value>
          <StaticsCard.Label>Team leads</StaticsCard.Label>
        </div>
      </StaticsCard>

      <StaticsCard>
        <div className="rounded-[2.571px] bg-[#3790E229] p-1.5">
          <HeartHandshakeIcon size={24} color="#3790E3" />
        </div>

        <div>
          <StaticsCard.Value>
            {isCandidateInfoLoading ? (
              <LoadingSkeleton />
            ) : (
              candidateInfo?.totalRecruiters
            )}
          </StaticsCard.Value>
          <StaticsCard.Label>Recruiters</StaticsCard.Label>
        </div>
      </StaticsCard>

      <StaticsCard>
        <div className="rounded-[2.571px] bg-[#DEAC2B29] p-1.5">
          <IndianRupee size={24} color="#DEAC2B" />
        </div>

        <div>
          <StaticsCard.Value>
            {isRevenueLoading ? (
              <LoadingSkeleton />
            ) : (
              `₹${revenue?.totalRevenue || 0}`
            )}
          </StaticsCard.Value>
          <StaticsCard.Label>Revenue Generated</StaticsCard.Label>
        </div>
      </StaticsCard>
    </div>
  );
};

export default GeneralStatics;
