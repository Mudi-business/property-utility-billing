export function displaySwaggerEnumList(enumList: object): string[] {
  return Object.keys(enumList)
    .filter((status: any) => {
      return Number.isNaN(parseInt(status)) === true;
    })
    .map((val: any) => val);
}

export const calculateTotalPages = (
  pageSize: number,
  totalCount: number,
  dataLength: any
) => {
  // we suppose that if we have 0 items we want 1 empty page
  if (dataLength.length === 0) {
    return 0;
  } else {
  }
  return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
};
