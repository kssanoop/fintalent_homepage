import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import RecruitmentCompaniesTable from "./recruitment-companies-table";
import { UseQueryResult } from "@tanstack/react-query";
import { CompanyDataType } from "@/features/recuitment-partners/admin/type/company-list-data-type";

const RecruitmentCompaniesTableContainer = ({
  dataResponse,
}: {
  dataResponse: UseQueryResult<CompanyDataType[], unknown>;
}) => {
  const {
    data: companyListData,
    isLoading: isCompanyDataLoading,
    isError: isCompanyDataError,
  } = dataResponse;

  if (isCompanyDataError) {
    return <div>Error while fetching companies list</div>;
  }

  if (companyListData?.length === 0) {
    return (
      <h1 className="w-full text-center text-xl text-brand-blue">
        No recruitment companies to show
      </h1>
    );
  }
  return (
    <DynamicHeightContainer>
      <div className="hide-scrollbar flex  w-full flex-1 overflow-auto rounded-t-[5px] border border-solid border-[#E1E1E1]">
        <RecruitmentCompaniesTable
          companyListData={companyListData}
          isLoading={isCompanyDataLoading}
        />
      </div>
    </DynamicHeightContainer>
  );
};

export default RecruitmentCompaniesTableContainer;
