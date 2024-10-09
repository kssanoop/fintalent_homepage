import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { stepForm } from "../schemas/recruiter-profile";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input/mobile";
import "react-phone-number-input/style.css";

import ImageUploadContainer from "@/components/file-upload/image-upload/image-upload-container";
import { PROFILE_PIC_MAX_SIZE } from "@/lib/constants/formConstant";

const PersonalDetailsForm = ({ form }: stepForm) => {
  function handleError(data: any) {}

  const handleFileUploadSuccess = (fileData: File, data: any) => {
    form.setValue(`recruiterData.profilePhoto.originalName`, fileData.name);
    const storageName = new URL(data).pathname;
    form.setValue(`recruiterData.profilePhoto.storageName`, storageName);
    console.log(storageName);
  };

  const isImageSizeExceed = (imageFile: File) => {
    if (imageFile.size > PROFILE_PIC_MAX_SIZE) {
      form.setError("recruiterData.profilePhoto.storageName", {
        message: `maximum file size is ${
          PROFILE_PIC_MAX_SIZE / (1024 * 1024)
        }mb`,
      });
      return true;
    }
    return false;
  };

  const clearImageFileState = () => {
    form.clearErrors("recruiterData.profilePhoto.storageName");
    form.setValue("recruiterData.profilePhoto.originalName", "");
    form.setValue("recruiterData.profilePhoto.storageName", "");
  };

  const imageStorageName = form.getValues(
    "recruiterData.profilePhoto.storageName",
  );
  const defaultPhotoUrl = imageStorageName
    ? `${process.env.NEXT_PUBLIC_IMG_URL}${imageStorageName}`
    : "";

  return (
    <>
      <label className="mt-16 font-bold">Profile Pic</label>
      <div className="mb-7 mt-3 ">
        {/* <ImageUpload
          defaultPhotoUrl={defaultPhotoUrl}
          handleUpload={handleImageUpload}
          handleRemove={clearImageFileState}
          errorMessage={
            form.formState.errors.recruiterData?.profilePhoto?.storageName
              ?.message
          }
          uploadPercentage={uploadPercentage}
          isUploading={isUploading}
        /> */}
        <ImageUploadContainer
          defaultPhotoUrl={defaultPhotoUrl}
          handleRemove={clearImageFileState}
          isImageSizeExceed={isImageSizeExceed}
          handleSuccess={(data, fileData) => {
            handleFileUploadSuccess(fileData, data);
          }}
          handleError={handleError}
          errorMessage={
            form.formState.errors.recruiterData?.profilePhoto?.storageName
              ?.message
          }
        />
      </div>
      <div className="flex flex-col gap-y-6">
        <FormField
          control={form.control}
          rules={{
            required: {
              value: true,
              message: "Full Name is required",
            },
          }}
          name="recruiterData.fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name*</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recruiterData.designation"
          rules={{
            required: {
              value: true,
              message: "Designation is required",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designation*</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="eg: Hiring Manager"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <FormLabel htmlFor="phoneNo" className="mb-2">
            Phone*
          </FormLabel>
          <PhoneInputWithCountry
            control={form.control}
            name="recruiterData.phoneNo"
            rules={{
              required: { value: true, message: "Mobile number is required" },
              validate: (value: string) =>
                isValidPhoneNumber(value) ||
                "Number must be a valid phone number",
            }}
            international
            defaultCountry="IN"
            numberInputProps={{
              className:
                "flex h-12 w-full rounded-md border border-[#E1E1E1] border-input bg-white px-3 py-[13px] text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            }}
            placeholder="eg : +91 9876543210"
          />
          {form.formState.errors.recruiterData?.phoneNo && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.recruiterData.phoneNo.message}
            </p>
          )}
        </div>
        <FormField
          control={form.control}
          name="recruiterData.linkedIn"
          rules={{
            pattern: {
              value: /linkedin/i,
              message: "Invalid linkedin profile URL",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Linkedin Profile</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="eg: https://www.linkedin.com/12345/"
                  {...field}
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

export default PersonalDetailsForm;
