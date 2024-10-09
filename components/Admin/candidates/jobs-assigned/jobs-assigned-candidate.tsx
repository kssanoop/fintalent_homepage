import React from "react";
import JobAssignedCard from "./job-assigned-card";
import { useGetJobAssignedCandidate } from "@/features/ProfileEdit/api/get-candidate-jobs-assigned";
import { useRouter } from "next/router";
import { JobApplicationSchema } from "@/features/jobs/schema/job-application-schema";
import SkeletonLoader from "./skeleton-loader";

const JobsAssignedCandidate = () => {
  const router = useRouter();
  const candidateId = router.query.candidateId as string;

  const { data, isLoading, isError } = useGetJobAssignedCandidate({
    candidateId,
  });

  if (isLoading)
    return (
      <div className="flex flex-col gap-4">
        {
          // eslint-disable-next-line react/no-array-index-key
          [...Array(6)].map((item, index) => (
            <SkeletonLoader key={index} />
          ))
        }
      </div>
    );
  if (isError) return <p>Something went Wrong</p>;
  return (
    <div className="flex flex-col gap-4">
      {data.length === 0 ? (
        <p className="mx-auto my-6 text-center text-xl text-brand-blue">
          No Jobs assinged.
        </p>
      ) : (
        data?.map((item: JobApplicationSchema) => (
          <div className="flex flex-col" key={item._id}>
            <JobAssignedCard data={item} />
          </div>
        ))
      )}
    </div>
  );
};

export default JobsAssignedCandidate;
