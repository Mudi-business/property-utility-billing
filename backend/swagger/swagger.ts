import { requestLoginSwaggerDto, requestLogoutSwaggerDto, requestRefreshTokenSwaggerDto, responseLoginSwaggerDto, responseLogoutSwaggerDto } from "./dto/LoginSwaggerDto";
import { requestPropertiesSwaggerDto, requestPropertyFilterSearch, responsePropertiesPageableSwaggerDto, responsePropertySwaggerDto } from "./dto/propertySwaggerDto";
import { requestUserSwaggerDto, responseUserSwaggerDto } from "./dto/userSwaggerDto";
import { requestUtilityBillSwaggerDto, responseUtilityBillsPageableSwaggerDto, responseUtilityBillsSwaggerDto, responseUtilityBillSwaggerDto } from "./dto/utilityBIllSwaggerDto";

  
// Since We use swagger-autogen for out Api Documentation that help us performing our Api Test easily
// Below is our root swagger index file where define almost everything for our swagger
// Note: You can locate this swagger documentation through http://localhost:port/swagger-ui
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
      title: "PROPERTY MANAGMENT SYSTEM (PMS)", // short title.
      description: "API FOR MANAGING PMS SERVICE", //  desc.
      version: "1.0.0", // version number
      contact: {
        name: "Mohamed Bakari Mohamed", // your name
        email: "mohdbeka24@gmail.com", // your email
        url: "web.com", // your website
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
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
      ResponseUtilityBills:responseUtilityBillsSwaggerDto,
      ResponseUtilityBillsPageable: responseUtilityBillsPageableSwaggerDto,

      //User
      RequestUser:requestUserSwaggerDto,
      ResponseUser:responseUserSwaggerDto,

      //Authentication
      RequestLogin:requestLoginSwaggerDto,
      RequestRefreshToken:requestRefreshTokenSwaggerDto,
      ResponseLogin:responseLoginSwaggerDto,

      //Logout
      RequestLogout:requestLogoutSwaggerDto,
      ResponseLogout:responseLogoutSwaggerDto

    },
  };
  swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require("../index.js");
  });
  