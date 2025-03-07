"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// const auth = require("../auth/auth");
// const Protect = require("../auth/protectRoutesAuth");
router.get("/utility/billing/pageable", 
//   auth,
//   Protect(),
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['UtilityBill']
    // #swagger.summary = 'Utility Bills..'
    // #swagger.description = 'Utility bills pageable...'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    /*  #swagger.parameters['page'] = {
            in: 'query',
            description: 'Page Number',
            required: 'true',
            type: 'number',
            value: "0"
    } */
    /*  #swagger.parameters['size'] = {
            in: 'query',
            description: 'Page Size',
            required: 'true',
            type: 'number',
            value: "10"
    } */
    /* #swagger.responses[200] = {
            schema: { $ref: "#/definitions/ResponseUtilityPageable" },
            description: 'OK'
    } */
    console.log("cool", req, res);
}));
router.get("/utility/billing/:id", 
//   auth,
//   Protect(),
(req, res) => {
    // #swagger.tags = ['UtilityBill']
    // #swagger.summary = 'Get Utility Bill By Id..'
    // #swagger.description = 'Get Utility Bill By Id.'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    //  #swagger.parameters['id'] = { description: 'Utility Bill Id' }
    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/ResponseUtilityBill" },
               description: 'OK'
        } */
    console.log("cool", req, res);
});
router.post("/utility/billing", 
// auth,
//  Protect(),
(req, res) => {
    // #swagger.tags = ['UtilityBill']
    // #swagger.summary = 'Create Utility Bill..'
    // #swagger.description = 'Create Utility Bill.'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/RequestUtilityBill" }
  } */
    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/ResponseUtilityBill" },
               description: 'OK'
        } */
    // console.log("headers :", req.headers);
    console.log("cool", req, res);
});
module.exports = router;
//# sourceMappingURL=utilityBillRoutes.js.map