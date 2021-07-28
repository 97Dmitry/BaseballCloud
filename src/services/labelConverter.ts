export const labelConverter = (
  value: string | number,
  selectionArray: { value: string | number; label: string }[]
): { value: string | number; label: string } => {
  return {
    value: value,
    label: selectionArray.filter((el) => el.value === value)[0].label,
  };
};

export const reverseLabelConverter = (
  value: string | null,
  selectionArray: { value: string; label: string }[]
): string | null => {
  if (value) return selectionArray.filter((el) => el.label === value)[0].value;
  return null;
};

export const labelConverterArray = (
  data: Array<{
    id: number;
    name?: string;
    u_name?: string;
  }>,
  pushObject: { value: string | number; label: string }[]
) => {
  Object.keys(data).forEach((el) => {
    pushObject.push({
      value: data[+el].id,
      // @ts-ignore
      label: data[+el].hasOwnProperty("name")
        ? data[+el].name
        : data[+el].u_name,
    });
  });
};
