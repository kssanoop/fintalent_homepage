import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { LegacyRef, ReactNode, useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { ManagerSchema } from "@/features/managers/admin/schema/manager-schema";

import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input/mobile";
import "react-phone-number-input/style.css";
import ImageUploadContainer from "@/components/file-upload/image-upload/image-upload-container";
import { PROFILE_PIC_MAX_SIZE } from "@/lib/constants/formConstant";

const ManagerFormItem = ({ children }: { children: ReactNode }) => {
  return <FormItem className="space-y-1">{children}</FormItem>;
};

const ManagerFormLabel = ({ children }: { children: ReactNode }) => {
  return <FormLabel className=" text-brand-black">{children}</FormLabel>;
};

const ManagerFormItems = ({
  form,
}: {
  form: UseFormReturn<ManagerSchema, any, ManagerSchema>;
}) => {
  const phoneNoErrorRef: LegacyRef<HTMLDivElement> | undefined = useRef(null);

  useEffect(() => {
    if (form.formState.errors.phoneNo && phoneNoErrorRef.current)
      phoneNoErrorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [form.formState.errors]);

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
          name="name"
          rules={{
            required: {
              value: true,
              message: "Manager name is required",
            },
            pattern: {
              value: /^[A-Za-z-' ]+$/,
              message: "Enter a valid name",
            },
          }}
          render={({ field }) => (
            <ManagerFormItem>
              <ManagerFormLabel>Manager name*</ManagerFormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Manager name"
                  {...field}
                  className={`${
                    form.formState.errors.name && "shake"
                  } h-12 rounded-[5px] px-2 py-1  placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                />
              </FormControl>
              <FormMessage />
            </ManagerFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="designation"
          render={({ field }) => (
            <ManagerFormItem>
              <ManagerFormLabel>Designation</ManagerFormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter Designation"
                  {...field}
                  className={`${
                    form.formState.errors.designation && "shake"
                  } h-12 rounded-[5px] px-2 py-1  placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                />
              </FormControl>
              <FormMessage />
            </ManagerFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <ManagerFormItem>
              <ManagerFormLabel>Department</ManagerFormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="eg: Finance"
                  {...field}
                  className={`${
                    form.formState.errors.department && "shake"
                  } h-12 rounded-[5px] px-2 py-1 placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                />
              </FormControl>
              <FormMessage />
            </ManagerFormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <ManagerFormItem>
              <ManagerFormLabel>Email</ManagerFormLabel>
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
            </ManagerFormItem>
          )}
        />

        <div className="space-y-1">
          <ManagerFormLabel>Phone*</ManagerFormLabel>
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
            <p
              ref={phoneNoErrorRef}
              className="text-sm font-medium text-destructive"
            >
              {form.formState.errors.phoneNo.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ManagerFormItems;
