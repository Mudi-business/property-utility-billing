import { Service } from "typedi";
import { PropertyFindAndCountAll, PropertyRequestDto, PropertyResponseDto } from "../dto/property";
const db = require("../models");

@Service()
export class PropertyRepository {
  findAll = async (pageNo:number,pageSize:number) => {
    const properties:PropertyFindAndCountAll = await db.Property.findAndCountAll({
      offset: pageNo,
      limit: pageSize,
    });
    return properties;
  };

  findById = async (id:string) => {
    const property:PropertyResponseDto = await db.Property.findByPk(id);
    return property;
  };

  save = async (body:PropertyRequestDto) => {
    const property:PropertyResponseDto = await db.Property.create(body);
    return property;
  };
}
