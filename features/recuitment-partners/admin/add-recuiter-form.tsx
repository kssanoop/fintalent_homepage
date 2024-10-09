import ProfilePlaceholder from "@/features/auth/profile-upload_placeholder.svg";
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
import { AddRecruiterSchema } from "./Schema/add-recruiter-schema";
import { useQueryClient } from "@tanstack/react-query";
import { useFileUploadToS3 } from "@/features/auth/api/upload-s3";
import { toast } from "sonner";
import {
  CardIcon,
  CardIconFallback,
  CardIconImage,
} from "@/components/ui/cardslogo";
import { useAcceptJoinCompanyRequest } from "./api/accept-company-join-request";
import { Loader2 } from "lucide-react";
import { useAddRecruiter } from "./api/add-recruiter";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input/mobile";
import "react-phone-number-input/style.css";
import ImageUpload from "@/components/file-upload/image-upload/image-upload";
import { useUploadPercentge } from "@/utils/hooks/useUploadPercentage";
import { PROFILE_PIC_MAX_SIZE } from "@/lib/constants/formConstant";
import { AxiosProgressEvent } from "axios";
import ReactSelect from "react-select";
import { classNameForReactSelect } from "@/utils/classNameForReactSelect";
import useGetCities from "@/features/get-location/api/get-contry-cities";
import { generateOptions } from "@/features/get-location/utils/generateOptionsForLocation";
import { MenuList } from "@/components/menu-list";
interface UserDetailsFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  type: string;
  profilePhoto?: { originalName: string; storageName: string };
  designation?: string;
  fullName?: string;
  email?: string;
  phoneNo?: string;
  location?: string;
  linkedIn?: string;
  recruiterId?: string;
  companyId?: any;
}
const AddRecuiterForm = ({
  setOpen,
  type,
  profilePhoto,
  designation,
  fullName,
  email,
  phoneNo,
  location,
  linkedIn,
  recruiterId,
  companyId,
}: UserDetailsFormProps) => {
  const { data: cities, isFetching: isCitiesLoading } = useGetCities();
  const citiesOptions = useMemo(
    () => cities && generateOptions(cities),
    [cities],
  );
  const [profilePic, setProfilePic] = useState<File>();
  const queryClient = useQueryClient();
  const { uploadPercentage, setUploadPercentage } = useUploadPercentge();
  console.log("form companyId:", profilePhoto);
  const defaultValuesForms =
    type === "editRecruiter"
      ? {
          fullName,
          email,
          designation,
          profilePhoto,
          linkedIn,
          location,
          phoneNo,
        }
      : {
          fullName: "",
          email: "",
          designation: "",
          profilePhoto: {
            originalName: "",
            storageName: "",
          },
          linkedIn: "",
          location: "",
          phoneNo: "",
        };

  const form = useForm<AddRecruiterSchema>({
    defaultValues: defaultValuesForms,
  });

  function handleError(data: any) {}

  // handle upload photo success
  function handleSuccess(data: string, fileData: File) {
    console.log("Data recieved", data);
    console.log("File Data", fileData);
    // toast.success("Photo Uploded sucessfully");

    form.setValue("profilePhoto.originalName", fileData.name);
    const storageName = new URL(data).pathname;
    form.setValue("profilePhoto.storageName", storageName);
  }

  const uploadProgress = (progress: AxiosProgressEvent) => {
    setUploadPercentage(progress);
  };

  const { mutate, isLoading: isUploading } = useFileUploadToS3(
    handleSuccess,
    handleError,
    uploadProgress,
  );

  // form success submit
  const formSubmissionhandleSuccess = (response: any) => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["all-compay-list-pending"] });
    queryClient.invalidateQueries({
      queryKey: ["get-companies-all-active-recruiter"],
    });
    toast.success(response?.message);
  };

  // form error in  submission
  const formSubmissionhandleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const photoRef = useRef<HTMLInputElement>(null);
  // handle upload photo
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetFile = event.target.files?.[0] ?? null;
    const inputTag = event.target.id;
    console.log(targetFile);
    if (targetFile) {
      console.log(event.target.id);
      if (targetFile.size > 2 * 1024 * 1024) {
        toast.error("File size exceeds 2 MB limit");
        return;
      }
      if (inputTag === "profilePhoto") {
        setProfilePic(targetFile);
        // console.log("image file spotted");
        mutate({ fileData: targetFile, fileType: "profilePicture" });
      }
    }
  };

  const {
    mutate: acceptCompanyJoin,
    isLoading: isAcceptingJoin,
    isError: isAcceptingJoinError,
  } = useAcceptJoinCompanyRequest(
    formSubmissionhandleSuccess,
    formSubmissionhandleError,
  );

  const {
    mutate: addRecruiter,
    isLoading: isaddingRecruiter,
    isError: isaddingRecruiterError,
  } = useAddRecruiter(formSubmissionhandleSuccess, formSubmissionhandleError);

  const clearImageFileState = () => {
    form.clearErrors("profilePhoto.originalName");
    form.setValue("profilePhoto.originalName", "");
    form.setValue("profilePhoto.originalName", "");
  };

  const handleImageUpload = (imageFile: File) => {
    if (imageFile.size > PROFILE_PIC_MAX_SIZE) {
      form.setError("profilePhoto.originalName", {
        message: `maximum file size is ${
          PROFILE_PIC_MAX_SIZE / (1024 * 1024)
        }mb`,
      });
      return;
    }
    mutate({ fileData: imageFile, fileType: "profilePicture" });
  };
  // submit function on data submit
  const onSubmit: SubmitHandler<AddRecruiterSchema> = (values) => {
    console.log("form data:w", values);
    if (type === "editRecruiter") {
      acceptCompanyJoin({ data: values, recruiterId });
    } else {
      addRecruiter({ data: values, companyId });
    }
  };

  type FormFieldName =
    | "fullName"
    | "email"
    | "location"
    | "designation"
    | "phoneNo"
    | "linkedIn";
  // show error while typing
  const onInputChange = (name: FormFieldName, value: any) => {
    form.setValue(name, value);
    form.trigger(name);
  };
  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-[18px]"
      >
        <div className="scroll-container hide-scrollbar flex max-h-[500px] flex-col overflow-auto px-1">
          <div>
            {type === "editRecruiter" ? (
              <>
                <label className="font-semibold">Profile Pic</label>
                <div
                  className="mb-6 flex w-fit cursor-pointer gap-x-4"
                  onClick={() => {
                    photoRef.current?.click();
                  }}
                >
                  <Input
                    name=""
                    type="file"
                    className="hidden"
                    ref={photoRef}
                    accept="image/*"
                    id="profilePhoto"
                    onChange={handleUpload}
                  />
                  <CardIcon
                    className={`mt-3 h-[90px]  w-[90px] rounded-full ${
                      profilePic && "border-2"
                    }border-brand-blue object-center`}
                  >
                    <CardIconImage
                      src={
                        profilePic
                          ? URL.createObjectURL(profilePic)
                          : profilePhoto?.storageName
                            ? `${process.env.NEXT_PUBLIC_IMG_URL}${profilePhoto?.storageName}`
                            : ProfilePlaceholder
                      }
                    />
                    <CardIconFallback className="text-center">
                      {fullName}
                    </CardIconFallback>
                  </CardIcon>
                </div>
              </>
            ) : (
              <div>
                <label className="font-semibold">Profile Pic</label>
                <div className="mb-7 mt-3">
                  <ImageUpload
                    handleUpload={handleImageUpload}
                    handleRemove={clearImageFileState}
                    errorMessage={
                      form.formState.errors.profilePhoto?.storageName
                        ?.message ||
                      form.formState.errors.profilePhoto?.originalName?.message
                    }
                    uploadPercentage={uploadPercentage}
                    isUploading={isUploading}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6 pb-1">
            <FormField
              control={form.control}
              name="fullName"
              rules={{
                required: {
                  value: true,
                  message: "Your full name is required",
                },
                pattern: {
                  value: /^[A-Za-z0-9\s&.'",()-]+$/,
                  message: "Enter a valid name",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name*</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter full name"
                      {...field}
                      onChange={(e) => {
                        onInputChange("fullName", e.target.value);
                      }}
                      className={`${
                        form.formState.errors.fullName && "shake"
                      } h-12 rounded-[5px] px-2 py-1  placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Recruiter Email Id */}

            <FormField
              control={form.control}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: "Your Recruiter Email Id is required",
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recruiter email ID*</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter mail ID"
                      {...field}
                      onChange={(e) => {
                        onInputChange("email", e.target.value);
                      }}
                      className={`${
                        form.formState.errors.email && "shake"
                      } h-12 rounded-[5px] px-2 py-1  placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location */}
            {/* <FormField
              control={form.control}
              name="location"
              rules={{
                required: {
                  value: true,
                  message: "Location is required",
                },
                pattern: {
                  value: /^[A-Za-z-' ]+$/,
                  message: "Enter a valid location",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Banglore"
                      {...field}
                      onChange={(e) => {
                        onInputChange("location", e.target.value);
                      }}
                      className={`${
                        form.formState.errors.designation && "shake"
                      } h-12 rounded-[5px] px-2 py-1 placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <Controller
              name="location"
              rules={{
                required: {
                  value: true,
                  message: "Location is required",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location*</FormLabel>{" "}
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
                      }),
                    }}
                    classNames={classNameForReactSelect}
                  />
                  {form.formState.errors.location && (
                    <p className="text-sm font-medium text-destructive">
                      {form.formState.errors.location.message}
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* designation */}
            <FormField
              control={form.control}
              name="designation"
              rules={{
                required: {
                  value: true,
                  message: "Designation is required",
                },
                pattern: {
                  value: /^[A-Za-z-' ]+$/,
                  message: "Enter a valid designation name",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Designation*</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="eg: Hiring manager"
                      {...field}
                      onChange={(e) => {
                        onInputChange("designation", e.target.value);
                      }}
                      className={`${
                        form.formState.errors.designation && "shake"
                      } h-12 rounded-[5px] px-2 py-1 placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            {/* <FormField
              control={form.control}
              name="phoneNo"
              rules={{
                required: {
                  value: true,
                  message: "Phone No is required",
                },
                // pattern: {
                //   value: /^[A-Za-z-' ]+$/,
                //   message: "Enter a valid name",
                // },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone*</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="eg: 98984 13949"
                      {...field}
                      onChange={(e) => {
                        onInputChange("phoneNo", e.target.value);
                      }}
                      className={`${
                        form.formState.errors.phoneNo && "shake"
                      } h-12 rounded-[5px] px-2 py-1 placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <div className="flex flex-col gap-1">
              <h4 className="text-base font-semibold text-[#171717]">Phone*</h4>
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
                  } rounded-md border border-[#E1E1E1] border-input bg-white w-full  text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-12 rounded-[5px] px-2 py-1 placeholder:text-base placeholder:font-medium placeholder:text-[#A9A9A9]`,
                }}
                placeholder="eg : +91 9876543210"
              />
              {form.formState.errors.phoneNo && (
                <p className="text-sm font-medium text-destructive">
                  {form.formState.errors.phoneNo.message}
                </p>
              )}
            </div>
            {/* Linkedin URL */}
            <FormField
              control={form.control}
              name="linkedIn"
              rules={{
                // required: {
                //   value: true,
                //   message: " Linkedin url is required",
                // },
                pattern: {
                  // value: /^(https?:\/\/)?(www\.)?linkedin\.com\/[a-z0-9]+/i,
                  value: /linkedin/i,
                  message: "Enter a valid Linkedin url",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Linkedin URL</FormLabel>
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
        </div>
        {/* button */}
        <div className="flex justify-end gap-4">
          <Button
            variant={"outline"}
            type="button"
            onClick={() => {
              setOpen(false);
            }}
            className="rounded-[5px] border-[#A9A9A9] text-xl font-bold tracking-[-0.4px] text-[#171717]  hover:text-[#5E5E5E] lg:h-[59px] lg:w-[152px]"
          >
            Cancel
          </Button>
          {isAcceptingJoin && !isAcceptingJoinError ? (
            <Button
              disabled
              variant={"gradient"}
              className="text-xl font-bold lg:h-[59px] lg:w-[152px]"
            >
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Adding...
            </Button>
          ) : (
            type === "editRecruiter" && (
              <Button
                type="submit"
                variant="gradient"
                className="text-xl font-bold tracking-[-0.4px] lg:h-[59px] lg:w-[152px]"
              >
                Add
              </Button>
            )
          )}
          {isaddingRecruiter && !isaddingRecruiterError ? (
            <Button
              disabled
              variant={"gradient"}
              className="text-xl font-bold lg:h-[59px] lg:w-[152px] "
            >
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Saving...
            </Button>
          ) : (
            type !== "editRecruiter" && (
              <Button
                type="submit"
                variant="gradient"
                className="text-xl font-bold lg:h-[59px] lg:w-[152px]"
              >
                Save
              </Button>
            )
          )}
        </div>
      </form>
    </Form>
  );
};

export default AddRecuiterForm;
