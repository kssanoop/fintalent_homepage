import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import SkillsAndQualificationsInput from "./skills-and-qualifications-input";
import { Loader2 } from "lucide-react";
import { QualificationShema } from "@/features/qualifications/type/qualification-schema";
import useAddQualification from "@/features/qualifications/api/add-qualification";

const QualificationsAdditionForm = () => {
  const form = useForm<QualificationShema>({
    defaultValues: {
      qualification: "",
    },
  });

  const handleSuccess = () => {
    form.reset();
  };

  const { mutate: addQualification, isLoading } = useAddQualification({
    handleSuccess,
  });

  const onSubmit: SubmitHandler<QualificationShema> = (values) => {
    addQualification(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-1">
        <FormField
          control={form.control}
          name="qualification"
          rules={{ required: "Qualification cannot be empty" }}
          render={({ field }) => (
            <div className="w-full">
              <FormControl>
                <SkillsAndQualificationsInput
                  placeholder="Type new qualification"
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

export default QualificationsAdditionForm;
