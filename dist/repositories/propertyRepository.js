"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.PropertyRepository = void 0;
const typedi_1 = require("typedi");
const helpers_1 = require("../utils/helpers");
const errorStatusEnum_1 = require("../enums/errorStatusEnum");
const db = require("../models");
let PropertyRepository = class PropertyRepository {
    constructor() {
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { page, size } = req.query;
                const PageNo = parseInt(page);
                const PageSize = parseInt(size);
                const count = yield db.Property.count();
                const properties = yield db.Property.findAll();
                return res.status(errorStatusEnum_1.ErrorStatusEnum.SUCESS).send({
                    properties: properties,
                    totalItems: count,
                    totalPages: (0, helpers_1.calculateTotalPages)(PageSize, count, properties),
                    pageNo: PageNo,
                    pageSize: PageSize,
                });
            }
            catch (error) {
                return res.status(errorStatusEnum_1.ErrorStatusEnum.INTERNAL_SERVER_ERRROR).send(error);
            }
        });
    }
};
exports.PropertyRepository = PropertyRepository;
exports.PropertyRepository = PropertyRepository = __decorate([
    (0, typedi_1.Service)()
], PropertyRepository);
//# sourceMappingURL=propertyRepository.js.map