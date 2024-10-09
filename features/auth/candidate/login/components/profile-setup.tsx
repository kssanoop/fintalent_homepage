import ProgressBar from "@/components/progress/progress-bar";
import Steps from "@/components/progress/steps";
import { useProgressBar } from "@/components/progress/useProgressBar";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { profileSchema } from "../../schemas/profile-schema";
import BasicDetailsForm from "./basic-details";
import CareerForm from "./career-details";
import SkillsForm from "./skill-details";
import PersonalDetailsForm from "./personal-details";
import defaultValues from "@/features/auth/util/default-values";
import useCreateCandidate from "@/features/auth/api/create-candidate";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Dispatch, SetStateAction } from "react";
import useCreateCandidateAdmin from "@/features/get-candidates/admin/api/create-candidate-admin";
import useScrollToTop from "@/utils/hooks/useScrollToTop";
import useCheckPhoneNoUnique from "@/features/common/api/check-phone-no-unique";

interface ProfileFormProps {
  // Interface?: RoleTypes;
  isThirdPartyUser?: boolean;
  setHandleCloseButton?: Dispatch<SetStateAction<boolean>>;
  handleCloseButton?: boolean;
}

const ProfileForm = ({
  isThirdPartyUser = true, // represents: admin, manager and team lead
  setHandleCloseButton,
  handleCloseButton,
}: ProfileFormProps) => {
  const { handleNextStep, handlePrevStep, currentStep } = useProgressBar(Steps);
  const form = useForm<profileSchema>({
    defaultValues,
  });

  const { scrollToTop } = useScrollToTop({
    elementId: "form-scroll-container",
  });

  const handleSuccessForNoCheck = async (data: any) => {
    handleNextStep();
    scrollToTop();
  };
  const handleErrorForNoCheck = async (error: any) => {
    toast.error(error.response.data.message);
  };

  const { mutate: checkPhoneNo, isLoading: isCheckingPhoneNo } =
    useCheckPhoneNoUnique(handleSuccessForNoCheck, handleErrorForNoCheck);

  const onSubmit: SubmitHandler<profileSchema> = (values) => {
    if (currentStep !== Steps.length - 1) {
      if (currentStep === 0) {
        checkPhoneNo({ phoneNo: values.phoneNo });
        return;
      }
      handleNextStep();
      scrollToTop();
    }

    if (currentStep === Steps.length - 1) {
      if (isThirdPartyUser) {
        adminMutate(values);
      } else {
        mutate(values);
      }
    }
  };

  const router = useRouter();

  const handleSuccess = async (data: any) => {
    toast.success("Profile setup is successfull");
    if (data.data.accountVerifiedStatus === "verified") {
      await router.push("/candidate");
    } else await router.push("/pending-verification");
  };

  const handleSuccessAdmin = async (data: any) => {
    router.back();
    // NOTE: setState call on here looks irrelevant
    if (setHandleCloseButton) {
      setHandleCloseButton(false);
    }
    toast.success(data?.message);
  };
  const handleError = async (error: any) => {
    toast.error(error.response.data.message);
    // await router.push("/pending-verification");
  };

  const { mutate, isLoading: isSubmitting } = useCreateCandidate(
    handleSuccess,
    handleError,
  );
  const { mutate: adminMutate, isLoading } = useCreateCandidateAdmin(
    handleSuccessAdmin,
    handleError,
  );

  return (
    <div
      className={`${
        isThirdPartyUser ? "mt-8" : "mt-12"
      } flex w-full max-w-2xl flex-col md:w-[80%]`}
    >
      {!isThirdPartyUser && (
        <h1 className="mb-8 text-center text-2xl font-bold">
          Let&lsquo;s setup your profile
        </h1>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <ProgressBar currentStep={currentStep} steps={Steps} />
          {currentStep === 0 && (
            <BasicDetailsForm form={form} isThirdPartyUser={isThirdPartyUser} />
          )}
          {currentStep === 1 && <CareerForm form={form} />}
          {currentStep === 2 && <SkillsForm form={form} />}
          {currentStep === 3 && <PersonalDetailsForm form={form} />}
          <div className="mt-10 flex justify-end gap-x-4">
            {currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  handlePrevStep();
                  scrollToTop();
                }}
              >
                Back
              </Button>
            )}
            {currentStep === Steps.length - 1 ? (
              <Button variant="gradient" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            ) : currentStep < Steps.length ? (
              <Button
                disabled={isCheckingPhoneNo}
                type="submit"
                variant="gradient"
                className="md:w-[102px]"
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
    </div>
  );
};

export default ProfileForm;
