import React, { Dispatch, SetStateAction } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Language } from "./LanguageCard";
import { useAddData } from "../../WorkHistory/api/updateWorkHistory";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export type LanguagesSchema = {
  languages: Array<{
    name: string;
    proficiency: string;
  }>;
};
interface LanguageAddFormProps {
  data: Language[];
  isEdit: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const LanguageAddForm = ({ data, isEdit, setOpen }: LanguageAddFormProps) => {
  const defaultValuesForms: LanguagesSchema = isEdit
    ? {
        languages: data.map((language) => ({
          name: language.name,
          proficiency: language.proficiency,
        })),
      }
    : {
        languages: [],
      };
  const form = useForm<LanguagesSchema>({
    defaultValues: defaultValuesForms,
  });
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "languages",
  });

  const queryClient = useQueryClient();

  const handleSuccess = (data: any) => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["candidate"] });
    toast.success(data.message);
  };

  const handleError = (error: any) => {
    console.log("Error: ", error);
  };
  const {
    mutate,
    isLoading: isSubmitting,
    isError: isSubmitionError,
  } = useAddData(handleSuccess, handleError);

  const oldLanguageDetails = {
    languages: data.map((language) => ({
      name: language.name,
      proficiency: language.proficiency,
    })),
  };

  if (!isEdit && fields.length === 0) {
    append({ name: "", proficiency: "" });
  }

  const onSubmit: SubmitHandler<LanguagesSchema> = async (values) => {
    // Handle add mode
    if (!isEdit) {
      // Check if the new language data already exists in the existing data
      const existingLanguages = oldLanguageDetails.languages;
      const newLanguageExists = existingLanguages.some(
        (language) => language.name === values.languages[0].name,
      );

      // If the new language data does not exist in the existing data, push it into the existing data
      if (!newLanguageExists) {
        existingLanguages.push(values.languages[0]);
      }

      // Update the backend with the new language data
      const updatedLanguges = {
        languages: existingLanguages,
      };
      mutate(updatedLanguges);
    }

    // Handle edit mode
    else {
      // Update the existing language data with the new language data
      oldLanguageDetails.languages = values.languages;

      // Update the backend with the updated language data
      mutate(oldLanguageDetails);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id}>
            <FormField
              control={form.control}
              name={`languages.${index}.name`}
              rules={{
                required: {
                  value: true,
                  message: "Please enter a language",
                },
              }}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-5">
                    <FormControl>
                      <Input
                        className="max-h-9 w-[42%]"
                        placeholder="Enter Language"
                        {...field}
                      />
                    </FormControl>

                    <FormField
                      control={form.control}
                      name={`languages.${index}.proficiency`}
                      rules={{
                        required: {
                          value: true,
                          message: "Please select proficiency ",
                        },
                      }}
                      render={({ field }) => (
                        <FormControl>
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="max-h-9 w-[42%]">
                                <SelectValue
                                  placeholder="Select"
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "500",
                                    color: "#5E5E5E",
                                  }}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="h-40 overflow-y-hidden">
                              <SelectItem value="1">01</SelectItem>
                              <SelectItem value="2">02</SelectItem>
                              <SelectItem value="3">03</SelectItem>
                              <SelectItem value="4">04</SelectItem>
                              <SelectItem value="5">05</SelectItem>
                              <SelectItem value="6">06</SelectItem>
                              <SelectItem value="7">07</SelectItem>
                              <SelectItem value="8">08</SelectItem>
                              <SelectItem value="9">09</SelectItem>
                              <SelectItem value="10">10</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      )}
                    />

                    {index > 0 && (
                      <Trash
                        color="#E72F2F"
                        size={20}
                        className="cursor-pointer"
                        onClick={() => {
                          remove(index);
                        }}
                      />
                    )}
                  </div>
                  <FormMessage>
                    {
                      form?.formState?.errors?.languages?.[index]?.proficiency
                        ?.message
                    }
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
        ))}
        <div
          className="w-[90px] cursor-pointer text-base font-medium text-[#034A9A]"
          onClick={() => {
            append({ name: "", proficiency: "" });
          }}
        >
          +Add more
        </div>
        <div className="flex justify-end gap-4 pt-3">
          <Button
            type="button"
            variant={"outline"}
            className="rounded-[5px] border-[#A9A9A9] text-base font-semibold text-[#5E5E5E] hover:text-[#5E5E5E] md:w-[85px]"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          {isSubmitting && !isSubmitionError ? (
            <Button
              variant={"gradient"}
              className="rounded-lg text-base font-semibold md:w-[85px]"
            >
              {isEdit ? "Editing..." : "  Saving..."}
            </Button>
          ) : (
            <Button
              variant={"gradient"}
              className="rounded-lg text-base font-semibold md:w-[85px]"
            >
              Save
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default LanguageAddForm;
