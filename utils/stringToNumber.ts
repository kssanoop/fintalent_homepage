export default function stringToNumber(value: string | number): number {
  if (typeof value === "string") {
    return parseInt(value, 10);
  }
  return value;
}
