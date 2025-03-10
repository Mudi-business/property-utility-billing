import { Service } from "typedi";
import { Request, Response } from "express";
import {
  EmptyFieldsDetection,
  InvalidObjectKeysDetection,
} from "../utils/helpers";
import { HttpStatusCode } from "axios";
import { UserRepository } from "../repositories/userRepository";
import { requestUserSwaggerDto } from "../swagger/dto/userSwaggerDto";

// We use Typedi for Performing dependency Injection
// Below is Our User Service with Typedi User Repository Injection
@Service()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  getUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const user = await this.userRepo.findById(id);
      return res.status(HttpStatusCode.Ok).send(user);
    } catch (error: any) {
      return res.status(HttpStatusCode.InternalServerError).send({
        status: HttpStatusCode.InternalServerError,
        message: error?.name,
      });
    }
  };

  saveUser = async (req: Request, res: Response) => {
    try {
      const body = req.body;

      if (InvalidObjectKeysDetection(body, requestUserSwaggerDto)) {
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
          const user = await this.userRepo.save(body);
          const newUser: any = {
            user_id: user.user_id,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
            address: user.address,
            updatedAt:user.updateAt,
            createdAt: user.createdAt
          };
          delete newUser.password;
          return res.status(HttpStatusCode.Ok).send(newUser);
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
