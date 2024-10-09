import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useMemo } from "react";
import { stepForm } from "../schemas/recruiter-profile";

import { PROFILE_PIC_MAX_SIZE } from "@/lib/constants/formConstant";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input/mobile";
import "react-phone-number-input/style.css";
import useGetCities from "@/features/get-location/api/get-contry-cities";
import { generateOptions } from "@/features/get-location/utils/generateOptionsForLocation";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { classNameForReactSelect } from "@/utils/classNameForReactSelect";
import ImageUploadContainer from "@/components/file-upload/image-upload/image-upload-container";
import { MenuList } from "@/components/menu-list";

const CreateCompanyForm = ({ form }: stepForm) => {
  const { data: cities, isFetching: isCitiesLoading } = useGetCities();
  const citiesOptions = useMemo(
    () => cities && generateOptions(cities),
    [cities],
  );

  form.setValue("createType", "createCompany");
  console.log(form.formState?.errors?.companyData?.location);
  function handleError(data: any) {}

  // const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const targetFile = event.target.files?.[0] ?? null;
  //   console.log(targetFile?.name);
  //   if (targetFile) {
  //     setFile(targetFile);
  //     console.log(targetFile?.type);
  //     if (targetFile?.type.includes("image")) {
  //       console.log("image file spotted");
  //       mutate({ fileData: targetFile, fileType: "profilePicture" });
  //     }
  //   }
  // };
  const handleFileUploadSuccess = (fileData: File, data: any) => {
    form.setValue(`companyData.companyLogo.originalName`, fileData.name);
    const storageName = new URL(data).pathname;
    form.setValue(`companyData.companyLogo.storageName`, storageName);
    console.log(storageName);
  };

  const isImageSizeExceed = (imageFile: File) => {
    if (imageFile.size > PROFILE_PIC_MAX_SIZE) {
      form.setError("companyData.companyLogo.storageName", {
        message: `maximum file size is ${
          PROFILE_PIC_MAX_SIZE / (1024 * 1024)
        }mb`,
      });
      return true;
    }
    return false;
  };

  const clearImageFileState = () => {
    form.clearErrors("companyData.companyLogo.storageName");
    form.setValue("companyData.companyLogo.originalName", "");
    form.setValue("companyData.companyLogo.storageName", "");
  };

  const imageStorageName = form.getValues(
    "companyData.companyLogo.storageName",
  );
  const defaultPhotoUrl = imageStorageName
    ? `${process.env.NEXT_PUBLIC_IMG_URL}${imageStorageName}`
    : "";

  return (
    <div className="flex flex-col gap-y-6">
      <label className="font-bold">Company Logo</label>
      <div className="flex w-fit gap-x-4">
        {/* <ImageUpload
          handleUpload={handleImageUpload}
          handleRemove={clearImageFileState}
          errorMessage={
            form.formState.errors.companyData?.companyLogo?.storageName?.message
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

      <FormField
        control={form.control}
        name="companyData.companyName"
        rules={{
          required: { value: true, message: "Company Name is required" },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Name*</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter company name"
                {...field}
                className={`${
                  form.formState.errors.companyData?.companyName && "shake"
                }`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* <FormField
        control={form.control}
        rules={{
          required: { value: true, message: "Location is required" },
        }}
        name="companyData.location"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Locations*</FormLabel>
            <FormControl>
              <Input
                placeholder="Noida"
                {...field}
                className={`${
                  form.formState.errors.companyData?.location && "shake"
                }`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      /> */}

      <Controller
        name="companyData.location"
        rules={{
          required: { value: true, message: "Location is required" },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location*</FormLabel>
            <ReactSelect
              value={field.value.value}
              onChange={(newValue: any) => {
                console.log(newValue);
                if (newValue === null) {
                  field.onChange("");
                  return;
                }
                field.onChange(newValue.value);
              }}
              options={citiesOptions}
              // @ts-ignore
              itemSize={() => 49}
              components={{ MenuList }}
              isClearable
              isLoading={isCitiesLoading}
              placeholder="Select location"
              styles={{
                control: () => ({
                  width: "100%",
                  backgroundColor: "white",
                }),
              }}
              classNames={classNameForReactSelect}
            />
            {form.formState.errors.companyData?.location && (
              <p className="text-sm font-medium text-destructive">
                {form.formState.errors.companyData?.location.message}
              </p>
            )}
          </FormItem>
        )}
      />

      <div className="flex flex-col gap-2">
        <FormLabel htmlFor="phoneNo" className="mb-2">
          Company Contact Number*{" "}
        </FormLabel>
        <PhoneInputWithCountry
          control={form.control}
          name="companyData.companyPhoneNo"
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
        {form.formState.errors.companyData?.companyPhoneNo && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.companyData.companyPhoneNo.message}
          </p>
        )}
      </div>
      <FormField
        control={form.control}
        name="companyData.companyWebsite"
        rules={{
          pattern: {
            value:
              /^(https?:\/\/)?(www\.)?([\w.-]+)\.([a-z]{2,})(:\d{2,5})?(\/\S*)?$/,
            message: "Enter a valid website URL",
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Website</FormLabel>
            <FormControl>
              <Input
                placeholder="eg: www.domain.com"
                {...field}
                className={`${
                  form.formState.errors.companyData?.companyWebsite && "shake"
                }`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="companyData.companyLinkedIn"
        rules={{
          pattern: {
            value: /linkedin/i,
            message: "Invalid LinkedIn URL",
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Linkedin URL</FormLabel>
            <FormControl>
              <Input
                placeholder="eg: www.linkedin.com/123"
                {...field}
                className={`${
                  form.formState.errors.companyData?.companyLinkedIn && "shake"
                }`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="createType"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input className="hidden" type="text" placeholder="" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CreateCompanyForm;
