import HeaderBarBack from "@/components/Admin/common/HeaderBarBack";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { Authorization } from "@/lib/authorization";
import { ROLES } from "@/types/authorization";
import React, { ReactElement, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import Layout from "@/components/layout/primary-layout";
import TagsCard from "@/components/Admin/tags/tag-cards/tag-card";
import { useGetTagById } from "@/features/tags/admin/api/get-tag-by-id";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";
import { useDebouncedvalue } from "@/utils/hooks/useDebouncedValue";
import CandidatesFilter from "@/features/get-candidates/components/candidates-filter";
import CandidatesFilterSheet from "@/features/get-candidates/components/canidates-filter-sheet";
import SearchBarStateHolder from "@/components/search-bar/search-bar-state-holder";
import useGetCandidatesByTagsAdmin from "@/features/tags/admin/api/get-candidate-by-tag";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import CandidatesTags from "@/components/recruiter/urgent-requirements/candiadtes-card-tags";
import JobCardSkeleton from "@/components/skeleton/job-card-skeleton";
import storage from "@/utils/storage";
import _ from "lodash";

const ClickedTagId = () => {
  const router = useRouter();
  const { value: searchQuery, debounceValue: setSearchQuery } =
    useDebouncedvalue();
  const [isViewAllFilterType, setIsViewAllFilterType] =
    useState<boolean>(false);
  const tagId = router.query.TagId as string;
  const { userDetails } = storage.getDatafromCookie("user_data");
  const {
    data: tag,
    isLoading,
    isError: tagsLoadingErrror,
  } = useGetTagById(tagId, userDetails?.role);
  const [filters, setFilters] = useState<CandidateFilters | {}>({});
  const {
    data: CandidatesData,
    isFetching,
    isError,
  } = useGetCandidatesByTagsAdmin({
    roleType: userDetails?.role,
    tagId: tagId ?? "",
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

  // console.log("tag data:", tag)
  return (
    <div className="flex w-full flex-col gap-[18px]">
      {/* header */}
      <HeaderBarBack heading="Go back" />
      <div className="flex w-full gap-5 pr-[9px] md:pl-5">
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
        <DynamicHeightContainer>
          <div className="flex flex-col gap-3">
            <div className="w-full">
              {" "}
              {isLoading && !tagsLoadingErrror ? (
                <JobCardSkeleton key={crypto.randomUUID()} />
              ) : (
                <TagsCard tag={tag} />
              )}
            </div>
            <div className="flex w-full justify-between gap-6 md:gap-[129px]">
              <SearchBarStateHolder
                handleSearchQuery={handleSearchQuery}
                placeholder="Search in  matching candidates"
              />

              <div className="mr-6 flex items-center gap-1">
                <p className="text-sm font-normal leading-5 text-[#171717]">
                  Tag status : {_.upperFirst(tag?.docStatus)}
                </p>
              </div>
            </div>
            {/* <DynamicHeightContainer> */}
            <div className="flex flex-col gap-2">
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
                <div className="flex flex-col gap-2 pr-[1px]">
                  {CandidatesData?.map((candidate: any) => (
                    <div key={candidate?._id}>
                      <CandidatesTags
                        candidate={candidate}
                        key={candidate?._id}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            {/* </DynamicHeightContainer> */}
          </div>
        </DynamicHeightContainer>
      </div>
    </div>
  );
};

ClickedTagId.getLayout = function getLayout(page: ReactElement) {
  return (
    <Authorization
      forbiddenFallback={<div>Only {ROLES.MANAGER} can view this.</div>}
      allowedRoles={[ROLES.MANAGER]}
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
          <div className="flex h-full w-full flex-col overflow-auto">
            {page}
          </div>
        </ErrorBoundary>
      </Layout>
    </Authorization>
  );
};

export default ClickedTagId;
