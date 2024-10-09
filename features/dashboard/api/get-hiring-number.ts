import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { RoleTypes } from "@/types/authorization";
import { DashboardHiringNumber } from "../types/dashboard-hiring-number";

const getHiringNumber = async ({
  role,
}: {
  role: RoleTypes;
}): Promise<DashboardHiringNumber> => {
  const response = await axios({
    url: `/${role}/dashboard/hiring-numbers`,
    method: "GET",
  });

  //   @ts-ignore
  return response.formatedData;
};

function useGetHiringNumber({ role = "manager" }: { role?: RoleTypes }) {
  return useQuery({
    queryKey: ["hiring-number", role],
    queryFn: async () => await getHiringNumber({ role }),
  });
}

export default useGetHiringNumber;
