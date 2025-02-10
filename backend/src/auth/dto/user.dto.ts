import { IsNotEmpty, IsEmail, MinLength, IsString } from 'class-validator';

export class UserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Enter valid email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;
}
