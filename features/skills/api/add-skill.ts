import { axios } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SkillSchema } from "../types/skills";
import { toast } from "sonner";

const addSkill = async (data: SkillSchema) => {
  return await axios({
    url: "/misc/skills",
    method: "POST",
    data,
  });
};

export const useAddSkill = ({
  handleSuccess,
}: {
  handleSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      handleSuccess();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message);
    },
  });
};

export default useAddSkill;
