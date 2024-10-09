import AddJobQuestionDialog from "@/components/job/job-postings/add-job-question-dialog";
import EditJobSheet from "@/components/job/job-postings/edit-job-sheet";
import JobStatusSelect from "@/components/job/job-status-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetJobQuestions } from "@/features/jobs/api/get-job-question";
import { Briefcase, ChevronLeft, IndianRupee, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import _ from "lodash";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReadMoreAndLessText from "@/components/read-more-and-less-text";
import { useGetJobById } from "@/features/jobs/api/get-job-by-id";

const JobLeft = () => {
  const router = useRouter();
  const jobId = router.query.id as string;
  const { data: jobDetail, isLoading, isError, error } = useGetJobById(jobId);
  const { data: jobQuestions } = useGetJobQuestions(jobId);
  const [isOpen, setOpen] = useState(false);
  const { showBoundary } = useErrorBoundary();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError) {
    console.log("Error:", error);
    showBoundary(error);
    return null;
  }

  const convertedJobType = jobDetail?.jobType?.map((type) => _.startCase(type));

  let jobInfo;
  if (convertedJobType && jobDetail) {
    jobInfo = [
      {
        value:
          jobDetail.jobType.length > 1
            ? convertedJobType.join(", ")
            : convertedJobType[0],
        icon: (
          <Briefcase
            size={19}
            strokeOpacity={1}
            color="#5E5E5E"
            className="min-h-[19px] min-w-[19px]"
          />
        ),
      },
      {
        value: `${jobDetail.minSalary} - ${jobDetail.maxSalary} LPA`,
        icon: (
          <IndianRupee
            size={19}
            strokeOpacity={1}
            color="#5E5E5E"
            className="min-h-[19px] min-w-[19px]"
          />
        ),
      },
      {
        value: jobDetail.jobLocation,
        icon: (
          <MapPin
            size={19}
            strokeOpacity={1}
            color="#5E5E5E"
            className="min-h-[19px] min-w-[19px]"
          />
        ),
      },
      {
        value: _.startCase(jobDetail.employmentMode),
        icon: (
          <MapPin
            size={19}
            strokeOpacity={1}
            color="#5E5E5E"
            className="min-h-[19px] min-w-[19px]"
          />
        ),
      },
    ];
  }

  console.log(jobDetail);
  console.log("job question data:", jobQuestions);

  if (jobDetail) {
    return (
      <>
        <Card className="flex h-full flex-col break-all border-0 p-0  md:border  ">
          <CardHeader className="space-y-5 px-6 pb-5 pt-6 md:p-6 ">
            <Link href="/recruiter/jobs" className="flex items-center gap-1">
              <ChevronLeft width={14} height={14} color="#5E5E5E" />
              <p className="text-sm font-light text-black">Back to jobs</p>
            </Link>
            <div className="flex gap-2">
              <Avatar className="h-[52px] w-[52px] rounded-sm shadow">
                <AvatarImage
                  src={`${process.env.NEXT_PUBLIC_IMG_URL}${jobDetail.companyId.companyLogo.storageName}`}
                />
                <AvatarFallback className="rounded-sm">CN</AvatarFallback>
              </Avatar>
              <div className="grow">
                <h2 className="mb-1 text-lg font-bold capitalize text-brand-black">
                  {jobDetail.jobTitle}
                </h2>
                <JobStatusSelect jobStatus={jobDetail.jobStatus} />
              </div>
              <div className="self-start">
                <EditJobSheet jobDetail={jobDetail} />
              </div>
            </div>
          </CardHeader>
          <ScrollArea className="grow">
            <CardContent className="  space-y-6   p-0 md:p-6 ">
              <div className="grid gap-[19px] px-6 text-sm font-medium text-brand-grey  md:grid-cols-2 md:px-0 ">
                {jobInfo?.map((info) => (
                  <div
                    key={crypto.randomUUID()}
                    className="flex items-start  gap-1"
                  >
                    {info.icon}
                    <p>{info.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 px-6 text-sm md:px-0">
                <h3 className="font-semibold text-brand-black">
                  Job description{" "}
                </h3>
                <p className="font-normal leading-5 text-brand-grey">
                  <ReadMoreAndLessText text={jobDetail.jobDescription} />
                </p>
              </div>
              {/* screening Questions */}
              <div className="flex flex-col gap-3 border-y border-border bg-background px-6 py-5 md:border-y-0 md:bg-inherit md:px-0 md:py-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-brand-black">
                    Screening questions
                  </h3>
                  <p
                    className="cursor-pointer text-sm font-medium text-[#3790E3]"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    view all
                  </p>
                </div>
                {jobQuestions
                  ?.filter((question: any) => question.isSelected)
                  // ?.slice(0, 4)
                  ?.map((question: any) => (
                    <div
                      className="hidden text-sm font-normal leading-5 text-[#5E5E5E] md:block"
                      key={question.id}
                    >
                      {question.question}
                    </div>
                  ))}
              </div>
            </CardContent>
          </ScrollArea>
        </Card>
        <AddJobQuestionDialog
          open={isOpen}
          setOpen={setOpen}
          jobId={jobId}
          jobQuestions={jobQuestions}
        />
      </>
    );
  }
};

export default JobLeft;
