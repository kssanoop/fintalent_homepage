import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";

import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input/mobile";
import "react-phone-number-input/style.css";
import ImageUploadContainer from "@/components/file-upload/image-upload/image-upload-container";
import { PROFILE_PIC_MAX_SIZE } from "@/lib/constants/formConstant";
import { UpdateRecruiterProfileSchema } from "@/features/profile/recruiter/api/update-recruiter-profile";

const TeamLeadFormItem = ({ children }: { children: ReactNode }) => {
  return <FormItem className="space-y-1">{children}</FormItem>;
};

const TeamLeadFormLabel = ({ children }: { children: ReactNode }) => {
  return <FormLabel className=" text-brand-black">{children}</FormLabel>;
};

const RecruiterProfileFormItems = ({
  form,
}: {
  form: UseFormReturn<UpdateRecruiterProfileSchema, any, UpdateRecruiterProfileSchema>;
}) => {
  // handle upload photo error
  function handleError(data: any) {}

  const handleFileUploadSuccess = (fileData: File, data: any) => {
    form.setValue(`profilePhoto.originalName`, fileData.name);
    const storageName = new URL(data).pathname;
    form.setValue(`profilePhoto.storageName`, storageName);
    form.trigger(`profilePhoto.storageName`);
  };

  const isImageSizeExceed = (imageFile: File) => {
    if (imageFile.size > PROFILE_PIC_MAX_SIZE) {
      form.setError("profilePhoto.storageName", {
        message: `maximum file size is ${
          PROFILE_PIC_MAX_SIZE / (1024 * 1024)
        }mb`,
      });
      return true;
    }
    return false;
  };

  const clearImageFileState = () => {
    form.clearErrors("profilePhoto.storageName");
    form.setValue("profilePhoto.storageName", "");
    form.setValue("profilePhoto.originalName", "");
  };

  console.log(form.getValues("profilePhoto.storageName"));

  const imageStorageName = form.getValues("profilePhoto.storageName");
  const defaultPhotoUrl = imageStorageName
    ? `${process.env.NEXT_PUBLIC_IMG_URL}${imageStorageName}`
    : "";
  return (
    <>
      <label className="font-semibold text-brand-black">Profile picture</label>
      <div className="mb-6 mt-3 flex w-fit gap-x-4">
        <ImageUploadContainer
          defaultPhotoUrl={defaultPhotoUrl}
          handleRemove={clearImageFileState}
          isImageSizeExceed={isImageSizeExceed}
          handleSuccess={(data, fileData) => {
            handleFileUploadSuccess(fileData, data);
          }}
          handleError={handleError}
          errorMessage={
            form.formState.errors.profilePhoto?.storageName?.message
          }
        />
      </div>

      <div className="flex flex-col gap-6 pb-1">
        <FormField
          control={form.control}
          name="fullName"
          rules={{
            required: {
              value: true,
              message: "Full Name is required",
            },
          }}
          render={({ field }) => (
            <TeamLeadFormItem>
              <TeamLeadFormLabel>Full Name*</TeamLeadFormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter TL name"
                  {...field}
                  className={`${
                    form.formState.errors.fullName && "shake"
                  } h-12 rounded-[5px] px-2 py-1  placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                />
              </FormControl>
              <FormMessage />
            </TeamLeadFormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <TeamLeadFormItem>
              <TeamLeadFormLabel>Email ID</TeamLeadFormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  placeholder="Enter Email"
                  className={`${
                    form.formState.errors.email && "shake"
                  } h-12 rounded-[5px] px-2 py-1 placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                />
              </FormControl>
              <FormMessage />
            </TeamLeadFormItem>
          )}
        />

        <FormField
          control={form.control}
          name="designation"
          rules={{
            required: {
              value: true,
              message: "Designation is required",
            },
          }}
          render={({ field }) => (
            <TeamLeadFormItem>
              <TeamLeadFormLabel>Designation*</TeamLeadFormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="eg: Hiring Manager"
                  {...field}
                  className={`${
                    form.formState.errors.designation && "shake"
                  } h-12 rounded-[5px] px-2 py-1 placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                />
              </FormControl>
              <FormMessage />
            </TeamLeadFormItem>
          )}
        />

        <div className="space-y-1">
          <TeamLeadFormLabel>Phone*</TeamLeadFormLabel>
          <PhoneInputWithCountry
            control={form.control}
            name="phoneNo"
            rules={{
              required: {
                value: true,
                message: "Phone number is required",
              },
              validate: (value: string) =>
                isValidPhoneNumber(value) ||
                "Number must be a valid phone number",
            }}
            international
            defaultCountry="IN"
            numberInputProps={{
              className: `${
                form.formState.errors.phoneNo && "shake"
              } rounded-md border border-[#E1E1E1] border-input bg-white  text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 rounded-[5px] px-2 py-1 placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`,
            }}
            placeholder="eg : +91 9876543210"
          />
          {form.formState.errors.phoneNo && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.phoneNo.message}
            </p>
          )}
        </div>

        <FormField
          control={form.control}
          name="linkedIn"
          rules={{
            pattern: {
              value: /linkedin/i,
              message: "Enter a valid Linkedin url",
            },
          }}
          render={({ field }) => (
            <FormItem className="mb-1">
              <TeamLeadFormLabel>Linkedin URL</TeamLeadFormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Paste link here"
                  {...field}
                  className={`${
                    form.formState.errors.linkedIn && "shake"
                  } h-12 rounded-[5px] px-2 py-1 placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};

export default RecruiterProfileFormItems;
