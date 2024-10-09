// import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  // DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { useFileUploadToS3 } from "@/features/auth/api/upload-s3";
// import { Paperclip, X } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { usePostAnswer } from "./api/useSendAnswer";
import AcceptJobQuestionForm from "./acceptjobQuestionForm";
// import { AcceptJobQuestionSheet } from "./acceptJobQuestionSheet";

export interface Question {
  id: number;
  question: string;
  answer: string;
  fileState: {
    file: File | undefined;
    originalFileName: string;
    storageFileName: string;
  };
}

interface AccpetjobquestionProps {
  open: boolean;
  // openSheet: boolean;
  // setOpenSheet: Dispatch<SetStateAction<boolean>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  questions: Question[];
  jobId: string;
}
export type FormSubmitSchema = {
  question: string;
  answer: string;
  // file?: File;
  file?: any;
};

const Accpetjobquestion = ({
  open,
  setOpen,
  questions,
  jobId,
}: AccpetjobquestionProps) => {
  const [questionResponses, setQuestionResponses] =
    useState<Question[]>(questions);
  // const [errorShow, setErrorShow] = useState("");
  console.log("question data id:", jobId);
  // select dilaog open
  // const openFileInput = (index: number) => {
  //   const fileInput = document.getElementById(
  //     `file-upload-${index}`,
  //   ) as HTMLInputElement;

  //   if (fileInput) {
  //     // Reset the input value
  //     fileInput.value = "";
  //     // Trigger a change event manually
  //     fileInput.dispatchEvent(new Event("change", { bubbles: true }));
  //   }
  // };

  // file selection
  // const handleFileChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   index: number,
  // ) => {
  //   const selectedFile = event?.target?.files?.[0];

  //   setQuestionResponses((prevResponses) =>
  //     prevResponses.map((question, currentIndex) =>
  //       currentIndex === index
  //         ? {
  //             ...question,
  //             fileState: {
  //               file: selectedFile,
  //               originalFileName: selectedFile?.name ?? "",
  //               storageFileName: "",
  //             },
  //           }
  //         : question,
  //     ),
  //   );

  //   // Clear the value of the input element
  //   const fileInput = document.getElementById(
  //     `file-upload-${index}`,
  //   ) as HTMLInputElement;

  //   if (fileInput) {
  //     fileInput.value = "";
  //   }
  // };

  // input text change
  // const handleInputChange = (value: string, index: number) => {
  //   setQuestionResponses((prevResponses) =>
  //     prevResponses.map((question, currentIndex) =>
  //       currentIndex === index
  //         ? {
  //             ...question,
  //             answer: value,
  //           }
  //         : question,
  //     ),
  //   );
  // };

  function handleSuccessAnswer(data: any) {
    setOpen(false);
    toast.success(data?.message);
  }

  function handleErrorAnswer(error: any) {
    toast.error(error?.response?.data?.message);
  }

  const { mutate: mutateAddAnswer } = usePostAnswer(
    handleSuccessAnswer,
    handleErrorAnswer,
    jobId,
  );

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
    console.log("File Data", fileData);
    // toast.success("Photo Uploaded successfully");

    setQuestionResponses((prevResponses) =>
      prevResponses.map((prevQuestion) =>
        prevQuestion.id === questionId
          ? {
              ...prevQuestion,
              fileState: {
                ...prevQuestion?.fileState,
                originalFileName: fileData?.name,
                storageFileName: new URL(data).pathname,
              },
            }
          : prevQuestion,
      ),
    );

    const updatedResponses = questionResponses.map((prevQuestion) => {
      const { id, fileState } = prevQuestion;

      if (id === questionId) {
        if (fileState?.file) {
          return {
            question: prevQuestion.question,
            answer: prevQuestion.answer,
            file: {
              originalName: fileData?.name ?? "",
              storageName: new URL(data).pathname,
            },
          };
        } else {
          return {
            question: prevQuestion.question,
            answer: prevQuestion.answer,
          };
        }
      }
      return {
        question: prevQuestion.question,
        answer: prevQuestion.answer,
        file: {},
      };
    });

    const validUpdatedResponses: any = updatedResponses.filter(
      (updatedResponse) => updatedResponse !== null,
    );

    mutateAddAnswer(validUpdatedResponses);
  }

  // // handle file upload
  // const handleUpload = async () => {
  //   const requestData = questionResponses.map((question) => {
  //     const { fileState, id } = question;
  //     const { file } = fileState || {};

  //     if (!question?.answer?.trim()) {
  //       setErrorShow("Please write an answer");
  //       return null;
  //     } else if (
  //       file &&
  //       (file.type.includes("pdf") || file.type.includes("excel"))
  //     ) {
  //       console.log(`File ${id} is a PDF or Excel file`);
  //       uploadMutate({ fileData: file, fileType: "common" });
  //       return null; // Skip this question for now since it's being uploaded separately
  //     } else {
  //       // Handle the case when no file is selected
  //       return {
  //         question: question.question,
  //         answer: question.answer,
  //         file: undefined, // Set file to undefined for optional file selection
  //       };
  //     }
  //   });

  //   const validRequestData: FormSubmitSchema[] = requestData.filter(
  //     (data) => data !== null,
  //   ) as FormSubmitSchema[];

  //   if (validRequestData.length > 0) {
  //     // Submit questions without files
  //     mutateAddAnswer(validRequestData);
  //   }
  // };

  // upload to s3
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { isLoading, mutate: uploadMutate } = useFileUploadToS3(
    (data: string, fileData: File, index: number) => {
      handleSuccess(data, fileData, index);
    },
    handleError,
    uploadProgress,
  );
  // handle file unset
  // const handleFileUnselect = (index: number) => {
  //   if (index) {
  //     setQuestionResponses((prevResponses) =>
  //       prevResponses.map((prevQuestion) =>
  //         prevQuestion.id === index
  //           ? {
  //               ...prevQuestion,
  //               fileState: {
  //                 file: undefined,
  //                 originalFileName: "",
  //                 storageFileName: "",
  //               },
  //             }
  //           : prevQuestion,
  //       ),
  //     );
  //   }
  // };

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(false);
        }}
      >
        <DialogContent className="hidden p-8 md:block md:min-w-[875px]">
          <DialogHeader className="overflow-auto px-1">
            <div className="flex flex-col gap-1 pb-7 text-start text-sm font-medium leading-6 text-[#5E5E5E]">
              <DialogTitle className="text-xl font-bold text-[#1C1C1C]">
                Screening questions
              </DialogTitle>
              Let the recruiters know about you.
            </div>
            <DialogDescription>
              <AcceptJobQuestionForm
                setOpen={setOpen}
                questions={questions}
                jobId={jobId}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Accpetjobquestion;
