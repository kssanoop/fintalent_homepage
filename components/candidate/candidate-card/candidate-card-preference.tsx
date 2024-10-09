import _ from "lodash";

const CandidateCardPreference = ({
  label,
  value,
}: {
  label: string;
  value: string | string[] | number | undefined;
}) => {
  const renderValue = (value: string | string[] | number | undefined) => {
    if (!value) {
      return "Not Specified";
    } else if (Array.isArray(value) && value.length === 0) {
      return "Not Specified";
    } else if (Array.isArray(value)) {
      return value.map((item) => _.startCase(item)).join(", ");
    } else {
      if (label === "Expected CTC") {
        return `${value} LPA`;
      }
      return value;
    }
  };
  return (
    <>
      <div className="text-xs text-[#5E5E5E]">{label}</div>
      <div className="line-clamp-1 text-sm text-brand-black">
        {/* {!value || (Array.isArray(value) && value.length > 0)
          ? "Not Specified"
          : Array.isArray(value)
          ? value.join(", ")
          : value} */}
        {renderValue(value)}
      </div>{" "}
    </>
  );
};
export default CandidateCardPreference;
