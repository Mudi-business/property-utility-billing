"use strict";
import express, { Request, Response } from "express";
import Container from "typedi";
import { UtilityBillService } from "../services/utilityBillService";
const router = express.Router();
const utilityBillInstance = Container.get(UtilityBillService);
const auth = require("../auth/auth");
const Protect = require("../auth/protect");

// Since We use swagger-autogen for out Api Documentation that help us performing our Api Test easily
// Below is our swagger comments that demonstrate how to map our routes with swagger


// Below are Our Utility Bills Routes with Typedi Utility Bill Service Injection
router.get(
  "/utility/bills/pageable",
  auth,
  Protect(),
  async (req: Request, res: Response) => {
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
            schema: { $ref: "#/definitions/ResponseUtilityBillsPageable" },
            description: 'OK' 
    } */
    utilityBillInstance.getAllUtilityBills(req, res);
  }
);

router.get(
  "/utility/bill/:id",
  auth,
  Protect(),
  (req: Request, res: Response) => {
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
    utilityBillInstance.getUtilityBillById(req, res);
  }
);

router.post(
  "/utility/bill",
  auth,
  Protect(),
  (req: Request, res: Response) => {
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
    utilityBillInstance.saveUtilityBill(req, res);
  }
);

module.exports = router;
