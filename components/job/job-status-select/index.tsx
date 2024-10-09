import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobStatus } from "@/features/jobs/type/job-status";
import { cn } from "@/utils/cnHelper";
import { useState } from "react";
import { toast } from "sonner";
import useUpdateJobState from "@/features/jobs/api/update-job-state";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const OPTIONS: Array<{ id: number; label: string; value: JobStatus }> = [
  { id: 1, label: "Actively hiring", value: "open" },
  { id: 2, label: "On hold", value: "hold" },
  { id: 3, label: "Closed", value: "closed" },
];

const JobStatusSelect = ({ jobStatus }: { jobStatus: JobStatus }) => {
  const router = useRouter();
  const jobId = router.query.id as string;
  const [selectedValue, setSelectedValue] = useState(jobStatus);
  const queryClient = useQueryClient();
  const handleSuccess = (data: any) => {
    queryClient.invalidateQueries({ queryKey: ["all-jobs"] });
    // toast.success(data.message);
  };

  const handleError = (error: any) => {
    console.log("Error: ", error);
    toast.error(error.message);
  };
  const { mutate } = useUpdateJobState(handleSuccess, handleError);
  const handleSelectChange = (value: JobStatus) => {
    setSelectedValue(value);
    mutate({ jobId, jobStatus: value });
  };
  console.log(jobStatus);
  return (
    <Select value={selectedValue} onValueChange={handleSelectChange}>
      <SelectTrigger
        className={cn(
          "h-auto w-full justify-normal border-0 p-0 text-sm font-normal focus:ring-0 focus:ring-offset-0",
          selectedValue === "open"
            ? "text-[#00BA70]"
            : selectedValue === "hold"
            ? " text-[#DEAC2B]"
            : "text-[#E72F2F]",
        )}
      >
        <SelectValue className="bg-red-500" />
      </SelectTrigger>
      <SelectContent>
        {OPTIONS.map(({ id, label, value }) => (
          <SelectItem key={id} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default JobStatusSelect;
