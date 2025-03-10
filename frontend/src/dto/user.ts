
//USER DTOs
export interface UserDto {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserRequestDto {
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  password: string;
}
