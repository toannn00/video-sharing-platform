import {
  IsEmpty,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { User } from '../../auth/schema/user.schema';

export class VideoDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || '')
  readonly title: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value || '')
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
