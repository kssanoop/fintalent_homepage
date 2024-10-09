import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { useAddQuestionAdmin } from "@/features/jobs/admin/api/add-question";
import { useDeleteQuestionAdmin } from "@/features/jobs/admin/api/delete-admin-question";
import { useEditQuestionAdmin } from "@/features/jobs/admin/api/edit-admin-question";
import { useGetAdminQuestions } from "@/features/jobs/admin/api/get-admin-question";
import { AddQuestion } from "@/features/jobs/api/add-job-questions";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, MoreVertical } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const AdminJobQuestionForm = () => {
  const [addingCustom, setAddingCustom] = useState(false);

  const { data, isLoading } = useGetAdminQuestions();
  //   console.log("question received:", data);

  const [editingQuestionId, setEditingQuestionId] = useState<number | null>(
    null,
  );
  const [editedQuestionText, setEditedQuestionText] = useState<string>("");

  const queryClient = useQueryClient();
  const form = useForm<AddQuestion>();

  const handleAddQuestionSuccess = (data: any) => {
    queryClient.invalidateQueries({ queryKey: ["get-all-job-questions"] });
    form.setValue("question", "");
    setEditingQuestionId(null);
    toast.success(data?.message);
  };

  const handleAddQuestionError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };
  const {
    mutate: addJobQuestion,
    isLoading: isAddingQuestion,
    isError: isAddingQuestionError,
  } = useAddQuestionAdmin(handleAddQuestionSuccess, handleAddQuestionError);

  const { mutate: deleteJobQuestion } = useDeleteQuestionAdmin(
    handleAddQuestionSuccess,
    handleAddQuestionError,
  );

  const {
    mutate: editJobQuestion,
    isLoading: isEditingQuestion,
    isError: isEditingQuestionError,
  } = useEditQuestionAdmin(handleAddQuestionSuccess, handleAddQuestionError);

  const removeQuestion = (id: number) => {
    // console.log("Removing question with ID:", id);
    deleteJobQuestion({ index: id });
  };

  const handleEditClick = (questionId: number, questionText: string) => {
    setAddingCustom(false);
    setEditingQuestionId(questionId);
    setEditedQuestionText(questionText);
  };

  const onSubmit: SubmitHandler<AddQuestion> = (values) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    addJobQuestion(values);
  };

  //   console.log("question data:", jobQuestions);
  return (
    <>
      <div className="flex w-full flex-col gap-3">
        {isLoading ? (
          <div className="self-center text-center">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : !isLoading && data?.length === 0 ? (
          <div className="flex items-center justify-center">
            <div className="text-base font-normal leading-6 text-[#5E5E5E]">
              No questions added yet
            </div>
          </div>
        ) : (
          data?.map((question: any, index: number) => (
            <div key={index} className="flex justify-between">
              <div className="flex w-full items-center gap-1">
                {editingQuestionId === index ? (
                  <div className="flex w-full flex-col gap-3">
                    <Input
                      type="text"
                      value={editedQuestionText}
                      onChange={(e) => {
                        setEditedQuestionText(e.target.value);
                      }}
                      className=" w-full"
                    />
                    <div className="flex gap-2.5 self-end">
                      <Button
                        variant="outline"
                        className="w-[75px]"
                        onClick={() => {
                          setEditingQuestionId(null);
                        }}
                      >
                        Cancel
                      </Button>
                      {isEditingQuestion && !isEditingQuestionError ? (
                        <Button
                          variant="gradient"
                          className="w-[75px]"
                          disabled
                        >
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Editing...
                        </Button>
                      ) : (
                        <Button
                          variant="gradient"
                          className="w-[75px]"
                          onClick={() => {
                            editJobQuestion({
                              data: { question: editedQuestionText },
                              index: editingQuestionId,
                            });
                          }}
                        >
                          Save
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-base font-normal leading-6 text-[#5E5E5E]">
                    {question}
                  </div>
                )}
              </div>
              {/* options */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  {index !== editingQuestionId && (
                    <MoreVertical size={22} color="#5E5E5E" />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => {
                      handleEditClick(index, question);
                    }}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      removeQuestion(index);
                    }}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))
        )}
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

export default AdminJobQuestionForm;
