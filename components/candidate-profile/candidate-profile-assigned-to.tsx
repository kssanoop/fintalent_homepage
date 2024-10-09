const CandidateProfileAssignedTo = ({
  assignedToName,
}: {
  assignedToName: string;
}) => {
  return (
    <div className="flex cursor-pointer justify-center rounded-[5px] border border-solid border-[#012A59] p-3 text-primary">
      Assigned to {assignedToName}
    </div>
  );
};

export default CandidateProfileAssignedTo;
