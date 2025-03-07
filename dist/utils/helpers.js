"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDateWithTime = exports.getDateWithoutTime = exports.calculateTotalPages = void 0;
exports.displaySwaggerEnumList = displaySwaggerEnumList;
function displaySwaggerEnumList(enumList) {
    return Object.keys(enumList)
        .filter((status) => {
        return Number.isNaN(parseInt(status)) === true;
    })
        .map((val) => val);
}
const calculateTotalPages = (pageSize, totalCount, dataLength) => {
    // we suppose that if we have 0 items we want 1 empty page
    if (dataLength.length === 0) {
        return 0;
    }
    else {
    }
    return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
};
exports.calculateTotalPages = calculateTotalPages;
const getDateWithoutTime = (date) => {
    return require('moment')(date).format('YYYY-MM-DD');
};
exports.getDateWithoutTime = getDateWithoutTime;
const getDateWithTime = (date) => {
    return require('moment')(date).format('YYYY-MM-DD HH:mm:ss');
};
exports.getDateWithTime = getDateWithTime;
//# sourceMappingURL=helpers.js.map