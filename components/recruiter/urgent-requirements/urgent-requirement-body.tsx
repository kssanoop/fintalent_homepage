import React, { useState } from "react";
import UrgentRequirementFilter from "./urgent-requirement-filter";
import { useDebouncedvalue } from "@/utils/hooks/useDebouncedValue";
import SearchBarStateHolder from "@/components/search-bar/search-bar-state-holder";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UrgentRequirementCard from "./urgent-requirement-card/urgent-requirement-card";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import AddNewRequirementPopup from "./add-new-requirement-popup";
import { SubmitHandler, useForm } from "react-hook-form";
import { TagsFilterType } from "@/features/tags/recruiter/api/recruiter/type/tags-filter-type";
import useGetTagsByFilter from "@/features/tags/recruiter/api/recruiter/api/get-tags-recruiter";
import { TagsDataType } from "@/features/tags/recruiter/api/recruiter/type/tags-data-type";
import JobCardSkeleton from "@/components/skeleton/job-card-skeleton";

const UrgentRequirementBody = () => {
  const [filters, setFilters] = useState<TagsFilterType | {}>({});
  const [addForm, setAddForm] = useState(false);
  const { value: searchQuery, debounceValue: setSearchQuery } =
    useDebouncedvalue();
  const handleSearchQuery = (inputValue: string) => {
    setSearchQuery(inputValue);
  };
  const form = useForm<TagsFilterType>({
    defaultValues: {
      tagCode: "",
      location: [],
      qualifications: [],
      skills: [],
      experienceLevel: [],
      datePosted: "",
      candidateCount: 0,
      companyName: "",
      recruiterName: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    data: TagsData,
    isError,
    isLoading,
  } = useGetTagsByFilter({
    search: searchQuery,
    ...filters,
  });
  // console.log("tags data:", TagsData);
  const onFilterSubmit: SubmitHandler<TagsFilterType> = (values) => {
    const formattedData = {
      ...values,
      candidateCount:
        values.candidateCount < 0 ? 0 : Number(values.candidateCount),
      skills: values.skills.map((skill: any) => skill?.value),
      qualifications: values.qualifications?.map((q: any) => q.value),
    };
    setFilters(formattedData);
  };
  return (
    <>
      <div className="flex w-full gap-[11px] px-4 pt-3 lg:px-5">
        <div className="hidden w-[308px] lg:flex">
          <UrgentRequirementFilter form={form} onSubmit={onFilterSubmit} />
        </div>
        <div className="flex w-full flex-col gap-3">
          <div className="flex justify-between gap-4">
            <SearchBarStateHolder
              handleSearchQuery={handleSearchQuery}
              placeholder="Search tag name"
            />
            <Button
              variant={"gradient"}
              className="rounded-[5px] px-3 py-1.5 font-bold text-base"
              onClick={() => {
                setAddForm(true);
              }}
            >
              <span className="gap-0.5px flex items-center">
                {" "}
                <p className="hidden lg:block">Add requirement</p>{" "}
                <Plus size={24} color="#FFF" />
              </span>
            </Button>
          </div>
          <DynamicHeightContainer>
            {isError && <div>Something went wrong.</div>}
            {isLoading ? (
              <>
                {[...Array(3)].map(() => (
                  <JobCardSkeleton key={crypto.randomUUID()} />
                ))}
              </>
            ) : TagsData?.length === 0 ? (
              <p className="text-center text-lg text-brand-blue">
                No Urgent requirments found
              </p>
            ) : (
              <div className="flex flex-col gap-2.5">
                {TagsData?.map((item: TagsDataType) => (
                  <UrgentRequirementCard
                    key={crypto.randomUUID()}
                    data={item}
                  />
                ))}
              </div>
            )}
          </DynamicHeightContainer>
        </div>
      </div>
      <AddNewRequirementPopup isOpen={addForm} setOpen={setAddForm} />
    </>
  );
};

export default UrgentRequirementBody;
