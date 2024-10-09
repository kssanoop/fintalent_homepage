import { UseFormReturn } from "react-hook-form";
import OptionSelect from "./option-select";
import RecruiterSchema from "../schemas/recruiter-profile";

interface stepForm {
  form: UseFormReturn<RecruiterSchema>;
}
const CompanyDetailsForm = ({ form }: stepForm) => {
  return (
    <div className="mt-10 flex">
      <OptionSelect form={form} />
    </div>
  );
};

export default CompanyDetailsForm;
