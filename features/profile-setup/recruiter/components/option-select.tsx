import React, { useCallback, useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

import { UseFormReturn } from "react-hook-form";
import RecruiterSchema from "../schemas/recruiter-profile";
import { Label } from "@/components/ui/label";
import JoinCompanyForm from "./join-form";
import CreateCompanyForm from "./create-company";

interface stepForm {
  form: UseFormReturn<RecruiterSchema>;
}

const OptionSelect = ({ form }: stepForm) => {
  const options = [
    {
      id: 1,
      label: "option1",
    },
    {
      id: 2,
      label: "option2",
    },
  ];
  const [selectedOption, setSelectedOption] = useState(options[1].id);
  const resetFields = useCallback(() => {
    form.resetField("companyData.companyLinkedIn");
    form.resetField("companyData.companyLogo");
    form.resetField("companyData.companyName");
    form.resetField("companyData.companyPhoneNo");
    form.resetField("companyData.companyWebsite");
    form.resetField("companyData.location");
  }, [form]);

  // resetting the company form state since there are two types of company form and both form states have common fields
  useEffect(() => {
    resetFields();
  }, [resetFields]);

  const handleCheckboxChange = (value: any) => {
    setSelectedOption(value);
    resetFields();

    if (value === 2) {
      // form.clearErrors("recruiterData.companyId");
      // form.reset({
      //   recruiterData: {
      //     companyId: "",
      //   },
      //   companyData: {},
      // });
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6 mt-10 flex gap-x-6">
        <label
          htmlFor="checkbox-1"
          className={`space-y-1 rounded-md border p-5 ${
            selectedOption === options[0].id && "bg-[#034A9A2B]"
          } p-4`}
        >
          <div className="flex justify-between">
            <Label className="font-bold">Join your company</Label>
            <Checkbox
              className="h-4 w-4 rounded-full"
              id="checkbox-1"
              checked={selectedOption === options[0].id}
              onCheckedChange={() => {
                handleCheckboxChange(options[0].id);
              }}
            />
          </div>
          <p className="font-medium text-brand-grey">
            Join your registered company using 10 digit code.
          </p>
        </label>
        <label
          htmlFor="checkbox-2"
          className={`space-y-1 rounded-md border p-5 ${
            selectedOption === options[1].id && "bg-[#034A9A2B]"
          } p-4`}
        >
          <div className="flex justify-between">
            <Label className="font-bold">Create new company</Label>
            <Checkbox
              className="h-4 w-4 rounded-full ring-offset-brand-grey data-[state-unchecked]:border-brand-grey"
              id="checkbox-2"
              checked={selectedOption === options[1].id}
              onCheckedChange={() => {
                handleCheckboxChange(options[1].id);
              }}
            />
          </div>
          <p className="font-medium text-brand-grey">
            Choose this if your company is not registered.
          </p>
        </label>
      </div>
      {selectedOption === options[0].id && <JoinCompanyForm form={form} />}
      {selectedOption === options[1].id && <CreateCompanyForm form={form} />}
    </div>
  );
};

export default OptionSelect;
