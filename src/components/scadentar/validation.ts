export const validatePositive = (value: string) => {
  if (!value || value.trim() === "") return "Required";
  if (Number(value) <= 0) return "Must be greater than 0";
  return undefined;
};
