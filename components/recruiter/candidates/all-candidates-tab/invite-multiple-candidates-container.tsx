import SearchBar from "@/components/search-bar/search-bar";
import useGetJobsByTitle from "@/features/jobs/api/get-jobs-by-title";
// import { SlidersHorizontal } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import JobsList from "./jobs-list";
import JobCardSkeleton from "@/components/skeleton/job-card-skeleton";
import { SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useInviteCandidateToMultipleJob from "@/features/jobs/api/invite-multiple-candidates-to-same-job";
import { useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import InviteToJobFilterDialog from "./invite-to-job-filter-dialog";
import {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { JobsFilter } from "@/features/jobs/jobs-filter/type/jobs-filter";
import useInviteMutipleCandidateToMultipleJobs from "@/features/tags/recruiter/api/recruiter/api/invite-multiplec-candiadte-to-jobs";
import useInviteMultipleCandidatesToMultipleJobs from "@/features/jobs/api/invite-multiple-candidates-to-multiple-job";
import { ConnectForm } from "@/components/connect-form";
import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";
const defaultValues: any = {
  jobType: [],
  experianceLevel: [],
  location: [],
  jobStatus: "open",
};
const InviteMultipleCanidatesContainer = ({
  setIsSheetOpen,
  candidateId,
  isCandidatePage,
  type,
  candidateSearchQuery = "",
}: {
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
  candidateId: string;
  isCandidatePage: boolean;
  type?: "multiple" | "all";
  candidateSearchQuery?: string;
}) => {
  const [filters, setFilters] = useState<JobsFilter | {}>(defaultValues);

  const queryClient = useQueryClient();
  const [searchBarValue, setSearchBarValue] = useState("");
  const [searchQuery, setSearchQuery] = useState(searchBarValue);
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const { data, isFetching, isError, error } = useGetJobsByTitle({
    search: searchQuery,
    candidateId,
    ...filters,
  });

  const handleSuccess = (data: any) => {
    toast.success("Invited Successfully");
    setIsSheetOpen(false);
    queryClient.invalidateQueries({ queryKey: ["all-jobs"] });
    // queryClient.invalidateQueries({ queryKey: ["unhired-candidates"] });

    setSelectedJobs([]);
  };
  const handleError = (error: any) => {
    console.log(error);
    toast.error("Error occured while  Inviting");
  };
  // console.log(candidateId);
  // console.log("selectedJbs", selectedJobs);

  const { mutate: invite, isLoading: isSubmitting } =
    useInviteCandidateToMultipleJob(handleSuccess, handleError);

  const { mutate: inviteAll, isLoading: isSubmittingAll } =
    useInviteMultipleCandidatesToMultipleJobs(handleSuccess, handleError);

  const form = useForm<JobsFilter>({
    defaultValues,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    mutate: inviteCandidatesTag,
    isLoading: isSubmittingInvite,
    isError: isErrorSubmittingInvite,
  } = useInviteMutipleCandidateToMultipleJobs(handleSuccess, handleError);

  if (isError) {
    console.log(error);
    return <h1>Something went wrong unable to fetch data.</h1>;
  }

  const onFilterSubmit: SubmitHandler<JobsFilter> = (values) => {
    console.log(values);
    setFilters(values);
  };

  console.log(data);

  const handleChangeInSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setSearchBarValue(e.target.value);
    setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 1500);
  };

  const handleCancel = () => {
    setIsSheetOpen(false);
    setSelectedJobs([]);
  };

  const handleInvite = (
    candidateFilterForm: UseFormReturn<FieldValues, any, FieldValues>,
  ) => {
    if (type === "all") {
      console.log("first");
      inviteAll({
        query: {
          ...(candidateFilterForm.getValues() as CandidateFilters),
          search: candidateSearchQuery,
        },
        jobIds: selectedJobs,
      });
      return;
    }
    console.log("first");
    invite({ candidateId, jobIds: selectedJobs });
  };

  const handleTagsInvite = (
    candidateFilterForm: UseFormReturn<FieldValues, any, FieldValues>,
  ) => {
    inviteCandidatesTag({
      tagId: candidateId,
      jobIds: selectedJobs,
      query: {
        ...(candidateFilterForm.getValues() as CandidateFilters),
        search: candidateSearchQuery,
      },
    });
  };
  return (
    <ConnectForm>
      {(candidateFilterForm: UseFormReturn<FieldValues, any, FieldValues>) => (
        <>
          <div className="flex items-center gap-2 pb-6">
            <SearchBar
              onClick={(e) => {
                e.stopPropagation();
              }}
              onChange={handleChangeInSearchInput}
              value={searchBarValue}
              placeholder="Search job"
              isSearchIconVisible={false}
              className="h-10 rounded-[5px] border-border px-2 py-1 placeholder:text-[#A9A9A9]"
            />
            {/* <SlidersHorizontal size={16} className="cursor-pointer" /> */}
            <InviteToJobFilterDialog form={form} onSubmit={onFilterSubmit} />
          </div>
          {isFetching ? (
            <>
              {[...Array(3)].map(() => (
                <>
                  {[...Array(3)].map(() => (
                    <JobCardSkeleton key={crypto.randomUUID()} />
                  ))}
                </>
              ))}
            </>
          ) : (
            <div className=" flex grow flex-col space-y-2 overflow-auto">
              {!data || data?.pages[0].count === 0 ? (
                <p className="text-center text-lg text-brand-blue">
                  No Jobs found
                </p>
              ) : (
                <>
                  <ScrollArea className="scroll-container grow overflow-y-auto">
                    <JobsList
                      jobs={data.pages.flatMap((pg) => pg.data)}
                      setSelectedJobs={setSelectedJobs}
                    />
                  </ScrollArea>
                  {isCandidatePage ? (
                    <SheetFooter className="flex-row items-center justify-end space-x-2.5  p-0 pt-6">
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        type="button"
                        className="border-0 bg-[#EFEFEF] text-brand-black"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          handleInvite(candidateFilterForm);
                        }}
                        type="button"
                        disabled={isSubmitting || isSubmittingAll}
                        variant="gradient"
                      >
                        Send Invite
                      </Button>
                    </SheetFooter>
                  ) : (
                    <SheetFooter className="flex-row items-center justify-end space-x-2.5  p-0 pt-6">
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        type="button"
                        className="border-0 bg-[#EFEFEF] text-brand-black"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => {
                          handleTagsInvite(candidateFilterForm);
                        }}
                        type="button"
                        disabled={
                          isSubmittingInvite && !isErrorSubmittingInvite
                        }
                        variant="gradient"
                      >
                        Send Invite
                      </Button>
                    </SheetFooter>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}
    </ConnectForm>
  );
};

export default InviteMultipleCanidatesContainer;
