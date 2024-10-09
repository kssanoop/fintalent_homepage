import React from "react";
import TagsCard from "./tag-cards/tag-card";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import { TagsFilterDataType } from "@/features/tags/recruiter/api/get-tags-recruiter";
import { SubmitHandler, useForm } from "react-hook-form";
import TagsFilter from "@/components/team-lead/tags/tags-filter";
import { useGetTagsForadmin } from "@/features/tags/admin/api/get-tags-for-admin";
import JobCardSkeleton from "@/components/skeleton/job-card-skeleton";
import { TagsInfo } from "@/features/tags/type/tags-info";
import storage from "@/utils/storage";

const TagsBody = () => {
  const form = useForm<TagsFilterDataType>({
    defaultValues: {
      tagCode: "",
      companyName: "",
      location: [],
      recruiterName: "",
      datePosted: "",
      experienceLevel: [],
      status: "all",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { userDetails } = storage.getDatafromCookie("user_data");
  // console.log("manager", userDetails?.role);
  const {
    data: tags,
    isLoading,
    isError,
  } = useGetTagsForadmin({
    filters: form.getValues(),
    roleType: userDetails?.role,
  });
  const onFilterSubmit: SubmitHandler<TagsFilterDataType> = (values) => {
    console.log(values);
  };

  return (
    <div className="flex w-full gap-[15px] pl-5 pr-5 pt-5 md:pr-4">
      {/* left */}
      <div className="hidden md:block">
        <TagsFilter form={form} onSubmit={onFilterSubmit} />
      </div>
      {/* right */}
      <DynamicHeightContainer>
        <div className="flex w-full flex-col gap-2 pb-0.5">
          {isError && <div>Something went wrong.</div>}
          {isLoading ? (
            <>
              {[...Array(3)].map(() => (
                <JobCardSkeleton key={crypto.randomUUID()} />
              ))}
            </>
          ) : tags?.length === 0 ? (
            <p className="text-center text-lg text-brand-blue">No tags found</p>
          ) : (
            tags?.map((tag: TagsInfo) => (
              <div key={crypto?.randomUUID()}>
                <TagsCard tag={tag} />
              </div>
            ))
          )}
        </div>
      </DynamicHeightContainer>
    </div>
  );
};

export default TagsBody;
