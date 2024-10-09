import { Input } from "@/components/ui/input";
import { ControllerRenderProps } from "react-hook-form";
import { QualificationShema } from "@/features/qualifications/type/qualification-schema";
import { SkillSchema } from "@/features/skills/types/skills";

interface SkillsAndQualificationsInputProps {
  field:
    | ControllerRenderProps<SkillSchema, "skill">
    | ControllerRenderProps<QualificationShema, "qualification">;
  placeholder: string;
}

const SkillsAndQualificationsInput = ({
  field,
  placeholder,
}: SkillsAndQualificationsInputProps) => {
  return (
    <Input
      placeholder={placeholder}
      {...field}
      className="h-10 placeholder:text-[#A9A9A9] focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  );
};

export default SkillsAndQualificationsInput;
