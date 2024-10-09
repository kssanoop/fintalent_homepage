import { Dispatch, SetStateAction } from "react";
import ProfileLeft from "./profile-left";
import ProfileRight from "./profile-right";
import { useFetchCandidateInfo } from "@/features/ProfileEdit/api/getCandidate";
import { ROLES } from "@/types/authorization";

interface BodyProps {
  setLastUpdated: Dispatch<SetStateAction<string>>;
}
const Body = ({ setLastUpdated }: BodyProps) => {
  const onSuccess = (data: any) => {
    if (data) {
      setLastUpdated(data.updatedAt);
    }
  };

  const onError = (error: any) => {
    if (error) {
      console.log("error on fetching data", error);
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, data, isError, error, isFetching, refetch, isRefetching } =
    useFetchCandidateInfo(onSuccess, onError);

  if (isLoading) {
    return <div>Loading .....</div>;
  }
  return (
    <div className="flex h-full flex-col md:flex-row md:gap-4 md:overflow-auto">
      <div className="h-full md:w-[24%] md:min-w-[340px]">
        <ProfileLeft
          data={data}
          isLoading={isLoading}
          Interface={ROLES.CANDIDATE}
        />
      </div>
      <div className="scroll-container hide-scrollbar md:w-[76%] md:overflow-auto">
        <ProfileRight
          data={data}
          refetch={refetch}
          // isRefetching={isRefetching}
          Interface={ROLES.CANDIDATE}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Body;
