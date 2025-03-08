export function displayEnumList(enumList: object): string[] {
    return Object.keys(enumList)
      .filter((status: any) => {
        return Number.isNaN(parseInt(status)) === true;
      })
      .map((val: any) => val.replaceAll("_", " "));
  }