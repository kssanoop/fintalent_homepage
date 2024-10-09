import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  AddQuestion,
  useAddJobQuestionById,
} from "@/features/jobs/api/add-job-questions";
import { useDeleteJobQuestionById } from "@/features/jobs/api/delete-job-question";
import { useToggleJobQuestionById } from "@/features/jobs/api/toggle-job-question";
import { AddQuestions } from "@/features/jobs/schema/add-job-question-schema";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddJobQuestionFormProps {
  jobId?: string;
  jobQuestions: AddQuestions[];
  Interface?: string;
}

const AddJobQuestionForm = ({
  jobId,
  jobQuestions,
  Interface,
}: AddJobQuestionFormProps) => {
  const [addingCustom, setAddingCustom] = useState(false);
  const [deletingQuestionId, setDeletingQuestionId] = useState<string | null>(
    null,
  );

  // console.log("job questions received:", jobQuestions);

  const queryClient = useQueryClient();
  const form = useForm<AddQuestion>();

  const handleAddQuestionSuccess = (data: any) => {
    queryClient.invalidateQueries({ queryKey: ["getJobQuestionById"] });
    form.setValue("question", "");
    // toast.success(data?.message);
  };

  const handleAddQuestionError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };
  const {
    mutate: addJobQuestion,
    isLoading: isAddingQuestion,
    isError: isAddingQuestionError,
  } = useAddJobQuestionById(handleAddQuestionSuccess, handleAddQuestionError);

  const {
    mutate: deleteJobQuestion,
    isLoading: isDeleteingQuestion,
    isError: isDeletingQuestionError,
  } = useDeleteJobQuestionById(
    handleAddQuestionSuccess,
    handleAddQuestionError,
  );
  const { mutate: toggleJobQuestion } = useToggleJobQuestionById(
    handleAddQuestionSuccess,
    handleAddQuestionError,
  );

  const handleCheckboxChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    // console.log("Checkbox toggled for question ID:", id);
    if (jobId) {
      toggleJobQuestion({ jobId, questionId: id });
    }
  };

  const removeQuestion = (id: string) => {
    // console.log("Removing question with ID:", id);
    if (jobId && id) {
      setDeletingQuestionId(id);
      deleteJobQuestion({ jobId, questionId: id });
    }
  };

  const onSubmit: SubmitHandler<AddQuestion> = (values) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    addJobQuestion({ question: values, jobId });
  };

  console.log("question data:", jobQuestions);
  return (
    <>
      <div className="flex flex-col gap-3">
        {jobQuestions
          // .filter((question: any) => question.id.startsWith("R-"))
          // .slice(0, 4)
          ?.map((question: any, _index: number) => (
            <div key={question.id} className="flex justify-between">
              <div className="flex items-center gap-1">
                {Interface !== "admin" && (
                  <div className="flex">
                    <Checkbox
                      className="h-4 w-4 text-[#000000]"
                      id={`question-${question.id}`}
                      defaultChecked={question.isSelected}
                      onChange={(e: any) => {
                        handleCheckboxChange(question.id, e);
                      }}
                      onCheckedChange={(e: any) => {
                        handleCheckboxChange(question.id, e);
                      }}
                    />
                  </div>
                )}
                {
                  <div className="text-sm font-normal leading-5 text-[#5E5E5E]">
                    {question.question}
                  </div>
                }
              </div>

              {/* delete Button */}
              {question.id.startsWith("R-") && (
                <>
                  {isDeleteingQuestion &&
                  !isDeletingQuestionError &&
                  deletingQuestionId === question.id ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </div>
                  ) : (
                    <Trash
                      color="#5E5E5E"
                      size={18}
                      className="cursor-pointer"
                      onClick={() => {
                        removeQuestion(question.id);
                      }}
                    />
                  )}
                </>
              )}
            </div>
          ))}
      </div>
      {addingCustom ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mt-2 space-y-3"
          >
            <FormField
              control={form.control}
              name="question"
              rules={{
                required: {
                  value: true,
                  message: "Please enter a question",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col gap-1">
                    <FormLabel className="text-base font-medium">
                      Add new question
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Type here..." {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2.5 self-end pt-[10px]">
              <Button
                type="button"
                variant={"outline"}
                className="rounded-[5px] border-[#A9A9A9] text-base font-semibold text-[#5E5E5E] hover:text-[#5E5E5E] md:w-[85px]"
                onClick={() => {
                  setAddingCustom(false);
                }}
              >
                Cancel
              </Button>
              {isAddingQuestion && !isAddingQuestionError ? (
                <Button disabled variant={"gradient"}>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </Button>
              ) : (
                <Button type="submit" variant="gradient" className="w-[75px]">
                  Save
                </Button>
              )}
            </div>
          </form>
        </Form>
      ) : (
        <div
          className="cursor-pointer text-base font-medium text-[#034A9A]"
          onClick={() => {
            setAddingCustom(true);
          }}
        >
          +Add custom
        </div>
      )}
    </>
  );
};

export default AddJobQuestionForm;
