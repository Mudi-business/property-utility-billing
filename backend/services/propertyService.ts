import { PropertyRepository } from "../repositories/propertyRepository";
import { Service } from "typedi";
import { Request, Response } from "express";
import { calculateTotalPages } from "../utils/helpers";
import { HttpStatusCode } from "axios";
@Service()
export class PropertyService {
  constructor(private propertyRepo: PropertyRepository) {}

  getAllProperties = async (req: Request, res: Response) => {
    try {
      const { page, size }: any = req.query;
      const PageNo = parseInt(page);
      const PageSize = parseInt(size);
      const properties = await this.propertyRepo.findAll(PageNo, PageSize);

      return res.status(HttpStatusCode.Ok).send({
        properties: properties.rows,
        totalItems: properties.count,
        totalPages: calculateTotalPages(
          PageSize,
          properties.count,
          properties.rows
        ),
        pageNo: PageNo,
        pageSize: PageSize,
      });
    } catch (error: any) {
      return res.status(HttpStatusCode.InternalServerError).send({
        status: HttpStatusCode.InternalServerError,
        message: error?.name,
      });
    }
  };

  getPropertyById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const properties = await this.propertyRepo.findById(id);
      return res.status(HttpStatusCode.Ok).send(properties);
    } catch (error: any) {
      return res.status(HttpStatusCode.InternalServerError).send({
        status: HttpStatusCode.InternalServerError,
        message: error?.name,
      });
    }
  };

  saveProperty = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const property = await this.propertyRepo.save(body);
      return res.status(HttpStatusCode.Ok).send(property);
    } catch (error: any) {
      return res.status(HttpStatusCode.InternalServerError).send({
        status: HttpStatusCode.InternalServerError,
        message: error?.name,
      });
    }
  };
}
