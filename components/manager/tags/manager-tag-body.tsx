import React from "react";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import TagsFilter from "@/components/team-lead/tags/tags-filter";
import { SubmitHandler, useForm } from "react-hook-form";
import { TagsFilterDataType } from "@/features/tags/recruiter/api/get-tags-recruiter";
import ManagerTagsCard from "@/components/team-lead/tags/team-leads-tags-card";
import { TagsInfo } from "@/features/tags/type/tags-info";
import JobCardSkeleton from "@/components/skeleton/job-card-skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetTags } from "@/features/tags/api/get-tags";

const ManagerTagBody = () => {
  const pathName = usePathname();
  const form = useForm<TagsFilterDataType>({
    defaultValues: {
      tagCode: "",
      companyName: "",
      location: [],
      recruiterName: "",
      datePosted: "",
      experienceLevel: [],
      status: "active",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    data: tags,
    isLoading,
    isError,
  } = useGetTags({ filters: form.getValues(), role: "manager" });
  const onFilterSubmit: SubmitHandler<TagsFilterDataType> = (values) => {
    console.log(values);
  };

  return (
    <div className="flex w-full gap-[15px] pl-5 pr-5 pt-5 md:pr-4">
      <div className="">
        <TagsFilter form={form} onSubmit={onFilterSubmit} />
      </div>
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
              <Link
                key={tag._id}
                href={`${pathName}/${tag._id}?filters=${encodeURIComponent(
                  JSON.stringify(form.getValues()),
                )}`}
              >
                <ManagerTagsCard tag={tag} />
              </Link>
            ))
          )}
        </div>
      </DynamicHeightContainer>
    </div>
  );
};

export default ManagerTagBody;
