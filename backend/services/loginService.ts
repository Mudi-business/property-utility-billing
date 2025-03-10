import { Service } from "typedi";
import { Request, Response } from "express";
import {
  EmptyFieldsDetection,
  InvalidObjectKeysDetection,
} from "../utils/helpers";
import { HttpStatusCode } from "axios";
import { UserRepository } from "../repositories/userRepository";
import { UserResponseDto } from "../dto/user";
import { TokenGrantsEnum } from "../enums/token";
import { LoginRepository } from "../repositories/loginRepository";
const bcrypt = require("bcryptjs");
import {
  requestLoginSwaggerDto,
  requestRefreshTokenSwaggerDto,
} from "../swagger/dto/LoginSwaggerDto";
import { tokenSuccessDto } from "../dto/tokenDto";
import { LoginResponseDto } from "../dto/authentication";
const jwt = require("jsonwebtoken");

@Service()
export class LoginService {
  constructor(
    private userRepo: UserRepository,
    private loginRepo: LoginRepository
  ) {}

  private _token: { access_token: string; refresh_token: string } = {
    access_token: "",
    refresh_token: "",
  };

  issueToken = async (user: UserResponseDto) => {
    const token = {
      access_token: await jwt.sign(
        {
          data: { id: user.user_id },
        },
        `${process.env.SECRET}`,
        {
          expiresIn: `${process.env.ACCESS_TOKEN_EXPIRE}h`,
          algorithm: process.env.TOKEN_ALGORITHM,
          audience: process.env.TOKEN_AUDIENCE,
          issuer: user.email,
          subject: user.user_id,
          jwtid: TokenGrantsEnum.access_token,
        }
      ),
      refresh_token: await jwt.sign(
        {
          data: { id: user.user_id },
        },
        `${process.env.SECRET}`,
        {
          expiresIn: `${process.env.REFRESH_TOKEN_EXPIRE}h`,
          algorithm: process.env.TOKEN_ALGORITHM,
          audience: process.env.TOKEN_AUDIENCE,
          issuer: user.email,
          subject: user.user_id,
          jwtid: TokenGrantsEnum.refresh_token,
        }
      ),
    };
    this._token = token;
  };

  validateUser = async (req: Request, res: Response) => {
    try {
      const body: { email: string; password: string } = req.body;

      if (InvalidObjectKeysDetection(body, requestLoginSwaggerDto)) {
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
          const user = await this.userRepo.findUserByEmail(body?.email);
          if (user?.user_id !== undefined) {
            return new Promise(function (resolve, reject) {
              bcrypt.compare(
                body?.password,
                user?.password,
                function (_: any, result: boolean) {
                  if (result) {
                    resolve(user);
                  } else {
                    reject(undefined);
                  }
                }
              );
            });
          } else {
            return undefined;
          }
        }
      }
    } catch (error: any) {
      return res.status(HttpStatusCode.InternalServerError).send({
        status: HttpStatusCode.InternalServerError,
        message: error?.name,
      });
    }
  };

  login = async (res: Response, user: UserResponseDto) => {
    try {
      await this.issueToken(user);
      const login: LoginResponseDto = await this.loginRepo.save({
        ...this._token,
        user_id: user.user_id,
      });
      return res.status(HttpStatusCode.Ok).send({
        access_token:login.access_token,
        refresh_token:login.refresh_token
      });
    } catch (error: any) {
      return res.status(HttpStatusCode.InternalServerError).send({
        status: HttpStatusCode.InternalServerError,
        message: error?.name,
      });
    }
  };

  refresh_token = async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const { authorization }: any = req?.headers;
      const token = authorization?.split(" ")[1];
      var decoded: tokenSuccessDto = await jwt.verify(
        token,
        process.env.SECRET
      );

      if (InvalidObjectKeysDetection(body, requestRefreshTokenSwaggerDto)) {
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
          const user = await this.userRepo.findById(decoded.data.id);
          this.issueToken(user);
          const login = await this.loginRepo.update(this._token, user.user_id);
          if (login.length > 0) {
            return res.status(HttpStatusCode.Ok).send(this._token);
          } else {
            return res.status(HttpStatusCode.NotFound).send({
              status: HttpStatusCode.NotFound,
              message: "Failed To Update User Token",
            });
          }
        }
      }
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return res.status(HttpStatusCode.Unauthorized).send({
          status: HttpStatusCode.Unauthorized,
          message: error?.name,
        });
      } else {
        return res.status(HttpStatusCode.InternalServerError).send({
          status: HttpStatusCode.InternalServerError,
          message: error?.name,
        });
      }
    }
  };
}
