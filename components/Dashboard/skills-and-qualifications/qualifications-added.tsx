import Qualificationslist from "./qualifications-list";
import { useGetQualifications } from "@/features/qualifications/api/get-qualifications";

const QualificationsAdded = () => {
  const { data: qualifications, isLoading } = useGetQualifications();
  return (
    <div className="hide-scrollbar h-[238px] space-y-3 overflow-auto text-brand-black">
      <h6 className="text-brand-grey">Added qualifications</h6>
      {isLoading || !qualifications ? (
        <Qualificationslist.Skeleton />
      ) : (
        <Qualificationslist list={qualifications} />
      )}
    </div>
  );
};

export default QualificationsAdded;
