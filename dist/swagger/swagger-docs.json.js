"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const swaggerFile = require("./swagger_output.json");
router.get("/property_utility_billing", (_, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerFile);
});
module.exports = router;
//# sourceMappingURL=swagger-docs.json.js.map