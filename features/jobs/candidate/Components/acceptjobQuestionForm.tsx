import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { FormSubmitSchema, Question } from "./accpetjobquestion";
import { toast } from "sonner";
import { usePostAnswer } from "./api/useSendAnswer";
import { useFileUploadToS3 } from "@/features/auth/api/upload-s3";
import { Paperclip, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

const checkFileTypeIsAccepted = (file: File) =>
  file.type.includes("pdf") || file.type.includes("excel");

interface AcceptJobQuestionFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  questions: Question[];
  jobId: string;
}

const AcceptJobQuestionForm = ({
  questions,
  jobId,
  setOpen,
}: AcceptJobQuestionFormProps) => {
  const [questionResponses, setQuestionResponses] =
    useState<Question[]>(questions);

  const queryClient = useQueryClient();
  const form = useForm();

  // file selection
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const selectedFile = event?.target?.files?.[0];

    setQuestionResponses((prevResponses) =>
      prevResponses.map((question, currentIndex) =>
        currentIndex === index
          ? {
              ...question,
              fileState: {
                file: selectedFile,
                originalFileName: selectedFile?.name ?? "",
                storageFileName: "",
              },
            }
          : question,
      ),
    );

    // Clear the value of the input element
    const fileInput = document.getElementById(
      `file-upload-${index}`,
    ) as HTMLInputElement;

    if (fileInput) {
      fileInput.value = "";
    }
  };

  function handleSuccessAnswer(data: any) {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["getallCandidateJobs"] });
    queryClient.invalidateQueries({ queryKey: ["getCandidateJobs"] });
    queryClient.invalidateQueries({ queryKey: ["getallCandidateJobslength"] });
    toast.success(data?.message);
  }

  function handleErrorAnswer(error: any) {
    toast.error(error?.response?.data?.message);
  }

  const { isLoading: isSubmitingAnswer, mutate: mutateAddAnswer } =
    usePostAnswer(handleSuccessAnswer, handleErrorAnswer, jobId);

  // handle upload file error
  function handleError(error: any) {
    toast.error(error?.response?.data?.message);
  }

  function uploadProgress() {
    console.log("Progress");
  }

  // answer submission
  function handleSuccess(data: string, fileData: File, questionId: number) {
    console.log("Data received", data);
    console.log("File Data", fileData, questionId);
    // toast.success("Photo Uploaded successfully");

    // setQuestionResponses((prevResponses) =>
    //   prevResponses.map((prevQuestion) =>
    //     prevQuestion.id === questionId
    //       ? {
    //           ...prevQuestion,
    //           fileState: {
    //             ...prevQuestion?.fileState,
    //             originalFileName: fileData?.name,
    //             storageFileName: new URL(data).pathname,
    //           },
    //         }
    //       : prevQuestion,
    //   ),
    // );

    // const updatedResponses = questionResponses.map((prevQuestion) => {
    //   const { id, fileState } = prevQuestion;

    //   if (id === questionId) {
    //     console.log(id, questionId);
    //     if (fileState?.file) {
    //       return {
    //         question: prevQuestion.question,
    //         answer: prevQuestion.answer,
    //         file: {
    //           originalName: fileData?.name ?? "",
    //           storageName: new URL(data).pathname,
    //         },
    //       };
    //     } else {
    //       return {
    //         question: prevQuestion.question,
    //         answer: prevQuestion.answer,
    //       };
    //     }
    //   }
    //   return {
    //     question: prevQuestion.question,
    //     answer: prevQuestion.answer,
    //     file: {},
    //   };
    // });

    // const validUpdatedResponses: any = updatedResponses.filter(
    //   (updatedResponse) => updatedResponse !== null,
    // );
    // uncomment
    // mutateAddAnswer(validUpdatedResponses);
  }

  const handleUpload = async (values: any) => {
    const getRequestData = async () => {
      const result = await Promise.all(
        questionResponses.map(async (question, index) => {
          const { fileState } = question;
          const { file } = fileState || {};
          if (file && checkFileTypeIsAccepted(file)) {
            try {
              const res = await uploadMutateAsync({
                fileData: file,
                fileType: "common",
              });
              return {
                question: question.question,
                answer: values[`question${index}`],
                file: {
                  originalName: file?.name ?? "",
                  storageName: new URL(res).pathname,
                },
              };
            } catch (error) {
              handleError(error);
            }
          } else {
            return {
              question: question.question,
              answer: values[`question${index}`],
              file: undefined as undefined | any,
            };
          }
        }),
      );
      return result;
    };

    try {
      const requestData = await getRequestData();

      if (requestData.length > 0 && !requestData.includes(undefined)) {
        mutateAddAnswer(requestData as FormSubmitSchema[]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // upload to s3
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading: isUploadingToS3, mutateAsync: uploadMutateAsync } =
    useFileUploadToS3(
      (data: string, fileData: File, index: number) => {
        handleSuccess(data, fileData, index);
      },
      handleError,
      uploadProgress,
    );

  const handleFileUnselect = (selectedFileIndex: number) => {
    setQuestionResponses((prevResponses) =>
      prevResponses.map((prevQuestion, index) =>
        index === selectedFileIndex
          ? {
              ...prevQuestion,
              fileState: {
                file: undefined,
                originalFileName: "",
                storageFileName: "",
              },
            }
          : prevQuestion,
      ),
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (values) => {
          await handleUpload(values);
        })}
        className="space-y-6"
      >
        <div className="scroll-container hide-scrollbar flex max-h-[350px] flex-col gap-4 overflow-auto px-1 pb-1 md:max-h-[400px] md:gap-6">
          {questionResponses.map((question, index) => (
            <FormField
              key={question.id}
              control={form.control}
              name={`question${index}`}
              rules={{
                required: {
                  // if file type is accepted  no need to make input required
                  value: question.fileState?.file
                    ? !checkFileTypeIsAccepted(question.fileState.file)
                    : true,
                  message: "Please answer this question",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#1C1C1C]">
                    {question.question}
                  </FormLabel>
                  <FormControl>
                    <>
                      <div style={{ position: "relative" }}>
                        <Textarea
                          className="max-h-[130px] min-h-[130px] resize-none rounded-[5px] border
                          border-[#E1E1E1] p-3 text-base font-medium placeholder:text-[#A9A9A9]"
                          {...field}
                          placeholder="Type here"
                        />

                        <label
                          htmlFor={`file-upload-${index}`}
                          className="absolute bottom-3 right-3 cursor-pointer"
                        >
                          <Paperclip color="#000" strokeWidth={1.2} size={15} />
                        </label>
                        <Input
                          id={`file-upload-${index}`}
                          type="file"
                          accept=".pdf, .xls, .xlsx"
                          onChange={(e) => {
                            handleFileChange(e, index);
                          }}
                          style={{ display: "none" }}
                        />
                      </div>
                      {question?.fileState?.file && (
                        <div className="flex items-center gap-3">
                          <p>
                            Selected file: {question?.fileState?.file?.name}
                          </p>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              handleFileUnselect(index);
                            }}
                          >
                            <X color="#C51605" size={20} />
                          </div>
                        </div>
                      )}
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>

        <div className="flex justify-end gap-[10px]">
          <Button
            type="button"
            variant={"outline"}
            className="border border-[#CDCDCD] bg-[#F2F2F2] text-base font-bold text-[#5E5E5E] hover:text-[#5E5E5E]"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <div>
            {isSubmitingAnswer || isUploadingToS3 ? (
              <Button
                className={`min-w-[100px] border border-border text-base font-bold ${
                  isSubmitingAnswer || isUploadingToS3
                    ? "cursor-not-allowed opacity-50"
                    : "hover:opacity-80"
                }`}
                variant={"gradient"}
                type="submit"
                disabled={isSubmitingAnswer || isUploadingToS3}
              >
                Submitting...
              </Button>
            ) : (
              <Button
                className={`min-w-[100px] border border-border text-base font-bold ${
                  isSubmitingAnswer || isUploadingToS3
                    ? "cursor-not-allowed opacity-50"
                    : "hover:opacity-80"
                }`}
                variant={"gradient"}
                type="submit"
                disabled={isSubmitingAnswer || isUploadingToS3}
              >
                Send
              </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AcceptJobQuestionForm;
