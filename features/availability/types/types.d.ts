export type DaysTypes =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

export interface SetOpenType {
  setOpen: Dispatch<SetStateAction<boolean>>;
}
