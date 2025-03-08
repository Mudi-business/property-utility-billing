import { Service } from "typedi";
import {
  UtilityBillFindAndCountAll,
  UtilityBillRequestDto,
  UtilityBillsResponseDto,
} from "../dto/utilityBill";

const db = require("../models");

@Service()
export class UtilityBillRepository {
  findAll = async (pageNo: number, pageSize: number) => {
    const bills: UtilityBillFindAndCountAll =
      await db.UtilityBill.findAndCountAll({
        offset: pageNo,
        limit: pageSize,
      });
    return bills;
  };

  findById = async (id: string) => {
    const bill: UtilityBillsResponseDto = await db.UtilityBill.findByPk(id);
    return bill;
  };

  save = async (body: UtilityBillRequestDto) => {
    const bill: UtilityBillsResponseDto = await db.UtilityBill.create(body);
    return bill;
  };
}
