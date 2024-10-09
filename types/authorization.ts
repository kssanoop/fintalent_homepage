export enum ROLES {
  ADMIN = "admin",
  RECRUITER = "recruiter",
  MANAGER = "manager",
  TEAM_LEAD = "teamlead",
  CANDIDATE = "candidate",
}

export const ROLES_LIST = [
  "admin",
  "recruiter",
  "manager",
  "teamlead",
  "candidate",
] as const;

export type RoleTypes = (typeof ROLES_LIST)[number];

export type RouteType = "public" | "auth" | "private" | "pending" | "create";

export interface tokenType {
  role: RoleTypes;
  exp: number;
}
