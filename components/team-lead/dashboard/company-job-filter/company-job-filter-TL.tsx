import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useGetCandidatesByJobIdAndStages } from "@/features/jobs/admin/api/get-candidate-by-JobId";
import { useGetAllCompanyList } from "@/features/recuitment-partners/admin/api/get-all-company-list";
import { useGetCompaniesAllActiveRecruiter } from "@/features/recuitment-partners/admin/api/get-active-recruiter-by-companyId";
import RecruiterDataType from "@/features/recuitment-partners/admin/type/company-recruiter-data-type";
import storage from "@/utils/storage";
import DropdownMenuCompanyName from "@/components/Dashboard/dropdownMenus/company-name-dropdown";
import DropDownRecruiters from "@/components/Dashboard/dropdownMenus/drop-down-recruiters";
import DropdownMenuJobTitle from "@/components/Dashboard/dropdownMenus/job-title-dropdown";
import { Card } from "@/components/ui/card";
import DynamicWidthContainer from "@/components/layout/dynamic-width-container";
import TabsLoading from "@/components/recruiter/Dashboard/candidate-progress/candidate-progress-tabs/tabs-loading";
import CandidateProgressTabs from "@/components/recruiter/Dashboard/candidate-progress/candidate-progress-tabs/candidate-progress-tabs";
import { useFetchNextList } from "@/utils/hooks/useFetchNextList";
import useGetJobsByTitle from "@/features/jobs/api/get-jobs-by-title";

