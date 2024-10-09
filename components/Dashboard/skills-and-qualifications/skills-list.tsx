import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteSkill } from "@/features/skills/api/delete-skill";
import { Trash } from "lucide-react";
import React from "react";

type SkillsListProps = {
  list: string[];
};

const SkillsList = ({ list }: SkillsListProps) => {
  const { mutate: deleteSkill } = useDeleteSkill();
  const handleDelete = (index: number) => {
    deleteSkill({ index });
  };
  return (
    <>
      {list.length === 0 ? (
        <p className="mx-auto my-6 text-center text-lg text-brand-blue">
          No skills added
        </p>
      ) : (
        list?.map((item, index) => (
          <div key={crypto.randomUUID()} className="flex justify-between">
            <p>{item}</p>
            <button
              type="button"
              onClick={() => {
                handleDelete(index);
              }}
            >
              <Trash color="#A9A9A9" size={14} />
            </button>
          </div>
        ))
      )}
    </>
  );
};

const LoadingSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5, 6].map((_, index) => (
      <div key={index} className="flex justify-between">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-4" key={index} />
      </div>
    ))}
  </>
);

SkillsList.Skeleton = LoadingSkeleton;

export default SkillsList;
