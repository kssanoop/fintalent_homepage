export interface AvailabilitySchema {
  timeSlots: TimeSlots;
  availableFrom: string;
  buffer15minBefore: boolean;
  buffer15minAfter: boolean;
}
export interface TimeSlots {
  sunday: Day;
  monday: Day;
  tuesday: Day;
  wednesday: Day;
  thursday: Day;
  friday: Day;
  saturday: Day;
}

export interface Day {
  available: boolean;
  timeSlots: TimeSlot[];
}

export interface TimeSlot {
  startTime: string;
  endTime: string;
}
