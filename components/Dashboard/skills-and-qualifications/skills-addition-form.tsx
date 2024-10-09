import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import SkillsAndQualificationsInput from "./skills-and-qualifications-input";
import useAddSkill from "@/features/skills/api/add-skill";
import { Loader2 } from "lucide-react";
import { SkillSchema } from "@/features/skills/types/skills";

const SkillsAdditionForm = () => {
  const form = useForm<SkillSchema>({
    defaultValues: {
      skill: "",
    },
  });

  const handleSuccess = () => {
    form.reset();
  };

  const { mutate: addSkill, isLoading } = useAddSkill({ handleSuccess });

  const onSubmit: SubmitHandler<SkillSchema> = (values) => {
    addSkill(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-1">
        <FormField
          control={form.control}
          name="skill"
          rules={{ required: "Skill cannot be empty" }}
          render={({ field }) => (
            <div className="w-full">
              <FormControl>
                <SkillsAndQualificationsInput
                  placeholder="Type new skill"
                  field={field}
                />
              </FormControl>
              <FormMessage />
            </div>
          )}
        />

        <Button
          variant="gradient"
          disabled={isLoading}
          className="text-sm font-bold"
        >
          {isLoading ? (
            <>
              Adding... <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            "Add"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default SkillsAdditionForm;
