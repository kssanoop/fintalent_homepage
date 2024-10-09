// import JobsFilter from "@/features/jobs/jobs-filter/component/job-filter";
import React from "react";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import TagsFilter from "@/components/team-lead/tags/tags-filter";
import { SubmitHandler, useForm } from "react-hook-form";
import { TagsFilterDataType } from "@/features/tags/recruiter/api/get-tags-recruiter";
import { useGetTagsForTeamLead } from "@/features/tags/team-lead/api/get-tags-for-team-lead";
import TeamLeadTagsCard from "./team-leads-tags-card";
import { TagsInfo } from "@/features/tags/type/tags-info";
import JobCardSkeleton from "@/components/skeleton/job-card-skeleton";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TeamLeadTagBody = () => {
  const pathName = usePathname();
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

  const {
    data: tags,
    isLoading,
    isError,
  } = useGetTagsForTeamLead({ filters: form.getValues() });
  const onFilterSubmit: SubmitHandler<TagsFilterDataType> = (values) => {
    console.log(values);
  };

  return (
    <div className="flex w-full gap-[15px] pl-5 pr-5 pt-5 md:pr-4">
      <div className="hidden md:block">
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
          ) : tags.length === 0 ? (
            <p className="text-center text-lg text-brand-blue">No tags found</p>
          ) : (
            tags.map((tag: TagsInfo) => (
              <Link
                key={tag._id}
                href={`${pathName}/${tag._id}?filters=${encodeURIComponent(
                  JSON.stringify(form.getValues()),
                )}`}
              >
                <TeamLeadTagsCard tag={tag} />
              </Link>
            ))
          )}
        </div>
      </DynamicHeightContainer>
    </div>
  );
};

export default TeamLeadTagBody;
