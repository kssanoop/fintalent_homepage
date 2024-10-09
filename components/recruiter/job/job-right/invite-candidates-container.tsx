import SearchBar from "@/components/search-bar/search-bar";
import { Loader2 } from "lucide-react";
import UnhiredCandidateList from "./unhired-candidate-list";
import useGetUnhiredCandidates from "@/features/get-candidates/api/get-unhired-candidates";
import { ChangeEvent, useState } from "react";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useInviteMultipleToJob from "@/features/jobs/api/invite-multiple-to-job";
import InvitedCandidateFilterDialog from "./invited-candidate-filter-dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { JobsFilter } from "@/features/jobs/jobs-filter/type/jobs-filter";
import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";
import { useFetchNextList } from "@/utils/hooks/useFetchNextList";

const InviteCandidatesContainer = () => {
  const router = useRouter();
  const jobId = router.query.id as string;
  const [searchBarValue, setSearchBarValue] = useState("");
  const [searchQuery, setSearchQuery] = useState(searchBarValue);
  const [filters, setFilters] = useState<JobsFilter | {}>({});
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetUnhiredCandidates({
    search: searchQuery,
    jobId,
    ...filters,
  });

  const { fetchNextList } = useFetchNextList({
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  });

  const form = useForm<CandidateFilters>({
    defaultValues: {
      employmentType: [],
      experianceLevel: [],
      employmentMode: [],
      location: [],
      skills: [],
      qualification: [],
      salaryBegin: "0",
      salaryEnd: "0",
      gender: [],
      ageRange: [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onFilterSubmit: SubmitHandler<CandidateFilters> = (values) => {
    console.log(values);
    const formattedData = {
      ...values,
      skills: values.skills.map((skill: any) => skill?.value),
      qualification: values.qualification.map(
        (qualification: any) => qualification?.value,
      ),
    };

    setFilters(formattedData);
  };

  const queryClient = useQueryClient();
  const handleSuccess = (data: any) => {
    queryClient.invalidateQueries({ queryKey: ["unhired-candidates"] });
    queryClient.invalidateQueries({
      queryKey: ["job-application-by-recruiter"],
    });
    toast.success(data.message);
  };

  const handleError = (error: any) => {
    console.log("Error: ", error);
    toast.error(error.response.data.message);
  };
  const {
    mutate,
    isLoading: isInvitingMultiple,
    isError: isInvitMultipleError,
  } = useInviteMultipleToJob(handleSuccess, handleError);

  //   TODO: implement error boundary and avoid SearchBar UI from the error UI
  if (isError) {
    console.log(error);
    return null;
  }
  const handleChangeInSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchBarValue(e.target.value);
    setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 1500);
  };

  const handleInviteAll = () => {
    mutate({ jobId, search: searchQuery });
  };
  return (
    <>
      <div className="flex items-center gap-2 pb-6">
        <SearchBar
          onChange={handleChangeInSearchInput}
          value={searchBarValue}
          placeholder="Search candidate"
          isSearchIconVisible={false}
          className="h-10 rounded-[5px] border-border px-2 py-1 placeholder:text-[#A9A9A9]"
        />
        <InvitedCandidateFilterDialog onSubmit={onFilterSubmit} form={form} />
        {/* <SlidersHorizontal size={16} className="cursor-pointer" /> */}
      </div>
      {isLoading ? (
        <>
          <div className="flex items-center justify-between pb-6">
            <Skeleton className="h-4 w-16" />
            <Button
              disabled
              variant="gradient"
              className="w-[172px] rounded-lg px-3 py-1.5 text-sm font-bold"
            >
              Invite all
            </Button>
          </div>
          {[...Array(3)].map(() => (
            <div key={crypto.randomUUID()} className="mb-2">
              <InfoCardSkeleton />{" "}
            </div>
          ))}
        </>
      ) : (
        <div>
          {!data?.pages.flatMap((pg) => pg.data) ||
          data?.pages[0].count === 0 ? (
            <p className="text-center text-lg text-brand-blue">
              No candidates found
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between pb-6">
                <p className="font-medium text-brand-black">
                  {data.pages[0].count} result
                  {data.pages[0].count > 1 && "s"}
                </p>
                <Button
                  onClick={handleInviteAll}
                  disabled={isInvitingMultiple && !isInvitMultipleError}
                  variant="gradient"
                  className="w-[172px] rounded-lg px-3 py-1.5 text-sm font-bold"
                >
                  {isInvitingMultiple && !isInvitMultipleError ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inviting...
                    </>
                  ) : (
                    "Invite all"
                  )}
                </Button>
              </div>
              <div className="h-[calc(100vh-250px)] space-y-2 overflow-auto">
                <UnhiredCandidateList
                  fetchNextList={fetchNextList}
                  list={data.pages.flatMap((pg) => pg.data)}
                />
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default InviteCandidatesContainer;