import SearchBarStateHolder from "@/components/search-bar/search-bar-state-holder";
import { useDebouncedvalue } from "@/utils/hooks/useDebouncedValue";
import useGetUnhiredCandidates from "@/features/get-candidates/api/get-unhired-candidates";
import AllCandidateList from "./all-candidate-list";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import InviteMultipleCandidatesSheet from "./invite-multiple-candidates-sheet";
import CandidatesFilter from "@/features/get-candidates/components/candidates-filter";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";
import { useState } from "react";
import CandidatesFilterSheet from "@/features/get-candidates/components/canidates-filter-sheet";
import { useFetchNextList } from "@/utils/hooks/useFetchNextList";

const AllCandidatesTab = () => {
  const { value: searchQuery, debounceValue: setSearchQuery } =
    useDebouncedvalue();

  const [filters, setFilters] = useState<CandidateFilters | {}>({});
  const [isViewAllFilterType, setIsViewAllFilterType] =
    useState<boolean>(false);
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetUnhiredCandidates({
    search: searchQuery,
    ...filters,
  });

  const { fetchNextList } = useFetchNextList({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
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
    const formattedData = {
      ...values,
      skills: values.skills.map((skill: any) => skill?.value),
      qualification: values.qualification.map(
        (qualification: any) => qualification?.value,
      ),
    };
    // console.log(formattedData);

    setFilters(formattedData);
  };

  const handleSearchQuery = (inputValue: string) => {
    setSearchQuery(inputValue);
  };

  return (
    <FormProvider {...form}>
      <div className="flex h-[calc(100%-8px)] flex-col md:flex-row md:gap-6">
        <div className="hidden md:w-[24%] md:min-w-[300px] lg:block">
          <CandidatesFilter
            onSubmit={onFilterSubmit}
            form={form}
            isViewAllFilterType={isViewAllFilterType}
            candidatesFilterSheet={
              <CandidatesFilterSheet
                onSubmit={onFilterSubmit}
                form={form}
                isViewAllFilterType={isViewAllFilterType}
                setIsViewAllFilterType={setIsViewAllFilterType}
              />
            }
          />
        </div>
        <div className="h-full w-full">
          <div className="flex items-center justify-between md:items-start">
            <SearchBarStateHolder
              handleSearchQuery={handleSearchQuery}
              placeholder="Search candidate"
            />
            <div className="ml-4 lg:hidden">
              <CandidatesFilterSheet
                onSubmit={onFilterSubmit}
                form={form}
                isViewAllFilterType={isViewAllFilterType}
                setIsViewAllFilterType={setIsViewAllFilterType}
              />
            </div>
            <div className="hidden lg:block">
              <InviteMultipleCandidatesSheet
                type="all"
                candidateId=""
                isCandidatePage={true}
                searchQuery={searchQuery}
              />
            </div>
          </div>

          <div className="scroll-container mt-4  flex h-[calc(100%-55px)] flex-col gap-y-2 overflow-y-auto">
            {isLoading ? (
              <>
                {[...Array(3)].map(() => (
                  <InfoCardSkeleton key={crypto.randomUUID()} />
                ))}
              </>
            ) : isError ? (
              <p className="text-center text-lg text-brand-blue">
                Something went wrong please try again
              </p>
            ) : !data?.pages.flatMap((pg) => pg.data) ||
              data?.pages[0].count === 0 ? (
              <p className="text-center text-lg text-brand-blue">
                No candidates found
              </p>
            ) : (
              <AllCandidateList
                candidates={data.pages.flatMap((pg) => pg.data)}
                fetchNextList={fetchNextList}
              />
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default AllCandidatesTab;
