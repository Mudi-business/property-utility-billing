//dto (Data Transfer Objects) for Authentication
export interface LoginDto {
  user_id: string;
  access_token: string;
  refresh_token: string;
}

export interface RefreshTokenDto {
  refresh_token: string;
}

export interface LoginResponseDto {
  access_token: string;
  refresh_token: string;
}

export interface UserLoginDto {
  email: string;
  password: string;
}
