// import ProfilePlaceholder from "@/features/auth/profile-upload_placeholder.svg";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect } from "react";
import { stepForm } from "../../schemas/profile-schema";
import { FileType } from "@/features/auth/api/upload-s3";
import { PROFILE_PIC_MAX_SIZE } from "@/lib/constants/formConstant";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input/mobile";
import "react-phone-number-input/style.css";
// import { AxiosProgressEvent } from "axios";
// import { useUploadPercentge } from "@/utils/hooks/useUploadPercentage";
// import { Button } from "@/components/ui/button";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import { truncate } from "lodash";
import ImageUploadContainer from "@/components/file-upload/image-upload/image-upload-container";
import { toast } from "sonner";
// import ResumeFileUploadContainer from "@/components/file-upload/resume-file-upload/resume-file-upload-container";
import ResumeVideoUploadContainer from "@/components/file-upload/resume-video-upload/resume-video-upload-container";
import ResumeFileUploadContainerTest from "@/components/file-upload/resume-file-upload/resume-file-upload-container-test";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const NOTICE_PERIOD = [
  { label: "15 Days", value: "15Days" },
  { label: "1 Month", value: "1Month" },
  { label: "2 Months", value: "2Months" },
  { label: "More than 2 months", value: "moreThan2Months" },
  { label: "Serving Notice Period", value: "servingNoticePeriod" },
];
const BasicDetailsForm = ({
  form,
  isThirdPartyUser = false,
}: stepForm & { isThirdPartyUser?: boolean }) => {
  const maxWords = 150;
  const text = form.watch("summary");

  useEffect(() => {
    // Disable body scroll when the component mounts
    document.body.style.overflow = "hidden";

    // Re-enable body scroll when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const validateWordCount = (text: any) => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length <= maxWords || "Word count exceeds the limit";
  };

  function handleError(data: any) {}

  const handleFileUploadSuccess = (
    fileType: FileType,
    fileData: File,
    data: any,
  ) => {
    const updateFormValueAfterUpload = ({
      fieldName,
    }: {
      fieldName: "profilePhoto" | "resumeDocument" | "resumeVideo";
    }) => {
      form.setValue(`${fieldName}.originalName`, fileData.name);
      const storageName = new URL(data).pathname;
      form.setValue(`${fieldName}.storageName`, storageName);
      form.trigger(`${fieldName}.storageName`); // sice validation is not triggering auto
    };

    switch (fileType) {
      case "profilePicture":
        updateFormValueAfterUpload({ fieldName: "profilePhoto" });
        break;

      case "resumePdf":
        updateFormValueAfterUpload({ fieldName: "resumeDocument" });
        break;
      case "resumeVideo":
        updateFormValueAfterUpload({ fieldName: "resumeVideo" });
        break;

      default:
        toast.error("unsupported file type");
        break;
    }
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

  const isFileSizeExceed = (
    file: File,
    fileType: "resumeDocument" | "resumeVideo",
    maxSize: number,
  ) => {
    if (file?.size && file?.size > maxSize) {
      form.setError(`${fileType}.storageName`, {
        message: `maximum size is ${maxSize / (1024 * 1024)}mb`,
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

  const clearPdfFileState = () => {
    form.clearErrors("resumeDocument.storageName");
    form.setValue("resumeDocument.storageName", "");
    form.setValue("resumeDocument.originalName", "");
    form.trigger("resumeDocument.storageName");
  };

  const clearVideoState = () => {
    form.clearErrors("resumeVideo.storageName");
    form.setValue("resumeVideo.storageName", "");
    form.setValue("resumeVideo.originalName", "");
    // form.trigger("resumeVideo.storageName");
  };
  const imageStorageName = form.getValues("profilePhoto.storageName");
  const defaultPhotoUrl = imageStorageName
    ? `${process.env.NEXT_PUBLIC_IMG_URL}${imageStorageName}`
    : "";
  return (
    <div className="flex flex-col">
      <label className="mt-16 font-bold">Profile Pic</label>
      <div className="mb-7 mt-3">
        <ImageUploadContainer
          defaultPhotoUrl={defaultPhotoUrl}
          handleRemove={clearImageFileState}
          isImageSizeExceed={isImageSizeExceed}
          handleSuccess={(data, fileData) => {
            handleFileUploadSuccess("profilePicture", fileData, data);
          }}
          handleError={handleError}
          errorMessage={
            form.formState.errors.profilePhoto?.storageName?.message
          }
        />
      </div>

      <div className="flex flex-col gap-x-10 md:flex-row">
        <FormField
          control={form.control}
          name="fullName"
          rules={{
            required: { value: true, message: "Your full name is required" },
            pattern: {
              value: /^[A-Za-z-' ]+$/,
              message: "Name can only contain letters",
            },
          }}
          render={({ field }) => (
            <FormItem className="mb-6 md:w-1/2">
              <FormLabel>Full name*</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="eg: John Doe"
                  {...field}
                  className={`${form.formState.errors.fullName && "shake"}`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mb-6 flex flex-col gap-2 md:w-1/2">
          <FormLabel htmlFor="phoneNo" className="mb-2">
            Mobile number*
          </FormLabel>
          <PhoneInputWithCountry
            control={form.control}
            name="phoneNo"
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
          {form.formState.errors.phoneNo && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.phoneNo.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-x-10 md:flex-row">
        <FormField
          control={form.control}
          name="linkedInProfile"
          rules={{
            pattern: {
              value: /linkedin/i,
              message: "Invalid linkedin profile link",
            },
          }}
          render={({ field }) => (
            <FormItem className="mb-6 md:w-1/2">
              <FormLabel>Linkedin profile</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="eg: linkedin.com/username"
                  className={`${
                    form.formState.errors.linkedInProfile && "shake"
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobPreferences.noticePeriod"
          rules={{
            required: { value: true, message: "Notice Period is required" },
            // min: {
            //   value: 1,
            //   message: "Number should be between 1 and 12",
            // },
            // max: {
            //   value: 12,
            //   message: "Number should be between 1 and 12",
            // },
          }}
          render={({ field }) => (
            <FormItem className="mb-6 md:w-1/2">
              <FormLabel>Notice Period*</FormLabel>
              <FormControl>
                {/* <Input type="number" {...field} /> */}
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {NOTICE_PERIOD.map((period) => (
                      <SelectItem
                        value={period.value}
                        key={crypto.randomUUID()}
                      >
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {isThirdPartyUser && (
        <div className="flex flex-col md:flex-row">
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            }}
            render={({ field }) => (
              <FormItem className="mb-6 md:w-[calc(50%-20px)]">
                <FormLabel>Email ID*</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="eg:user@gmail.com"
                    className={`${form.formState.errors.email && "shake"}`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
      {/* <div className="flex flex-col gap-x-10 md:flex-row">
        <FormField
          control={form.control}
          name="currentOrganization"
          rules={{
            pattern: {
              value: /^[a-zA-Z0-9 ,.-]+$/,
              message: "Current Organization is in invalid format",
            },
          }}
          render={({ field }) => (
            <FormItem className="mb-6 md:w-1/2">
              <FormLabel>Current Organization</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="eg: ABC Company"
                  {...field}
                  className={`${
                    form.formState.errors.currentOrganization && "shake"
                  }`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          rules={{
            required: { value: true, message: "Job Title is required" },
          }}
          name="jobTitle"
          render={({ field }) => (
            <FormItem className="mb-6 inline-block md:w-1/2">
              <FormLabel>Job Title*</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="eg: Financial Analyst"
                  {...field}
                  className={`${form.formState.errors.jobTitle && "shake"}`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div> */}

      <div className="flex flex-col gap-x-10 md:flex-row">
        <FormField
          control={form.control}
          name="jobPreferences.currentCTC"
          rules={{
            required: {
              value: true,
              message: "Current Salary is required",
            },
            min: {
              value: 0.1,
              message: "Current Salary should be greater than 0 LPA",
            },
          }}
          render={({ field }) => (
            <FormItem className="mb-6 md:w-1/2">
              <FormLabel>Current Salary*</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    step="any"
                    min={0}
                    type="number"
                    // placeholder="LPA"
                    {...field}
                    className={`${
                      form.formState.errors.jobPreferences?.currentCTC &&
                      "shake"
                    } pr-14`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-medium text-[#A9A9A9]">
                    LPA
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jobPreferences.expectedCTC"
          rules={{
            required: {
              value: true,
              message: "Expected Salary is required",
            },
            min: {
              value: 0.1,
              message: "Enter a valid input",
            },
          }}
          render={({ field }) => (
            <FormItem className="mb-6 md:w-1/2">
              <FormLabel>Expected Salary*</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    min={0}
                    type="number"
                    step="any"
                    {...field}
                    className={`${
                      form.formState.errors.jobPreferences?.expectedCTC &&
                      "shake"
                    } pr-14`}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 font-medium text-[#A9A9A9]">
                    LPA
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* <div className="flex flex-col gap-x-10 md:flex-row">
  
        <div className="md:w-1/2">
          <FormLabel>Total Experience*</FormLabel>
          <div className="mb-6 mt-2 flex gap-x-2">
            <FormField
              control={form.control}
              name="totalExperience.year"
              rules={{
                required: {
                  value: true,
                  message: "Year is required",
                },
              }}
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <div className="relative">
                      <Input
                        maxLength={4}
                        type="number"
                        {...field}
                        className={`${
                          form.formState.errors.totalExperience?.year && "shake"
                        } pr-24`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-medium text-[#A9A9A9]">
                        year{" "}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalExperience.month"
              rules={{
                min: 0,
                max: { value: 12, message: "Month cannot be more than 12" },
                required: {
                  value: true,
                  message: "Month is required",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        {...field}
                        className={`${
                          form.formState.errors.totalExperience?.month &&
                          "shake"
                        } pr-24`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-medium text-[#A9A9A9]">
                        months
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div> */}

      <div className="mb-4 flex flex-col gap-x-10 md:flex-row">
        <div className="md:w-1/2">
          <FormField
            control={form.control}
            name="resumeDocument.storageName"
            rules={{ required: "Pdf resume is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>PDF Resume*</FormLabel>
                <FormControl>
                  <ResumeFileUploadContainerTest
                    form={form}
                    field={field}
                    handleRemove={clearPdfFileState}
                    isFileSizeExceed={isFileSizeExceed}
                    handleSuccess={(data, fileData) => {
                      handleFileUploadSuccess("resumePdf", fileData, data);
                    }}
                    handleError={handleError}
                    errorMessage={
                      form.formState.errors.resumeDocument?.storageName?.message
                    }
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="resumeDocument.originalName"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input
                  type="hidden"
                  placeholder="eg: joe@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resumeDocument.storageName"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input
                  type="hidden"
                  placeholder="eg: joe@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="md:w-1/2">
          {/* <FormLabel className="mb-4 block">Video Resume</FormLabel>

          <ResumeVideoUploadContainer
            handleRemove={clearVideoState}
            isFileSizeExceed={isFileSizeExceed}
            handleSuccess={(data, fileData) => {
              handleFileUploadSuccess("resumeVideo", fileData, data);
            }}
            handleError={handleError}
            errorMessage={
              form.formState.errors.resumeVideo?.storageName?.message
            }
          /> */}

          <FormField
            control={form.control}
            name="resumeVideo.storageName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Resume</FormLabel>
                <FormControl>
                  <ResumeVideoUploadContainer
                    form={form}
                    field={field}
                    handleRemove={clearVideoState}
                    isFileSizeExceed={isFileSizeExceed}
                    handleSuccess={(data, fileData) => {
                      handleFileUploadSuccess("resumeVideo", fileData, data);
                    }}
                    handleError={handleError}
                    errorMessage={
                      // unused prop
                      form.formState.errors.resumeVideo?.storageName?.message
                    }
                  />
                  {/* <Input type="file" placeholder="shadcn" {...field} /> */}
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="resumeVideo.originalName"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="text" placeholder="eg: joe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="resumeVideo.storageName"
          render={({ field }) => (
            <FormItem className="hidden">
              <FormControl>
                <Input type="text" placeholder="eg: joe@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        rules={{ validate: validateWordCount }}
        name="summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Summary</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Tell us about yourself"
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="mt-2 text-right text-sm font-medium text-gray-400">
        {`${
          text?.split(/\s+/).filter(Boolean).length ?? 0
        } / ${maxWords} words`}
      </div>
    </div>
  );
};

export default BasicDetailsForm;
