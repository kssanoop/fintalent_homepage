import { JobFormField, jobFormFields } from "@/lib/constants/jobFormFields";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UseFormReturn, Controller } from "react-hook-form";
import { JobSchema } from "@/features/jobs/schema/add-and-edit-job-schema";
import useGetCities from "@/features/get-location/api/get-contry-cities";
import ReactSelect from "react-select";
import { classNameForReactSelect } from "@/utils/classNameForReactSelect";
import { generateOptions } from "@/features/get-location/utils/generateOptionsForLocation";
import { MenuList } from "@/components/menu-list";
import { useGetQualifications } from "@/features/qualifications/api/get-qualifications";
import MultiSelectInput from "@/components/layout/multi-select-input";
import useGetSkills from "@/utils/getSkills";

const JobField = ({
  fieldItem,
  form,
}: {
  fieldItem: JobFormField;
  form: UseFormReturn<JobSchema, any, JobSchema>;
}) => {
  const { data: cities, isFetching: isCitiesLoading } = useGetCities();
  const citiesOptions = cities && generateOptions(cities);

  const { data: qualifications } = useGetQualifications();
  const transformedQualificationsData = qualifications?.map((item: any) => ({
    value: item,
    label: item,
  }));

  const { data: skillData } = useGetSkills();
  const transformedSkillsData = skillData?.map((item: any) => ({
    value: item,
    label: item,
  }));
  if (fieldItem.name === "skills") {
    return (
      <FormField
        control={form.control}
        name="skills"
        render={({ field }) => (
          <>
            <FormLabel className="mb-1 text-sm font-bold text-brand-black md:w-1/2">
              {fieldItem.labelTitle}
            </FormLabel>
            <FormControl>
              <FormItem className="space-y-0 md:w-1/2">
                <MultiSelectInput
                  options={transformedSkillsData || []}
                  placeholder="Select skills.."
                  height={48}
                  // {...field}
                  value={
                    transformedSkillsData?.filter((item: any) =>
                      field.value.includes(item.value),
                    ) || []
                  }
                  onChange={(value: any) => {
                    field.onChange(value.map((item: any) => item.value));
                  }}
                />
              </FormItem>
            </FormControl>
          </>
        )}
      />
    );
  }

  if (fieldItem.name === "qualifications") {
    return (
      <FormField
        control={form.control}
        name="qualifications"
        render={({ field }) => (
          <>
            <FormLabel className="mb-1 text-sm font-bold text-brand-black md:w-1/2">
              {fieldItem.labelTitle}
            </FormLabel>
            <FormControl>
              <FormItem className="space-y-0 md:w-1/2">
                <MultiSelectInput
                  options={transformedQualificationsData || []}
                  placeholder="Select qualifications.."
                  height={48}
                  value={
                    transformedQualificationsData?.filter((item: any) =>
                      field.value.includes(item.value),
                    ) || []
                  }
                  onChange={(value: any) => {
                    field.onChange(value.map((item: any) => item.value));
                  }}
                />
              </FormItem>
            </FormControl>
          </>
        )}
      />
    );
  }
  if (fieldItem.name === "jobLocation") {
    return (
      <>
        <Controller
          name={fieldItem.name}
          rules={{ required: `${fieldItem.labelTitle} is required.` }}
          render={({ field }) => (
            <>
              <FormLabel
                htmlFor={fieldItem.name}
                className="mb-1 text-sm font-bold text-brand-black md:w-1/2"
              >
                {fieldItem.labelTitle}
                <FormDescription className="font-medium text-brand-grey ">
                  {fieldItem.labelDescription}{" "}
                </FormDescription>
              </FormLabel>
              <FormItem className="space-y-0 md:w-1/2">
                <ReactSelect
                  value={
                    citiesOptions?.filter(
                      (item: any) => item.value === field.value,
                    ) || []
                  }
                  onChange={(newValue: any) => {
                    console.log(newValue);
                    field.onChange(newValue.value);
                  }}
                  // @ts-ignore
                  itemSize={() => 49}
                  components={{ MenuList }}
                  options={citiesOptions}
                  isLoading={isCitiesLoading}
                  placeholder="Type here"
                  classNames={classNameForReactSelect}
                  styles={{
                    control: (provided, state) => ({
                      backgroundColor: "#F7F7F7",
                    }),
                  }}
                />
                {form.formState.errors.jobLocation && (
                  <p className="text-sm font-medium text-destructive">
                    {form.formState.errors.jobLocation.message}
                  </p>
                )}
              </FormItem>
            </>
          )}
        />
      </>
    );
  }
  if (fieldItem.fieldType === "text") {
    return (
      <>
        <FormField
          control={form.control}
          name={fieldItem.name}
          rules={{ required: `${fieldItem.labelTitle} is required.` }}
          render={({ field }) => (
            <>
              <FormLabel
                htmlFor={fieldItem.name}
                className="mb-1 text-sm font-bold text-brand-black md:w-1/2"
              >
                {fieldItem.labelTitle}
                <FormDescription className="font-medium text-brand-grey ">
                  {fieldItem.labelDescription}{" "}
                </FormDescription>
              </FormLabel>
              <div className="md:w-1/2">
                <FormControl>
                  <Input
                    id={fieldItem.name}
                    placeholder={fieldItem.placeholder}
                    {...field}
                    className=" bg-inherit placeholder:text-[#A9A9A9]"
                  />
                </FormControl>
                <FormMessage />
              </div>
            </>
          )}
        />
      </>
    );
  }

  if (fieldItem.fieldType === "checkbox") {
    return (
      <>
        <FormField
          control={form.control}
          name={fieldItem.name}
          rules={{ required: `${fieldItem.labelTitle} is required.` }}
          render={() => (
            <>
              <FormLabel
                htmlFor={fieldItem.name}
                className="mb-1 w-full text-sm font-bold text-brand-black md:w-1/2"
              >
                {fieldItem.labelTitle}
                <FormDescription className="font-medium text-brand-grey ">
                  {fieldItem.labelDescription}{" "}
                </FormDescription>
              </FormLabel>
              <div className="flex w-full flex-col items-start space-y-2  md:w-1/2">
                {fieldItem.options.map((option) => (
                  <FormField
                    key={crypto.randomUUID()}
                    control={form.control}
                    name={fieldItem.name}
                    render={({ field }) => {
                      return (
                        <div
                          key={crypto.randomUUID()}
                          className="flex w-full items-center rounded-md border border-[#E1E1E1] bg-white px-2 py-3"
                        >
                          <FormControl>
                            <Checkbox
                              id={fieldItem.name}
                              checked={field.value?.includes(option.value)}
                              onCheckedChange={(checked) => {
                                checked
                                  ? field.onChange([
                                      ...field.value,
                                      option.value,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== option.value,
                                      ),
                                    );
                              }}
                              className="mr-1"
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {option.label}
                          </FormLabel>
                        </div>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </div>
            </>
          )}
        />
      </>
    );
  }
  if (fieldItem.fieldType === "radio") {
    return (
      <>
        <FormField
          control={form.control}
          name={fieldItem.name}
          rules={{ required: `${fieldItem.labelTitle} is required.` }}
          render={({ field }) => (
            <>
              <FormLabel
                htmlFor={fieldItem.name}
                className="mb-1 w-full text-sm font-bold text-brand-black md:w-1/2"
              >
                {fieldItem.labelTitle}
                <FormDescription className="font-medium text-brand-grey ">
                  {fieldItem.labelDescription}{" "}
                </FormDescription>
              </FormLabel>{" "}
              <FormControl>
                <RadioGroup
                  id={fieldItem.name}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="w-full md:w-1/2"
                >
                  {fieldItem.options.map((option, index) => (
                    <div
                      key={crypto.randomUUID()}
                      className="flex w-full items-center space-x-1 rounded-md border border-[#E1E1E1] bg-white px-2 py-3"
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={index.toString()}
                      />
                      <Label
                        htmlFor={index.toString()}
                        className="text-sm font-medium text-brand-black"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </>
          )}
        />
      </>
    );
  }
  if (fieldItem.fieldType === "range") {
    return (
      <>
        <Label
          htmlFor={fieldItem.labelTitle}
          className="w-full text-sm md:w-1/2"
        >
          <h5 className="mb-1 font-bold text-brand-black">
            {fieldItem.labelTitle}
          </h5>
          <p className="text-brand-grey">{fieldItem.labelDescription}</p>
        </Label>
        <div className="w-full md:w-1/2">
          <FormField
            control={form.control}
            name={fieldItem.range.from.name}
            rules={{
              required: `${fieldItem.range.from.name} is required.`,
              validate: (value) => {
                if (!isNaN(Number(value))) {
                  if (
                    Number(value) < Number(form.watch(fieldItem.range.to.name))
                  ) {
                    return true;
                  }
                  if (
                    Number(value) ===
                    Number(form.watch(fieldItem.range.to.name))
                  ) {
                    return `${fieldItem.range.from.label} cannot be equal to ${fieldItem.range.to.label}`;
                  }
                  return `${fieldItem.range.from.label} cannot exceed ${fieldItem.range.to.label}`;
                } else {
                  return `${fieldItem.range.from.label} should be a number.`;
                }
              },
            }}
            render={({ field }) => (
              <>
                <FormLabel
                  htmlFor={fieldItem.range.from.name}
                  className="mb-1 w-full text-sm font-medium text-brand-black md:w-1/2"
                >
                  {fieldItem.range.from.label}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="number"
                      id={fieldItem.range.from.name}
                      {...field}
                      className=" w-full bg-inherit pr-[14px] placeholder:text-[#A9A9A9]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-medium text-[#A9A9A9]">
                      LPA
                    </span>
                  </div>
                </FormControl>
                <FormMessage className="mb-4" />
              </>
            )}
          />
          <FormField
            control={form.control}
            name={fieldItem.range.to.name}
            rules={{
              required: `${fieldItem.range.to.name} is required.`,
              validate: (value) => {
                if (!isNaN(Number(value))) {
                  if (
                    Number(value) >
                    Number(form.watch(fieldItem.range.from.name))
                  ) {
                    return true;
                  }
                  if (
                    Number(value) ===
                    Number(form.watch(fieldItem.range.from.name))
                  ) {
                    return `${fieldItem.range.to.label} cannot be equal to ${fieldItem.range.from.label}`;
                  }
                  return `${fieldItem.range.to.label} cannot be lower than ${fieldItem.range.from.label}`;
                } else {
                  return `${fieldItem.range.to.label} should be a number.`;
                }
              },
            }}
            render={({ field }) => (
              <>
                <FormLabel
                  htmlFor={fieldItem.range.to.name}
                  className="mb-1 w-full text-sm font-medium text-brand-black md:w-1/2"
                >
                  {fieldItem.range.to.label}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      id={fieldItem.range.to.name}
                      {...field}
                      className="w-full bg-inherit placeholder:text-[#A9A9A9]"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 font-medium text-[#A9A9A9]">
                      LPA
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </>
            )}
          />
        </div>
      </>
    );
  }
  if (fieldItem.fieldType === "select") {
    return (
      <>
        <FormField
          control={form.control}
          name={fieldItem.name}
          rules={{ required: `${fieldItem.labelTitle} is required.` }}
          render={({ field }) => (
            <>
              <FormLabel
                htmlFor={fieldItem.name}
                className="mb-1 w-full text-sm font-bold text-brand-black md:w-1/2"
              >
                {fieldItem.labelTitle}
              </FormLabel>{" "}
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    id={fieldItem.name}
                    className="w-full bg-inherit placeholder:text-[#A9A9A9] md:w-1/2"
                  >
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {fieldItem.options.map((option) => (
                    <SelectItem key={crypto.randomUUID()} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </>
          )}
        />
      </>
    );
  }
  if (fieldItem.fieldType === "textarea") {
    return (
      <>
        <FormField
          control={form.control}
          name={fieldItem.name}
          rules={{ required: `${fieldItem.labelTitle} is required.` }}
          render={({ field }) => (
            <>
              <FormLabel
                htmlFor={fieldItem.name}
                className="mb-1 w-full text-sm font-bold text-brand-black md:w-1/2"
              >
                {fieldItem.labelTitle}
                <FormDescription className="font-medium text-brand-grey ">
                  {fieldItem.labelDescription}
                </FormDescription>
              </FormLabel>
              <div className="flex w-full flex-col md:w-1/2">
                <FormControl>
                  <Textarea
                    id={fieldItem.name}
                    placeholder={fieldItem.placeholder}
                    className="min-h-[150px] w-full resize-none bg-inherit p-2 placeholder:text-[#A9A9A9]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </div>
            </>
          )}
        />
      </>
    );
  }
  return <p className="text-red">provided incorrect field type</p>;
};

const JobFormFields = ({
  form,
}: {
  form: UseFormReturn<JobSchema, any, JobSchema>;
}) => {
  return (
    <>
      {jobFormFields.map((field, index) => (
        <div
          key={index} // NOTE: index is used for "key" due to an issue of
          // scrolling the scroll container to top whenever selecting a form field
          className="flex flex-col gap-4 border-b border-border px-6 py-5 md:flex-row md:gap-12"
        >
          <JobField fieldItem={field} form={form} />
        </div>
      ))}
    </>
  );
};

export default JobFormFields;
