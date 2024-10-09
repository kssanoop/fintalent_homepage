import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import RecruiterProfileFormItems from "./recruiter-profile-form-items";
import { RecruiterProfile } from "@/features/profile/recruiter/type/recruiter-profile";
import {
  UpdateRecruiterProfileSchema,
  useUpdateRecruiterProfile,
} from "@/features/profile/recruiter/api/update-recruiter-profile";

interface RecruiterProfileDialogProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  recruiter: RecruiterProfile;
}

const RecruiterProfileDialog = ({
  open,
  setOpen,
  recruiter,
}: RecruiterProfileDialogProps) => {
  const form = useForm<UpdateRecruiterProfileSchema>({
    defaultValues: {
      fullName: recruiter.fullName,
      designation: recruiter.designation,
      phoneNo: recruiter.phoneNo,
      email: recruiter.email,
      profilePhoto: {
        originalName: recruiter.profilePhoto.originalName,
        storageName: recruiter.profilePhoto.storageName,
      },
      linkedIn: recruiter.linkedIn,
    },
  });

  const handleSuccess = () => {
    setOpen(false);
  };

  const { mutate, isLoading } = useUpdateRecruiterProfile(handleSuccess);

  const onSubmit: SubmitHandler<UpdateRecruiterProfileSchema> = (value) => {
    console.log(value);
    mutate(value);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0">
        <div className="flex flex-col gap-6 p-6">
          <DialogHeader className="text-xl font-semibold text-[#171717]">
            Edit profile
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <div className="scroll-container hide-scrollbar flex max-h-[500px] flex-col overflow-auto px-1">
                <RecruiterProfileFormItems form={form} />
              </div>
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    form.reset();
                  }}
                  variant={"outline"}
                  className="h-[59px] w-[152px] rounded-lg border-0 px-2.5 py-4 text-xl font-bold text-brand-black"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="gradient"
                  disabled={isLoading}
                  style={{
                    boxShadow: "0px 4px 22px 0px rgba(53, 36, 88, 0.54)",
                  }}
                  className=" h-[59px] w-[152px] px-2.5 py-4 text-xl font-bold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecruiterProfileDialog;
