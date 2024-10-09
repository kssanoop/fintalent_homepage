import React, { Dispatch, SetStateAction } from "react";
import {
  SubmitHandler,
  useForm,
  useFieldArray,
  Controller,
} from "react-hook-form";
import { EditSkillSchema } from "../schema/skills-schema";
import { Form, FormControl, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Clock3, Loader2, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUpdatSkills } from "../api/updateSkills";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import useGetSkills from "@/utils/getSkills";

interface EditSkillFormProps {
  setOpen: Dispatch<SetStateAction<boolean>>;
  skills: Array<{
    name: string;
    level: string;
  }>;

  pendingSkills: Array<{
    name: string;
    level: string;
  }>;
}

const EditSkillForm = ({
  skills,
  pendingSkills,
  setOpen,
}: EditSkillFormProps) => {
  const form = useForm<EditSkillSchema>({
    defaultValues: {
      skills: skills.map((skill) => ({ name: skill.name, level: skill.level })),
      pendingSkills: pendingSkills.map((skill) => ({
        name: skill.name,
        level: skill.level,
      })),
    },
  });

  const { control } = form;
  const { fields, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const { data: skillData, isLoading, isSuccess } = useGetSkills();

  const { fields: pendingFields, remove: removePending } = useFieldArray({
    control,
    name: "pendingSkills",
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
  } = useUpdatSkills(handleSuccess, handleError);

  const onSubmit: SubmitHandler<EditSkillSchema> = (values) => {
    const updatedSkills = values.skills.map((skill) => ({
      name: skill.name,
      level: Number(skill.level),
    }));

    const updatedPendingSkills = values.pendingSkills.map((skill) => ({
      name: skill.name,
      level: Number(skill.level),
    }));

    const updatedData = {
      skills: updatedSkills,
      skillsPending: updatedPendingSkills,
    };
    mutate(updatedData);
  };

  return (
    <>
      {isLoading ? (
        <Loader2 className="mx-auto mt-4 animate-spin" />
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id}>
                <FormItem>
                  <div className="flex items-center gap-5">
                    <FormControl>
                      <Controller
                        name={`skills.${index}.name`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={true}
                          >
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
                                skillData.map(
                                  (skill: string, index: number) => (
                                    <SelectItem key={index} value={skill}>
                                      {skill}
                                    </SelectItem>
                                  ),
                                )
                              )}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormControl>

                    <FormControl>
                      <Controller
                        name={`skills.${index}.level`}
                        control={control}
                        render={({ field }) => (
                          <Select
                            defaultValue={
                              field.value ? field.value.toString() : ""
                            }
                            onValueChange={field.onChange}
                          >
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
                              <SelectContent className="h-40 overflow-y-hidden">
                                {Array.from({ length: 10 }, (_, i) => (
                                  <SelectItem
                                    key={i}
                                    value={(i + 1).toString()}
                                  >
                                    {(i + 1).toString().padStart(2, "0")}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </SelectTrigger>
                          </Select>
                        )}
                      />
                    </FormControl>

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
                </FormItem>
              </div>
            ))}
            <div className="space-y-2 pt-4 ">
              <div className="flex items-center gap-2 pt-1 md:pl-2">
                <Clock3 size={18} color="#A9A9A9" strokeWidth={2.5} />
                <p className="text-base font-medium text-[#A9A9A9]">
                  Skills Pending Confirmation
                </p>
              </div>
              {pendingFields.map((field, index) => (
                <div key={field.id}>
                  <FormItem>
                    <div className="flex items-center gap-5">
                      <FormControl>
                        <Controller
                          name={`pendingSkills.${index}.name`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              disabled={true}
                            >
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
                                  skillData.map(
                                    (skill: string, index: number) => (
                                      <SelectItem key={index} value={skill}>
                                        {skill}
                                      </SelectItem>
                                    ),
                                  )
                                )}
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </FormControl>

                      <FormControl>
                        <Controller
                          name={`pendingSkills.${index}.level`}
                          control={control}
                          render={({ field }) => (
                            <Select
                              defaultValue={
                                field.value ? field.value.toString() : ""
                              }
                              onValueChange={field.onChange}
                            >
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
                          )}
                        />
                      </FormControl>

                      {index >= 0 && (
                        <Trash
                          color="#E72F2F"
                          size={20}
                          className="cursor-pointer"
                          onClick={() => {
                            removePending(index);
                          }}
                        />
                      )}
                    </div>
                  </FormItem>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 pt-4">
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
      )}
    </>
  );
};

export default EditSkillForm;
