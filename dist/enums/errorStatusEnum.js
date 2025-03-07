"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorStatusEnum = void 0;
var ErrorStatusEnum;
(function (ErrorStatusEnum) {
    ErrorStatusEnum[ErrorStatusEnum["SUCESS"] = 200] = "SUCESS";
    ErrorStatusEnum[ErrorStatusEnum["CREATED"] = 201] = "CREATED";
    ErrorStatusEnum[ErrorStatusEnum["INTERNAL_SERVER_ERRROR"] = 500] = "INTERNAL_SERVER_ERRROR";
    ErrorStatusEnum[ErrorStatusEnum["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ErrorStatusEnum[ErrorStatusEnum["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ErrorStatusEnum[ErrorStatusEnum["FORBIDEN"] = 403] = "FORBIDEN";
    ErrorStatusEnum[ErrorStatusEnum["NOT_FOUND"] = 404] = "NOT_FOUND";
})(ErrorStatusEnum || (exports.ErrorStatusEnum = ErrorStatusEnum = {}));
//# sourceMappingURL=errorStatusEnum.js.map