import { Service } from "typedi";
import {
  PropertyFindAndCountAll,
  PropertyRequestDto,
  PropertyResponseDto,
  PropertyResponseWithBillsDto,
} from "../dto/property";
import { PropertyTypeEnum } from "../enums/property";
import { Op } from "sequelize";
const db = require("../models");


// We use Typedi for Performing dependency Injection 
// Below is Our Property Repository with Sequelize Property Model
@Service()
export class PropertyRepository {
  findAll = async (pageNo: number, pageSize: number,search:string,filter:PropertyTypeEnum|string) => {
    const properties: PropertyFindAndCountAll =
      await db.Property.findAndCountAll({
        offset: pageNo,
        limit: pageSize,
        where:{
         [Op.or]:{
          property_name: {
            [search=='0'?Op.ne:Op.like]:`%${search}%`
          },
          property_address: {
            [search=='0'?Op.ne:Op.like]:`%${search}%`
          },
         },
          property_type: {
            [filter=='0'?Op.ne:Op.eq]:filter
          },
        }
      });
    return properties;
  };

  findById = async (id: string) => {
    const property: PropertyResponseWithBillsDto = await db.Property.findByPk(
      id,
      {
        include: [
          {
            model: db.UtilityBill,
            as: "UtilityBills",
            where: {
              property_id: id,
            },
            required: false,
          },
        ],
      }
    );
    return property;
  };

  save = async (body: PropertyRequestDto) => {
    const property: PropertyResponseDto = await db.Property.create(body);
    return property;
  };
}
