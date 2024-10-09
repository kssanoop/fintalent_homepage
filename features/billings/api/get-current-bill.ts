import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { RoleTypes } from "@/types/authorization";
import { Billing } from "../types/billing";

const getCurrentBill = async ({
  role,
}: {
  role: RoleTypes;
}): Promise<Billing> => {
  const response = await axios({
    url: `/billing/recruiter/current`,
    method: "GET",
  });

  return response.data;
};

function useGetCurrentBill({ role = "recruiter" }: { role?: RoleTypes }) {
  return useQuery({
    queryKey: ["current-bill", role],
    queryFn: async () => await getCurrentBill({ role }),
  });
}

export default useGetCurrentBill;
