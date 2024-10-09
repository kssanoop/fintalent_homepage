export const generateOptions = (data: any[]) =>
  data?.map((item) => ({
    label: item.name,
    value: item.name,
  }));
