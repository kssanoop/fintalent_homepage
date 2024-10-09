import { JobFilters } from "@/lib/constants/filters/jobFilters";
import { FilterItem } from "./job-filter/filter-item";
import { UseFormReturn } from "react-hook-form";
import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";
import { CandidateFilters as CandidateList } from "@/lib/constants/filters/candidatesFilter";

export type List = JobFilters | CandidateList;
// export type PathFilterItem = { title: string; path: string };

function JobFilterItemList({
  list,
  form,
}: {
  list: List;
  form: UseFormReturn<CandidateFilters, any, CandidateFilters>;
}) {
  return (
    <>
      {list.map((item, i) => (
        <FilterItem
          key={crypto.randomUUID()}
          item={item}
          isLastItem={i === list.length - 1}
          form={form}
        />
      ))}
    </>
  );
}

export default function JobFilterList({
  list,
  title,
  form,
}: {
  list: List;
  title?: string;
  form: UseFormReturn<CandidateFilters, any, CandidateFilters>;
}) {
  return (
    <>
      {title ? (
        <h3 className="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block">
          {title}
        </h3>
      ) : null}
      <ul className="">
        <JobFilterItemList list={list} form={form} />
      </ul>
    </>
  );
}
