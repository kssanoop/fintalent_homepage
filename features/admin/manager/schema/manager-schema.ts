import { ManagerInfo } from "../type/manager-info";

export type ManagerSchema = {
  data: {
    count: number;
    Managers: ManagerInfo[];
  };
};
