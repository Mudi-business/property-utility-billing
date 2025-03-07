"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const propertySwaggerDto_1 = require("./dto/propertySwaggerDto");
const utilityBIllSwaggerDto_1 = require("./dto/utilityBIllSwaggerDto");
const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const outputFile = "./swagger_output.json";
const endpointsFiles = [
    "../routes/propertyRoutes.js",
    "../routes/utilityBillRoutes.js",
];
const doc = {
    info: {
        title: "ZRA CENTRALIZED AUTH SERVICE", // short title.
        description: "API FOR MANAGING CENTRALIZED AUTH SERVICE", //  desc.
        version: "1.0.0", // version number
        contact: {
            name: "Mohamed Bakari Mohamed", // your name
            email: "mohdbeka24@gmail.com", // your email
            url: "web.com", // your website
        },
    },
    servers: [
        {
            url: `http://localhost:7070`,
            description: "Development server",
        },
    ],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
        bearerAuth: {
            type: "http",
            in: "header",
            name: "Authorization",
            description: "Bearer token to access all api endpoints",
            scheme: "bearer",
            bearerFormat: "JWT",
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    definitions: {
        //Properties
        RequestProperty: propertySwaggerDto_1.requestPropertiesSwaggerDto,
        ResponseProperty: propertySwaggerDto_1.responsePropertySwaggerDto,
        ResponsePropertyPageable: propertySwaggerDto_1.responsePropertiesPageableSwaggerDto,
        //UtilitBilling
        RequestUtilityBill: utilityBIllSwaggerDto_1.requestUtilityBillSwaggerDto,
        ResponseUtilityBill: utilityBIllSwaggerDto_1.responseUtilityBillSwaggerDto,
        ResponseUtilityBillsPageable: utilityBIllSwaggerDto_1.responseUtilityBillsPageableSwaggerDto,
    },
};
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("../index.js");
});
//# sourceMappingURL=swagger.js.map