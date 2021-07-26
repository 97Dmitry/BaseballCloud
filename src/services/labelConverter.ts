export const labelConverter = (
  value: string | number,
  selectionArray: { value: string | number; label: string }[]
): { value: string | number; label: string } => {
  return {
    value: value,
    label: selectionArray.filter((el) => el.value === value)[0].label,
  };
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
