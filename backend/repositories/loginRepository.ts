import { Service } from "typedi";
import { LoginDto, LoginResponseDto } from "../dto/authentication";
import { Op } from "sequelize";
import { HttpStatusCode } from "axios";
const db = require("../models");

// We use Typedi for Performing dependency Injection 
//Below is Our Login Repository with Sequelize Login Model
@Service()
export class LoginRepository {
  save = async (body: LoginDto) => {
    const login: LoginResponseDto = await db.Login.create(body);
    return login;
  };

  update = async (body: LoginResponseDto, id: string) => {
    const updated: number[] = await db.Login.update(body, {
      where: { user_id: id },
    });
    return updated;
  };
  findByUserId = async (id: string) => {
    const login: LoginResponseDto = await db.Login.findOne(
      {
        where: { 
          user_id: id ,
          access_token: {
            [Op.ne]:HttpStatusCode.Unauthorized
          },
          refresh_token: {
            [Op.ne]:HttpStatusCode.Unauthorized
          },
        },
      }
    );
    return login;
  };

}
