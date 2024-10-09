import SearchBar from "@/components/search-bar/search-bar";
import { Loader2 } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CandidateSchema } from "@/features/get-candidates/schema/candidate-schema";
import { ScrollArea } from "@/components/ui/scroll-area";
// import useGetAllVerifiedCandidate from "@/features/get-candidates/api/get-all-verified-candidates";
import InvitedCandidateFilterDialog from "@/components/recruiter/job/job-right/invited-candidate-filter-dialog";
import { JobsFilter } from "@/features/jobs/jobs-filter/type/jobs-filter";
import { SubmitHandler, useForm } from "react-hook-form";
import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";
import AssignCandidate from "./assign-candidate";
// import useAssignCandidatesUsingFilter from "@/features/team-lead/api/assign-candidates-using-filter";
import useGetUnhiredCandidatesAdmin from "@/features/get-candidates/admin/api/get-unhired-candidates-admin";
import useAssignCandidateToTag from "@/features/tags/api/assign-candidates-to-tag";
import { useRouter } from "next/router";

const AssignCandidateList = ({ list }: { list: CandidateSchema[] }) => {
  return (
    <>
      {list.map((candidate) => (
        <AssignCandidate key={candidate._id} candidate={candidate} />
      ))}
    </>
  );
};
const AssignCandidateContainer = ({
  setIsSheetOpen,
}: {
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const tagId = router.query.TagId as string;
  const [filters, setFilters] = useState<JobsFilter | {}>({});
  const [searchBarValue, setSearchBarValue] = useState("");
  const [searchQuery, setSearchQuery] = useState(searchBarValue);
  const { data, isLoading, error, isError } = useGetUnhiredCandidatesAdmin({
    search: searchQuery,
    ...filters,
    tagId,
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

  const { mutate, isLoading: isAssigning } = useAssignCandidateToTag();
  const handleAssignAll = () => {
    if (data)
      mutate({
        tagId,
        candidateIds: data.data.map((candidate) => candidate.candidateId),
      });
  };

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
      </div>
      {isLoading ? (
        <>
          <div className="flex items-center justify-between pb-6">
            <Skeleton className="h-4 w-16" />
            {/* <Button
              disabled
              variant="gradient"
              className="w-[172px] rounded-lg px-3 py-1.5 text-sm font-bold"
            >
              Assign all
            </Button> */}
          </div>
          {[...Array(3)].map(() => (
            <div key={crypto.randomUUID()} className="mb-2">
              <InfoCardSkeleton />{" "}
            </div>
          ))}
        </>
      ) : (
        <div>
          {!data?.data || data?.data.length === 0 ? (
            <p className="text-center text-lg text-brand-blue">
              No candidates found
            </p>
          ) : (
            <>
              <div className="flex items-center justify-between pb-6">
                <p className="font-medium text-brand-black">
                  {data.data.length} result{data.data.length > 1 && "s"}
                </p>
                <Button
                  onClick={handleAssignAll}
                  disabled={isAssigning}
                  variant="gradient"
                  className="w-[172px] rounded-lg px-3 py-1.5 text-sm font-bold"
                >
                  {isAssigning ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Assigning...
                    </>
                  ) : (
                    "Assign all"
                  )}
                </Button>
              </div>
              <ScrollArea className="h-[calc(100vh-200px)] space-y-2 ">
                <AssignCandidateList list={data.data} />
              </ScrollArea>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AssignCandidateContainer;