const CompanyJobFilterTL = () => {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetJobsByTitle({ search: "", role: "teamlead" });

  const { fetchNextList } = useFetchNextList({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });
  const {
    data: companyData,
    isLoading: isCompanyDataLoading,
    fetchNextPage: fetchNextCompanyDataPage,
    hasNextPage: hasNextCompanyDataPage,
    isFetchingNextPage: isFetchingNextCompanyDataPage,
  } = useGetAllCompanyList();

  const { fetchNextList: fetchNextCompanyData } = useFetchNextList({
    fetchNextPage: fetchNextCompanyDataPage,
    hasNextPage: hasNextCompanyDataPage,
    isFetchingNextPage: isFetchingNextCompanyDataPage,
  });

  const companList = companyData?.pages
    .flatMap((pg) => pg.data)
    ?.map((company) => ({
      companyName: company?.companyName,
      companyId: company?._id,
    }));

  const [selectedCompanyId, setSelectedCompanyId] = useState(
    companList?.[0]?.companyId,
  );

  const [selectedCompanyName, setSelectedCompanyName] = useState(
    companList?.[0]?.companyName,
  );

  console.log(
    "Selected Company:",
    selectedCompanyName,
    "selected CompanyId:",
    selectedCompanyId,
  );

  const { data: Recruiters, isLoading: isRecruiterLoading } =
    useGetCompaniesAllActiveRecruiter({
      companyId: selectedCompanyId,
    });

  const RecruiterListOfSelectedCompany = Recruiters?.map(
    (recruiter: RecruiterDataType) => ({
      recruiterName: recruiter?.fullName,
      recruiterId: recruiter?.recruiterId,
    }),
  );
  console.log("recruiter id:", RecruiterListOfSelectedCompany);
  const [selectedRecruiterName, setSelectedRecruiterName] = useState(
    RecruiterListOfSelectedCompany?.[0]?.recruiterName,
  );
  const [selectedRecruiterId, setSelectedRecruiterId] = useState(
    RecruiterListOfSelectedCompany?.[0]?.recruiterId,
  );

  const jobsList = data?.pages
    .flatMap((pg) => pg.data)
    ?.filter((job: any) => job?.recruiterId === selectedRecruiterId);

  console.log("selected company and Recruiter job:", jobsList);

  const [postedOn, setPostedOn] = useState(jobsList?.[0]?.createdAt);
  const [selectedJobTitle, setSelectedJobTitle] = useState(
    jobsList?.[0]?.jobTitle,
  );
  const [selectedJobId, setSelectedJobId] = useState(jobsList?.[0]?._id);

  const { userDetails } = storage.getDatafromCookie("user_data");

  const {
    data: JobApplicationData,
    isLoading: isApplicationDataLoading,
    hasNextPage: hasNextJobApplicationData,
    isFetchingNextPage: isfetchingNextJobApplicationDataPage,
    fetchNextPage: fetchNextJobApplicationDataPage,
  } = useGetCandidatesByJobIdAndStages({
    stage: "all",
    jobId: selectedJobId ?? "",
    role: userDetails?.role,
  });

  const { fetchNextList: fetchNextJobApplicationList } = useFetchNextList({
    hasNextPage: hasNextJobApplicationData,
    isFetchingNextPage: isfetchingNextJobApplicationDataPage,
    fetchNextPage: fetchNextJobApplicationDataPage,
  });

  // console.log("job application data:", JobApplicationData)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedJobApplicationData, setSelectedJobApplicationData] = useState(
    JobApplicationData?.pages.flatMap((pg) => pg.data)[0],
  );

  console.log(
    "selected recruiter:",
    selectedRecruiterName,
    "selected RecruiterId:",
    selectedRecruiterId,
  );

  // console.log("selected jobId:", selectedJobId);

  useEffect(() => {
    setSelectedCompanyName(companList?.[0]?.companyName);
    setSelectedCompanyId(companList?.[0]?.companyId);
    setSelectedRecruiterName(
      RecruiterListOfSelectedCompany?.[0]?.recruiterName,
    );
    setSelectedRecruiterId(RecruiterListOfSelectedCompany?.[0]?.recruiterId);
    setSelectedJobTitle(jobsList?.[0]?.jobTitle);
    setPostedOn(jobsList?.[0]?.createdAt);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyData, data]);

  useEffect(() => {
    setSelectedJobTitle(jobsList?.[0]?.jobTitle || "");
    setSelectedRecruiterName(
      RecruiterListOfSelectedCompany?.[0]?.recruiterName || "",
    );
    setSelectedJobApplicationData(
      JobApplicationData?.pages.flatMap((pg) => pg.data)?.[0],
    );
    setPostedOn(
      jobsList?.[0]?.createdAt
        ? format(new Date(jobsList?.[0]?.createdAt), "dd MMM yyyy")
        : "",
    );
    setSelectedJobId(jobsList?.[0]?._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedCompanyName]);

  const headerData = [
    {
      label: "Company",
      value: (
        <DropdownMenuCompanyName
          selectedCompany={selectedCompanyName}
          setSelectedCompany={setSelectedCompanyName}
          CompanyList={companList}
          setSelectedCompanyId={setSelectedCompanyId}
          isLoading={isCompanyDataLoading}
          fetchNextCompanyData={fetchNextCompanyData}
        />
      ),
    },
    {
      label: "Posted by",
      value: (
        <DropDownRecruiters
          selectedRecruiterName={selectedRecruiterName}
          setSelectedRecruiterName={setSelectedRecruiterName}
          RecruiterList={RecruiterListOfSelectedCompany}
          setSelectedRecruiterId={setSelectedRecruiterId}
          selectedRecruiterId={selectedRecruiterId}
          isRecruiterLoading={isRecruiterLoading}
        />
      ),
    },
    {
      label: "Job Title",
      value: (
        <DropdownMenuJobTitle
          selectedJobTitle={selectedJobTitle}
          setSelectedJobTitle={setSelectedJobTitle}
          jobTitles={jobsList}
          setPostedOn={setPostedOn}
          setSelectedJob={setSelectedJobId}
          isLoading={isLoading}
          fetchNextList={fetchNextList}
        />
      ),
    },
    {
      label: "Total candidates",
      value: JobApplicationData?.pages.flatMap((pg) => pg.data)?.length ?? 0,
    },
  ];

  const RecruiterData = [
    {
      label: "Posted on",
      Value: postedOn
        ? format(new Date(postedOn), "dd MMM yyyy")
        : "Invalid Date",
    },
  ];

  return (
    <Card className="relative pl-[21px] pt-[30px]">
      <div className="flex justify-between pr-[23px]">
        <div className="flex gap-[31px]">
          {headerData?.map((item) => (
            <div className="flex flex-col gap-1" key={crypto.randomUUID()}>
              <p className="text-base font-medium tracking-[-0.32px] text-[#5E5E5E]">
                {item?.label}
              </p>
              <div className="text-base font-bold tracking-[-0.32px] text-[#171717]">
                {item?.value}
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-[32px]">
          {RecruiterData?.map((item) => (
            <div className="flex flex-col gap-1" key={crypto?.randomUUID()}>
              <p className="text-base font-medium tracking-[-0.32px] text-[#5E5E5E]">
                {item?.label}
              </p>
              <div className="text-base font-bold tracking-[-0.32px] text-[#171717]">
                {item?.Value}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* tabs */}
      <div className="mt-4 flex w-full grow overflow-x-auto">
        {isApplicationDataLoading ? (
          <DynamicWidthContainer>
            <div className="flex w-full gap-3 overflow-x-auto">
              {[...Array(7)].map(() => (
                <TabsLoading key={crypto.randomUUID()} />
              ))}
            </div>
          </DynamicWidthContainer>
        ) : (
          <CandidateProgressTabs
            joApplicationData={
              JobApplicationData?.pages.flatMap((pg) => pg.data) || []
            }
            fetchNextList={fetchNextJobApplicationList}
          />
        )}
      </div>
    </Card>
  );
};

export default CompanyJobFilterTL;
