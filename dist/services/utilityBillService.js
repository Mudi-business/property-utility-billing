"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityBillService = void 0;
const typedi_1 = require("typedi");
const helpers_1 = require("../utils/helpers");
const axios_1 = require("axios");
const utilityBillRepository_1 = require("../repositories/utilityBillRepository");
let UtilityBillService = class UtilityBillService {
    constructor(utilityBillRepo) {
        this.utilityBillRepo = utilityBillRepo;
        this.getAllUtilityBills = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, size } = req.query;
                const PageNo = parseInt(page);
                const PageSize = parseInt(size);
                const bills = yield this.utilityBillRepo.findAll(PageNo, PageSize);
                return res.status(axios_1.HttpStatusCode.Ok).send({
                    bills: bills.rows,
                    totalItems: bills.count,
                    totalPages: (0, helpers_1.calculateTotalPages)(PageSize, bills.count, bills.rows),
                    pageNo: PageNo,
                    pageSize: PageSize,
                });
            }
            catch (error) {
                return res.status(axios_1.HttpStatusCode.InternalServerError).send({
                    status: axios_1.HttpStatusCode.InternalServerError,
                    message: error === null || error === void 0 ? void 0 : error.name,
                });
            }
        });
        this.getUtilityBillById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const bill = yield this.utilityBillRepo.findById(id);
                return res.status(axios_1.HttpStatusCode.Ok).send(bill);
            }
            catch (error) {
                return res.status(axios_1.HttpStatusCode.InternalServerError).send({
                    status: axios_1.HttpStatusCode.InternalServerError,
                    message: error === null || error === void 0 ? void 0 : error.name,
                });
            }
        });
        this.saveUtilityBill = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const bill = yield this.utilityBillRepo.save(body);
                return res.status(axios_1.HttpStatusCode.Ok).send(bill);
            }
            catch (error) {
                return res.status(axios_1.HttpStatusCode.InternalServerError).send({
                    status: axios_1.HttpStatusCode.InternalServerError,
                    message: error === null || error === void 0 ? void 0 : error.name,
                });
            }
        });
    }
};
exports.UtilityBillService = UtilityBillService;
exports.UtilityBillService = UtilityBillService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [utilityBillRepository_1.UtilityBillRepository])
], UtilityBillService);
//# sourceMappingURL=utilityBillService.js.map