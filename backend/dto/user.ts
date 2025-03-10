
//dto (Data Transfer Objects) for User
export interface UserRequestDto {
  email: string;
  first_name: string;
  last_name: string;
  address: string;
}

export interface UserResponseDto {
    user_id: string
    email: string
    password:string;
    first_name: string
    last_name: string
    address: string
    createdAt: string
    updateAt: string
}
