import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";

export type Schema = Array<{
  _id: string;
  interviews: Array<{
    _id: string;
    jobApplicationId: string;
    candidateId: string;
    companyId: string;
    interviewUrl: string;
    startDateTime: string;
    duration: number;
    accepted: boolean;
    candidate: {
      candidateId: string;
      fullName: string;
      email: string;
      profilePhoto: {
        originalName: string;
        storageName: string;
      };
    };
    job: {
      jobTitle: string;
    };
  }>;
}>;

const getInterviewsForRecruiter = async (): Promise<Schema> => {
  const response = await axios({
    url: "/interview/recruiter/interviews",
    method: "GET",
  });
  return response.data;
};

function useGetInterviewsForRecruiter() {
  return useQuery({
    queryKey: ["interviews-for-recruiter"],
    queryFn: getInterviewsForRecruiter,
    refetchOnWindowFocus: false,
  });
}

export default useGetInterviewsForRecruiter;
