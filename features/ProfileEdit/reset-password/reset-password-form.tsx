import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdatePassword } from "./api/update-password";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Eye, Loader2, ShieldX } from "lucide-react";
import Image from "next/image";
import CloseEye from "@/features/auth/candidate/eye_close.svg";
import { useAutoAnimate } from "@formkit/auto-animate/react";
export interface PasswordChangeSchema {
  oldPassword: string;
  newPassword: string;
}

const ResetPasswordForm = () => {
  const queryClient = useQueryClient();
  const [meter, setMeter] = React.useState(false);
  const form = useForm<PasswordChangeSchema>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
  });

  const password = form.watch("newPassword");

  // passowrd setting
  const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
  const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
  const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
  const atLeastOneSpecialChar = /[@#$%^&*()_+\-=[\]{}|\\:;"'<>,.?/~`!]/g; // any of the special characters within the square brackets
  const eightCharsOrMore = /.{8,}/g; // eight characters or more

  const passwordTracker = {
    uppercase: password.match(atLeastOneUppercase),
    lowercase: password.match(atLeastOneLowercase),
    number: password.match(atLeastOneNumeric),
    specialChar: password.match(atLeastOneSpecialChar),
    eightCharsOrGreater: password.match(eightCharsOrMore),
  };

  const passwordStrength = Object.values(passwordTracker).filter(
    (value) => value,
  ).length;

  const handleSuccess = (data: any) => {
    queryClient.invalidateQueries({ queryKey: ["candidate"] });
    toast.success(data.message);
    form.reset();
  };

  const handleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevState: any) => !prevState);
  };
  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prevState: any) => !prevState);
  };
  const {
    isError: isSubmitError,
    isLoading: isSubmitting,
    mutate,
  } = useUpdatePassword(handleSuccess, handleError);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [parent, enableAnimations] = useAutoAnimate();

  const onSubmit: SubmitHandler<PasswordChangeSchema> = (values) => {
    console.log("Password Value:", values);
    mutate(values);
  };
  return (
    <div className="mt-5 px-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <FormField
            control={form.control}
            name="newPassword"
            rules={{
              required: {
                value: true,
                message: "New Password cannot be empty",
              },
              minLength: {
                value: 8,
                message: "New Password must be atleat 8 characters or more",
              },
              pattern: {
                value:
                  /^(?=.*[0-9])(?=.*[@#$%^&*()_+\-=[\]{}|\\:;"'<>,.?/~`!]).{8,}$/,
                message: "Password does not meet the minimum requirements",
              },
            }}
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      onFocus={() => {
                        setMeter(true);
                      }}
                      className={`font-medium ${
                        showNewPassword ? "" : "text-xl"
                      } tracking-wider ${
                        form.formState.errors.newPassword && "shake"
                      }`}
                      type={showNewPassword ? "text" : "password"}
                      placeholder="*****"
                      {...field}
                    />
                    <div
                      onClick={toggleNewPasswordVisibility}
                      style={{ cursor: "pointer" }}
                      className="absolute inset-y-0 right-0 z-10 my-auto mr-3 flex h-9 items-center rounded-md bg-white pl-1"
                    >
                      {showNewPassword ? (
                        <Eye size={24} strokeWidth={2} color="#5E5E5E" />
                      ) : (
                        <Image
                          src={CloseEye}
                          width={24}
                          height={24}
                          alt="Closed eye icon"
                        />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mb-4" ref={parent}>
            {meter && (
              <>
                {passwordStrength < 3}
                {passwordTracker.eightCharsOrGreater ? (
                  <div className="inline-flex items-center gap-x-1.5">
                    <Check color="#29A327" width={14} height={14} />
                    <p>Need ateast 8 characters</p>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-x-1.5">
                    <ShieldX color="#CA3433" width={16} height={16} />
                    <p>Need ateast 8 characters</p>
                  </div>
                )}
                {passwordTracker.number ? (
                  <div className="inline-flex items-center gap-x-1.5">
                    <Check color="#29A327" width={14} height={14} />
                    <p>Include atleast one number (0-9)</p>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-x-1.5">
                    <ShieldX color="#CA3433" width={16} height={16} />
                    <p>Include atleast one number (0-9)</p>
                  </div>
                )}
                {passwordTracker.specialChar ? (
                  <div className="inline-flex items-center gap-x-1.5">
                    <Check color="#29A327" width={14} height={14} />
                    <p>Include atleast one symbol</p>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-x-1.5">
                    <ShieldX color="#CA3433" width={16} height={16} />
                    <p>Include atleast one symbol</p>
                  </div>
                )}
              </>
            )}
          </div>
          <FormField
            control={form.control}
            name="oldPassword"
            rules={{
              required: {
                value: true,
                message: "Current Password is a required field",
              },
            }}
            render={({ field }) => (
              <FormItem className="mb-10">
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      className={`font-medium ${
                        showOldPassword ? "" : "text-xl"
                      } tracking-wider ${
                        form.formState.errors.oldPassword && "shake"
                      }`}
                      type={showOldPassword ? "text" : "password"}
                      placeholder="*****"
                      {...field}
                    />
                    <div
                      onClick={toggleOldPasswordVisibility}
                      style={{ cursor: "pointer" }}
                      className="absolute inset-y-0 right-0 z-10 my-auto mr-3 flex h-9 items-center rounded-md bg-white pl-1"
                    >
                      {showOldPassword ? (
                        <Eye size={24} strokeWidth={2} color="#5E5E5E" />
                      ) : (
                        <Image
                          src={CloseEye}
                          width={24}
                          height={24}
                          alt="Closed eye icon"
                        />
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-end justify-end">
            {isSubmitting && !isSubmitError ? (
              <Button disabled variant={"gradient"}>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </Button>
            ) : (
              <Button type="submit" variant="gradient" className="w-[95px]">
                Save
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;
