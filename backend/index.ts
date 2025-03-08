"use strict";
//MODULES
import 'reflect-metadata';
import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();
const swaggerUi = require("swagger-ui-express");
const app: Express = express();
const cors = require("cors");
// const auth = require("./auth/auth");
// const Protect = require("./auth/protectRoutesAuth");

//<==========================================================>
const PropertyRoutes = require("./routes/propertyRoutes");
const UtilityBillingRoutes = require("./routes/utilityBillRoutes");
const swagger_json = require("./swagger/swagger-docs.json");
const swaggerFile = require("./swagger/swagger_output.json");
const db = require("./models/index.js");

//END-MODULES

//EVIROMENT-VARIABLES
const PORT = process.env.PORT;
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
// app.use(auth);
//END-MIDLEWARESs

//Routes
// app.use("/", Protect(["offline_access"]), brand_routes);
//<==================================
app.use("/", PropertyRoutes);
app.use("/", UtilityBillingRoutes);
//==================================>
//Routes

db.sequelize
  .authenticate()
  .then(() => {
    console.log("connected");
    app.listen(PORT, async () => {
      db.sequelize.sync({ force: false }).then(async () => {
        console.log("yes re-sync done !");
        console.log("server listening on port :", PORT);
      });
    });
  })
  .catch((err: Error) => console.log("Error :", err));
