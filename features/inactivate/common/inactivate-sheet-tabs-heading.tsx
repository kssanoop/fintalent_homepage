import Image from "next/image";
import RightIcon from "public/svg/right-icon.svg";

const InactivateSheetTabHeading = ({
  count,
  label,
  isReassignComplete,
}: {
  count: string;
  label: string;
  isReassignComplete: boolean;
}) => {
  return (
    <>
      <p className="mb-[2.5px] text-lg font-bold">{count}</p>
      <div className="flex items-center gap-0.5 text-sm text-brand-grey">
        {label}
        {isReassignComplete && (
          <Image src={RightIcon} alt="right-icon" className="h-auto w-auto" />
        )}
      </div>
    </>
  );
};

export default InactivateSheetTabHeading;
