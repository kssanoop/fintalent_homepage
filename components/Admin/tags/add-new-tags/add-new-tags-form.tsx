import React, { Dispatch, SetStateAction, useMemo } from "react";
import { useForm } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import DynamicHeightContainer from "@/features/chat/common/DynamicHeightContainer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MultiSelectInput from "@/components/layout/multi-select-input";
// import useGetTeamLeadsForAdmin from "@/features/admin/team-lead/api/get-team-leads-for-admin";
import { useGetAllCompanyList } from "@/features/recuitment-partners/admin/api/get-all-company-list";
import { useGetCompaniesAllActiveRecruiter } from "@/features/recuitment-partners/admin/api/get-active-recruiter-by-companyId";
import RecruiterDataType from "@/features/recuitment-partners/admin/type/company-recruiter-data-type";
import { Loader2 } from "lucide-react";
import useGetSkills from "@/utils/getSkills";
import { TagFormDataType } from "@/features/admin/tag/tag-data-type-form";
import { toast } from "sonner";
import { useAddNewTagAdmin } from "@/features/admin/tag/create-tag-admin";
import { useQueryClient } from "@tanstack/react-query";
import useGetCities from "@/features/get-location/api/get-contry-cities";
import { generateOptions } from "@/features/get-location/utils/generateOptionsForLocation";
import ReactSelect from "react-select";
import { classNameForReactSelect } from "@/utils/classNameForReactSelect";
import { useFetchNextListOnView } from "@/utils/hooks/useFetchNextListOnView";
import { MenuList } from "@/components/menu-list";
import { experienceLevelOptions } from "@/lib/constants/input-options";
import { useGetQualifications } from "@/features/qualifications/api/get-qualifications";

type Field = {
  id: number;
  label: string;
  fieldType: string;
  name: keyof TagFormDataType;
  options?: Array<{ value: string; label: string }>;
  rules?: { required: string };
  validate?: (text: any) => true | "Word count exceeds the limit";
};

interface AddNewTagsFormProps {
  setIsSheetOpen: Dispatch<SetStateAction<boolean>>;
}

