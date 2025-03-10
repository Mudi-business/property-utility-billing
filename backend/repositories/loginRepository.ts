import { Service } from "typedi";
import { LoginDto, LoginResponseDto } from "../dto/authentication";
const db = require("../models");

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
}
