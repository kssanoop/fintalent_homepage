import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const getAnalyticsOfCompany = async (
  companyId: string,
  range: string,
) => {
  if (range !== "") {
    return await axios
      .get(`/recruiter/company/analytics/${companyId}?range=${range}`)
      .then((res) => res.data);
  } else {
    return await axios
      .get(`/recruiter/company/analytics/${companyId}`)
      .then((res) => res.data);
  }
};

// ?range:${range}  range: string,

export const useGetAnalyticsOfCompany = (companyId: string, range: string) => {
  return useQuery({
    queryKey: ["get-company-analytics", companyId, range],
    queryFn: async () => await getAnalyticsOfCompany(companyId, range),
  });
};
