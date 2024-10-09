import { axios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getFilteredDataJobByCandidate = async (selectedTab: string) =>
  await axios
    .get(`/job/application/candidate/${selectedTab}`)
    .then((res) => res.data);

export const useGetFilteredDataJobByCandidate = (
  onSuccess: any,
  onError: any,
  selectedTab: string,
) => {
  console.log("selected Tab", selectedTab);
  return useQuery({
    queryKey: ["getallCandidateJobs", selectedTab],
    queryFn: async () => await getFilteredDataJobByCandidate(selectedTab),
    onSuccess,
    onError,
  });
};

//  fetch all data

const getAllDataJobByCandidate = async () =>
  await axios.get(`/job/application/candidate/all`).then((res) => res.data);

export const useGetAllDataJobByCandidate = (onSuccess: any, onError: any) =>
  useQuery({
    queryKey: ["getallCandidateJobslength"],
    queryFn: async () => await getAllDataJobByCandidate(),
    onSuccess,
    onError,
  });
