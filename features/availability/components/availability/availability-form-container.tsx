import { SetOpenType as AvailabilityFormContainerProps } from "../../types/types";
import useGetCandidateProfile from "@/features/profile/candidate/api/getProfile";
import AvailabilityForm from "./availability-form";
import { useErrorBoundary } from "react-error-boundary";
import { Loader2 } from "lucide-react";

const AvailabilityFormContainer = ({
  setOpen,
}: AvailabilityFormContainerProps) => {
  const { data, isLoading, isError, error } = useGetCandidateProfile();

  const { showBoundary } = useErrorBoundary();

  if (isError) {
    showBoundary(error);
    return null;
  }

  return (
    <>
      {isLoading ? (
        <Loader2 className="mx-auto mt-4 animate-spin" />
      ) : (
        <AvailabilityForm setOpen={setOpen} data={data} />
      )}
    </>
  );
};

export default AvailabilityFormContainer;
