import React from "react";
import CompanyFilter from "@/components/Admin/recruitment-partners/components/company-filter";
import { SubmitHandler, useForm } from "react-hook-form";
import { AdminCompanyFilter } from "@/features/admin/recruitment-partner/type/admin-company-filter-recruitment";
import useGetCompaniesForAdminUnderManager from "@/features/admin/manager/api/get-companies-for-admin-under-manager";
import { useRouter } from "next/router";
import RecruitmentCompaniesTableContainer from "./recruitment-companies-table-container";

const RecruitmentCompaniesTabContent = () => {
  const router = useRouter();
  const managerId = router.query.managerId as string;

  const form = useForm<AdminCompanyFilter>({
    defaultValues: {
      companyName: "",
      locations: [],
      dateAdded: "",
      recruiters: "",
      jobPosted: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const dataResponse = useGetCompaniesForAdminUnderManager(
    managerId,
    form.getValues(),
  );

  const onFilterSubmit: SubmitHandler<AdminCompanyFilter> = (values) => {
    // const hasFilter = Object.values(values).some(
    //   (value) =>
    //     (Array.isArray(value) && value.length > 0) ||
    //     (typeof value === "string" && value !== "") ||
    //     (typeof value === "number" && value !== 0),
    // );

    // if (hasFilter) {
    console.log(values);
    // }
  };

  return (
    <div className="flex w-full gap-5">
      <CompanyFilter form={form} onSubmit={onFilterSubmit} />
      <RecruitmentCompaniesTableContainer dataResponse={dataResponse} />
    </div>
  );
};

export default RecruitmentCompaniesTabContent;
