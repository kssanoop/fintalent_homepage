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
import { Textarea } from "@/components/ui/textarea";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { useFileUploadToS3 } from "@/features/auth/api/upload-s3";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useAddData } from "../../WorkHistory/api/updateWorkHistory";
import { Loader2 } from "lucide-react";
import { personalDetails } from "../Schema/profile-schema";
import { useQueryClient } from "@tanstack/react-query";
import { CardIcon, CardIconImage } from "@/components/ui/cardslogo";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input/mobile";
import "react-phone-number-input/style.css";
import AvatarProfileFallback from "@/components/avatar-profile-fallback";
interface UserDetailsFormProps {
  data: personalDetails;
  setOpen: Dispatch<SetStateAction<boolean>>;
  imageLinks: string;
}
const UserDetailsForm = ({
  data,
  setOpen,
  imageLinks,
}: UserDetailsFormProps) => {
  const [profilePic, setProfilePic] = useState<File>();
  // const [imageLink, setImageLink] = useState(imageLinks);
  // handle Type Input of trigger error
  type FormFieldName =
    | "email"
    | "profilePhoto"
    | "summary"
    | "fullName"
    | "phoneNo"
    | "linkedInProfile"
    | "currentOrganization"
    | "jobTitle"
    | "profileVerified"
    | "totalExperience"
    | "profilePhoto.originalName";

  // default form values
  const defaultValuesForms = {
    fullName: data.fullName,
    email: data.email,
    phoneNo: data.phoneNo,
    linkedInProfile: data.linkedInProfile,
    currentOrganization: data.currentOrganization,
    jobTitle: data.jobTitle,
    summary: data.summary,
  };
  const form = useForm<personalDetails>({
    defaultValues: defaultValuesForms,
  });

  // word count limit ofr description
  const maxWords = 150;
  const text = form.watch("summary");

  const validateWordCount = (text: any) => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length <= maxWords || "Word count exceeds the limit";
  };

  // useEffect(() => {
  //   if (data) {
  //     const imgLink = process.env.NEXT_PUBLIC_IMG_URL;
  //     const strorageLink = imgLink + data.profilePhoto.storageName;
  //     setImageLink(strorageLink);
  //   }
  // }, [data]);
  const { isLoading, mutate } = useFileUploadToS3(
    handleSuccess,
    handleError,
    uploadProgress,
  );

  // handle upload photo error
  function handleError(data: any) {}

  // handle upload photo success
  function handleSuccess(data: string, fileData: File) {
    console.log("Data recieved", data);
    console.log("File Data", fileData);
    toast.success("Photo Uploded sucessfully");
    if (fileData.type.includes("image")) {
      form.setValue("profilePhoto.originalName", fileData.name);
      const storageName = new URL(data).pathname;
      form.setValue("profilePhoto.storageName", storageName);
    }
  }

  function uploadProgress() {
    console.log("progressing...");
  }
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
      if (inputTag === "profilepic") {
        setProfilePic(targetFile);
        console.log("image file spotted");
        mutate({ fileData: targetFile, fileType: "profilePicture" });
      }
    }
  };

  const photoRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();

  // handle success function
  const handleSuccessSubmit = (data: any) => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["candidate"] });
    toast.success(data?.message);
  };

  // handle error function
  const handleErrorSubmit = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  // usehook for data updation
  const {
    mutate: mutateEdit,
    isLoading: isSubmitting,
    isError: isSubmitionError,
  } = useAddData(handleSuccessSubmit, handleErrorSubmit);

  // submit function on data submit
  const onSubmit: SubmitHandler<personalDetails> = (values) => {
    // Exclude the email field from values
    const { email, ...valuesWithoutEmail } = values;

    console.log(valuesWithoutEmail);
    mutateEdit(valuesWithoutEmail);
  };

  // show error while typing
  const onInputChange = (name: FormFieldName, value: any) => {
    form.setValue(name, value);
    form.trigger(name);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="scroll-container hide-scrollbar flex max-h-[500px] flex-col overflow-auto px-1">
          <label className="font-bold">Profile Pic</label>
          <div
            className="mb-6 mt-3 flex w-fit gap-x-4"
            onClick={() => {
              photoRef.current?.click();
            }}
          >
            <Input
              name="profilepic"
              type="file"
              className="hidden"
              ref={photoRef}
              accept="image/*"
              id="profilepic"
              onChange={handleUpload}
            />
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              </div>
            ) : (
              <>
                <CardIcon
                  className={`h-[90px] w-[90px]  rounded-full  ${
                    profilePic && "border-2"
                  }border-brand-blue object-center`}
                >
                  <CardIconImage
                    src={
                      profilePic
                        ? URL.createObjectURL(profilePic)
                        : data.profilePhoto.storageName
                        ? imageLinks
                        : ProfilePlaceholder
                    }
                  />
                  <AvatarProfileFallback />{" "}
                </CardIcon>
              </>
            )}
            <button className="font-medium text-link" type="button">
              {profilePic ? profilePic.name : "Upload photo"}
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="fullName"
              rules={{
                required: {
                  value: true,
                  message: "Your full name is required",
                },
                pattern: {
                  value: /^[A-Za-z-' ]+$/,
                  message: "Enter a valid name",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name*</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="eg: Jon Doe"
                      {...field}
                      className={`${
                        form.formState.errors.fullName && "shake"
                      } h-10 rounded-[5px] px-2 py-1`}
                      onChange={(e) => {
                        onInputChange("fullName", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="phoneNo"
              rules={{
                required: { value: true, message: "Mobile number is required" },
                pattern: {
                  value: /^\d{10}$/,
                  message: "Enter a valid 10-digit mobile number",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number*</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      maxLength={13}
                      pattern="[1-9]\d*"
                      placeholder="+91 1234567890"
                      className={`${
                        form.formState.errors.phoneNo && "shake"
                      } h-10 rounded-[5px] px-2 py-1`}
                      {...field}
                      onChange={(e) => {
                        onInputChange("phoneNo", e.target.value);
                      }}
                      onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        e.target.value = e.target.value.replace(/\D/g, "");
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

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

            <FormField
              control={form.control}
              name="email"
              rules={{
                required: {
                  value: true,
                  message: "Email is required",
                },
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                  message: "Enter a valid Email",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email ID</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      type="text"
                      placeholder="eg: joe@gmail.com"
                      {...field}
                      className={`${
                        form.formState.errors.fullName && "shake"
                      } h-10 rounded-[5px] px-2 py-1`}
                      onChange={(e) => {
                        onInputChange("email", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="linkedInProfile"
              rules={{
                required: {
                  value: true,
                  message: "Linkedin Url is required",
                },
                pattern: {
                  value: /linkedin/i,
                  message: "Invalid linkedin profile URL",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Linkedin profile</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="eg: linkedin.com/username"
                      className={`${
                        form.formState.errors.linkedInProfile && "shake"
                      } h-10 rounded-[5px] px-2 py-1`}
                      {...field}
                      onChange={(e) => {
                        onInputChange("linkedInProfile", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                <FormItem>
                  <FormLabel>Current Organization</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled
                      placeholder="eg: ABC Company"
                      {...field}
                      className={`${
                        form.formState.errors.currentOrganization && "shake"
                      } h-10 rounded-[5px] px-2 py-1`}
                      onChange={(e) => {
                        onInputChange("currentOrganization", e.target.value);
                      }}
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
                pattern: {
                  value: /^[a-zA-Z][a-zA-Z0-9\s()]*$/,
                  message: "Job Title is in invalid format",
                },
              }}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Job Title*</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      disabled
                      placeholder="eg: Financial Analyst"
                      {...field}
                      className={`${
                        form.formState.errors.jobTitle && "shake"
                      } h-10 rounded-[5px] px-2 py-1`}
                      onChange={(e) => {
                        onInputChange("jobTitle", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="relative">
              <FormField
                control={form.control}
                rules={{
                  validate: validateWordCount,
                  required: {
                    value: true,
                    message: "Small summary is required",
                  },
                }}
                name="summary"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Summary</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself"
                        className="min-h-[150px] resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div
                className="py-o.5 rounded bg-white px-0.5 text-sm font-medium text-gray-400"
                style={{ position: "absolute", bottom: "10px", right: "15px" }}
              >
                {`${
                  text?.split(/\s+/).filter(Boolean).length ?? 0
                } / ${maxWords} words`}
              </div>
            </div>
          </div>
        </div>
        {/* button */}
        <div className="flex justify-end gap-4 pt-2">
          <Button
            variant={"outline"}
            type="button"
            className="rounded-[5px] border-[#A9A9A9] text-base font-semibold text-[#5E5E5E] hover:text-[#5E5E5E] md:w-[85px]"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          {isSubmitting && !isSubmitionError ? (
            <Button disabled variant={"gradient"}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </Button>
          ) : (
            <Button type="submit" variant="gradient" className="w-[85px]">
              Save
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default UserDetailsForm;
