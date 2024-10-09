import HeaderBarBack from "@/components/Admin/common/HeaderBarBack";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "@/components/layout/primary-layout";
import UrgentRequirementCard from "@/components/recruiter/urgent-requirements/urgent-requirement-card/urgent-requirement-card";
import { useRouter } from "next/router";
import { useGetTagsByID } from "@/features/tags/recruiter/api/recruiter/api/get-tags-by-id";
import useGetCandidatesByTags from "@/features/tags/recruiter/api/recruiter/api/get-candidates-by-tags";
import CandidatesFilter from "@/features/get-candidates/components/candidates-filter";
import { useDebouncedvalue } from "@/utils/hooks/useDebouncedValue";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";
import CandidatesFilterSheet from "@/features/get-candidates/components/canidates-filter-sheet";
import SearchBarStateHolder from "@/components/search-bar/search-bar-state-holder";
import InviteMultipleCandidatesSheet from "@/components/recruiter/candidates/all-candidates-tab/invite-multiple-candidates-sheet";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import CandidatesTags from "@/components/recruiter/urgent-requirements/candiadtes-card-tags";
import JobCardSkeleton from "@/components/skeleton/job-card-skeleton";

const ClickedTagIdRecruiter = () => {
  const { value: searchQuery, debounceValue: setSearchQuery } =
    useDebouncedvalue();

  const [filters, setFilters] = useState<CandidateFilters | {}>({});
  const [isViewAllFilterType, setIsViewAllFilterType] =
    useState<boolean>(false);
  const router = useRouter();
  const { TagId } = router?.query;

  const extractedCompanyId =
    TagId && typeof TagId === "object"
      ? Array.isArray(TagId)
        ? TagId[0]
        : TagId
      : TagId;
  const {
    data: TagData,
    isError,
    isFetching,
  } = useGetTagsByID(extractedCompanyId);
  console.log("tags data :", TagData);

  const { data: CandidatesData } = useGetCandidatesByTags({
    tagId: extractedCompanyId ?? "",
    search: searchQuery,
    ...filters,
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

  const handleSearchQuery = (inputValue: string) => {
    setSearchQuery(inputValue);
  };

  console.log("candidate data:", CandidatesData);
  return (
    <div className="flex w-full flex-col gap-[18px]">
      {/* header */}
      <HeaderBarBack heading="Go back" />
      <FormProvider {...form}>
        <div className="flex h-[calc(100%-8px)] flex-col md:flex-row md:gap-[22px]">
          <div className="hidden flex-col gap-3 pl-5 md:flex md:w-[24%] md:min-w-[308px]">
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
          <div className="h-full w-full">
            <div className="w-full">
              {" "}
              {isFetching && !isError ? (
                <JobCardSkeleton key={crypto.randomUUID()} />
              ) : (
                <div className="mb-4 pl-4 pr-4 lg:pl-0 lg:pr-2">
                  <UrgentRequirementCard data={TagData} />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between px-4 md:items-start lg:px-0">
              <SearchBarStateHolder
                handleSearchQuery={handleSearchQuery}
                placeholder="Search in  matching candidates"
              />
              <div className="ml-4 lg:hidden">
                <CandidatesFilterSheet
                  onSubmit={onFilterSubmit}
                  form={form}
                  isViewAllFilterType={isViewAllFilterType}
                  setIsViewAllFilterType={setIsViewAllFilterType}
                />
              </div>
              {CandidatesData?.length !== 0 && (
                <div className="hidden pr-5 lg:block">
                  <InviteMultipleCandidatesSheet
                    searchQuery={searchQuery}
                    type="all"
                    candidateId={extractedCompanyId ?? ""}
                    isCandidatePage={false}
                  />
                </div>
              )}
            </div>

            <div className="scroll-container mt-4  h-[calc(100%-55px)] space-y-2 overflow-y-auto">
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
              ) : !CandidatesData || CandidatesData?.length === 0 ? (
                <p className="text-center text-lg text-brand-blue">
                  No candidates found
                </p>
              ) : (
                <DynamicHeightContainer>
                  <div className="flex flex-col gap-2 pl-4 pr-4 lg:pr-[22px]">
                    {CandidatesData?.map((candidate: any) => (
                      <div key={candidate?._id}>
                        <CandidatesTags
                          candidate={candidate}
                          key={candidate?._id}
                        />
                      </div>
                    ))}
                  </div>
                </DynamicHeightContainer>
              )}
            </div>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

ClickedTagIdRecruiter.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.RECRUITER} can view this.</div>}
      allowedRoles={[ROLES.RECRUITER]}
    >
      <Layout>
        <ErrorBoundary
          fallback={
            <div className="m-4 flex h-1/2 items-center justify-center rounded-2xl bg-white p-5 text-xl text-red-400 shadow-md">
              Something went wrong! Unable to fetch data.
            </div>
          }
          onError={(error: any, errorInfo) => {
            console.log("Error caught!", error);
          }}
        >
          <div className="flex h-screen w-full flex-col overflow-auto">
            {page}
          </div>
        </ErrorBoundary>
      </Layout>
    </Authorization>
  );
};

export default ClickedTagIdRecruiter;
