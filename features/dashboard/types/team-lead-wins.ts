export type TeamLeadWins = {
  summary: {
    _id: any;
    count: number;
    CTC: number;
  };
  data: Array<{
    count: number;
    CTC: number;
    fullName: string;
    email: string;
    teamlead: string;
    employeeId: string;
    profilePhoto: {
      originalName: string;
      storageName: string;
    };
  }>;
};
