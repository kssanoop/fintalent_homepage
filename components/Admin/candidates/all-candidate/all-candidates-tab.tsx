import SearchJobByTitle from "@/components/job/search-job-by-title";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import React, { useState } from "react";
import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDebouncedvalue } from "@/utils/hooks/useDebouncedValue";
import CandidatesFilter from "@/features/get-candidates/components/candidates-filter";
import CandidatesFilterSheet from "@/features/get-candidates/components/canidates-filter-sheet";
import useGetUnhiredCandidatesAdmin from "@/features/get-candidates/admin/api/get-unhired-candidates-admin";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import AllCandidateListAdmin from "./all-candidate-list-admin";

const AllCandidatesTab = () => {
  const [filters, setFilters] = useState<CandidateFilters | {}>({});
  const { value: searchQuery, debounceValue: setSearchQuery } =
    useDebouncedvalue();
  const [isViewAllFilterType, setIsViewAllFilterType] = useState(false);
  const { data, isFetching, isError } = useGetUnhiredCandidatesAdmin({
    search: searchQuery,
    ...filters,
  });

  // console.log("candidate data:", data)

  const form = useForm<CandidateFilters>({
    defaultValues: {
      employmentType: [],
      experianceLevel: [],
      employmentMode: [],
      location: [],
      // jobSchedule: [],
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
    // console.log(values);
    // setFilters(values);
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
    <div className="flex gap-[13px] pl-5 pr-3">
      {/* filter */}
      <div className="hidden flex-col gap-3 md:flex md:w-[24%] md:min-w-[308px]">
        <DynamicHeightContainer>
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
        </DynamicHeightContainer>
      </div>
      {/* candidates search */}
      <div className="flex w-full flex-col gap-[15px]">
        <div className="w-[89%]">
          <SearchJobByTitle
            handleSearchQuery={handleSearchQuery}
            placeholderText="Search candidate"
          />
        </div>
        {/* candidates list  */}
        <DynamicHeightContainer>
          <div className="flex flex-col gap-[26px]">
            {isFetching ? (
              <>
                {[...Array(3)].map(() => (
                  <InfoCardSkeleton key={crypto.randomUUID()} />
                ))}
              </>
            ) : isError ? (
              <p className="text-center text-lg text-brand-blue">
                Something went wrong please try again
              </p>
            ) : !data?.data || data?.data.length === 0 ? (
              <p className="text-center text-lg text-brand-blue">
                No candidates found
              </p>
            ) : (
              <AllCandidateListAdmin candidates={data.data} />
            )}
          </div>
        </DynamicHeightContainer>
      </div>
    </div>
  );
};

export default AllCandidatesTab;
