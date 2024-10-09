import { Card } from "@/components/ui/card";
import KanbanHeaderItem from "./kanban-header-item";
import KanbanCard from "./kanban-card";
import KanbanCardTotalItemsNumber from "./kanban-card-total-items-number";
import useGetJobsForManager from "@/features/jobs/manager/api/get-jobs-for-manager";
import DropdownMenuCompanyName from "@/components/Dashboard/dropdownMenus/company-name-dropdown";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useGetCandidatesByJobIdAndStages } from "@/features/jobs/admin/api/get-candidate-by-JobId";
import DropdownMenuJobTitle from "@/components/Dashboard/dropdownMenus/job-title-dropdown";
import CandidateProgressCardContainer from "./candidate-progress-card-container";
import DropDownRecruiters from "@/components/Dashboard/dropdownMenus/drop-down-recruiters";
import { useGetAllCompanyList } from "@/features/recuitment-partners/admin/api/get-all-company-list";
import { useGetCompaniesAllActiveRecruiter } from "@/features/recuitment-partners/admin/api/get-active-recruiter-by-companyId";
import RecruiterDataType from "@/features/recuitment-partners/admin/type/company-recruiter-data-type";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import { useFetchNextList } from "@/utils/hooks/useFetchNextList";

const KanbanContainer = () => {
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useGetJobsForManager({ search: "" });
  console.log(data);
  const { fetchNextList } = useFetchNextList({
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  });
  const {
    data: companyData,
    isLoading: isCompanyDataLoading,
    isFetchingNextPage: isFetchingNextCompanyDataPage,
    hasNextPage: hasNextCompanyDataPage,
    fetchNextPage: fetchNextCompanyDataPage,
  } = useGetAllCompanyList();

  const companList = companyData?.pages
    .flatMap((pg) => pg.data)
    ?.map((company) => ({
      companyName: company?.companyName,
      companyId: company?._id,
    }));

  const { fetchNextList: fetchNextCompanyData } = useFetchNextList({
    hasNextPage: hasNextCompanyDataPage,
    isFetchingNextPage: isFetchingNextCompanyDataPage,
    fetchNextPage: fetchNextCompanyDataPage,
  });

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
  console.log(RecruiterListOfSelectedCompany);

  const jobsList = data?.pages
    .flatMap((pg) => pg.data)
    ?.filter((job) => job.recruiterId === selectedRecruiterId);
  console.log(jobsList);

  console.log("selected company and Recruiter job:", jobsList);

  const [postedOn, setPostedOn] = useState(jobsList?.[0]?.createdAt);
  const [selectedJobTitle, setSelectedJobTitle] = useState(
    jobsList?.[0]?.jobTitle,
  );
  const [selectedJobId, setSelectedJobId] = useState(jobsList?.[0]?._id);

  console.log(selectedJobId);
  const { data: jobApplicationData } = useGetCandidatesByJobIdAndStages({
    stage: "all",
    jobId: selectedJobId ?? "",
    role: "manager",
  });

  // console.log("job application data:", JobApplicationData)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedJobApplicationData, setSelectedJobApplicationData] = useState(
    jobApplicationData?.pages.flatMap((pg) => pg.data)[0],
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
      jobApplicationData?.pages.flatMap((pg) => pg.data)[0],
    );
    setPostedOn(
      jobsList?.[0]?.createdAt
        ? format(new Date(jobsList?.[0]?.createdAt), "dd MMM yyyy")
        : "",
    );
    setSelectedJobId(jobsList?.[0]?._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, selectedCompanyName]);

  return (
    <Card className="">
      {/* top */}
      <div className="flex justify-between px-5 pb-4 pt-6">
        <div className="flex gap-6">
          <KanbanHeaderItem>
            <KanbanHeaderItem.Label>Company</KanbanHeaderItem.Label>
            <KanbanHeaderItem.Value>
              <DropdownMenuCompanyName
                selectedCompany={selectedCompanyName}
                setSelectedCompany={setSelectedCompanyName}
                CompanyList={companList}
                setSelectedCompanyId={setSelectedCompanyId}
                isLoading={isCompanyDataLoading}
                fetchNextCompanyData={fetchNextCompanyData}
              />
            </KanbanHeaderItem.Value>
          </KanbanHeaderItem>
          <KanbanHeaderItem>
            <KanbanHeaderItem.Label>Posted by</KanbanHeaderItem.Label>
            <KanbanHeaderItem.Value>
              <DropDownRecruiters
                selectedRecruiterName={selectedRecruiterName}
                setSelectedRecruiterName={setSelectedRecruiterName}
                RecruiterList={RecruiterListOfSelectedCompany}
                setSelectedRecruiterId={setSelectedRecruiterId}
                selectedRecruiterId={selectedRecruiterId}
                isRecruiterLoading={isRecruiterLoading}
              />
            </KanbanHeaderItem.Value>
          </KanbanHeaderItem>
          <KanbanHeaderItem>
            <KanbanHeaderItem.Label>Job Title</KanbanHeaderItem.Label>
            <KanbanHeaderItem.Value>
              <DropdownMenuJobTitle
                selectedJobTitle={selectedJobTitle}
                setSelectedJobTitle={setSelectedJobTitle}
                jobTitles={jobsList}
                setPostedOn={setPostedOn}
                setSelectedJob={setSelectedJobId}
                isLoading={isLoading}
                fetchNextList={fetchNextList}
              />
            </KanbanHeaderItem.Value>
          </KanbanHeaderItem>
          <KanbanHeaderItem>
            <KanbanHeaderItem.Label>Total candidates</KanbanHeaderItem.Label>
            <KanbanHeaderItem.Value>
              {jobApplicationData?.pages.flatMap((pg) => pg.data).length ?? 0}
            </KanbanHeaderItem.Value>
          </KanbanHeaderItem>
        </div>
        <KanbanHeaderItem>
          <KanbanHeaderItem.Label>Posted on</KanbanHeaderItem.Label>
          <KanbanHeaderItem.Value>
            {postedOn ? format(new Date(postedOn), "dd MMM yyyy") : ""}
          </KanbanHeaderItem.Value>
        </KanbanHeaderItem>
      </div>
      {/* bottom */}
      {/* <DynamicWidthContainer> */}
      <div className="flex w-full gap-3  overflow-x-auto px-5 pb-6">
        <KanbanCard className="bg-[#3790e31a]">
          <KanbanCard.Header className="bg-[#3790E3]">
            <KanbanCard.Title>Invited</KanbanCard.Title>
            <KanbanCardTotalItemsNumber className="text-[#3790E3]">
              {jobApplicationData?.pages
                .flatMap((pg) => pg.data)
                ?.filter(
                  (job: JobApplicationSchema) => job?.status === "invited",
                ).length || 0}
            </KanbanCardTotalItemsNumber>
          </KanbanCard.Header>
          {/* <KanbanCard.Body> */}
          <CandidateProgressCardContainer
            jobApplicationData={
              jobApplicationData?.pages.flatMap((pg) => pg.data) || []
            }
            stage="invited"
            label="invited"
          />
          {/* </KanbanCard.Body> */}
        </KanbanCard>
        <KanbanCard className=" bg-[#e27f371a]">
          <KanbanCard.Header className="bg-[#E37F37]">
            <KanbanCard.Title>Invite Accepted</KanbanCard.Title>
            <KanbanCardTotalItemsNumber className="text-[#E37F37]">
              {jobApplicationData?.pages
                .flatMap((pg) => pg.data)
                ?.filter(
                  (job: JobApplicationSchema) =>
                    job?.status === "inviteAccepted",
                ).length || 0}
            </KanbanCardTotalItemsNumber>
          </KanbanCard.Header>
          {/* <KanbanCard.Body> */}{" "}
          <CandidateProgressCardContainer
            jobApplicationData={
              jobApplicationData?.pages.flatMap((pg) => pg.data) || []
            }
            stage="inviteAccepted"
            label="invite accepted"
          />
          {/* </KanbanCard.Body> */}
        </KanbanCard>
        <KanbanCard className=" bg-[#deac2b1a]">
          <KanbanCard.Header className="bg-[#DEAC2B]">
            <KanbanCard.Title>Interview scheduled</KanbanCard.Title>
            <KanbanCardTotalItemsNumber className="text-[#DEAC2B]">
              {jobApplicationData?.pages
                .flatMap((pg) => pg.data)
                ?.filter(
                  (job: JobApplicationSchema) =>
                    job?.status === "interViewScheduled",
                ).length || 0}
            </KanbanCardTotalItemsNumber>
          </KanbanCard.Header>
          {/* <KanbanCard.Body> */}{" "}
          <CandidateProgressCardContainer
            jobApplicationData={
              jobApplicationData?.pages.flatMap((pg) => pg.data) || []
            }
            stage="interViewScheduled"
            label="interview scheduled"
          />
          {/* </KanbanCard.Body> */}
        </KanbanCard>
        <KanbanCard className=" bg-[#3a37e21a]">
          <KanbanCard.Header className="bg-[#3A37E3]">
            <KanbanCard.Title>Shortlisted</KanbanCard.Title>
            <KanbanCardTotalItemsNumber className="text-[#3A37E3]">
              {jobApplicationData?.pages
                .flatMap((pg) => pg.data)
                ?.filter(
                  (job: JobApplicationSchema) => job?.status === "shortlisted",
                ).length || 0}
            </KanbanCardTotalItemsNumber>
          </KanbanCard.Header>
          {/* <KanbanCard.Body> */}{" "}
          <CandidateProgressCardContainer
            jobApplicationData={
              jobApplicationData?.pages.flatMap((pg) => pg.data) || []
            }
            stage="shortlisted"
            label="shortlisted"
          />
          {/* </KanbanCard.Body> */}
        </KanbanCard>
        <KanbanCard className=" bg-[#b253de1a]">
          <KanbanCard.Header className="bg-[#B253DE]">
            <KanbanCard.Title>Offered</KanbanCard.Title>
            <KanbanCardTotalItemsNumber className="text-[#B253DE]">
              {jobApplicationData?.pages
                .flatMap((pg) => pg.data)
                ?.filter(
                  (job: JobApplicationSchema) => job?.status === "offered",
                ).length || 0}
            </KanbanCardTotalItemsNumber>
          </KanbanCard.Header>
          {/* <KanbanCard.Body> */}{" "}
          <CandidateProgressCardContainer
            jobApplicationData={
              jobApplicationData?.pages.flatMap((pg) => pg.data) || []
            }
            stage="offered"
            label="offered"
          />
          {/* </KanbanCard.Body> */}
        </KanbanCard>
        <KanbanCard className=" bg-[#00ba704d]">
          <KanbanCard.Header className="bg-[#00BA70]">
            <KanbanCard.Title>Hired</KanbanCard.Title>
            <KanbanCardTotalItemsNumber className="text-[#00BA70]">
              {jobApplicationData?.pages
                .flatMap((pg) => pg.data)
                ?.filter((job: JobApplicationSchema) => job?.status === "hired")
                .length || 0}
            </KanbanCardTotalItemsNumber>
          </KanbanCard.Header>
          {/* <KanbanCard.Body> */}{" "}
          <CandidateProgressCardContainer
            jobApplicationData={
              jobApplicationData?.pages.flatMap((pg) => pg.data) || []
            }
            stage="hired"
            label="hired"
          />
          {/* </KanbanCard.Body> */}
        </KanbanCard>
        <KanbanCard className="bg-[#ffcccc]">
          <KanbanCard.Header className="bg-[#E72F2F]">
            <KanbanCard.Title>Rejected</KanbanCard.Title>
            <KanbanCardTotalItemsNumber className="text-[#E72F2F]">
              {jobApplicationData?.pages
                .flatMap((pg) => pg.data)
                ?.filter(
                  (job: JobApplicationSchema) => job?.status === "rejected",
                ).length || 0}
            </KanbanCardTotalItemsNumber>
          </KanbanCard.Header>
          {/* <KanbanCard.Body> */}{" "}
          <CandidateProgressCardContainer
            jobApplicationData={
              jobApplicationData?.pages.flatMap((pg) => pg.data) || []
            }
            stage="rejected"
            label="rejected"
          />
          {/* </KanbanCard.Body> */}
        </KanbanCard>
      </div>
      {/* </DynamicWidthContainer> */}
    </Card>
  );
};

export default KanbanContainer;
