import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResumeLink from "./resume-link";
import ResumeDelete from "./resume-delete";
import { Resume } from "@/types/resume";
import { useGetInfoFromCookie } from "@/utils/hooks/useGetInfoFromCookie";
import ResumeAdd from "./resume-add";

type ResumeCardProps = {
  resume: Resume;
};
const ResumeCard = ({ resume }: ResumeCardProps) => {
  const { role } = useGetInfoFromCookie();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between px-5 pb-4 pt-3">
        <CardTitle className="text-xs font-medium tracking-[1.92px] text-brand-grey">
          RESUME{" "}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4 px-5 pb-3 md:gap-10">
        <ResumeLink resume={resume} />
        {role === "candidate" &&
          (!resume?.storageName ? <ResumeAdd /> : <ResumeDelete />)}
      </CardContent>
    </Card>
  );
};

export default ResumeCard;
