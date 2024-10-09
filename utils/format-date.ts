import format from "date-fns/format";

export const formatDate = (date: Date | undefined) => {
  return date ? format(date, "yyyy-MM-dd") : "";
};

export const formatToTwelveHrs = (date: Date | undefined) => {
  return date ? format(date, "p") : "";
};
