import ProgressBar from "@/components/progress/progress-bar";
import { useProgressBar } from "@/components/progress/useProgressBar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import RecruiterSchema from "../schemas/recruiter-profile";
import PersonalDetailsForm from "./personal-details";
import CompanyDetailsForm from "./company-details";
import useCreateRecruiter from "../../api/create-recruiter";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import useScrollToTop from "@/utils/hooks/useScrollToTop";
import useCheckPhoneNoUnique from "@/features/common/api/check-phone-no-unique";

const ProfileForm = () => {
  const Steps = ["Personal Details", "Company Details"];

  const { handleNextStep, handlePrevStep, currentStep } = useProgressBar(Steps);
  const form = useForm<RecruiterSchema>({
    defaultValues: {
      createType: "existingCompany",
      recruiterData: {
        fullName: "",
        companyId: "",
        designation: "",
        linkedIn: "",
        phoneNo: "",
      },
      companyData: {
        companyLinkedIn: "",
        companyLogo: {
          originalName: "",
          storageName: "",
        },
        companyName: "",
        companyPhoneNo: "",
        companyWebsite: "",
        location: "",
      },
    },
  });

  const handleSuccess = async (data: any) => {
    if (data.data.accountVerifiedStatus === "verified") {
      await router.push("/recruiter");
    } else await router.push("/pending-verification");
  };
  const handleError = async (error: any) => {
    toast.error(error.response.data.message);
  };

  const { scrollToTop } = useScrollToTop({
    elementId: "form-scroll-container",
  });

  const {
    mutate,
    isLoading: isSubmitting,
    isError,
  } = useCreateRecruiter(handleSuccess, handleError);

  const handleSuccessForNoCheck = async (data: any) => {
    handleNextStep();
    scrollToTop();
  };
  const handleErrorForNoCheck = async (error: any) => {
    toast.error(error.response.data.message);
  };

  const { mutate: checkPhoneNo, isLoading: isCheckingPhoneNo } =
    useCheckPhoneNoUnique(handleSuccessForNoCheck, handleErrorForNoCheck);

  const onSubmit: SubmitHandler<RecruiterSchema> = (values) => {
    if (currentStep === 0) {
      checkPhoneNo({ phoneNo: values.recruiterData.phoneNo });
    }
    // if (currentStep !== Steps.length  - 1) {
    // handleNextStep();
    // scrollToTop();
    // }
    if (currentStep === Steps.length - 1) {
      console.log("submit event fired to backend");
      mutate(values);
    }
    console.log(values);
  };

  const router = useRouter();

  return (
    <div className="mt-12 flex w-full max-w-xl flex-col md:w-[80%]">
      {currentStep < Steps.length ? (
        <>
          <div className="mb-8 space-y-2 text-center">
            <h1 className="text-2xl font-bold">Setup your profile</h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
            >
              <ProgressBar currentStep={currentStep} steps={Steps} />
              {currentStep === 0 && <PersonalDetailsForm form={form} />}
              {currentStep === 1 && <CompanyDetailsForm form={form} />}

              <div className="mt-10 flex justify-end gap-x-4">
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      handlePrevStep();
                      scrollToTop();
                    }}
                    className="px-11 py-5"
                  >
                    Back
                  </Button>
                )}
                {currentStep === Steps.length - 1 ? (
                  <Button
                    variant="gradient"
                    type="submit"
                    className="px-11 py-5"
                    disabled={isSubmitting && !isError}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Submit"
                    )}{" "}
                  </Button>
                ) : currentStep < Steps.length ? (
                  <Button
                    disabled={isCheckingPhoneNo}
                    type="submit"
                    variant="gradient"
                    className="px-11 py-5"
                  >
                    {isCheckingPhoneNo ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Next"
                    )}
                  </Button>
                ) : null}
              </div>
            </form>
          </Form>
        </>
      ) : (
        <Loader2 color="#B21450" className="mx-auto h-10 w-10 animate-spin" />
      )}
    </div>
  );
};

export default ProfileForm;
