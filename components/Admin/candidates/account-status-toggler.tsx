import { ToggleSwitch } from "@/components/toggle-switch";
import { useCandidateProfileStatusAction } from "@/features/admin/candidate/api/activate-inactivate-profile";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface AccountStatusTogglerProps {
  accountStatus?: string;
}

const AccountStatusToggler = ({ accountStatus }: AccountStatusTogglerProps) => {
  const [isOn, setIsOn] = useState(accountStatus === "active");
  const queryClient = useQueryClient();
  const router = useRouter();
  const previousStatus = useRef(isOn);
  const candidateId = router.query.candidateId as string;
  const handleSuccess = (data: any) => {
    queryClient.invalidateQueries({ queryKey: ["get-candidate-by-id"] });
    toast.success(data?.message);
  };
  const handleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const { mutate } = useCandidateProfileStatusAction(
    handleSuccess,
    handleError,
  );

  useEffect(() => {
    if (previousStatus.current !== isOn) {
      previousStatus.current = isOn;
      if (isOn) {
        mutate({ candidateId, action: "active" });
      } else {
        mutate({ candidateId, action: "inactive" });
      }
    }
  }, [mutate, isOn, candidateId]);

  return (
    <div className="w-full rounded-[5px] bg-[#EFEFEF] px-2.5 py-1.5">
      <div className="flex justify-center gap-2">
        <p className="text-sm font-medium leading-6 text-[#012A59]">
          Account status
        </p>
        <ToggleSwitch isOn={isOn} setIsOn={setIsOn} />
      </div>
    </div>
  );
};

export default AccountStatusToggler;
