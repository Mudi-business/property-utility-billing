//LOGIN DTOs
export interface LoginDto {
  access_token: string;
  refresh_token: string;
}

export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LogoutResponseDto {
  status: number;
  message: string;
}

export interface tokenSuccessDto {
  data: {
    id: string | null;
  };
  iat: number | null;
  exp: number | null;
  aud: string | null;
  iss: string | null;
  sub: string | null;
  jti: string | null;
}
