import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { AddSkillSchema } from "../schema/skills-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetSkills from "@/utils/getSkills";
import { Dispatch, SetStateAction } from "react";
import { useAddSkills } from "../api/add-skill";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface AddSkillFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
const AddSkillForm = ({ setOpen }: AddSkillFormProps) => {
  const form = useForm<AddSkillSchema>({});
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });
  const { data: skillData, isLoading, isSuccess } = useGetSkills();

  if (fields.length === 0) {
    append({ name: "", level: "" });
  }

  const canAddMoreSkills = fields.length < 20;

  const queryClient = useQueryClient();

  const handleSuccess = (data: any) => {
    setOpen(false);
    queryClient.invalidateQueries({ queryKey: ["candidate"] });
    toast.success(data?.message);
  };

  const handleError = (error: any) => {
    toast.error(error?.response?.data?.message);
  };
  const {
    mutate,
    isLoading: isSubmitting,
    isError: isSubmitionError,
  } = useAddSkills(handleSuccess, handleError);

  const onSubmit: SubmitHandler<AddSkillSchema> = (values) => {
    // console.log("add values:", values);
    const updatedSkills = values.skills.map((skill) => ({
      name: skill.name,
      level: Number(skill.level),
    }));
    const updatedData = {
      skills: updatedSkills,
    };
    mutate(updatedData);
  };

  const addMoreSkills = () => {
    append({ name: "", level: "0" });
  };

  const scrollToBottom = () => {
    const scrollContainer = document.getElementById("form-scroll-container");
    if (scrollContainer) {
      scrollContainer.style.scrollBehavior = "smooth";
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  const handleAddMoreSkillsClick = () => {
    addMoreSkills();
    scrollToBottom(); // scroll to bottom when new skill added below
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div id="form-scroll-container" className="h-[20vh] overflow-y-auto">
          {" "}
          {fields.map((field, index) => (
            <div key={field.id}>
              <FormField
                control={form.control}
                name={`skills.${index}.name`}
                rules={{
                  required: {
                    value: true,
                    message: "Skill name is required",
                  },
                }}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex  items-center gap-5">
                      <FormControl>
                        <Select onValueChange={field.onChange}>
                          <SelectTrigger className="max-h-9 w-[42%]">
                            <SelectValue
                              placeholder="Select"
                              style={{
                                fontSize: "16px",
                                fontWeight: "500",
                                color: "#5E5E5E",
                              }}
                              {...field}
                            />
                          </SelectTrigger>
                          <SelectContent className="h-40 overflow-y-hidden">
                            {isLoading || !isSuccess ? (
                              <SelectItem value={"loading"}>
                                loading skills ...
                              </SelectItem>
                            ) : (
                              skillData.map((skill: string, index: number) => (
                                <SelectItem key={index} value={skill}>
                                  {skill}
                                </SelectItem>
                              ))
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormField
                        control={form.control}
                        name={`skills.${index}.level`}
                        rules={{
                          required: {
                            value: true,
                            message: "Skill level is required",
                          },
                        }}
                        render={({ field }) => (
                          <FormControl>
                            <Select onValueChange={field.onChange}>
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
                    <div className="flex gap-6">
                      <FormMessage>
                        {form.formState.errors.skills?.[index]?.level?.message}
                      </FormMessage>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          ))}
        </div>

        {canAddMoreSkills && (
          <div
            className=" cursor-pointer text-base font-medium text-[#034A9A]"
            onClick={handleAddMoreSkillsClick}
          >
            +Add upto 20 skills
          </div>
        )}

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
            <Button disabled variant={"gradient"}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding...
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

export default AddSkillForm;
