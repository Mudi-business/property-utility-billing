import { requestLoginSwaggerDto, requestRefreshTokenSwaggerDto, responseLoginSwaggerDto } from "./dto/LoginSwaggerDto";
import { requestPropertiesSwaggerDto, requestPropertyFilterSearch, responsePropertiesPageableSwaggerDto, responsePropertySwaggerDto } from "./dto/propertySwaggerDto";
import { requestUserSwaggerDto, responseUserSwaggerDto } from "./dto/userSwaggerDto";
import { requestUtilityBillSwaggerDto, responseUtilityBillsPageableSwaggerDto, responseUtilityBillSwaggerDto } from "./dto/utilityBIllSwaggerDto";

  
  const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
  const outputFile = "./swagger_output.json";
  const endpointsFiles = [
    "../routes/propertyRoutes.js",
    "../routes/utilityBillRoutes.js",
    "../routes/userRoutes.js",
    "../routes/loginRoutes.js"
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
      RequestProperty: requestPropertiesSwaggerDto,
      ResponseProperty: responsePropertySwaggerDto,
      ResponsePropertyPageable: responsePropertiesPageableSwaggerDto,
      RequestFilterSearch:requestPropertyFilterSearch,

      //UtilitBilling
      RequestUtilityBill: requestUtilityBillSwaggerDto,
      ResponseUtilityBill: responseUtilityBillSwaggerDto,
      ResponseUtilityBillsPageable: responseUtilityBillsPageableSwaggerDto,

      //User
      RequestUser:requestUserSwaggerDto,
      ResponseUser:responseUserSwaggerDto,

      //Authentication
      RequestLogin:requestLoginSwaggerDto,
      RequestRefreshToken:requestRefreshTokenSwaggerDto,
      ResponseLogin:responseLoginSwaggerDto


    },
  };
  swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("../index.js");
  });
  