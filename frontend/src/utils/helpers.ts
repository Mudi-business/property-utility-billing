//RESUSBLE HELPERS TO HELP US BOOST OUR APPLICATION  DEVELOPMENT MORE FASTER

export function displayEnumList(enumList: object): string[] {
  return Object.keys(enumList)
    .filter((status: any) => {
      return Number.isNaN(parseInt(status)) === true;
    })
    .map((val: any) => val.replaceAll("_", " "));
}

export const ConvertSysDateToHumanDate = (date: string): string => {
  return `${date.split("T")[0].split("-")[2]}-${
    date.split("T")[0].split("-")[1]
  }-${date.split("T")[0].split("-")[0]}`;
};


export const calculatePaginatedNumber = function (props: {
  index: number;
  pageSize: number;
  pageNumber: number;
}) {
  return (props.pageNumber) * props.pageSize + (props.index + 1);
};

