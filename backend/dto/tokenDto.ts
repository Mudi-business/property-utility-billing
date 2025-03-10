//dto (Data Transfer Objects) for Decoded Token
export interface tokenSuccessDto {
    data: {id:string};
    iat: number;
    exp: number;
    aud: string;
    iss: string;
    sub: string;
    jti: string;
  }
  