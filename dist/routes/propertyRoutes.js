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
const typedi_1 = require("typedi");
const propertyService_1 = require("../services/propertyService");
const router = express_1.default.Router();
const propertyInstance = typedi_1.Container.get(propertyService_1.PropertyService);
// const auth = require("../auth/auth");
// const Protect = require("../auth/protectRoutesAuth");
router.get("/properties/pageable", 
//   auth,
//   Protect(),
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // #swagger.tags = ['Property']
    // #swagger.summary = 'Get Properties..'
    // #swagger.description = 'Get all properties Pageable.'
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
            schema: { $ref: "#/definitions/ResponsePropertyPageable" },
            description: 'OK'
    } */
    propertyInstance.getAllProperties(req, res);
}));
router.get("/property/:id", 
//   auth,
//   Protect(),
(req, res) => {
    // #swagger.tags = ['Property']
    // #swagger.summary = 'Get Property By Id..'
    // #swagger.description = 'Get Property By Id.'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    //  #swagger.parameters['id'] = { description: 'Property Id' }
    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/ResponseProperty" },
               description: 'OK'
        } */
    propertyInstance.getPropertyById(req, res);
});
router.post("/property", 
// auth,
//  Protect(),
(req, res) => {
    // #swagger.tags = ['Property']
    // #swagger.summary = 'Create Property..'
    // #swagger.description = 'Create Property.'
    /* #swagger.security = [{
            "bearerAuth": []
    }] */
    /*	#swagger.requestBody = {
            required: true,
            schema: { $ref: "#/definitions/RequestProperty" }
  } */
    /* #swagger.responses[200] = {
               schema: { $ref: "#/definitions/ResponseProperty" },
               description: 'OK'
        } */
    // console.log("headers :", req.headers);
    propertyInstance.saveProperty(req, res);
});
module.exports = router;
//# sourceMappingURL=propertyRoutes.js.map