import { IsEmpty, IsNotEmpty, IsString, Matches } from 'class-validator';
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
  @Matches(
    /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    { message: 'URL must be a valid YouTube link' },
  )
  readonly url: string;

  @IsEmpty({ message: 'Error' })
  readonly email: string;

  @IsEmpty({ message: 'Error' })
  readonly user: User;
}
