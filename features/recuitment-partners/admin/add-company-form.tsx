import ProfilePlaceholder from "@/features/auth/profile-upload_placeholder.svg";
// import Image from "next/image";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import React, {
  Dispatch,
  SetStateAction,
  useMemo,
  useRef,
  useState,
} from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { AddCompanySchema } from "./Schema/add-company-schema";
import { CompanyFormData } from "./type/company-pending-request-type";
import {
  CardIcon,
  CardIconFallback,
  CardIconImage,
} from "@/components/ui/cardslogo";
import { toast } from "sonner";
import { useFileUploadToS3 } from "@/features/auth/api/upload-s3";
import { Loader2 } from "lucide-react";
import { useVerifyCreateCompanyRequest } from "./api/verify-create-company-request";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateCompany } from "./api/create-company";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input/mobile";
import "react-phone-number-input/style.css";
import ImageUpload from "@/components/file-upload/image-upload/image-upload";
import { AxiosProgressEvent } from "axios";
import { useUploadPercentge } from "@/utils/hooks/useUploadPercentage";
import { PROFILE_PIC_MAX_SIZE } from "@/lib/constants/formConstant";
import useGetCities from "@/features/get-location/api/get-contry-cities";
import { generateOptions } from "@/features/get-location/utils/generateOptionsForLocation";
import ReactSelect from "react-select";
import { classNameForReactSelect } from "@/utils/classNameForReactSelect";
import { MenuList } from "@/components/menu-list";

