import {
  ApproveOrRejectSkillAction,
  useApproveOrRejectSkill,
} from "../../api/approve-or-reject-skill";
import { useRouter } from "next/router";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

const ApproveOrRejectBtn = ({
  action,
  pendingSkill,
}: {
  action: ApproveOrRejectSkillAction;
  pendingSkill: { name: string; level: string };
}) => {
  const router = useRouter();
  const candidateId = router.query?.candidateId as string;
  const queryClient = useQueryClient();
  const handleSuccess = () => {
    // Note: currently invalidating every query in cache , needs to change
    queryClient.invalidateQueries();
  };

  const handleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const { mutate, isLoading } = useApproveOrRejectSkill(
    handleSuccess,
    handleError,
  );

  const handleSubmit = ({
    skillInfo,
  }: {
    skillInfo: { name: string; level: string };
  }) => {
    const data = {
      skill: skillInfo.name,
      score: skillInfo.level,
    };
    mutate({ candidateId, action, data });
  };
  return (
    <Button
      disabled={isLoading}
      onClick={() => {
        handleSubmit({
          skillInfo: pendingSkill,
        });
      }}
      variant={action === "approve" ? "success" : "reject"}
      className={`${action === "approve" ? "bg-[#5ED678]" : "bg-[#FFEDED] text-[#E72F2F]"} h-[35px] w-full text-sm font-bold capitalize`}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        </>
      ) : (
        action
      )}
    </Button>
  );
};

type PendingSkillFormProps = {
  pendingSkill: { name: string; level: string };
};

const PendingSkillForm = ({ pendingSkill }: PendingSkillFormProps) => {
  const [selectedScore, setSelectededScore] = useState(
    pendingSkill.level.toString(),
  );
  const updatedSkill = {
    name: pendingSkill.name,
    level: selectedScore,
  };
  return (
    <div className="grid grid-cols-3 gap-5">
      <Input
        value={pendingSkill.name}
        readOnly
        className="h-[35px] focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      <Select value={selectedScore} onValueChange={setSelectededScore}>
        <SelectTrigger className="h-[35px]">
          <SelectValue
            placeholder="Select"
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#5E5E5E",
            }}
          />
          <SelectContent className="h-40 overflow-y-hidden">
            {Array.from({ length: 10 }, (_, i) => (
              <SelectItem key={i} value={(i + 1).toString()}>
                {(i + 1).toString().padStart(2, "0")}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectTrigger>
      </Select>
      <div className="ml-10 flex gap-3">
        <ApproveOrRejectBtn action="approve" pendingSkill={updatedSkill} />
        <ApproveOrRejectBtn action="reject" pendingSkill={updatedSkill} />
      </div>
    </div>
  );
};

export default PendingSkillForm;
