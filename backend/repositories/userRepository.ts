import { Service } from "typedi";
import { UserRequestDto, UserResponseDto } from "../dto/user";
const db = require("../models");


// We use Typedi for Performing dependency Injection 
// Below is Our User Repository with Sequelize User Model
@Service()
export class UserRepository {

  findById = async (id: string) => {
    const user: UserResponseDto = await db.User.findByPk(id);
    return user;
  };

  findUserByEmail = async (email: string) => {
    const user: UserResponseDto = await db.User.findOne({
        where:{
            email,
        }
    });
    return user;
  };

  save = async (body: UserRequestDto) => {
    const user: UserResponseDto = await db.User.create(body);
    return user;
  };
}