interface AddCompanyFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: string;
  companyData?: CompanyFormData;
  recruiterId?: string;
}
const AddCompanyForm = ({
  setOpen,
  type,
  companyData,
  recruiterId,
}: AddCompanyFormProps) => {
  const { data: cities, isFetching: isCitiesLoading } = useGetCities();
  const citiesOptions = useMemo(
    () => cities && generateOptions(cities),
    [cities],
  );

  const [profilePic, setProfilePic] = useState<File>();
  const queryClient = useQueryClient();
  const defaultValuesForms =
    type === "EditCompany"
      ? {
          companyName: companyData?.companyName,
          companyEmail: companyData?.companyEmail,
          companyPhoneNo: companyData?.companyPhoneNo,
          companyWebsite: companyData?.companyWebsite,
          companyLogo: {
            originalName: companyData?.companyLogo?.originalName,
            storageName: companyData?.companyLogo?.storageName,
          },
          companyLinkedIn: companyData?.companyLinkedIn,
          locations: companyData?.locations,
        }
      : {
          companyName: "",
          companyEmail: "",
          companyPhoneNo: "",
          companyWebsite: "",
          companyLogo: {
            originalName: "",
            storageName: "",
          },
          companyLinkedIn: "",
          locations: [],
        };
  console.log(companyData?.locations);
  const form = useForm<AddCompanySchema>({
    defaultValues: defaultValuesForms,
    mode: "onChange",
    reValidateMode: "onChange",
  });

  function handleError(data: any) {}

  // handle upload photo success
  function handleSuccess(data: string, fileData: File) {
    console.log("Data recieved", data);
    console.log("File Data", fileData);
    toast.success("Photo Uploded sucessfully");
    // if (fileData.type.includes("image")) {
    form.setValue("companyLogo.originalName", fileData.name);
    const storageName = new URL(data).pathname;
    form.setValue("companyLogo.storageName", storageName);
    // }
  }

  const { uploadPercentage, setUploadPercentage } = useUploadPercentge();

  const uploadProgress = (progress: AxiosProgressEvent) => {
    setUploadPercentage(progress);
  };

  const { mutate, isLoading: isUploading } = useFileUploadToS3(
    handleSuccess,
    handleError,
    uploadProgress,
  );

  // form success submit
  const formSubmissionhandleSuccess = (data: any) => {
    queryClient.invalidateQueries({ queryKey: ["all-company-list-pending"] });
    queryClient.invalidateQueries({ queryKey: ["get-all-company-list"] });
    setOpen(false);
    toast.success(data?.message);
  };

  // form error in  submission
  const formSubmissionhandleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const {
    mutate: VerifyCompanyCreation,
    isLoading: isSubmitting,
    isError: isSubmittingError,
  } = useVerifyCreateCompanyRequest(
    formSubmissionhandleSuccess,
    formSubmissionhandleError,
  );

  const {
    mutate: addCompanyMutate,
    isLoading: isDataSubmitting,
    isError: isSubmitError,
  } = useCreateCompany(formSubmissionhandleSuccess, formSubmissionhandleError);
  const photoRef = useRef<HTMLInputElement>(null);
  // handle upload photo
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = event.target.files?.[0] ?? null;
    const inputTag = event.target.id;
    // console.log(targetFile);
    if (targetFile) {
      console.log(event.target.id);
      if (targetFile.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2 MB limit");
        return;
      }
      if (inputTag === "companyLogo") {
        setProfilePic(targetFile);
        // console.log("image file spotted");
        mutate({ fileData: targetFile, fileType: "profilePicture" });
      }
    }
  };

  const clearImageFileState = () => {
    form.clearErrors("companyLogo.storageName");
    form.setValue("companyLogo.storageName", "");
    form.setValue("companyLogo.originalName", "");
  };

  const handleImageUpload = (imageFile: File) => {
    if (imageFile.size > PROFILE_PIC_MAX_SIZE) {
      form.setError("companyLogo.storageName", {
        message: `maximum file size is ${
          PROFILE_PIC_MAX_SIZE / (1024 * 1024)
        }mb`,
      });
      return;
    }
    mutate({ fileData: imageFile, fileType: "profilePicture" });
  };

  // submit function on data submit
  const onSubmit: SubmitHandler<AddCompanySchema> = (values) => {
    console.log("form data:", values);
    if (type === "EditCompany") {
      VerifyCompanyCreation({ data: values, recruiterId });
    } else {
      addCompanyMutate(values);
    }
  };

  type FormFieldName =
    | "companyName"
    | "companyEmail"
    | "locations"
    | "companyPhoneNo"
    | "companyWebsite"
    | "companyLinkedIn";
  // show error while typing
  const onInputChange = (name: FormFieldName, value: any) => {
    form.setValue(name, value);
    form.trigger(name);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[18px]"
      >
        <div
          className={`scroll-container hide-scrollbar flex w-full ${
            type === "EditCompany" ? "max-h-[300px]" : "max-h-[500px]"
          } flex-col overflow-auto px-1`}
        >
          {type === "EditCompany" ? (
            <div
              className="mb-6 flex w-fit cursor-pointer gap-x-4"
              onClick={() => {
                photoRef.current?.click();
              }}
            >
              <Input
                name="companyLogo"
                type="file"
                className="hidden"
                ref={photoRef}
                accept="image/*"
                id="companyLogo"
                onChange={handleUpload}
              />
              <CardIcon>
                <CardIconImage
                  src={
                    profilePic
                      ? URL.createObjectURL(profilePic)
                      : companyData?.companyLogo?.storageName
                        ? `${process.env.NEXT_PUBLIC_IMG_URL}${companyData?.companyLogo?.storageName}`
                        : ProfilePlaceholder
                  }
                  width={62}
                  height={62}
                  className={`h-[62px] w-[62px] items-center justify-center rounded-sm ${
                    profilePic && "border-2"
                  }`}
                  alt="Profile image placeholder"
                />
                <CardIconFallback>{companyData?.companyName}</CardIconFallback>
              </CardIcon>
            </div>
          ) : (
            <div>
              <label className="font-semibold">Profile Pic</label>
              <div className="mb-7 mt-3">
                <ImageUpload
                  handleUpload={handleImageUpload}
                  handleRemove={clearImageFileState}
                  errorMessage={
                    form.formState.errors.companyLogo?.storageName?.message
                  }
                  uploadPercentage={uploadPercentage}
                  isUploading={isUploading}
                />
              </div>
            </div>
          )}

          <div
            className={`flex w-full ${
              type !== "EditCompany" ? "flex-col" : "flex-row"
            } gap-6`}
          >
            <div className="mb-1 flex w-full flex-col gap-6">
              <FormField
                control={form.control}
                name="companyName"
                rules={{
                  required: {
                    value: true,
                    message: "Company name is required",
                  },
                  pattern: {
                    value: /^[A-Za-z0-9\s&.'",()-]+$/,
                    message: "Enter a valid name",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-[#171717]">
                      Company name*
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Company name"
                        {...field}
                        onChange={(e) => {
                          onInputChange("companyName", e.target.value);
                        }}
                        className={`${
                          form.formState.errors.companyName && "shake"
                        } h-12 rounded-[5px] px-2 py-1  placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              {/* Company email ID */}
              {/* <FormField
                control={form.control}
                name="companyEmail"
                rules={{
                  required: {
                    value: true,
                    message: "Company email ID is required",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-[#171717]">
                      Company email ID*
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter Company email ID"
                        {...field}
                        onChange={(e) => {
                          onInputChange("companyEmail", e.target.value);
                        }}
                        className={`${
                          form.formState.errors.companyEmail && "shake"
                        } h-12 rounded-[5px] px-2 py-1  placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              /> */}
              {/* Location */}
              {/* <FormField
                control={form.control}
                name="locations"
                rules={{
                  required: {
                    value: true,
                    message: "At least one location is required",
                  },
                  pattern: {
                    value: /^[A-Za-z\s',.-]+(?:,[A-Za-z\s',.-]+)*$/,
                    message: "Enter valid location(s) separated by commas",
                  },
                }}
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-[#171717]">
                      Locations
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Banglore"
                        {...field}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          const locationsArray = inputValue
                            .split(",")
                            .map((location) => location.trim());

                          field.onChange(locationsArray);
                          onInputChange("locations", locationsArray);
                        }}
                        className={`${
                          form.formState.errors.locations && "shake"
                        } h-12 rounded-[5px] px-2 py-1 placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              /> */}
              <Controller
                name="locations"
                // rules={{
                //   required: {
                //     value: true,
                //     message: "Job location is required",
                //   },
                // }}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="text-base font-semibold text-[#171717]">
                        Location
                      </FormLabel>
                      <ReactSelect
                        // defaultInputValue={field.value?.[0]}
                        // value={field?.value?.[0] || []}
                        onChange={(newValue: any) => {
                          console.log(newValue);
                          if (newValue === null) {
                            field.onChange([]);
                            return;
                          }
                          field.onChange([newValue.value]);
                        }}
                        value={citiesOptions.filter((option: any) =>
                          field.value?.includes(option.value),
                        )}
                        // @ts-ignore
                        itemSize={() => 49}
                        components={{ MenuList }}
                        options={citiesOptions}
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
                      <FormMessage className="text-xs" />
                    </FormItem>
                  );
                }}
              />
              {/* Linkedin URL */}
              <FormField
                control={form.control}
                name="companyLinkedIn"
                rules={{
                  pattern: {
                    value: /linkedin/i,
                    message: "Enter a valid Linkedin url",
                  },
                }}
                render={({ field }) => (
                  <FormItem className="mb-1">
                    <FormLabel className="text-base font-semibold text-[#171717]">
                      Linkedin URL
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Paste link here"
                        {...field}
                        onChange={(e) => {
                          onInputChange("companyLinkedIn", e.target.value);
                        }}
                        className={`${
                          form.formState.errors.companyLinkedIn && "shake"
                        } h-12 rounded-[5px] px-2 py-1 placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            {/* Phone */}

            <div
              className={`${
                type === "EditCompany" && "mt-1"
              } flex w-full flex-col gap-6`}
            >
              <div className="flex flex-col gap-1">
                <FormLabel className="text-base font-semibold text-[#171717]">
                  Phone*
                </FormLabel>
                <PhoneInputWithCountry
                  control={form.control}
                  name="companyPhoneNo"
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
                      form.formState.errors.companyPhoneNo && "shake"
                    } rounded-md border border-[#E1E1E1] border-input bg-white w-full  text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 rounded-[5px] px-2 py-1 placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`,
                  }}
                  placeholder="eg : +91 9876543210"
                />
                {form.formState.errors.companyPhoneNo && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.companyPhoneNo.message}
                  </p>
                )}
              </div>

              {/* Website */}
              <FormField
                control={form.control}
                name="companyWebsite"
                rules={{
                  // required: {
                  //   value: true,
                  //   message: "Company Website required",
                  // },
                  pattern: {
                    value:
                      /^(https?:\/\/)?(www\.)?([\w.-]+)\.([a-z]{2,})(:\d{2,5})?(\/\S*)?$/,
                    message: "Enter a valid company website url",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-[#171717]">
                      Website
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Paste link here"
                        {...field}
                        onChange={(e) => {
                          onInputChange("companyWebsite", e.target.value);
                        }}
                        className={`${
                          form.formState.errors.companyWebsite && "shake"
                        } h-12 rounded-[5px] px-2 py-1 placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        {/* button */}
        <div className="flex justify-end gap-4">
          <Button
            variant={"outline"}
            type="button"
            onClick={() => {
              setOpen(false);
            }}
            className="rounded-[5px] border-[#A9A9A9] text-xl font-bold tracking-[-0.4px] text-[#171717] hover:text-[#5E5E5E] lg:h-[59px] lg:w-[152px]"
          >
            Cancel
          </Button>
          {(isSubmitting && !isSubmittingError) ||
          (isDataSubmitting && !isSubmitError) ? (
            <Button
              disabled
              variant={"gradient"}
              className="text-xl font-bold tracking-[-0.4px] lg:h-[59px] lg:w-[152px]"
            >
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              {type === "EditCompany" ? "Updating..." : "Adding..."}
            </Button>
          ) : (
            <Button
              type="submit"
              variant="gradient"
              className="text-xl font-bold tracking-[-0.4px] lg:h-[59px] lg:w-[152px]"
            >
              Save
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default AddCompanyForm;
