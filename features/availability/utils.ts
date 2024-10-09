import { setHours, setMinutes } from "date-fns";
import { TimeSlot } from "./schema/availability-schema";

export const DEFAULT_START_TIME = setHours(
  setMinutes(new Date(0), 60),
  24,
).toISOString();

export const DEFAULT_END_TIME = setHours(
  setMinutes(new Date(0), 15),
  24,
).toISOString();

export const DEFAULT_TIME_SLOTS_VALUE = {
  startTime: DEFAULT_START_TIME,
  endTime: DEFAULT_END_TIME,
};

export const getTimeSlots = (data: TimeSlot[]) => {
  // when timeSlots is empty , have to provide defaultValue
  return data.length !== 0 ? data : [DEFAULT_TIME_SLOTS_VALUE];
};
