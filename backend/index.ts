"use strict";
//MODULES
import 'reflect-metadata';
import express, { Express } from "express";
import dotenv from "dotenv";
dotenv.config();
const swaggerUi = require("swagger-ui-express");
const app: Express = express();
const cors = require("cors");


//<==========================================================>
const PropertyRoutes = require("./routes/propertyRoutes");
const UtilityBillingRoutes = require("./routes/utilityBillRoutes");
const UserRoutes = require("./routes/userRoutes");
const LoginRoutes = require("./routes/loginRoutes");
const swagger_json = require("./swagger/swagger-docs.json");
const swaggerFile = require("./swagger/swagger_output.json");
const db = require("./models/index.js");
//END-MODULES

//EVIROMENT-VARIABLES
const PORT = process.env.PORT;
const FORCE = false
//END-ENVIROMENT-VARIABLES

//MIDLEWARES
  //support parsing of application/x-www-form-urlencoded post data
  app.use(express.urlencoded({ extended: true }));
  // support parsing of application/json type post data
  app.use(express.json());
  app.use(cors())
  app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(swaggerFile));
  //populate swagger docs in json format
  app.use("/", swagger_json);
//END-MIDLEWARESs

//Routes
  //<==================================
  app.use("/", PropertyRoutes);
  app.use("/", UtilityBillingRoutes);
  app.use("/",UserRoutes)
  app.use("/",LoginRoutes)
  //==================================>
//Routes


//Initialize out Express Application along with sequelize
db.sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
    app.listen(PORT, async () => {
      db.sequelize.sync({ force:FORCE  }).then(async () => {
        console.log("yes re-sync done !");
        console.log("server listening on port :", PORT);
      });
    });
  })
  .catch((err: Error) => console.log("Error :", err));
