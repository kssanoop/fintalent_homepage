import { Resume } from "@/types/resume";
import { File } from "lucide-react";
import Link from "next/link";

const ResumeLink = ({ resume }: { resume: Resume }) => {
  return (
    <>
      {!resume?.storageName ? (
        <p className=" text-center text-brand-blue-light">No resume uploaded</p>
      ) : (
        <Link
          href={`${process.env.NEXT_PUBLIC_IMG_URL}${resume.storageName}`}
          target="_blank"
          className="flex items-center gap-1 text-brand-black  hover:underline"
        >
          <File size="16" color="#000000" />
          <p className="text-xm line-clamp-1  font-medium">
            {resume.originalName}
          </p>
        </Link>
      )}
    </>
  );
};

export default ResumeLink;
