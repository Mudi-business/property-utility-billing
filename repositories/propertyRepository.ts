import { Service } from "typedi";
import { Request, Response } from "express";
import { calculateTotalPages } from "../utils/helpers";
import { ErrorStatusEnum } from "../enums/errorStatusEnum";
const db = require("../models");
@Service()
export class PropertyRepository {
  findAll = async (req: Request, res: Response) => {
    try {
      const { page, size }: any = req.query;
      const PageNo = parseInt(page);
      const PageSize = parseInt(size);
      const count = await db.Property.count();
      const properties = await db.Property.findAll();

      return res.status(ErrorStatusEnum.SUCESS).send({
        properties: properties,
        totalItems: count,
        totalPages: calculateTotalPages(PageSize, count, properties),
        pageNo: PageNo,
        pageSize: PageSize,
      });
    } catch (error: any) {
      return res.status(ErrorStatusEnum.INTERNAL_SERVER_ERRROR).send(error);
    }
  };
}
