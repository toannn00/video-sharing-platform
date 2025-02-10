import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../auth/schema/user.schema';

export class VideoDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly url: string;

  @IsEmpty({ message: 'Error' })
  readonly email: string;

  @IsEmpty({ message: 'Error' })
  readonly user: User;
}
