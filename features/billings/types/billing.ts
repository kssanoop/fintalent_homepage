export type Billing = {
  _id: string;
  billId: string;
  fromDate: string;
  toDate: string;
  recruiterId: string;
  companyId: string;
  description: string;
  originalAmount: number;
  finalAmount: number;
  profileViews: {
    verified: number;
    unverified: number;
  };
  candidateVerifiedViewListWithCandidates: CandidateProfile[];
  candidateUnVerifiedViewListWithCandidates: CandidateProfile[];
  paid: boolean;
  paidDate: string;
  createdAt: string;
  updatedAt: string;
};

type CandidateProfile = {
  candidateId: string;
  fullName: string;
  profilePhoto: {
    originalName: string;
    storageName: string;
  };
  jobTitle: string;
};
