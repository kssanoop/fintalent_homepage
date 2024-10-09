import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Briefcase, ChevronLeft, IndianRupee, MapPin } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useErrorBoundary } from "react-error-boundary";
import _ from "lodash";
// import JobStatusSelect from "@/components/job/job-status-select";
import { useGetJobById } from "@/features/jobs/api/get-job-by-id";

const JobLeft = () => {
  const router = useRouter();
  const jobId = router.query.id as string;
  const { data: jobDetail, isLoading, isError, error } = useGetJobById(jobId);
  const { showBoundary } = useErrorBoundary();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (isError || !jobDetail) {
    showBoundary(error);
    return null;
  }

  const convertedJobType = jobDetail.jobType.map((type) => _.startCase(type));
  const jobInfo = [
    {
      value:
        convertedJobType.length > 1
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
  console.log(jobDetail);
  return (
    <>
      <Card className="flex h-full flex-col break-all border-0 p-0  md:border  ">
        <CardHeader className="space-y-5 px-6 pb-5 pt-6 md:p-6 ">
          <Link href="/teamlead/jobs" className="flex items-center gap-1">
            <ChevronLeft width={14} height={14} color="#5E5E5E" />
            <p className="text-sm font-light text-black">Back to jobs</p>
          </Link>
          <div className="flex gap-2">
            <Avatar className="h-[52px] w-[52px] rounded-sm shadow">
              <AvatarImage
                src="github.com/sds"
                // src={`${process.env.NEXT_PUBLIC_IMG_URL}${jobDetail.companyId.companyLogo.storageName}`}
              />
              <AvatarFallback className="rounded-sm">CN</AvatarFallback>
            </Avatar>
            <div className="grow">
              <h2 className="mb-1 text-lg font-bold capitalize text-brand-black">
                {jobDetail.jobTitle}
              </h2>
              <p
                className={`${
                  jobDetail.jobStatus === "open"
                    ? "text-[#00BA70]"
                    : jobDetail.jobStatus === "hold"
                    ? " text-[#DEAC2B]"
                    : "text-[#E72F2F]"
                }`}
              >
                {jobDetail.jobStatus}
              </p>
              {/* <JobStatusSelect jobStatus={jobDetail.jobStatus} /> */}
            </div>
          </div>
        </CardHeader>
        <CardContent className="scroll-container  grow space-y-6  overflow-y-hidden p-0 hover:overflow-auto md:p-6 ">
          <div className="grid gap-[19px] px-6 text-sm font-medium text-brand-grey  md:grid-cols-2 md:px-0 ">
            {jobInfo.map((info) => (
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
            <h3 className="font-semibold text-brand-black">Job description </h3>
            <p className="font-normal leading-5 text-brand-grey ">
              {jobDetail.jobDescription}
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default JobLeft;
