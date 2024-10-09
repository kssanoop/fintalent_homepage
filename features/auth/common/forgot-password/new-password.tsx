import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { newPasswordSchema } from "../../schema/auth-schema";
import { Check, Eye, Loader2, ShieldX } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useRouter } from "next/router";
import useForgotPasswordResetPassword from "../../api/forgot-password-reset-password";
import { toast } from "sonner";
import { RoleTypes } from "@/types/authorization";
import Image from "next/image";
import CloseEye from "@/features/auth/candidate/eye_close.svg";

/* might need to send email to backend, in that case pass the useForm 
 hook from previous component as prop to this component */

const SetNewPasswordForm = ({ role }: { role: RoleTypes }) => {
  const router = useRouter();
  const token = router.query.token;
  const _id = router.query.id;
  const form = useForm<newPasswordSchema>({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
    reValidateMode: "onChange",
  });

  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [parent] = useAutoAnimate();
  const handleSuccess = (data: any) => {
    console.log(data);
    toast.success("You have successfully resetted the password.");
    router.push(`/${role}/login`);
  };

  const handleError = (error: any) => {
    console.log("Error: ", error);
    toast.error(error.response.message);
  };
  const { mutate, isLoading, isError } = useForgotPasswordResetPassword(
    handleSuccess,
    handleError,
  );

  const onSubmit = (values: newPasswordSchema) => {
    console.log(values);
    mutate({
      _id: _id as string,
      token: token as string,
      password: values.confirmPassword,
    });
  };

  const password = form.watch("newPassword");
  const [meter, setMeter] = useState(false);

  // const passwordRegex =
  //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g;
  const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
  const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
  const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
  const atLeastOneSpecialChar = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const toggleConfirmPassVisibility = () => {
    setShowConfirmPass((prevState) => !prevState);
  };

  return (
    <>
      {_id && token ? (
        <Card className="w-[462px] border-0 bg-background shadow-none">
          <CardHeader className="space-y-3 px-0 text-center">
            <CardTitle className="text-2xl font-extrabold md:text-[32px]">
              Set new Password
            </CardTitle>
          </CardHeader>
          <CardContent className="px-0">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col"
              >
                <FormField
                  control={form.control}
                  rules={{
                    pattern: {
                      value:
                        /^(?=.*[0-9])(?=.*[@#$%^&*()_+\-=\[\]{}|\\:;"'<>,.?/~`!]).{8,}$/,
                      message:
                        "Password does not meet the minimum requirements",
                    },
                  }}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            onFocus={() => {
                              setMeter(true);
                            }}
                            type={showPassword ? "text" : "password"}
                            placeholder="*******"
                            {...field}
                          />
                          <div
                            onClick={togglePasswordVisibility}
                            style={{ cursor: "pointer" }}
                            className="absolute inset-y-0 right-0 z-10 my-auto mr-3 flex h-9 items-center rounded-md bg-inherit pl-1"
                          >
                            {showPassword ? (
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
                <div className="mb-5" ref={parent}>
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
                  name="confirmPassword"
                  rules={{
                    validate: (value) =>
                      value === form.watch("newPassword") ||
                      "Passwords do not match",
                  }}
                  render={({ field }) => (
                    <FormItem className="mb-6">
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showConfirmPass ? "text" : "password"}
                            placeholder="******"
                            {...field}
                          />
                          <div
                            onClick={toggleConfirmPassVisibility}
                            style={{ cursor: "pointer" }}
                            className="absolute inset-y-0 right-0 z-10 my-auto mr-3 flex h-9 items-center rounded-md bg-inherit pl-1"
                          >
                            {showConfirmPass ? (
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
                <Button
                  disabled={isLoading && !isError}
                  type="submit"
                  variant="gradient"
                  size="lg"
                >
                  {isLoading && !isError ? (
                    <>
                      {" "}
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <p className="text-center text-xl font-bold text-brand-blue">
          The page you&apos;re trying to get to isn&apos;t available
        </p>
      )}
    </>
  );
};

export default SetNewPasswordForm;
