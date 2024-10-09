import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CandidateFilters } from "@/features/get-candidates/type/candidate-filter";
import useGetCandidatesUnderTeamLeadForAdmin from "@/features/admin/team-lead/api/get-candidates-under-team-lead-for-admin";
import CandidatesFilterSheet from "@/features/get-candidates/components/canidates-filter-sheet";
import CandidatesFilter from "@/features/get-candidates/components/candidates-filter";
import InfoCardSkeleton from "@/components/skeleton/info-card-skeleton";
import TeamLeadCandidatesList from "./team-lead-candidates-list";

const TeamLeadCandidatesContainer = ({
  teamLeadId,
}: {
  teamLeadId: string;
}) => {
  const [filters, setFilters] = useState<CandidateFilters | {}>({});

  const [isViewAllFilterType, setIsViewAllFilterType] =
    useState<boolean>(false);

  const { data, isFetching, isError } = useGetCandidatesUnderTeamLeadForAdmin({
    teamLeadId,
    ...filters,
  });

  const form = useForm<CandidateFilters>({
    defaultValues: {
      employmentType: [],
      experianceLevel: [],
      employmentMode: [],
      location: [],
      skills: [],
      qualification: [],
      salaryBegin: "0",
      salaryEnd: "0",
      gender: [],
      ageRange: [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const onFilterSubmit: SubmitHandler<CandidateFilters> = (values) => {
    const formattedData = {
      ...values,
      skills: values.skills.map((skill: any) => skill?.value),
      qualification: values.qualification.map(
        (qualification: any) => qualification?.value,
      ),
    };

    setFilters(formattedData);
  };
  return (
    <>
      <div className="md:w-[24%] md:min-w-[300px]">
        <CandidatesFilter
          onSubmit={onFilterSubmit}
          form={form}
          isViewAllFilterType={isViewAllFilterType}
          candidatesFilterSheet={
            <CandidatesFilterSheet
              onSubmit={onFilterSubmit}
              form={form}
              isViewAllFilterType={isViewAllFilterType}
              setIsViewAllFilterType={setIsViewAllFilterType}
            />
          }
        />
      </div>

      <div className="scroll-container grow space-y-2 overflow-y-auto">
        {isFetching ? (
          <>
            {[...Array(3)].map(() => (
              <InfoCardSkeleton key={crypto.randomUUID()} />
            ))}
          </>
        ) : isError ? (
          <p className="text-center text-lg text-brand-blue">
            Something went wrong please try again
          </p>
        ) : !data?.data || data?.data.length === 0 ? (
          <p className="text-center text-lg text-brand-blue">
            No candidates found
          </p>
        ) : (
          <TeamLeadCandidatesList candidates={data.data} />
        )}
      </div>
    </>
  );
};

export default TeamLeadCandidatesContainer;
