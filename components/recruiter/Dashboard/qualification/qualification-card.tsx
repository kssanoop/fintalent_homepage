import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetDashboardQualification } from "@/features/profile-setup/api/get-dashboard-qualification";
import { useRouter } from "next/router";
import { useEffect } from "react";

type QualificationDataType = {
  count: number;
  qualification: string;
};

const QualificationCard = () => {
  const router = useRouter();
  const redirectingUrl = "/recruiter/candidates";
  const { data: qualificationData, isLoading } = useGetDashboardQualification();

  const sortedArray = qualificationData
    ?.slice()
    ?.sort((a: any, b: any) => b.count - a.count);

  useEffect(() => {
    // Prefetch the  page
    router.prefetch(redirectingUrl);
  }, [router]);

  return (
    <Card
      onClick={() => {
        router.push(redirectingUrl);
      }}
      className="flex cursor-pointer flex-col gap-6 p-5 transition-all hover:shadow lg:w-full"
    >
      {/* bars */}
      {isLoading ? (
        <>
          <div className="flex flex-col gap-[5px]">
            <Skeleton className="h-3 w-24 rounded-sm" />
            <Skeleton className="h-3 w-32 rounded-sm" />
          </div>
          {[...Array(4)].map(() => (
            <div className="flex flex-col gap-1" key={crypto.randomUUID()}>
              <div className="flex justify-between">
                <Skeleton className="h-3 w-10 rounded-sm" />
                <div className="flex gap-1">
                  <Skeleton className="h-3 w-9 rounded-sm" />
                  <Skeleton className="h-3 w-9 rounded-sm" />
                </div>
              </div>
              <Skeleton className="h-6 w-full rounded-sm" />
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="flex flex-col gap-[5px]">
            <h5 className="text-base font-bold text-black">Qualifications</h5>
            <p className="text-base font-normal text-[#5E5E5E]">
              These are the top education qualifications in our platform{" "}
            </p>
          </div>
          <div className="flex flex-col gap-[22px]">
            {sortedArray
              ?.sort((a: number, b: number) => a - b)
              .splice(0, 4)
              .map((item: QualificationDataType) => (
                <div className="flex flex-col gap-1" key={crypto.randomUUID()}>
                  <div className="flex justify-between">
                    <h5 className="text-base font-normal tracking-[-0.32px] text-black">
                      {item?.qualification}
                    </h5>
                    <div className="flex gap-0.5 text-sm font-normal tracking-[-0.28px] text-black">
                      <h5 className=" font-bold">{item?.count}</h5>
                      <p>candidates</p>
                    </div>
                  </div>
                  {/* progress-bar */}
                  <Progress
                    value={item?.count}
                    className="h-[5px] rounded-none bg-[#EFEFEF]"
                    indicatorColor="bg-[#B21450]"
                  />
                </div>
              ))}
          </div>
        </>
      )}
    </Card>
  );
};

export default QualificationCard;
