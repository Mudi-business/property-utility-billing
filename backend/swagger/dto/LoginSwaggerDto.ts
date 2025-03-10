export const requestLoginSwaggerDto = {
  email: "string",
  password: "string"
};

export const requestRefreshTokenSwaggerDto = {
    refresh_token: "string",
  };
  

export const responseLoginSwaggerDto = {
  access_token:"string",
  refresh_token:"string"
};
