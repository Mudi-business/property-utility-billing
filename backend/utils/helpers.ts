
// We use helpers to simplify the process of development we usually don't want to repeat thing every time in our code base

export function displaySwaggerEnumList(enumList: object): string[] {
  return Object.keys(enumList)
    .filter((status: any) => {
      return Number.isNaN(parseInt(status)) === true;
    })
    .map((val: any) => val);
}

export const calculateTotalPages = (pageSize: number,totalCount: number,dataLength: any) => {
  if (dataLength.length === 0) {
    return 0;
  } 
  return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
};

export const getDateWithoutTime = (date: Date) => {
  return require("moment")(date).format("YYYY-MM-DD");
};

export const getDateWithTime = (date: Date) => {
  return require("moment")(date).format("YYYY-MM-DD HH:mm:ss");
};

export const InvalidObjectKeysDetection = (body: object,swaggerDto: object): boolean => {
  const checkingUnAuthorizedKeys = Object.keys(body).filter((key) => {
    return Object.keys(swaggerDto).indexOf(key) === -1;
  });
  if (checkingUnAuthorizedKeys.length > 0) {
    return true;
  } else {
    return false;
  }
};

export const EmptyFieldsDetection = (body: object): boolean => {
  const emptyFields = Object.values(body).filter((value): any => {
    if (typeof value === "number") {
      if (value > 0) {
        return undefined;
      } else {
        return true;
      }
    } else if (typeof value === "string") {
      if (value !== "") {
        return undefined;
      } else {
        return true;
      }
    }
  });
  if ([...new Set(emptyFields)].length > 0) {
    return true;
  } else {
    return false;
  }
};
