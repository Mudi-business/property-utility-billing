"use strict";
import express, { Request, Response } from "express";
import { Container } from "typedi";
import { PropertyService } from "../services/propertyService";
const router = express.Router();
const propertyInstance = Container.get(PropertyService);
// const auth = require("../auth/auth");
// const Protect = require("../auth/protectRoutesAuth");

router.get(
  "/properties/pageable",
  //   auth,
  //   Protect(),
  async (req: Request, res: Response) => {
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
  }
);

router.get(
  "/property/:id",
  //   auth,
  //   Protect(),
  (req: Request, res: Response) => {
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
  }
);

router.post(
  "/property",
  // auth,
  //  Protect(),
  (req: Request, res: Response) => {
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
  }
);

module.exports = router;
