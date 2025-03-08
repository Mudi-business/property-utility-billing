import express, { Request, Response } from "express";
const router = express.Router();
const swaggerFile = require("./swagger_output.json");

router.get("/property_utility_billing", (_: Request, res: Response) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerFile);
});

module.exports = router;