const AddNewTagsForm = ({ setIsSheetOpen }: AddNewTagsFormProps) => {
  // const [selectedCompanyId, setSelectedCompanyId] = useState("");
  // const [selectedRecruiterId, setSelectedRecruiterId] = useState("");
  const { data: skillData } = useGetSkills();
  // const { data: teamLeads } = useGetTeamLeadsForAdmin();
  const {
    data: companyData,
    isLoading: isCompanyDataLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetAllCompanyList();

  const { data: cities, isFetching: isCitiesLoading } = useGetCities();
  const citiesOptions = useMemo(
    () => cities && generateOptions(cities),
    [cities],
  );

  const { data: qualifications } = useGetQualifications();
  const transformedQualificationsData = qualifications?.map((item: any) => ({
    value: item,
    label: item,
  }));

  const queryClient = useQueryClient();
  const transformedData = skillData?.map((item: any) => ({
    value: item,
    label: item,
  }));

  const companList = companyData?.pages
    .flatMap((pg) => pg.data)
    ?.map((company) => ({
      companyName: company?.companyName,
      companyId: company?._id,
    }));

  const { ref } = useFetchNextListOnView({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  const handleSuccess = (data: any) => {
    setIsSheetOpen(false);
    queryClient.invalidateQueries({ queryKey: ["tags-admin"] });
    toast.success(data?.message);
  };

  // form error in  submission
  const handleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };

  const { mutate, isLoading, isError } = useAddNewTagAdmin(
    handleSuccess,
    handleError,
  );

  // console.log("company Recruiter:", RecruiterListOfSelectedCompany);

  // const options: Array<{ value: string; label: string }> | undefined =
  //   teamLeads?.map((item: any) => ({
  //     value: item?.teamLeadId,
  //     label: item?.name,
  //   }));
  const form = useForm<TagFormDataType>({
    reValidateMode: "onChange",
    mode: "all",
  });
  // word count limit ofr description
  const maxWords = 150;
  const text = form.watch("other");

  const validateWordCount = (text: any) => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length <= maxWords || "Word count exceeds the limit";
  };

  const FieldsList: Field[] = [
    {
      id: 1,
      label: "Company",
      fieldType: "select",
      name: "companyId",
      rules: { required: "Company is required" },
    },
    {
      id: 2,
      label: "Recruiter",
      fieldType: "select",
      name: "recruiterId",
      rules: { required: "Recruiter is required" },
    },
    {
      id: 3,
      label: "Location",
      fieldType: "input",
      name: "location",
      rules: { required: "Location is required" },
    },
    {
      id: 4,
      label: "Job title",
      fieldType: "input",
      name: "jobTitle",
      rules: { required: "jobTitle is required" },
    },
    {
      id: 5,
      label: "Experience",
      fieldType: "select",
      name: "experienceLevel",
      rules: { required: "Experience is required" },
    },
    {
      id: 6,
      label: "Skills required",
      fieldType: "multi-select",
      name: "skills",
      options: transformedData,
      rules: { required: "At least 1 skill is required" },
    },
    {
      id: 7,
      label: "No. of candidate needed",
      fieldType: "inputNum",
      name: "candidateCount",
      rules: { required: "No. of candidate is required" },
    },
    {
      id: 8,
      label: "Qualification",
      fieldType: "multi-select",
      name: "qualifications",
    },
    {
      id: 9,
      label: "Other",
      fieldType: "textarea",
      name: "other",
      rules: { required: "Please provide a short description" },
      validate: validateWordCount,
    },
    // {
    //   id: 9,
    //   label: "Assign Team Leads",
    //   fieldType: "multi-select",
    //   name: "teamLeads",
    //   options,
    // },
  ];

  const { data: RecruiterData, isLoading: isRecruiterLoading } =
    useGetCompaniesAllActiveRecruiter({
      companyId: form.getValues("companyId"),
    });

  // console.log("recruiter id:", RecruiterData)
  const RecruiterListOfSelectedCompany = RecruiterData?.map(
    (recruiter: RecruiterDataType) => ({
      recruiterName: recruiter?.fullName,
      recruiterId: recruiter?.recruiterId,
    }),
  );

  // console.log("slected company recruiter:", RecruiterListOfSelectedCompany);
  const onSubmit = (values: TagFormDataType) => {
    const updatedSkills = values?.skills?.map((item: any) => item?.value);
    const upatedLocation = values?.location.toString();
    const updatedQualifications = values?.qualifications?.map(
      (item: any) => item.value,
    );
    const updatedData = {
      ...values,
      // recruiterId: selectedRecruiterId,
      // companyId: selectedCompanyId,
      skills: updatedSkills,
      location: upatedLocation,
      qualifications: updatedQualifications,
    };
    // console.log("form data:", updatedData);
    mutate({ data: updatedData });
  };

  return (
    <DynamicHeightContainer>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-[13px] px-1"
        >
          {FieldsList.map((field) => {
            const { label, fieldType, options, name, validate } = field;

            return (
              <div key={field.id}>
                <FormField
                  control={form.control}
                  name={name}
                  rules={{
                    validate,
                    required: {
                      value: true,
                      // @ts-ignore
                      message: field?.rules?.required,
                    },
                  }}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-0">
                      <FormLabel className="text-start text-base font-semibold text-[#171717]">
                        {label}
                      </FormLabel>
                      <FormControl>
                        {(() => {
                          if (fieldType === "textarea") {
                            return (
                              <div className="relative">
                                <div className="relative">
                                  <Textarea
                                    placeholder={label}
                                    className="max-h-[282px] resize-none"
                                    {...field}
                                  />
                                </div>
                                <div
                                  className="rounded bg-white px-0.5 py-0.5 text-sm font-medium text-gray-400"
                                  style={{
                                    position: "absolute",
                                    bottom: "10px",
                                    right: "15px",
                                  }}
                                >
                                  {`${
                                    text?.split(/\s+/).filter(Boolean).length ??
                                    0
                                  } / ${maxWords} words`}
                                </div>
                              </div>
                            );
                          } else if (
                            fieldType === "select" &&
                            label === "Company"
                          ) {
                            return (
                              <Select
                                onValueChange={(selectedCompany) => {
                                  // setSelectedCompanyId(selectedCompany);
                                  form.setValue("companyId", selectedCompany);
                                }}
                              >
                                <SelectTrigger className="h-[54px]">
                                  <SelectValue placeholder="Select a company" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                  {isCompanyDataLoading && (
                                    <p className="flex items-center justify-center self-center">
                                      <Loader2 className=" h-4 w-4 animate-spin" />{" "}
                                      Loading..
                                    </p>
                                  )}
                                  {!isCompanyDataLoading &&
                                    companList?.length === 0 && (
                                      <p className="flex items-center justify-center self-center">
                                        No Company Found
                                      </p>
                                    )}
                                  {companList?.map((company, i) => (
                                    <SelectItem
                                      ref={
                                        companList.length === i + 1 ? ref : null
                                      }
                                      className="text-base font-normal text-black"
                                      value={company?.companyId}
                                      key={company.companyId}
                                    >
                                      {company?.companyName}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            );
                          } else if (label === "Qualification") {
                            return (
                              <MultiSelectInput
                                options={transformedQualificationsData || []}
                                placeholder="Select qualifications.."
                                height={35}
                                {...field}
                              />
                            );
                          } else if (
                            fieldType === "select" &&
                            label === "Recruiter"
                          ) {
                            return (
                              <Select
                                onValueChange={(selectedRecruiter) => {
                                  // setSelectedRecruiterId(selectedRecruiter);
                                  form.setValue(
                                    "recruiterId",
                                    selectedRecruiter,
                                  );
                                }}
                              >
                                <SelectTrigger className="h-[54px]">
                                  <SelectValue placeholder="Select a active recruiter" />
                                </SelectTrigger>
                                <SelectContent className="max-h-[200px]">
                                  <div>
                                    {isRecruiterLoading && (
                                      <p className="flex items-center justify-center self-center">
                                        <Loader2 className=" h-4 w-4 animate-spin" />{" "}
                                        Loading..
                                      </p>
                                    )}
                                    {!isRecruiterLoading &&
                                      RecruiterListOfSelectedCompany?.length ===
                                        0 && (
                                        <p className="flex items-center justify-center self-center">
                                          No Active Recruiter
                                        </p>
                                      )}
                                    {RecruiterListOfSelectedCompany?.map(
                                      (recruiter: {
                                        recruiterName: string;
                                        recruiterId: string;
                                      }) => (
                                        <SelectItem
                                          className="text-base font-normal text-black"
                                          value={recruiter?.recruiterId}
                                          key={crypto?.randomUUID()}
                                        >
                                          {recruiter?.recruiterName}
                                        </SelectItem>
                                      ),
                                    )}
                                  </div>
                                </SelectContent>
                              </Select>
                            );
                          } else if (
                            fieldType === "select" &&
                            label === "Experience"
                          ) {
                            return (
                              <Select onValueChange={field.onChange}>
                                <SelectTrigger className="h-[54px] w-full">
                                  <SelectValue placeholder="Experience Level" />
                                </SelectTrigger>
                                {/* <SelectContent>
                                  <SelectItem
                                    value="fresher"
                                    className="text-base font-normal text-black"
                                  >
                                    Fresher
                                  </SelectItem>
                                  <SelectItem
                                    value="0-6Months"
                                    className="text-base font-normal text-black"
                                  >
                                    0-6 Months
                                  </SelectItem>
                                  <SelectItem
                                    value="6Months-1Year"
                                    className="text-base font-normal text-black"
                                  >
                                    6 Months - 1Year
                                  </SelectItem>
                                  <SelectItem value="1-3Years">
                                    1-3 Years
                                  </SelectItem>
                                </SelectContent> */}
                                <SelectContent>
                                  {experienceLevelOptions.map(
                                    (experienceLevel) => (
                                      <SelectItem
                                        key={experienceLevel.slug}
                                        value={experienceLevel.slug}
                                        className="text-base font-normal text-black"
                                      >
                                        {experienceLevel.name}
                                      </SelectItem>
                                    ),
                                  )}
                                </SelectContent>
                              </Select>
                            );
                          } else if (fieldType === "multi-select") {
                            return (
                              <MultiSelectInput
                                height={54}
                                options={options || []}
                                placeholder="select skills required"
                                {...field}
                              />
                            );
                          }
                          return (
                            <>
                              {fieldType === "inputNum" ? (
                                <Input
                                  placeholder={label}
                                  className="h-[54px]"
                                  {...field}
                                  type="text"
                                  onKeyDown={(e) => {
                                    const isNumericInput = /^[0-9]$/.test(
                                      e.key,
                                    );
                                    const isBackspace = e.key === "Backspace";

                                    if (!isNumericInput && !isBackspace) {
                                      e.preventDefault();
                                    }
                                  }}
                                />
                              ) : label === "Location" ? (
                                <ReactSelect
                                  value={
                                    field.value
                                      ? citiesOptions.filter((city: any) =>
                                          Array.isArray(field.value)
                                            ? field.value.includes(city.value)
                                            : field.value === city.value,
                                        )
                                      : null
                                  }
                                  onChange={(selectedOptions) => {
                                    const selectedValues = Array.isArray(
                                      selectedOptions,
                                    )
                                      ? selectedOptions.map(
                                          (option) => option.value,
                                        )
                                      : selectedOptions
                                        ? [selectedOptions.value]
                                        : [];
                                    field.onChange(selectedValues);
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
                              ) : (
                                <Input
                                  placeholder={label}
                                  className="h-[54px]"
                                  {...field}
                                />
                              )}
                            </>
                          );
                        })()}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          })}
          <div className="flex justify-end gap-4 pt-3">
            <Button
              type="button"
              variant={"outline"}
              className="border border-[#CDCDCD] bg-[#F2F2F2] text-base font-semibold text-[#5E5E5E] hover:text-[#5E5E5E]"
              onClick={() => {
                setIsSheetOpen(false);
              }}
            >
              Cancel
            </Button>
            {isLoading && !isError ? (
              <Button disabled variant={"gradient"}>
                <Loader2 className="h-4 w-4 animate-spin" /> Adding...
              </Button>
            ) : (
              <Button variant={"gradient"}>Confirm</Button>
            )}
          </div>
        </form>
      </Form>
    </DynamicHeightContainer>
  );
};

export default AddNewTagsForm;
