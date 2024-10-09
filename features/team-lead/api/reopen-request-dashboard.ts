import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { RoleTypes } from "@/types/authorization";

const getDashboardReOpenRequest = async ({
  role,
}: {
  role: RoleTypes;
}): Promise<any> => {
  const response = await axios({
    url: `/${role}/dashboard/reopen-numbers`,
    method: "GET",
  });

  //   @ts-ignore
  return response.data;
};

function useGetDashboardReOpenRequest({
  role = "teamlead",
}: {
  role?: RoleTypes;
}) {
  return useQuery({
    queryKey: ["dashboard-candidate-reopen-TL", role],
    queryFn: async () => await getDashboardReOpenRequest({ role }),
  });
}

export default useGetDashboardReOpenRequest;
