import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

export type CompanyInfo = {
  companyLogo: {
    originalName: string;
    storageName: string;
  };
  _id: string;
  companyName: string;
  companyNo: string;
  locations: string[];
  companyWebsite: string;
  companyLinkedIn: string;
  companyPhoneNo: string;
  verificationStatus: string;
  companyStatus: string;
  __v: number;
};

const getCompanyByCompanyNumber = async (
  companyNo: string,
): Promise<CompanyInfo> => {
  const response = await axios.get(`/recruiter/company/companyNo/${companyNo}`);
  return response.data;
};

function useGetCompanyByComapanyNumber(companyNo: string | undefined) {
  return useQuery({
    queryKey: ["company-details", companyNo],
    queryFn: async () => await getCompanyByCompanyNumber(companyNo as string),
    enabled: !!companyNo && companyNo.length === 10,
    retry: false,
  });
}

export default useGetCompanyByComapanyNumber;
