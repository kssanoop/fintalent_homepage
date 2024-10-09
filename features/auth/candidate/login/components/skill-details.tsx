import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import { stepForm } from "../../schemas/profile-schema";
import { Button } from "@/components/ui/button";
import { useFieldArray } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useGetSkills from "@/utils/getSkills";
import { Trash2 } from "lucide-react";
import { ROLES } from "@/types/authorization";

const SkillsForm = ({ form }: stepForm) => {
  const { fields, append, remove } = useFieldArray({
    name: "skills",
  });

  const { data: skillData, isLoading, isSuccess } = useGetSkills();

  const isAdmin = ROLES.ADMIN;

  const canAddMoreSkills = isAdmin ? fields.length < 20 : true;
  return (
    <>
      <div className="mb-6 mt-20 flex gap-x-1 px-4 text-sm md:gap-x-8 md:px-0 md:text-base">
        <h1 className="w-1/2 font-semibold">
          {!ROLES.ADMIN ? "What are your skills?" : "Candidate skills"}
        </h1>
        <h1 className="w-1/2 font-semibold">Rate your skills out of 10</h1>
      </div>

      {fields.map((skill, index) => {
        console.count("rendering");
        return (
          <div
            className="mb-6 flex gap-x-1 px-4 sm:gap-x-8 md:px-0"
            key={skill.id}
          >
            <FormField
              control={form.control}
              rules={{
                required: { value: true, message: "Select atleast one skill" },
              }}
              name={`skills.${index}.name` as const}
              render={({ field }) => (
                <FormItem className="w-1/2">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="h-40 overflow-y-hidden">
                      {isLoading || !isSuccess ? (
                        <SelectItem value={"loading"}>
                          loading skills ...
                        </SelectItem>
                      ) : (
                        skillData.map((skill: string, index: number) => (
                          <SelectItem
                            key={index}
                            value={skill}
                            disabled={
                              !!form
                                .watch("skills")
                                ?.find((item) => item.name === skill)
                            }
                          >
                            {skill}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name={`skills.${index}.level` as const}
              rules={{
                required: { value: true, message: "Select atleast one skill" },
              }}
              render={({ field }) => (
                <FormItem className="relative w-1/2">
                  <div className="flex items-center">
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="01" />
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
                  </div>
                  <FormMessage />
                  {index > 0 && (
                    <Button
                      type="button"
                      className="absolute -right-7 top-0 p-0 md:-right-8"
                      variant={"link"}
                      onClick={() => {
                        remove(index);
                      }}
                    >
                      <Trash2 />
                    </Button>
                  )}
                </FormItem>
              )}
            />
          </div>
        );
      })}

      {ROLES.ADMIN ? (
        <div className="flex justify-end">
          {canAddMoreSkills && (
            <Button
              className="text-link"
              variant={"link"}
              type="button"
              onClick={() => {
                append({
                  name: "",
                  level: 0,
                });
              }}
            >
              +Add upto 20 skills
            </Button>
          )}
        </div>
      ) : (
        <Button
          className="text-link"
          variant={"link"}
          type="button"
          onClick={() => {
            append({
              name: "",
              level: 0,
            });
          }}
        >
          Add more
        </Button>
      )}
    </>
  );
};

export default SkillsForm;
