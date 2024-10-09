import HiredCandidate from "@/components/recruiter/candidates/hired-candidates-tab/hired-candidate";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { useGetHiredCandidatesAdmin } from "@/features/get-candidates/admin/api/get-hired-candidates";
import CandidatesFilter from "@/features/get-candidates/components/candidates-filter";
import CandidatesFilterSheet from "@/features/get-candidates/components/canidates-filter-sheet";
import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const AdminHiredCandidatesTabs = () => {
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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filters, setFilters] = useState<CandidateFilters | {}>({});
  const [isViewAllFilterType, setIsViewAllFilterType] = useState(false);
  const { data, isFetching, isError, error } = useGetHiredCandidatesAdmin();
  console.log("hired Candidates:", data);
  if (isError) {
    return <div>{error as string}</div>;
  }

  const onFilterSubmit: SubmitHandler<CandidateFilters> = (values) => {
    console.log(values);
    setFilters(values);
  };

  return (
    <div className="flex w-full gap-[29px] pl-6 pr-3">
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
      <div className="flex w-full flex-grow">
        <DynamicHeightContainer>
          <div className="flex w-full flex-col gap-2">
            {isFetching ? (
              <>
                {[...Array(3)].map(() => (
                  <InfoCardSkeleton key={crypto.randomUUID()} />
                ))}
              </>
            ) : !data || data?.length === 0 ? (
              <p className="text-center text-lg text-brand-blue">
                No candidates found
              </p>
            ) : (
              <div className="flex w-full flex-col gap-2">
                {data?.map((candidate: any) => (
                  <div className="w-ful flex flex-grow" key={candidate._id}>
                    <HiredCandidate candidate={candidate} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </DynamicHeightContainer>
      </div>
    </div>
  );
};

export default AdminHiredCandidatesTabs;
