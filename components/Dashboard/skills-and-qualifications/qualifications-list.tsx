import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteQualification } from "@/features/qualifications/api/delete-qualification";
import { Trash } from "lucide-react";
import React from "react";

type QualificationslistProps = {
  list: string[];
};

const Qualificationslist = ({ list }: QualificationslistProps) => {
  const { mutate: deleteQualification } = useDeleteQualification();
  const handleDelete = (index: number) => {
    deleteQualification({ index });
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

Qualificationslist.Skeleton = LoadingSkeleton;

export default Qualificationslist;
