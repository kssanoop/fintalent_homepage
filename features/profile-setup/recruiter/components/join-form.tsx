import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useEffect, useMemo } from "react";
import { stepForm } from "../schemas/recruiter-profile";
// import Image from "next/image";
import { Label } from "@/components/ui/label";
// import ProfilePlaceholder from "@/features/auth/profile-upload_placeholder.svg";
import useGetCompanyByComapanyNumber from "../../api/get-company-by-companyId";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useGetCities from "@/features/get-location/api/get-contry-cities";
import { generateOptions } from "@/features/get-location/utils/generateOptionsForLocation";
import { Controller } from "react-hook-form";
import ReactSelect from "react-select";
import { classNameForReactSelect } from "@/utils/classNameForReactSelect";
import { MenuList } from "@/components/menu-list";

const JoinCompanyForm = ({ form }: stepForm) => {
  const { data: cities, isFetching: isCitiesLoading } = useGetCities();
  const citiesOptions = useMemo(
    () => cities && generateOptions(cities),
    [cities],
  );
  //  const [searchQuery, setSearchQuery] = useState("")
  const searchQuery = form.getValues("recruiterData.companyId");
  const { data, isError } = useGetCompanyByComapanyNumber(searchQuery);
  console.log(data?.companyPhoneNo);
  console.log(
    "SSSS",
    !!searchQuery && searchQuery.length === 10,
    searchQuery,
    form.getValues("recruiterData.companyId"),
  );

  useEffect(() => {
    form.setValue("createType", "existingCompany");
  }, [form]);

  useEffect(() => {
    if (data) {
      form.setValue("companyData.companyLinkedIn", data.companyLinkedIn);
      form.setValue("companyData.companyLogo", data.companyLogo);
      form.setValue("companyData.companyName", data.companyName);
      form.setValue("companyData.companyPhoneNo", data.companyPhoneNo);
      form.setValue("companyData.companyWebsite", data.companyWebsite);
      form.setValue("companyData.location", data.locations[0]);
    }
  }, [data]);
  useEffect(() => {
    if (isError) {
      form.setError("recruiterData.companyId", {
        message: "Please check you entered a valid company code",
      });
    }
  }, [form, isError]);

  return (
    <div className="flex flex-col gap-y-6">
      <FormField
        control={form.control}
        name="recruiterData.companyId"
        rules={{
          maxLength: 10,
          minLength: {
            value: 10,
            message: "Company code should be 10 characters",
          },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Enter 10 digit Company code</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter 10 digit code"
                // value={field.value}
                // onChange={field.onChange }
                {...field}
                className={`${
                  form.formState.errors.recruiterData?.companyId && "shake"
                }`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div
        className=" w-fit cursor-pointer"
        // onClick={() => {
        //   fileRef.current?.click();
        // }}
      >
        <Label className="block font-semibold">Company Logo</Label>
        <Avatar className="mr-4 mt-5 h-[90px] w-[90px]">
          <AvatarImage
            src={`${process.env.NEXT_PUBLIC_IMG_URL}${data?.companyLogo.storageName}`}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <FormField
          control={form.control}
          name="recruiterData.profilePhoto.originalName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recruiterData.profilePhoto.storageName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
            </FormItem>
          )}
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
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                disabled
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
        name="companyData.location"
        rules={{
          required: { value: true, message: "Location is required" },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input
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
            <FormLabel>Location</FormLabel>
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
                  backgroundColor: "white",
                }),
              }}
              classNames={classNameForReactSelect}
            />
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="companyData.companyPhoneNo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Contact Number</FormLabel>
            <FormControl>
              <Input {...field} disabled />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
                disabled
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
        // rules={{
        //   pattern: {
        //     value: /^(https?:\/\/)?(www\.)?linkedin\.com\/[a-z0-9]+/i,
        //     message: "Invalid linkedin profile link",
        //   },
        // }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Company Linkedin URL</FormLabel>
            <FormControl>
              <Input
                disabled
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
    </div>
  );
};

export default JoinCompanyForm;
