import { PropertyRepository } from "../repositories/propertyRepository";
import { Service } from "typedi";
import { Request, Response } from "express";
import { calculateTotalPages, EmptyFieldsDetection, InvalidObjectKeysDetection } from "../utils/helpers";
import { HttpStatusCode } from "axios";
import { PropertyRequestDto } from "../dto/property";
import { requestPropertiesSwaggerDto } from "../swagger/dto/propertySwaggerDto";

@Service()
export class PropertyService {
  constructor(private propertyRepo: PropertyRepository) {}

  getAllProperties = async (req: Request, res: Response) => {
    try {
      const { page, size, search, filter }: any = req.query;
      console.log("search:", search, "and filter :", filter);

      const PageNo = parseInt(page) * parseInt(size);
      const PageSize = parseInt(size);
      const propSearch =
        search === undefined ? "0" : search === "" ? "0" : search;
      const propFilter =
        filter === undefined ? "0" : filter === "" ? "0" : filter;
      const properties = await this.propertyRepo.findAll(
        PageNo,
        PageSize,
        propSearch,
        propFilter
      );

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
      const body: PropertyRequestDto = req.body;

      if (InvalidObjectKeysDetection(body,requestPropertiesSwaggerDto)) {
        return res.status(HttpStatusCode.BadRequest).send({
          status: HttpStatusCode.BadRequest,
          message: "UnAuthorized Field Found",
        });
      } else {
        if (EmptyFieldsDetection(body)) {
          return res.status(HttpStatusCode.BadRequest).send({
            status: HttpStatusCode.BadRequest,
            message: "Make sure all values are passed correct",
          });
        } else {
          const property = await this.propertyRepo.save(body);
          return res.status(HttpStatusCode.Ok).send(property);
        }

      }
    } catch (error: any) {
      return res.status(HttpStatusCode.InternalServerError).send({
        status: HttpStatusCode.InternalServerError,
        message: error?.name,
      });
    }
  };
}

