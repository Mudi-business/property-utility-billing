import { Service } from "typedi";
import { Request, Response } from "express";
import {
  calculateTotalPages,
  EmptyFieldsDetection,
  InvalidObjectKeysDetection,
} from "../utils/helpers";
import { HttpStatusCode } from "axios";
import { UtilityBillRepository } from "../repositories/utilityBillRepository";
import { requestUtilityBillSwaggerDto } from "../swagger/dto/utilityBIllSwaggerDto";



// We use Typedi for Performing dependency Injection 
// Below is Our Utility Bill Service with Typedi Utility Bill Repository Injection
@Service()
export class UtilityBillService {
  constructor(private utilityBillRepo: UtilityBillRepository) {}

  getAllUtilityBills = async (req: Request, res: Response) => {
    try {
      const { page, size }: any = req.query;
      const PageNo = parseInt(page);
      const PageSize = parseInt(size);
      const bills = await this.utilityBillRepo.findAll(PageNo, PageSize);

      return res.status(HttpStatusCode.Ok).send({
        bills: bills.rows,
        totalItems: bills.count,
        totalPages: calculateTotalPages(PageSize, bills.count, bills.rows),
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

  getUtilityBillById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const bill = await this.utilityBillRepo.findById(id);
      return res.status(HttpStatusCode.Ok).send(bill);
    } catch (error: any) {
      return res.status(HttpStatusCode.InternalServerError).send({
        status: HttpStatusCode.InternalServerError,
        message: error?.name,
      });
    }
  };

  saveUtilityBill = async (req: Request, res: Response) => {
    try {
      const body = req.body;

      if (InvalidObjectKeysDetection(body, requestUtilityBillSwaggerDto)) {
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
          const bill = await this.utilityBillRepo.save(body);
          return res.status(HttpStatusCode.Ok).send(bill);
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
