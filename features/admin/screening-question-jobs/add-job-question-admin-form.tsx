import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AddQuestion } from "@/features/jobs/api/add-job-questions";
import { AddQuestions } from "@/features/jobs/schema/add-job-question-schema";
import { MoreVertical } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface AddJobQuestionFormProps {
  jobId?: string;
  jobQuestions: AddQuestions[];
  Interface?: string;
}

const AddJobQuestionFormAdmin = ({
  jobId,
  jobQuestions,
  Interface,
}: AddJobQuestionFormProps) => {
  const [addingCustom, setAddingCustom] = useState(false);
  //   const queryClient = useQueryClient();
  const form = useForm<AddQuestion>();

  //   const handleAddQuestionSuccess = (data: any) => {
  //     queryClient.invalidateQueries({ queryKey: ["getJobQuestionById"] });
  //     form.setValue("question", "");
  //     toast.success(data?.message);
  //   };

  //   const handleAddQuestionError = (error: any) => {
  //     toast.error(error?.response?.data?.message);
  //   };
  //   const {
  //     mutate: addJobQuestion,
  //     isLoading: isAddingQuestion,
  //     isError: isAddingQuestionError,
  //   } = useAddJobQuestionById(handleAddQuestionSuccess, handleAddQuestionError);

  const onSubmit: SubmitHandler<AddQuestion> = (values) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // addJobQuestion({ question: values, jobId });
  };

  console.log("question data:", jobQuestions);
  return (
    <>
      <div className="flex flex-col gap-3">
        {jobQuestions?.map((question: any, _index: number) => (
          <div key={question.id} className="flex justify-between">
            <div className="flex items-center gap-1">
              <div className="text-base font-normal leading-6 text-[#5E5E5E]">
                {question?.question}
              </div>
            </div>

            {/* options */}
            {Interface === "admin" && (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical size={22} color="#5E5E5E" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Billing</DropdownMenuItem>
                  <DropdownMenuItem>Team</DropdownMenuItem>
                  <DropdownMenuItem>Subscription</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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

            {/* <div className="flex justify-end gap-2.5 self-end pt-[10px]">
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
            </div> */}
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

export default AddJobQuestionFormAdmin;
