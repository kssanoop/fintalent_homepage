import React from "react";
import HeaderCardBilling from "./header-card";
import BillingRecruiterData from "./billing-recruiter-data";

const BillingBodyRecruiter = () => {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <HeaderCardBilling />
      </div>
      <div>
        <BillingRecruiterData />
      </div>
    </div>
  );
};

export default BillingBodyRecruiter;
