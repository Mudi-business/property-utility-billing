import express, { Request, Response } from "express";
const router = express.Router();
const swaggerFile = require("./swagger_output.json");

// Since We use swagger-autogen for out Api Documentation that help us performing our Api Test easily
// Below is our swagger docs route , this is where our swagger docs will be located
// Eg: http://localhost:port/property_utility_billing
router.get("/property_utility_billing", (_: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerFile);
});

module.exports = router;