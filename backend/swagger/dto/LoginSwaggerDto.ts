// Since We use swagger-autogen for out Api Documentation that help us performing our Api Test easily
// Below we Initialize our Login swagger DTO

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
