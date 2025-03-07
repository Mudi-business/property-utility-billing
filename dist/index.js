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
//MODULES
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const swaggerUi = require("swagger-ui-express");
const app = (0, express_1.default)();
// const cors = require("cors");
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
app.use(express_1.default.urlencoded({ extended: true }));
// support parsing of application/json type post data
app.use(express_1.default.json());
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
    app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
        db.sequelize.sync({ force: false }).then(() => __awaiter(void 0, void 0, void 0, function* () {
            console.log("yes re-sync done !");
            console.log("server listening on port :", PORT);
        }));
    }));
})
    .catch((err) => console.log("Error :", err));
//# sourceMappingURL=index.js.map