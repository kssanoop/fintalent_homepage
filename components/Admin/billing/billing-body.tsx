import React from "react";
import BillingFilter from "./billing-filter";
import { SubmitHandler, useForm } from "react-hook-form";
import { AdminCompanyFilter } from "@/features/admin/recruitment-partner/type/admin-company-filter-recruitment";
// import { useGetAllCompanyList } from "@/features/recuitment-partners/admin/api/get-all-company-list";
import BillingInfo from "./billing-info";
import BillingTable from "./billing-table";
import useGetCompaniesForBilling from "@/features/billings/api/get-companies-for-billing";

const BillingBody = ({ isEditable = false }: { isEditable?: boolean }) => {
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

  const dataResponse = useGetCompaniesForBilling({ filters: form.getValues() });

  // console.log("company List Data:", companyListData);

  // if (isCompanyDataError) {
  //   return <div>Error while fetching companies list</div>;
  // }

  const onFilterSubmit: SubmitHandler<AdminCompanyFilter> = (values) => {
    const hasFilter = Object.values(values).some(
      (value) =>
        (Array.isArray(value) && value.length > 0) ||
        (typeof value === "string" && value !== "") ||
        (typeof value === "number" && value !== 0),
    );

    if (hasFilter) {
      console.log(values);
    }
  };

  return (
    <div className="flex h-full items-start gap-3">
      <BillingFilter form={form} onSubmit={onFilterSubmit} />
      <div className="hide-scrollbar flex h-full grow flex-col gap-3.5 overflow-y-auto">
        <BillingInfo isEditable={isEditable} />
        <BillingTable dataResponse={dataResponse} />
      </div>
    </div>
  );
};

export default BillingBody;
